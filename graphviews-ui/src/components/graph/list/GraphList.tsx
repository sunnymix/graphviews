import { forwardRef, useEffect, useState } from "react";
import GraphApi from "../api/GraphApi";
import { Space, Input, Button } from "antd";
const { Search } = Input;
import { history } from 'umi';
import "./GraphListStyle.css";
import moment from "moment";

// FIXME：改为传统的注释代码风格

/**
 * Graph列表展示模式
 */
export type Mode = "table" | "list";

/**
 * Graph列表属性
 */
export interface GraphListProps {
  mode: Mode,
  refreshSignal?: string,
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

  /**
   * 时间格式化
   * FIXME：抽象到公共库
   * @param timestamp 毫秒时间戳
   * @returns 格式化的时间字符串
   */
  const formatTime = (timestamp: number): string => {
    return moment(new Date(timestamp)).format("YYYY-MM-DD HH:mm")
  };

  /**
   * GraphList的界面
   */
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
          {props.mode == "table" &&
            <td>{graph.id}</td>
          }
            <td>{graph.name}</td>
          {props.mode == "table" &&
            <td>{formatTime(graph.created)}</td>
          }
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );

});
