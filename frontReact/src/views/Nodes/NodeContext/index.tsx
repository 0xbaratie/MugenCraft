import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Nodes, NodeModel, addNode } from '../../../data/Nodes';

interface NodeContextType {
  nodes: { [key: string]: NodeModel };
  addNodeView: (key: string, emoji: string, label: string) => void;
}

const NodeContext = createContext<NodeContextType | undefined>(undefined);

interface NodeProviderProps {
  children: ReactNode;
}

interface NodeData {
  key: string;
  emoji: string;
  label: string;
}

const nodeInitData: NodeData[] = [
  { key: 'apple', emoji: '🍎', label: 'Apple' },
  { key: 'pineapple', emoji: '🍍', label: 'Pineapple' },
  { key: 'grape', emoji: '🍇', label: 'Grape' },
  { key: 'orange', emoji: '🍊', label: 'Orange' },
  { key: 'banana', emoji: '🍌', label: 'Banana' },
];

export const NodeProvider: React.FC<NodeProviderProps> = ({ children }) => {
  const [nodes, setNodes] = useState<{ [key: string]: NodeModel }>({});

  const addNodeView = (key: string, emoji: string, label: string): void => {
    const newNode: NodeModel = { key, emoji, label };
    addNode(key, emoji, label);
    setNodes((prevNodes) => {
      const updatedNodes = { ...prevNodes, [key]: newNode };
      return updatedNodes;
    });
  };

  // TODO: Add initial node
  useEffect(() => {
    nodeInitData.forEach((node) => {
      addNodeView(node.key, node.emoji, node.label);
    });
  }, []);

  useEffect(() => {
    console.log('@@@Nodes:', nodes);
  }, [nodes]);

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
