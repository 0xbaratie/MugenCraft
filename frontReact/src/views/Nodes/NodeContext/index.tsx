import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { NodeModel, addNode } from '../../../data/Nodes';
import { useNodeTypes, NodeTypeComponent } from '../NodeTypesContext';
import StandardNode from '../StandardNode';
import { Nodes } from '../../../data/Nodes';
interface NodeContextType {
  nodes: { [key: string]: NodeModel };
  addNodeView: (key: string, emoji: string, label: string) => void;
}

const NodeContext = createContext<NodeContextType | undefined>(undefined);

interface NodeProviderProps {
  children: ReactNode;
}

export const NodeProvider: React.FC<NodeProviderProps> = ({ children }) => {
  const [nodes, setNodes] = useState<{ [key: string]: NodeModel }>({});
  const { addNodeTypeIfNeeded } = useNodeTypes();
  const initialNodeData = Object.values(Nodes).filter((node) => node.initData);
  useEffect(() => {
    const storedNodes = localStorage.getItem('nodes');
    if (storedNodes) {
      setNodes(JSON.parse(storedNodes));
    } else {
      initialNodeData.forEach((node) => {
        addNode(node.key, node.emoji, node.label, false);
        addNodeView(node.key, node.emoji, node.label);
        addNodeTypeIfNeeded(node.key, StandardNode);
      });
    }
  }, [addNodeTypeIfNeeded]);

  const addNodeView = (key: string, emoji: string, label: string): void => {
    const isNewNode = !nodes[key];
    const newDiscoverSound = new Audio('/se/new-discover.mp3');

    const newNode: NodeModel = { key, emoji, label, initData: false };
    addNode(key, emoji, label, false);
    setNodes((prevNodes) => {
      const updatedNodes = { ...prevNodes, [key]: newNode };
      localStorage.setItem('nodes', JSON.stringify(updatedNodes));
      // Play SE for new nodes
      if (isNewNode) {
        newDiscoverSound.play().catch((error) => console.error('Audio play failed:', error));
      }

      return updatedNodes;
    });
  };

  return <NodeContext.Provider value={{ nodes, addNodeView }}>{children}</NodeContext.Provider>;
};

export const useNodeContext = () => {
  const context = useContext(NodeContext);
  if (context === undefined) {
    throw new Error('useNodeContext must be used within a NodeProvider');
  }
  return context;
};

export const useAddNode = () => {
  const context = useContext(NodeContext);
  if (context === undefined) {
    throw new Error('useAddNode must be used within a NodeProvider');
  }
  return context.addNodeView;
};
