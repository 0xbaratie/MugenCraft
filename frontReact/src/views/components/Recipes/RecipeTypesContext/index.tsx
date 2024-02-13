import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { NodeModel } from '../../../../data/Recipes';
import { NodeProps } from 'react-flow-renderer';
import RecipeNode from '../RecipeNode';

export type NodeTypeComponent = React.ComponentType<NodeProps<NodeModel>>;

interface RecipeTypesContextType {
  nodeTypes: { [key: string]: NodeTypeComponent };
  addRecipeType: (key: string, component: NodeTypeComponent) => void;
  addRecipeTypeIfNeeded: (key: string, component?: NodeTypeComponent) => void;
}

const RecipeTypesContext = createContext<RecipeTypesContextType | undefined>(undefined);

interface RecipeTypesProviderProps {
  children: ReactNode;
}

export const RecipeTypesProvider: FC<RecipeTypesProviderProps> = ({ children }) => {
  const [nodeTypes, setNodeTypes] = useState<{ [key: string]: NodeTypeComponent }>({});

  const addRecipeType = (key: string, component: NodeTypeComponent = RecipeNode) => {
    setNodeTypes((prevNodeTypes) => ({
      ...prevNodeTypes,
      [key]: component,
    }));
  };

  const addRecipeTypeIfNeeded = (key: string, component: NodeTypeComponent = RecipeNode) => {
    setNodeTypes((prevNodeTypes) => {
      if (!prevNodeTypes[key]) {
        return { ...prevNodeTypes, [key]: component };
      }
      return prevNodeTypes;
    });
  };

  return <RecipeTypesContext.Provider value={{ nodeTypes, addRecipeType, addRecipeTypeIfNeeded }}>{children}</RecipeTypesContext.Provider>;
};

export const useNodeTypes = (): RecipeTypesContextType => {
  const context = useContext(RecipeTypesContext);
  if (context === undefined) {
    throw new Error('useNodeTypes must be used within a RecipeTypesProvider');
  }
  return context;
};
