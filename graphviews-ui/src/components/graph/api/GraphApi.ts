import axios from "axios";
import Constant from "@/components/common/Constant";

const API_GRAPH_QUERY = Constant.API_HOST + "/graph/query";

const queryGraph = (keyword: string, cb: Function) => {
  axios.get(`${API_GRAPH_QUERY}?keyword=${keyword}`)
    .then(res => {
      const graphs = res.data?.data || [];
      cb(graphs);
    });
};

export default {
  queryGraph,
};
