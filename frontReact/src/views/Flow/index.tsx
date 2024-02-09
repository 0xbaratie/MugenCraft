import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Controls, Background, Node, Connection } from 'react-flow-renderer';
import 'reactflow/dist/style.css';
import './Flow.scss';
import { generateNodeId } from '../../utils/helper';
import NodeTypes from './NodeTypes';
import { NodeModel } from '../../data/Nodes';
import { Nodes } from '../../data/Nodes';
import { message } from 'antd';

const Flow = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow') as any; //TODO: Fixed format

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
    const overlappingNode = nodes.find(
      (node) =>
        node.id !== draggedNode.id &&
        Math.abs(node.position.x - draggedNode.position.x) < 30 &&
        Math.abs(node.position.y - draggedNode.position.y) < 30,
    );

    if (overlappingNode) {
      message.warning({ content: 'Nodes are overlapping!', key: 'overlapWarning' });

      const updatedNodes = nodes.filter((node) => node.id !== draggedNode.id);

      setNodes(
        updatedNodes.map((node) => {
          if (node.id === overlappingNode.id) {
            return { ...node, data: { ...node.data, label: 'Mud', emoji: '💩' } };
          }
          return node;
        }),
      );
    }
  };

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodeTypes={NodeTypes}
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
    </div>
  );
};

export default Flow;
