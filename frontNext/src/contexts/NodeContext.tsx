import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Node } from 'reactflow';

interface NodeContextType {
  nodes: Node[];
  addNode: (node: Node) => void;
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { emoji: "🪨", label: "Stone" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    type: "custom",
    data: { emoji: "🌱", label: "Seed" },
    position: { x: 350, y: 5 },
  },
  {
    id: "3",
    type: "custom",
    data: { emoji: "💛", label: "Soul" },
    position: { x: 450, y: 5 },
  },
  {
    id: "4",
    type: "custom",
    data: { emoji: "🌏", label: "Earth" },
    position: { x: 550, y: 5 },
  },
  {
    id: "5",
    type: "custom",
    data: { emoji: "🔨", label: "Hammer" },
    position: { x: 650, y: 5 },
  },
];

const NodeContext = createContext<NodeContextType | undefined>(undefined);

export const useNodeContext = (): NodeContextType => {
  const context = useContext(NodeContext);
  if (context === undefined) {
    throw new Error('useNodeContext must be used within a NodeProvider');
  }
  return context;
};

interface NodeProviderProps {
  children: ReactNode;
}

export const NodeProvider: React.FC<NodeProviderProps> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const addNode = (node: Node) => {
    const exists = nodes.some(existingNode => existingNode.data.craft_id === node.data.craft_id);
    if (!exists) {
      setNodes((prevNodes) => [...prevNodes, node]);
    }
  };

  return (
    <NodeContext.Provider value={{ nodes, addNode }}>
      {children}
    </NodeContext.Provider>
  );
};
