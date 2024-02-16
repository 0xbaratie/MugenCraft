import { useCallback, useState } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ConnectionLineType,
  Controls,
  Background,
} from "reactflow";

import CustomNode from "./CustomNode";
const nodeTypes = {
  custom: CustomNode,
};

import styles from "./Flow.module.css";

const nodeMap: { [key: string]: Node } = {
  "1": {
    id: "",
    type: "custom",
    data: { element_id: "1", emoji: "🪨", label: "Stone" },
    position: { x: 0, y: 0 },
  },
  "2": {
    id: "",
    type: "custom",
    data: { element_id: "2", emoji: "🌱", label: "Seed" },
    position: { x: 0, y: 0 },
  },
  "3": {
    id: "",
    type: "custom",
    data: { element_id: "3", emoji: "💛", label: "Soul" },
    position: { x: 0, y: 0 },
  },
  "4": {
    id: "",
    type: "custom",
    data: { element_id: "4", emoji: "🌏", label: "Earth" },
    position: { x: 0, y: 0 },
  },
  "5": {
    id: "",
    type: "custom",
    data: { element_id: "5", emoji: "🔨", label: "Hammer" },
    position: { x: 0, y: 0 },
  },
  "6": {
    id: "",
    type: "custom",
    data: { element_id: "6", emoji: "💩", label: "Poop" },
    position: { x: 0, y: 0 },
  },
};

// const initialNodes: Node[] = [
//   {
//     id: "1",
//     type: "custom",
//     data: { emoji: "🪨", label: "Stone" },
//     position: { x: 250, y: 5 },
//   },
//   {
//     id: "2",
//     type: "custom",
//     data: { emoji: "🌱", label: "Seed" },
//     position: { x: 350, y: 5 },
//   },
//   {
//     id: "3",
//     type: "custom",
//     data: { emoji: "💛", label: "Soul" },
//     position: { x: 450, y: 5 },
//   },
//   {
//     id: "4",
//     type: "custom",
//     data: { emoji: "🌏", label: "Earth" },
//     position: { x: 550, y: 5 },
//   },
//   {
//     id: "5",
//     type: "custom",
//     data: { emoji: "🔨", label: "Hammer" },
//     position: { x: 650, y: 5 },
//   },
// ];

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
];

const defaultEdgeOptions = {
  animated: true,
  type: "smoothstep",
};

const nodesOverlap = (nodeA: Node, nodeB: Node): boolean => {
  const buffer = 50; // A buffer to account for node size; adjust as needed
  return (
    Math.abs(nodeA.position.x - nodeB.position.x) < buffer &&
    Math.abs(nodeA.position.y - nodeB.position.y) < buffer
  );
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const id = event.dataTransfer.getData("application/reactflow") as any;

      if (typeof id === "undefined" || !id) {
        //TODO
        // message.warning("Node type not found!");
        return;
      }
      console.log("id", id);

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const baseNode = nodeMap[id];
      if (!baseNode) {
        // Handle case where node is not found in nodeMap
        // message.warning("Node type not found!");
        return;
      }

      const newNode: Node = {
        ...baseNode,
        id: `${baseNode.id}-${Date.now()}`, // TODO generete unique id
        position: position,
      };

      setNodes((currentNodes) => {
        const updatedNodes = currentNodes.concat(newNode);
        return updatedNodes;
      });
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeDragStop = (event: React.MouseEvent, node: Node) => {
    // Find if the dragged node overlaps with any other node
    const overlappingNode = nodes.find(
      (n) => n.id !== node.id && nodesOverlap(n, node)
    );
    if (overlappingNode) {
      //TODO
      // Logic to combine nodes and create a new node with id "6"
      const newNode = {
        id: "6", // Assuming '6' is always the new id, adjust logic as needed
        type: "custom",
        data: { element_id: "6", emoji: "💩", label: "Poop" }, // Example data, replace with your combined node logic
        position: {
          x: (node.position.x + overlappingNode.position.x) / 2,
          y: (node.position.y + overlappingNode.position.y) / 2,
        }, // Position the new node between the two
      };

      // Remove the original nodes and add the new node
      setNodes((currentNodes) =>
        currentNodes
          .filter((n) => n.id !== node.id && n.id !== overlappingNode.id)
          .concat(newNode)
      );
      // Optionally, handle edges if needed
    }
  };

  return (
    <div className={styles.flow}>
      <ReactFlow
        nodes={nodes}
        onNodeDragStop={onNodeDragStop}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      />
      {/* <Controls />
      <Background /> */}
    </div>
  );
}

export default Flow;
