import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { NodeModel } from '../../../data/Nodes';
import { NodeProps } from 'react-flow-renderer';
import StandardNode from '../StandardNode';

export type NodeTypeComponent = React.ComponentType<NodeProps<NodeModel>>;

interface NodeTypesContextType {
  nodeTypes: { [key: string]: NodeTypeComponent };
  addNodeType: (key: string, component: NodeTypeComponent) => void;
  addNodeTypeIfNeeded: (key: string, component?: NodeTypeComponent) => void;
}

const NodeTypesContext = createContext<NodeTypesContextType | undefined>(undefined);

interface NodeTypesProviderProps {
  children: ReactNode;
}

export const NodeTypesProvider: FC<NodeTypesProviderProps> = ({ children }) => {
  const [nodeTypes, setNodeTypes] = useState<{ [key: string]: NodeTypeComponent }>({});

  const addNodeType = (key: string, component: NodeTypeComponent = StandardNode) => {
    setNodeTypes((prevNodeTypes) => ({
      ...prevNodeTypes,
      [key]: component,
    }));
  };

  const addNodeTypeIfNeeded = (key: string, component: NodeTypeComponent = StandardNode) => {
    setNodeTypes((prevNodeTypes) => {
      if (!prevNodeTypes[key]) {
        return { ...prevNodeTypes, [key]: component };
      }
      return prevNodeTypes;
    });
  };

  return <NodeTypesContext.Provider value={{ nodeTypes, addNodeType, addNodeTypeIfNeeded }}>{children}</NodeTypesContext.Provider>;
};

export const useNodeTypes = (): NodeTypesContextType => {
  const context = useContext(NodeTypesContext);
  if (context === undefined) {
    throw new Error('useNodeTypes must be used within a NodeTypesProvider');
  }
  return context;
};
