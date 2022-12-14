import axios from "axios";
import Constant from "@/components/common/Constant";
import { GraphData } from "../graph/Graph";

/**
 * Path：查询Graph
 */
const API_GRAPH_QUERY = Constant.API_HOST + "/graph/query";

/**
 * 回调：查询Graph
 */
type QueryGraphCallback = (graph: GraphData[]) => void;

/**
 * API：查询Graph
 * @param keyword 关键字 
 * @param cb 回调
 */
const queryGraph = (keyword: string, cb: QueryGraphCallback) => {
  axios.get(`${API_GRAPH_QUERY}?keyword=${keyword}`)
    .then(res => {
      const graphs = res.data?.data || [];
      cb(graphs);
    });
};

/**
 * Path：获取Graph
 */
const API_GRAPH_GET = Constant.API_HOST + "/graph/get/";

/**
 * 回调：获取Graph
 */
type GetGraphCallback = (graph: GraphData|null) => void;

/**
 * API：获取Graph
 * @param id Graph的id
 * @param cb 回调
 */
const getGraph = (id: string, cb: GetGraphCallback) => {
  axios.get(API_GRAPH_GET + id)
    .then(res => {
      const graph = res.data?.data || null;
      cb(graph);
    });
};

/**
 * Path：更新Graph
 */
const API_GRAPH_UPDATE = Constant.API_HOST + "/graph/update/";

/**
 * 回调：更新Graph
 */
type UpdateGraphCallback = (success: boolean) => void;


/**
 * API：更新Graph
 * FIXME：定义form的类型
 * @param id Graph的id
 * @param form 表单
 * @param cb 回调
 */
const updateGraph = (id: string, form: any, cb: UpdateGraphCallback) => {
  axios.post(API_GRAPH_UPDATE + id, form)
    .then(res => {
      const success = (res.data?.success === true) || false;
      cb(success);
    });
};

/**
 * Path：创建Graph
 */
const API_GRAPH_CREATE = Constant.API_HOST + "/graph/create";

/**
 * 回调：创建Graph
 */
type CreateGraphCallback = (id: string|null) => void;

/**
 * API：创建Graph
 * @param cb 回调
 */
const createGraph = (cb: CreateGraphCallback) => {
  axios.post(API_GRAPH_CREATE, {})
    .then(res => {
      const id = res.data?.data || null;
      cb(id);
    });
};

/**
 * Path：删除Graph
 */
const API_GRAPH_DELETE = Constant.API_HOST + "/graph/delete/";

/**
 * 回调：删除Graph
 */
type DeleteGraphCallback = (success: boolean) => void;

/**
 * API：删除Graph
 * @param id Graph的id
 * @param cb 回调
 */
const deleteGraph = (id: string, cb: DeleteGraphCallback) => {
  axios.post(API_GRAPH_DELETE + id, {})
    .then(res => {
      const id = (res.data?.success === true) || false;
      cb(id);
    });
};

/**
 * Path：复制Graph
 */
const API_GRAPH_COPY = Constant.API_HOST + "/graph/copy/";

/**
 * 回调：复制Graph
 */
type CopyGraphCallback = (id: string) => void;

/**
 * API：复制Graph
 * @param id Graph的id
 * @param cb 回调
 */
const copyGraph = (id: string, cb: CopyGraphCallback) => {
  axios.post(API_GRAPH_COPY + id, {})
    .then(res => {
      const id = (res.data?.success === true) ? res.data?.data : null;
      cb(id);
    });
};

/**
 * 导出Graph的API
 */
export default {
  queryGraph,
  getGraph,
  updateGraph,
  createGraph,
  deleteGraph,
  copyGraph,
};
