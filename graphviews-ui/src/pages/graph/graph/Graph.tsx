import Graph from "@/components/graph/graph/Graph";
import { useRouteMatch } from "umi";

export default () => {
  const route = useRouteMatch();
  const params: any = route.params;
  return <Graph id={params.graphId} />;
};
