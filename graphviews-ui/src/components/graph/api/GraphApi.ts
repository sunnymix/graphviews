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

const API_GRAPH_GET = Constant.API_HOST + "/graph/get/";

type GetGraphCallback = (graph: GraphData|null) => void;

const getGraph = (id: string, cb: GetGraphCallback) => {
  axios.get(API_GRAPH_GET + id)
    .then(res => {
      const graph = res.data?.data || null;
      cb(graph);
    });
};

// --- update graph:

const API_GRAPH_UPDATE = Constant.API_HOST + "/graph/update/";

type UpdateGraphCallback = (success: boolean) => void;

// FIXME：定义form的类型
const updateGraph = (id: string, form: any, cb: UpdateGraphCallback) => {
  axios.post(API_GRAPH_UPDATE + id, form)
    .then(res => {
      const success = (res.data?.success === true) || false;
      cb(success);
    });
};

// --- create graph:

const API_GRAPH_CREATE = Constant.API_HOST + "/graph/create";

type CreateGraphCallback = (id: string) => void;

const createGraph = (cb: CreateGraphCallback) => {
  axios.post(API_GRAPH_CREATE, {})
    .then(res => {
      const id = res.data?.data || null;
      cb(id);
    });
};

export default {
  queryGraph,
  getGraph,
  updateGraph,
  createGraph,
};
