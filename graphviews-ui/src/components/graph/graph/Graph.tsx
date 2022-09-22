import { forwardRef, useEffect, useState } from "react";
import "./GraphStyle.css";
import GraphApi from "../api/GraphApi";
import { Input, Col, Row, Button, Space, Popconfirm } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons"
import { history } from "umi";
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

  // --- goto graph list:

  const gotoGraphList = () => {
    history.push("/graph");
  };

  // --- ui:

  return (
  <div>
    <Row>
      <Col span={8}>
        <div className="graph_actions">
          <Space direction="horizontal">
            <Button type="default" onClick={gotoGraphList}><ArrowLeftOutlined /></Button>
            <Button type="default" onClick={updateGraph}>保存</Button>
          </Space>
          <div>
            <Popconfirm title="确认删除？" okText="Yes" cancelText="No">
              <Button type="default">删除</Button>
            </Popconfirm>
          </div>
        </div>
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
  </div>);

});
