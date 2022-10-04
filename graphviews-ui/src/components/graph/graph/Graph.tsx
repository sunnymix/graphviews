import { forwardRef, useEffect, useRef, useState } from "react";
import "./GraphStyle.css";
import GraphApi from "../api/GraphApi";
import { Input, Button, Space, Popconfirm, message } from 'antd';
import { history } from "umi";
const { TextArea } = Input;
import { graphviz, GraphvizOptions } from "d3-graphviz";
import html2canvas from "html2canvas";
import GraphList from "../list/GraphList";

/**
 * Graph属性
 */
export interface GraphProps {
  id: string,
}

/**
 * Graph数据模型
 */
export interface GraphData {
  id: string,
  name: string,
  source: string,
  created: string,
}

/**
 * Graph组件
 */
export default forwardRef((props: GraphProps, ref) => {

  /**
   * 渲染处理：当Graph的id属性变更时触发
   */
  useEffect(() => {
    getGraph();
    refreshGraphList();
  }, [props.id]);

  /**
   * 属性：graph数据对象
   */
  const [graph, setGraph] = useState<GraphData|null>(null);

  /**
   * 远程获取：graph数据对象
   */
  const getGraph = () => {
    GraphApi.getGraph(props.id, (graph: GraphData|null) => {
      const newGraph = graph || null;
      if (newGraph) {
        setName(newGraph.name);
        setSource(newGraph.source);
      }
      setGraph(newGraph);
    });
  };

  /**
   * 属性：graph的名称
   */
  const [name, setName] = useState<string>("");

  /**
   * 属性：graph的源码
   */
  const [source, setSource] = useState<string>("");

  /**
   * 方法：跳转到Graph详情
   * FIXME：封装到Graph公共方法库
   * @param id 
   */
  const gotoGraphById = (id: string) => {
    history.push("/graph/" + id);
  };

  /**
   * 方法：跳转到Graph列表
   * FIXME：封装到Graph公共方法库
   */
  const gotoGraphList = () => {
    history.push("/graph");
  };
  
  /**
   * 方法：更新Graph
   */
  const updateGraph = () => {
    GraphApi.updateGraph(props.id, {
      name: name,
      source: source,
    }, (success: boolean) => {
      if (success === true) {
        message.info("保存成功！")
        refreshGraphList();
      } else {
        message.error("保存失败！")
      }
    });
  };

  /**
   * 方法：删除Graph
   */
  const deleteGraph = () => {
    GraphApi.deleteGraph(props.id, (success: boolean) => {
      if (success === true) {
        message.info("已删除！");
        gotoGraphList();
      } else {
        message.error("删除失败！");
      }
    });
  };

  /**
   * 方法：复制Graph
   */
  const copyGraph = () => {
    GraphApi.copyGraph(props.id, (id: string) => {
      if (id) {
        message.info("复制成功！")
        gotoGraphById(id);
      } else {
        message.error("复制失败！")
      }
    });
  };

  /**
   * Graphviz选项
   */
  const graphvizOptions: GraphvizOptions = {
    useWorker: false,
    engine: "dot",
    keyMode: "title",
    fade: false,
    tweenPaths: false,
    tweenShapes: false,
    convertEqualSidedPolygons: false,
    tweenPrecision: 1,
    growEnteringEdges: false,
    zoom: false,
    scale: 1,
    fit: false,
  };

  // --- graph view ref:

  const graphViewContentRef = useRef<any>(null);

  // --- graph view error:

  const [graphViewError, setGraphViewError] = useState<string>("");

  // --- update graph:

  useEffect(() => {
    if (source) {
      try {
        graphviz(".graph_view_content", graphvizOptions).renderDot(source);
        setGraphViewError("");
      } catch (error) {
        setGraphViewError("Error: " + error);
      }
    }
  }, [source]);

  // --- name key down:

  const nameOnKeyDown = (e: any) => {
    const code = e.code;
    const isCmd = e.metaKey;
    const isShift = e.shiftKey;
    const isOpt = e.altKey;
    const isCtr = e.ctrlKey;

    if (code == "KeyS") {
      if (isCmd) {
        e.preventDefault();
        updateGraph();
      }
    }
  };

  // --- source key down:

  const sourceOnKeyDown = (e: any) => {
    const code = e.code;
    const isCmd = e.metaKey;
    const isShift = e.shiftKey;
    const isOpt = e.altKey;
    const isCtr = e.ctrlKey;

    if (code == "KeyS") {
      if (isCmd) {
        e.preventDefault();
        updateGraph();
      }
    }
  };

  // --- save image:

  const saveImage = (e: any) => {
    if (graphViewContentRef.current) {
      html2canvas(graphViewContentRef.current, {}).then((canvas: any) => {
        const image = canvas.toDataURL("image/png", 1.0);
        const fakeA = window.document.createElement("a");
        fakeA.download = `graph-${name}-${+(new Date())}.png`;
        fakeA.href = image;
        const body = window.document.getElementsByTagName('body')[0];
        body.appendChild(fakeA);
        fakeA.click();
        body.removeChild(fakeA);
        message.info("存图成功！");
      });
    }
  };

  // --- refresh graph list:

  const [graphListRefreshSignal, setGraphListRefreshSignal] = useState<string|undefined>();

  const refreshGraphList = () => {
    setGraphListRefreshSignal(`refresh-graph-list:${+(new Date())}`);
  };

  // --- ui:

  return (
  <div>
    <div className="graph_bench">
      <div className="graph_list">
        <GraphList mode="list" refreshSignal={graphListRefreshSignal} />
      </div>
      <div className="graph_content">
        <div className="graph_actions">
          <Space direction="horizontal" size="middle">
            <Button type="default" onClick={gotoGraphList}>关闭</Button>
          </Space>
          <Space direction="horizontal" size="middle">
            <Button type="default" onClick={updateGraph}>保存</Button>
            <Button type="default" onClick={copyGraph}>复制</Button>
          </Space>
          <Space direction="horizontal" size="middle">
            <Popconfirm title="确认删除？" okText="Yes" cancelText="No" onConfirm={deleteGraph}>
              <Button type="default">删除</Button>
            </Popconfirm>
          </Space>
        </div>
        {graph && <div>
          <div className="label">Name</div>
          <div className="graph_name">
            <Input
              value={name}
              onChange={(e: any) => setName(e.target.value || "")}
              onKeyDown={nameOnKeyDown}/>
          </div>
          <div className="label">Source</div>
          <div className="graph_source">
            {/* FIXME：集成代码编辑器 https://github.com/jaywcjlove/react-monacoeditor */}
            <TextArea
              className="graph_source_text" autoSize autoFocus value={source} 
              onChange={(e: any) => setSource(e.target.value || "")}
              onKeyDown={sourceOnKeyDown}></TextArea></div>
        </div>}
      </div>
      <div className="graph_view">
        <div className="graph_actions">
          <Space direction="horizontal" size="middle">
            <Button type="default" onClick={saveImage}>存图</Button>
          </Space>
        </div>
        <div className="graph_view_content" ref={graphViewContentRef}></div>
        {/* FIXME：调整error展示样式 */}
        <div className="graph_view_error">{graphViewError}</div>
      </div>
    </div>
  </div>);

});
