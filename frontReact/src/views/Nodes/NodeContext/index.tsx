import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { NodeModel } from '../../../data/Nodes';

interface NodeContextType {
  nodes: { [key: string]: NodeModel };
  addNode: (key: string, emoji: string, label: string) => void;
}

const NodeContext = createContext<NodeContextType | undefined>(undefined);

interface NodeProviderProps {
  children: ReactNode;
}

export const NodeProvider: React.FC<NodeProviderProps> = ({ children }) => {
  const [nodes, setNodes] = useState<{ [key: string]: NodeModel }>({});

  const addNode = (key: string, emoji: string, label: string) => {
    const newNode: NodeModel = { key, emoji, label };
    setNodes((prevNodes) => ({
      ...prevNodes,
      [key]: newNode,
    }));
  };

  // TODO: Add initial node
  useEffect(() => {
    addNode('apple', '🍎', 'Apple');
    addNode('pineapple', '🍍', 'Pineapple');
    addNode('grape', '🍇', 'Grape');
    addNode('orange', '🍊', 'Orange');
    addNode('banana', '🍌', 'Banana');
  }, []);

  useEffect(() => {
    console.log('@@@Nodes:', nodes);
  }, [nodes]);

  return <NodeContext.Provider value={{ nodes, addNode }}>{children}</NodeContext.Provider>;
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
  return context.addNode;
};
