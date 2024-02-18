import { useCallback, useState, useRef } from "react";
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
import Footer from "components/Footer";

import CustomNode from "./CustomNode";
const nodeTypes = {
  custom: CustomNode,
};

let flow_id = 0;
let craft_id = 6;

//TODO local storage
let nodeMap: { [key: string]: Node } = {
  "1": {
    id: "",
    type: "custom",
    data: { craft_id: "1", emoji: "🪨", label: "Stone" },
    position: { x: 0, y: 0 },
  },
  "2": {
    id: "",
    type: "custom",
    data: { craft_id: "2", emoji: "🌱", label: "Seed" },
    position: { x: 0, y: 0 },
  },
  "3": {
    id: "",
    type: "custom",
    data: { craft_id: "3", emoji: "💛", label: "Soul" },
    position: { x: 0, y: 0 },
  },
  "4": {
    id: "",
    type: "custom",
    data: { craft_id: "4", emoji: "🌏", label: "Earth" },
    position: { x: 0, y: 0 },
  },
  "5": {
    id: "",
    type: "custom",
    data: { craft_id: "5", emoji: "🔨", label: "Hammer" },
    position: { x: 0, y: 0 },
  },
  "6": {
    id: "",
    type: "custom",
    data: { craft_id: "6", emoji: "💩", label: "Poop" },
    position: { x: 0, y: 0 },
  },
};

//TODO local storage
const getNodeMap = (id: string): Node => {
  return nodeMap[id];
};

const recipeMap: { [key: string]: string } = {
  "1_1": "6",
  "1_2": "6",
  "1_3": "6",
  "1_4": "6",
  "1_5": "6",
  "2_2": "6",
  "2_3": "6",
  "2_4": "6",
  "2_5": "6",
  "3_3": "6",
  "3_4": "6",
  "3_5": "6",
  "4_4": "6",
  "4_5": "6",
  "5_5": "6",
};

const getRecipeId = (idA: string, idB: string): string => {
  // align a and b to be in ascending order
  if (idA > idB) {
    [idA, idB] = [idB, idA];
  }
  // get recipe map value
  return recipeMap[`${idA}_${idB}`];
};

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
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [footerNodeA, setFooterNodeA] = useState<Node | undefined>();
  const [footerNodeB, setFooterNodeB] = useState<Node | undefined>();
  const [footerInput, setFooterInput] = useState({ emoji: "", label: "" });

  //TODO local storage
  const addNodeMap = async (emoji: string, label: string) => {
    console.log("addNodeMap");
    const new_craft_id = `${craft_id++}`;
    nodeMap[new_craft_id] = {
      id: "",
      type: "custom",
      data: { craft_id: new_craft_id, emoji: emoji, label: label },
      position: { x: 0, y: 0 },
    };
    await postCraftApi(new_craft_id, emoji, label);
  };

  const postCraftApi = async (
    craft_id: string,
    emoji: string,
    label: string
  ) => {
    console.log("postCraftApi");
    console.log("craft_id", craft_id);
    const url = `/api/craft?craft_id=${craft_id}`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ craft_id, emoji, label }),
      });
      console.log(response);
    } catch (error) {
      // TODO Handle response data
      console.error("Error:", error);
    }
  };

  const updateNodeFromFooter = async () => {
    if (!footerNodeA || !footerNodeB) {
      return;
    }

    const position = {
      x: (footerNodeA.position.x + footerNodeB.position.x) / 2,
      y: (footerNodeA.position.y + footerNodeB.position.y) / 2,
    };

    const newNode: Node = {
      id: `${flow_id++}`,
      type: "custom",
      data: { emoji: footerInput.emoji, label: footerInput.label },
      position: position,
    };

    // unite footerNodeA and footerNodeB into new node
    setNodes((currentNodes) =>
      currentNodes
        .filter((n) => n.id !== footerNodeA.id && n.id !== footerNodeB.id)
        .concat(newNode)
    );

    //TODO add new recipe to KV
    await addNodeMap(footerInput.emoji, footerInput.label);
    setIsFooterVisible(false);
    setFooterNodeA(undefined);
    setFooterNodeB(undefined);
  };

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

      const baseNode = getNodeMap(id);
      if (!baseNode) {
        // Handle case where node is not found in nodeMap
        // message.warning("Node type not found!"); //TODO
        return;
      }

      const newNode: Node = {
        ...baseNode,
        id: `${flow_id++}`,
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
      // get new craft_id by getRecipeId
      const newCraftId = getRecipeId(
        node.data.craft_id,
        overlappingNode.data.craft_id
      );

      // recipe exists
      if (newCraftId) {
        console.log("recipe exists");
        const _newNode = getNodeMap(newCraftId);
        if (!_newNode) {
          // Handle case where node is not found in nodeMap
          // message.warning("Node type not found!"); //TODO
          return;
        }

        const newNode: Node = {
          ..._newNode,
          id: `${flow_id++}`,
          position: {
            x: (node.position.x + overlappingNode.position.x) / 2,
            y: (node.position.y + overlappingNode.position.y) / 2,
          },
        };

        // Remove the original nodes and add the new node
        setNodes((currentNodes) =>
          currentNodes
            .filter((n) => n.id !== node.id && n.id !== overlappingNode.id)
            .concat(newNode)
        );

        //mint new recipe by footer
      } else {
        console.log("recipe not exists");
        setIsFooterVisible(true);
        setFooterNodeA(node);
        setFooterNodeB(overlappingNode);
      }
    }
  };

  const reactFlowWrapper = useRef<any>(null);

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-grow h-full w-full" ref={reactFlowWrapper}>
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
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {isFooterVisible && (
        <Footer
          nodeA={footerNodeA}
          nodeB={footerNodeB}
          footerInput={footerInput}
          setFooterInput={setFooterInput}
          updateNodeFromFooter={updateNodeFromFooter}
        />
      )}
    </div>
  );
}

export default Flow;
