import { forwardRef, useEffect, useState } from "react";
import "./GraphStyle.css";
import GraphApi from "../api/GraphApi";
import { Input, Col, Row, Button, Space } from 'antd';
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
}

// --- component:

export default forwardRef((props: GraphProps, ref) => {

  // --- load:

  useEffect(() => {
    getGraph();
  }, []);

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

  // --- update graph:
  
  // FIXME 更新状态提示：
  const updateGraph = () => {
    GraphApi.updateGraph(props.id, {
      name: name,
      source: source,
    }, (success: boolean) => {
      if (success !== true) {
        alert("Graph保存失败！");
      }
    });
  };

  // --- ui:

  return (
  <div>
    <Space className="graph_actions" direction="horizontal">
      <Button type="default">返回</Button>
      <Button type="default" onClick={updateGraph}>保存</Button>
    </Space>
    <Row>
      <Col span={8}>
        {graph && <>
          <div>Name</div>
          <div className="graph_name">
            <Input value={name} onChange={(e: any) => setName(e.target.value || "")}/>
          </div>
          <div>Source</div>
          <div className="graph_source">
            <TextArea autoSize value={source} onChange={(e: any) => setSource(e.target.value || "")}></TextArea></div>
        </>}
      </Col>
      <Col span={16}>
        <div>View</div>
        <div></div>
      </Col>
    </Row>
    <Space className="graph_actions_bottom" direction="horizontal">
      <Button type="default" onClick={updateGraph} danger>删除</Button>
    </Space>
  </div>);

});
