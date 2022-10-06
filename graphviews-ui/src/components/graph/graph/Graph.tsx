import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./GraphStyle.css";
import GraphApi from "../api/GraphApi";
import { Input, Button, Space, Popconfirm, message } from 'antd';
import { history } from "umi";
const { TextArea } = Input;
import { graphviz, GraphvizOptions } from "d3-graphviz";
import html2canvas from "html2canvas";
import GraphList from "../list/GraphList";
import CodeMirror from "@uiw/react-codemirror";

/**
 * FIXME：展示Graph的更新时间
 */

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

  /**
   * 引用：Graph视图内容的元素引用
   */
  const graphViewContentRef = useRef<any>(null);

  /**
   * 属性：Graph视图的错误信息
   */
  const [graphViewError, setGraphViewError] = useState<string>("");

  /**
   * 影响：Graph源代码变更后，重新渲染Graph视图
   */
  useEffect(() => {
    if (source) {
      try {
        graphviz(".graph_view_content", graphvizOptions).renderDot(source);
        setGraphViewError("");
      } catch (error) {
        const errorMessage = "Render error: " + error;
        setGraphViewError(errorMessage);
      }
    }
  }, [source]);

  /**
   * 事件响应：Graph名称输入框的按键事件
   * FIXME：抽象按键事件参数类型
   * @param e 按键事件参数
   */
  const nameOnKeyDown = (e: React.KeyboardEvent) => {
    const code = e.code;
    const isCmd = e.metaKey;
    if (code == "KeyS") {
      if (isCmd) {
        e.preventDefault();
        updateGraph();
      }
    }
  };

  /**
   * 事件响应：Graph源代码输入框的按键事件
   * @param e 按键事件参数
   */
  const sourceOnKeyDown = (e: React.KeyboardEvent) => {
    const code = e.code;
    const isCmd = e.metaKey;
    if (code == "KeyS") {
      if (isCmd) {
        e.preventDefault();
        updateGraph();
      }
    }
  };

  /**
   * 保存快照
   * @param ignoreArg 忽略参数
   */
  const saveSnapshot = (ignoreArg: any) => {
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

  /**
   * 属性：Graph列表的刷新信号
   */
  const [graphListRefreshSignal, setGraphListRefreshSignal] = useState<string|undefined>();

  /**
   * 方法：刷新Graph列表，通过刷新信号
   */
  const refreshGraphList = () => {
    setGraphListRefreshSignal(`refresh-graph-list:${+(new Date())}`);
  };

  /**
   * Graph的界面
   */
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
            {/* FIXME：支持graphviz/dot语法 */}
            {/* FIXME：自定义主体theme */}
            <CodeMirror
              value={source}
              height="auto"
              onChange={(value: any) => setSource(value || "")}
              onKeyDown={sourceOnKeyDown}/>
          </div>
        </div>}
      </div>
      <div className="graph_view">
        <div className="graph_actions">
          <Space direction="horizontal" size="middle">
            <Button type="default" onClick={saveSnapshot}>快照</Button>
          </Space>
        </div>
        <div className="graph_view_content" ref={graphViewContentRef}></div>
        <div className="graph_view_error">{graphViewError}</div>
      </div>
    </div>
  </div>);
});
