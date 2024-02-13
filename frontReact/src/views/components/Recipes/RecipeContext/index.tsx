import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { NodeModel, addRecipe } from '../../../../data/Recipes';
import { useNodeTypes, NodeTypeComponent } from '../RecipeTypesContext';
import RecipeNode from '../RecipeNode';
import { Recipes } from '../../../../data/Recipes';
interface RecipeContextType {
  nodes: { [key: string]: NodeModel };
  addRecipeView: (key: string, emoji: string, label: string) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface NodeProviderProps {
  children: ReactNode;
}

export const NodeProvider: React.FC<NodeProviderProps> = ({ children }) => {
  const [nodes, setRecipes] = useState<{ [key: string]: NodeModel }>({});
  const { addRecipeTypeIfNeeded } = useNodeTypes();
  const initialNodeData = Object.values(Recipes).filter((node) => node.initData);
  useEffect(() => {
    const storedRecipes = localStorage.getItem('nodes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    } else {
      initialNodeData.forEach((node) => {
        addRecipe(node.key, node.emoji, node.label, false);
        addRecipeView(node.key, node.emoji, node.label);
        addRecipeTypeIfNeeded(node.key, RecipeNode);
      });
    }
  }, [addRecipeTypeIfNeeded]);

  const addRecipeView = (key: string, emoji: string, label: string): void => {
    const isNewNode = !nodes[key];
    const newDiscoverSound = new Audio('/se/new-discover.mp3');

    const newNode: NodeModel = { key, emoji, label, initData: false };
    addRecipe(key, emoji, label, false);
    setRecipes((prevRecipes) => {
      const updatedRecipes = { ...prevRecipes, [key]: newNode };
      localStorage.setItem('nodes', JSON.stringify(updatedRecipes));
      // Play SE for new nodes
      if (isNewNode) {
        newDiscoverSound.play().catch((error) => console.error('Audio play failed:', error));
      }

      return updatedRecipes;
    });
  };

  return <RecipeContext.Provider value={{ nodes, addRecipeView }}>{children}</RecipeContext.Provider>;
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipeContext must be used within a NodeProvider');
  }
  return context;
};

export const useAddNode = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useAddNode must be used within a NodeProvider');
  }
  return context.addRecipeView;
};
