import { forwardRef, useEffect, useState } from "react";
import "./GraphStyle.css";
import GraphApi from "../api/GraphApi";
import { Input, Col, Row, Button } from 'antd';
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
    getGraph(props.id);
  }, []);

  // --- graph:

  const [graph, setGraph] = useState<GraphData|null>(null);

  const getGraph = (id: string) => {
    GraphApi.getGraph(id, (graph: GraphData|null) => {
      setGraph(graph || null);
    });
  };

  // --- save:

  const saveGraph = () => {
    alert('save graph');
  };

  // --- ui:

  return (
  <div>
    <div className="graph_actions">
      <Button type="default" onClick={saveGraph}>保存</Button>
    </div>
    <Row>
      <Col span={8}>
        {graph && <>
          <div>Name</div>
          <div className="graph_name">
            <Input defaultValue={graph.name}/>
          </div>
          <div>Source</div>
          <div className="graph_source">
            <TextArea autoSize defaultValue={graph.source}></TextArea></div>
        </>}
      </Col>
      <Col span={16}>
        <div>View</div>
        <div></div>
      </Col>
    </Row>
  </div>);

});
