import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Controls, Background, Node, Connection } from 'react-flow-renderer';
import 'reactflow/dist/style.css';
import './Flow.scss';
import { generateNodeId } from '../../utils/helper';
import { NodeModel } from '../../data/Recipes';
import { Recipes } from '../../data/Recipes';
import { useAddNode } from '../components/Recipes/RecipeContext';
import { useNodeTypes } from '../components/Recipes/RecipeTypesContext';
import { message } from 'antd';

const Flow = () => {
  const addRecipe = useAddNode();
  const { nodeTypes } = useNodeTypes();
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setRecipes, onRecipesChange] = useNodesState([]);
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
      const type = event.dataTransfer.getData('application/reactflow') as any;

      if (typeof type === 'undefined' || !type) {
        message.warning('Node type not found!');
        return;
      }

      const nodeData = Recipes[type];
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

      setRecipes((currentRecipes) => {
        const updatedRecipes = currentRecipes.concat(newNode);
        return updatedRecipes;
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
      message.warning({ content: 'Recipes are overlapping!', key: 'overlapWarning' });

      const updatedRecipes = nodes.filter((node) => node.id !== draggedNode.id);

      setRecipes(
        updatedRecipes.map((node) => {
          if (node.id === overlappingNode.id) {
            // TODO: Change dynamically
            const updatedNodeData = { ...node.data, key: 'mud', label: 'Mud', emoji: '💩' };
            addRecipe(updatedNodeData.key, updatedNodeData.emoji, updatedNodeData.label);
            return { ...node, data: updatedNodeData };
          }
          return node;
        }),
      );
    }
  };

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onRecipesChange}
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
