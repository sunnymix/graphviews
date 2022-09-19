import axios from "axios";
import Constant from "@/components/common/Constant";
import { GraphData } from "../graph/Graph";

// --- query graph:

const API_GRAPH_QUERY = Constant.API_HOST + "/graph/query";

type QueryGraphCallback = (graph: GraphData[]) => void;

const queryGraph = (keyword: string, cb: QueryGraphCallback) => {
  axios.get(`${API_GRAPH_QUERY}?keyword=${keyword}`)
    .then(res => {
      const graphs = res.data?.data || [];
      cb(graphs);
    });
};

// --- get graph:

const API_GRAPH_GET = Constant.API_HOST + "/graph/get";

type GetGraphCallback = (graph: GraphData|null) => void;

const getGraph = (id: string, cb: GetGraphCallback) => {
  axios.get(`${API_GRAPH_GET}?id=${id}`)
    .then(res => {
      const graph = res.data?.data || null;
      cb(graph);
    });
};

export default {
  queryGraph,
  getGraph,
};
