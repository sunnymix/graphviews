import { forwardRef, useState } from "react";
import GraphApi from "../api/GraphApi";
import { Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { history } from 'umi';

export default forwardRef((props, ref) => {

  const [graphs, setGraphs] = useState([
    {
      id: "1",
      name: "graph-demo"
    }
  ]);

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        width: "100%",
        padding: 0,
      }}>
      <Space direction="horizontal" size="middle">
        <Input
          placeholder="Search"
          allowClear
          style={{width: 75, paddingLeft: 5, paddingRight: 5,}}/>
        <Button type="default"><SearchOutlined/></Button>
      </Space>
      <table className="table" style={{width: "auto"}}>
        <tbody>
        {graphs.map((graph: any, index: number) => (
          <tr key={graph.id} onClick={() => history.push(`/graph/${graph.id}`)}>
            <td>{graph.id}</td>
            <td>{graph.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </Space>
  );

});
