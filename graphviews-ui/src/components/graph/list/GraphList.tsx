import { forwardRef, useEffect, useState } from "react";
import GraphApi from "../api/GraphApi";
import { Space, Input, Button } from "antd";
const { Search } = Input;
import { history } from 'umi';
import "./GraphListStyle.css";
import moment from "moment";

// FIXME：添加mode属性

export interface GraphListProps {
  refreshSignal?: string
}

export default forwardRef((props: GraphListProps, ref) => {

  // --- load:

  useEffect(() => {
    queryGraphs("");
  }, [props.refreshSignal]);

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

  // --- create graph:

  const createGraph = () => {
    GraphApi.createGraph((id: string|null) => {
      if (id) {
        history.push("/graph/" + id);
      }
    });
  };

  // --- format created:

  const formatTime = (timestamp: number) => {
    return moment(new Date(timestamp)).format("YYYY-MM-DD HH:mm")
  };

  // --- ui:

  return (
    <div>
      <div className="graph_actions">
        <Search className="graph_actions_search" onSearch={onSearch} autoFocus />
        <Button className="graph_actions_create" onClick={createGraph}>创建</Button>
      </div>
      <table className="table">
        <tbody>
        {graphs.map((graph: any, index: number) => (
          <tr key={graph.id} onClick={() => history.push(`/graph/${graph.id}`)}>
            <td>{graph.id}</td>
            <td>{graph.name}</td>
            <td>{formatTime(graph.created)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );

});
