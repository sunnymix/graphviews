import { forwardRef, useEffect, useState } from "react";
import "./GraphStyle.css";

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
    console.log(props.id);
    const graph = {
      id: props.id,
      name: "name?",
      source: "source?"
    };
    setGraph(graph);
  }, []);

  // --- graph:

  const [graph, setGraph] = useState<GraphData|null>(null);

  // --- ui:

  return (
    <div>
      Graph: {props.id}
      <div>{graph?.name}</div>
      <div>{graph?.source}</div>
    </div>
  );

});
