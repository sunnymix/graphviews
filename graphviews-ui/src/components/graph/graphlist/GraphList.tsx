import { forwardRef, useEffect, useState } from "react";
import GraphApi from "../api/GraphApi";
import { Space, Input, Button } from "antd";
const { Search } = Input;
import { history } from 'umi';
import "./GraphListStyle.css";

export default forwardRef((props, ref) => {

  // --- loaded:

  useEffect(() => {
    queryGraphs("");
  }, []);

  // --- graphs:

  const queryGraphs = (keyword: string) => {
    GraphApi.queryGraph(keyword, (graphs: any[]) => {
      setGraphs(graphs);
    });
  }

  const [graphs, setGraphs] = useState<any[]>([]);

  // --- search:

  const onSearch = (keyword: string) => {
    queryGraphs(keyword);
  };

  // --- ui:

  return (
    <div>
      <Search className="graph_search" onSearch={onSearch} autoFocus />
      <table className="table auto">
        <tbody>
        {graphs.map((graph: any, index: number) => (
          <tr key={graph.id} onClick={() => history.push(`/graph/${graph.id}`)}>
            <td>{graph.id}</td>
            <td>{graph.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );

});
