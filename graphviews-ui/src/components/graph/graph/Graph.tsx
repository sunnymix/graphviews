import { forwardRef, useEffect, useRef, useState } from "react";
import "./GraphStyle.css";
import GraphApi from "../api/GraphApi";
import { Input, Col, Row, Button, Space, Popconfirm, message } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons"
import { history } from "umi";
const { TextArea } = Input;
import { graphviz, GraphvizOptions } from "d3-graphviz";
import html2canvas from "html2canvas";
import GraphList from "../list/GraphList";

// --- props:

export interface GraphProps {
  id: string,
}

// --- data:

export interface GraphData {
  id: string,
  name: string,
  source: string,
  created: string,
}

// --- component:

export default forwardRef((props: GraphProps, ref) => {

  // --- load:

  useEffect(() => {
    getGraph();
    refreshGraphList();
  }, [props.id]);

  // --- graph:

  const [graph, setGraph] = useState<GraphData|null>(null);

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

  // --- name:

  const [name, setName] = useState<string>("");

  // --- source:

  const [source, setSource] = useState<string>("");

  // --- goto graph by id:

  const gotoGraphById = (id: string) => {
    history.push("/graph/" + id);
  };

  // --- goto graph list:

  const gotoGraphList = () => {
    history.push("/graph");
  };
  
  // FIXME 更新状态提示：
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

  // --- update graph:

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

  // --- copy graph:

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

  // --- graph view options:

  const graphViewOptions: GraphvizOptions = {
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
        graphviz(".graph_view_content", graphViewOptions).renderDot(source);
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
        <GraphList refreshSignal={graphListRefreshSignal} />
      </div>
      <div className="graph_content">
        <div className="graph_actions">
          <Space direction="horizontal" size="middle">
            <Button type="default" onClick={gotoGraphList}><ArrowLeftOutlined /></Button>
          </Space>
          <Space direction="horizontal" size="middle">
            <Button type="default" onClick={updateGraph}>保存</Button>
            <Button type="default" onClick={copyGraph}>复制</Button>
            <Button type="default" onClick={saveImage}>存图</Button>
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
            {/* FIXME：集成代码编辑器 */}
            <TextArea 
              className="graph_source_text" autoSize autoFocus value={source} 
              onChange={(e: any) => setSource(e.target.value || "")}
              onKeyDown={sourceOnKeyDown}></TextArea></div>
        </div>}
      </div>
      <div className="graph_view">
        <div className="graph_view_content" ref={graphViewContentRef}></div>
        {/* FIXME：调整error展示样式 */}
        <div className="graph_view_error">{graphViewError}</div>
      </div>
    </div>
  </div>);

});
