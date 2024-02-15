import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Controls, Background, Node, Connection } from 'react-flow-renderer';
import 'reactflow/dist/style.css';
import './Flow.scss';
import { generateNodeId } from '../../utils/helper';
import { NodeModel, nodeTypes } from '../../data/Nodes';
import { Nodes } from '../../data/Nodes';
import { useAddNode } from '../../views/Nodes/NodeContext';
import { message } from 'antd';

interface OverlappingNodesInfo {
  node1: { label: string | null; emoji: string | null };
  node2: { label: string | null; emoji: string | null };
}

const Flow = () => {
  const addNode = useAddNode();
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [footerInput, setFooterInput] = useState({ label: '', emoji: '' });
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);
  const [overlappingNodesInfo, setOverlappingNodesInfo] = useState<OverlappingNodesInfo>({
    node1: { label: null, emoji: null },
    node2: { label: null, emoji: null },
  });

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow') as any;

      if (typeof type === 'undefined' || !type) {
        message.warning('Node type not found!');
        return;
      }

      const nodeData = Nodes[type];
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node<NodeModel> = {
        id: generateNodeId(),
        type,
        position,
        data: nodeData,
      };

      setNodes((currentNodes) => {
        const updatedNodes = currentNodes.concat(newNode);
        return updatedNodes;
      });
    },
    [reactFlowInstance],
  );

  const onNodeDragStop = (event: React.MouseEvent, draggedNode: Node<NodeModel>) => {
    // Detect whether it is covered here
    const overlappingNode = nodes.find(
      (node) =>
        node.id !== draggedNode.id &&
        Math.abs(node.position.x - draggedNode.position.x) < 30 &&
        Math.abs(node.position.y - draggedNode.position.y) < 30,
    );

    if (overlappingNode) {
      message.warning({ content: 'Nodes are overlapping!', key: 'overlapWarning' });
      const updatedNodes = nodes.filter((node) => node.id !== draggedNode.id);
      setIsFooterVisible(true);
      setOverlappingNodesInfo({
        node1: { label: draggedNode.data.label, emoji: draggedNode.data.emoji },
        node2: { label: overlappingNode.data.label, emoji: overlappingNode.data.emoji },
      });
      // setNodes(
      //   updatedNodes.map((node) => {
      //     if (node.id === overlappingNode.id) {
      //       // TODO: Change dynamically
      //       const updatedNodeData = { ...node.data, key: 'mud', label: 'Mud', emoji: '💩' };
      //       addNode(updatedNodeData.key, updatedNodeData.emoji, updatedNodeData.label);
      //       return { ...node, data: updatedNodeData };
      //     }
      //     return node;
      //   }),
      // );
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFooterInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const updateNodeFromFooter = () => {
    const { label, emoji } = footerInput;
    if (label && emoji) {
      setIsFooterVisible(false);
    }
  };

  useEffect(() => {
    // Function to check if the overlap has been resolved between Recipe
    const checkOverlaps = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.abs(nodes[i].position.x - nodes[j].position.x) < 30 && Math.abs(nodes[i].position.y - nodes[j].position.y) < 30) {
            return true;
          }
        }
      }
      return false;
    };
    if (!checkOverlaps()) {
      setIsFooterVisible(false);
    }
  }, [nodes]);

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        style={{ height: isFooterVisible ? 'calc(100% - 40px)' : '100%' }}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDragStop={onNodeDragStop}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
      {isFooterVisible && (
        <div className="fixed bottom-0 bg-white shadow-md p-4 flex justify-between items-center z-100">
          <div>
            {overlappingNodesInfo.node1.label && overlappingNodesInfo.node2.label
              ? `${overlappingNodesInfo.node1.emoji}${overlappingNodesInfo.node1.label} + ${overlappingNodesInfo.node2.emoji}${overlappingNodesInfo.node2.label} = `
              : ''}
          </div>
          <input
            type="text"
            name="emoji"
            placeholder="🌏"
            value={footerInput.emoji}
            onChange={handleInputChange}
            onMouseDown={(e) => e.stopPropagation()}
            className="border border-gray-300 rounded-md p-2 m-1 w-16"
          />
          <input
            type="text"
            name="label"
            placeholder="Label"
            value={footerInput.label}
            onChange={handleInputChange}
            onMouseDown={(e) => e.stopPropagation()}
            className="border border-gray-300 rounded-md p-2 m-1 flex-1"
          />
          <button onClick={updateNodeFromFooter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">
            Define
          </button>
        </div>
      )}
    </div>
  );
};
export default Flow;
