import { forwardRef, useEffect, useState } from "react";
import "./GraphStyle.css";
import GraphApi from "../api/GraphApi";
import { Input, Col, Row, Button, Space, Popconfirm, message } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons"
import { history } from "umi";
import { ErrorBoundary } from "react-error-boundary";
import Graphviz from "graphviz-react";
const { TextArea } = Input;

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

  // --- graph view error :

  const graphViewError = (error: any) => {
    return (
      <div>
        <p>An error occurred:</p>
        <pre>{error.error}</pre>
      </div>
    )
  }

  // --- 

  const graphViewOptions = {
    height: '3000',
    width: '3000',
    tweenPrecision: 1,
    engine: 'dot',
    keyMode: 'title',
    convertEqualSidedPolygons: false,
    fade: false,
    growEnteringEdges: false,
    fit: false,
    tweenPaths: false,
    tweenShapes: false,
    useWorker: false,
    zoom: false,
  };

  const [graphView, setGraphView] = useState<JSX.Element>(<></>);

  const renderGraphView = (source: string) => {
    return (<div>
      <ErrorBoundary 
        FallbackComponent={graphViewError} 
        onError={(error, info) => console.log(error)}
        onReset={() => setSource(graph?.source || "")}
        resetKeys={[source]}>
        <Graphviz dot={source} options={graphViewOptions} />
      </ErrorBoundary>
    </div>);
  };

  useEffect(() => {
    if (source) {
      try {
        setGraphView(renderGraphView(source));
      } catch (error) {
        console.log(error);
      }
    }
  }, [source]);

  // --- ui:

  return (
  <div>
    <Row>
      <Col span={10}>
        <div className="graph_content">
          <div className="graph_actions">
            <Space direction="horizontal">
              <Button type="default" onClick={gotoGraphList}><ArrowLeftOutlined /></Button>
              <Button type="default" onClick={updateGraph}>保存</Button>
            </Space>
            <Space>
              <Button type="default" onClick={copyGraph}>复制</Button>
              <Popconfirm title="确认删除？" okText="Yes" cancelText="No" onConfirm={deleteGraph}>
                <Button type="default">删除</Button>
              </Popconfirm>
            </Space>
          </div>
          {graph && <div>
            <div>Name</div>
            <div className="graph_name">
              <Input value={name} onChange={(e: any) => setName(e.target.value || "")}/>
            </div>
            <div>Source</div>
            <div className="graph_source">
              <TextArea className="graph_source_text" autoSize autoFocus value={source} onChange={(e: any) => setSource(e.target.value || "")}></TextArea></div>
          </div>}
        </div>
      </Col>
      <Col span={14}>
        <div className="graph_view">
          <div>
            {graphView}
          </div>
        </div>
      </Col>
    </Row>
  </div>);

});
