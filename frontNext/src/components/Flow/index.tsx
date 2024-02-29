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
import FooterDefine from "components/Footer/FooterDefine";
import FooterMint from "components/Footer/FooterMint";
import Sidebar from "components/Sidebar";
import CustomNode from "./CustomNode";
import {
  orderIds,
  getCraftApi,
  postCraftApi,
  getRecipeApi,
  postRecipeApi,
} from "utils/utils";
import {
  defaultSideNodes,
  defaultNodeMap,
  defaultRecipeMap,
} from "utils/defaultObject";
import { useWriteContract } from "wagmi";
import { MugenRecipeAbi } from "constants/abis";
import { addresses } from "constants/addresses";
import { toast } from "sonner"

let fusionSound: any = null;
if (typeof window !== "undefined") {
  fusionSound = new Audio("/se/new-discover.mp3");
}

let flow_id = 1;
let nodeMap: { [key: string]: Node } = defaultNodeMap;
const recipeMap: { [key: string]: string } = defaultRecipeMap;

const Flow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
  ]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isFooterDefineVisible, setIsFooterDefineVisible] = useState(true);
  const [isFooterMintVisible, setIsFooterMintVisible] = useState(false);
  const [footerNodeA, setFooterNodeA] = useState<Node | undefined>();
  const [footerNodeB, setFooterNodeB] = useState<Node | undefined>();
  const [footerInput, setFooterInput] = useState({ emoji: "", label: "" });
  const [sideNodes, setSideNodes] = useState<Node[]>(defaultSideNodes);
  const [remainSum, setRemainSum] = useState(0);
  const [minted, setMinted] = useState(false);
  const { data, writeContract } = useWriteContract();

  const addSideNode = (node: Node) => {
    //if already exists, don't add
    if (sideNodes.find((n) => n.data.craft_id === node.data.craft_id)) {
      return;
    }
    setSideNodes((currentNodes) => currentNodes.concat(node));
  };

  const getMaxCraftId = async (): Promise<number> => {
    const res = await fetch("/api/keys");
    const data = await res.json();
    //TODO
    const initialNodeCount = 600;
    return data.length + initialNodeCount;
  };

  //recipe
  const getRecipeMap = (idA: string, idB: string): string => {
    // align a and b to be in ascending order
    [idA, idB] = orderIds(idA, idB);
    return recipeMap[`${idA}_${idB}`];
  };

  const getRecipeMapByApi = async (
    idA: string,
    idB: string
  ): Promise<string> => {
    [idA, idB] = orderIds(idA, idB);
    const res = await getRecipeApi(`${idA}_${idB}`);
    if (!res) {
      return "";
    }
    return res.craft_id;
  };

  //craft
  const getNodeMap = (id: string): Node => {
    return nodeMap[id];
  };

  const getNodeMapByApi = async (id: string): Promise<Node> => {
    const res = await getCraftApi(id);
    return {
      id: "",
      type: "custom",
      data: { craft_id: res.craft_id, emoji: res.emoji, label: res.label },
      position: { x: 0, y: 0 },
    };
  };

  const addNodeMap = async (craft_id: string, emoji: string, label: string) => {
    nodeMap[craft_id] = {
      id: "",
      type: "custom",
      data: { craft_id: craft_id, emoji: emoji, label: label },
      position: { x: 0, y: 0 },
    };
    await postCraftApi(craft_id, footerInput.emoji, footerInput.label);
  };

  //footer function
  const updateNodeFromFooter = async () => {
    if (!footerNodeA || !footerNodeB) {
      return;
    }

    const position = {
      x: (footerNodeA.position.x + footerNodeB.position.x) / 2,
      y: (footerNodeA.position.y + footerNodeB.position.y) / 2,
    };

    const new_craft_id = (await getMaxCraftId()) + 1 + "";
    console.log("new_craft_id", new_craft_id);
    const [craft_idA, craft_idB] = orderIds(
      footerNodeA.data.craft_id,
      footerNodeB.data.craft_id
    );

    // add Contract
    writeContract(
      {
        address: addresses.MugenRecipe as `0x${string}`,
        abi: MugenRecipeAbi,
        functionName: "setRecipe",
        args: [
          BigInt(new_craft_id),
          footerInput.label,
          `${footerInput.emoji} ${footerInput.label}`,
          BigInt(craft_idA),
          BigInt(craft_idB),
        ],
      },
      {
        onSuccess(data, variables, context) {
          // add KV and local storage
          addNodeMap(new_craft_id, footerInput.emoji, footerInput.label);
          recipeMap[`${craft_idA}_${craft_idB}`] = new_craft_id; //add recipeMap
          postRecipeApi(`${craft_idA}_${craft_idB}`, new_craft_id);

          const newNode: Node = {
            id: `${flow_id++}`,
            type: "custom",
            data: {
              craft_id: new_craft_id,
              emoji: footerInput.emoji,
              label: footerInput.label,
            },
            position: position,
          };

          // unite footerNodeA and footerNodeB into new node
          setNodes((currentNodes) =>
            currentNodes
              .filter((n) => n.id !== footerNodeA.id && n.id !== footerNodeB.id)
              .concat(newNode)
          );

          addSideNode({
            ...newNode,
            id: "",
            position: { x: 0, y: 0 },
          });

          toast("New recipe has been defined!", {
            action: {
              label: "Share on X",
              onClick: () => {
                const shareText = encodeURIComponent(`I defined a new recipe for Mugen Craft.\nThe recipe count reached ${new_craft_id}. @0xBaratie @nealagarwal @PacmanBlur\nhttps://mugencraft.vercel.app/`);
                const hashtags = encodeURIComponent("mugencraft,blast");
                const related = encodeURIComponent("twitterapi,twitter");
                const url = `https://twitter.com/intent/tweet?text=${shareText}&hashtags=${hashtags}&related=${related}`;
                const newWindow = window.open(url, '_blank');
                newWindow?.focus();
              },
            },
          });

          setIsFooterDefineVisible(false);
          setIsFooterMintVisible(true);
          setFooterNodeA(newNode);
          setFooterNodeB(undefined);
          fusionSound
            .play()
            .catch((err: Error) => console.error("Audio play failed:", err));
        },
      }
    );
  };

  //flow functions
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const id = event.dataTransfer.getData("application/reactflow");

      if (typeof id === "undefined" || !id) {
        // TODO message.warning("Node type not found!");
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const baseNode = getNodeMap(id);
      if (!baseNode) {
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

  const nodesOverlap = (nodeA: Node, nodeB: Node): boolean => {
    const buffer = 50; // A buffer to account for node size; adjust as needed
    return (
      Math.abs(nodeA.position.x - nodeB.position.x) < buffer &&
      Math.abs(nodeA.position.y - nodeB.position.y) < buffer
    );
  };

  const checkNodesOverlap = (nodes: Node[]) => {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodesOverlap(nodes[i], nodes[j])) {
          return false;
        }
      }
    }
    return true;
  };

  const onNodeDrag = async (event: React.MouseEvent, node: Node) => {
    setIsFooterDefineVisible(false);
    setIsFooterMintVisible(false);
    // TODO: Get the number of mints already minted or remaining
    setRemainSum(1);
    // TODO: Determine if the user has minted (only after Wallet connection)
    setMinted(false);
  };

  const onNodeDragStop = async (event: React.MouseEvent, node: Node) => {
    // Find if the dragged node overlaps with any other node
    const overlappingNode = nodes.find(
      (n) => n.id !== node.id && nodesOverlap(n, node)
    );

    if (checkNodesOverlap(nodes)) {
      setIsFooterDefineVisible(false);
    }

    if (overlappingNode) {
      // get new craft_id by getRecipeId
      let newCraftId = getRecipeMap(
        node.data.craft_id,
        overlappingNode.data.craft_id
      );
      // console.log("newCraftId by getRecipeMap", newCraftId);
      if (!newCraftId) {
        newCraftId = await getRecipeMapByApi(
          node.data.craft_id,
          overlappingNode.data.craft_id
        );
        // console.log("newCraftId by getRecipeMapByApi", newCraftId);
      }
      // console.log("newCraftId", newCraftId);

      // recipe exists
      if (newCraftId) {
        // if node exists in local storage
        let _newNode = getNodeMap(newCraftId);
        if (!_newNode) {
          _newNode = await getNodeMapByApi(newCraftId);
        }
        if (!_newNode) {
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

        addSideNode({
          ..._newNode,
          id: "",
          position: { x: 0, y: 0 },
        });

        setIsFooterDefineVisible(false);
        setIsFooterMintVisible(true);
        setFooterNodeA(_newNode);
        fusionSound
          .play()
          .catch((err: Error) => console.error("Audio play failed:", err));

        //mint new recipe by footer
      } else {
        console.log("recipe not exists");
        setIsFooterMintVisible(false);
        setIsFooterDefineVisible(true);
        setFooterNodeA(node);
        setFooterNodeB(overlappingNode);
      }
    }
  };

  //flow settings
  const reactFlowWrapper = useRef<any>(null);
  const nodeTypes = {
    custom: CustomNode,
  };
  const defaultEdgeOptions = {
    animated: true,
    type: "smoothstep",
  };
 
  return (
    <div className="flex flex-row flex-grow">
      <div className="flex flex-col h-screen w-full">
        <div className="flex-grow h-full w-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            onNodeDragStart={onNodeDrag}
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
        {isFooterDefineVisible && (
          <FooterDefine
            nodeA={footerNodeA}
            nodeB={footerNodeB}
            footerInput={footerInput}
            setFooterInput={setFooterInput}
            updateNodeFromFooter={updateNodeFromFooter}
          />
        )}
        {isFooterMintVisible && (
          <FooterMint
            node={footerNodeA}
            remainSum={remainSum}
            minted={minted}
          />
        )}
      </div>
      <Sidebar sideNodes={sideNodes} />
    </div>
  );
};

export default Flow;
