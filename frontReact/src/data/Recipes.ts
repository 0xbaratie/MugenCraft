import { NodeTypes } from 'react-flow-renderer';
import RecipeNode from '../views/components/Recipes/RecipeNode';

export interface NodeModel {
  emoji: string;
  label: string;
  key: string;
  initData: boolean;
}

const Recipes: { [key: string]: NodeModel } = {};

const nodeTypes: NodeTypes = {};

// TODO: Will be fixed format
function addRecipeType(key: string, component: any = RecipeNode): void {
  nodeTypes[key] = component as any;
}

function addRecipe(key: string, emoji: string, label: string, initData: boolean): void {
  Recipes[key] = { key, emoji, label, initData };
  addRecipeType(key, RecipeNode);
}

// TODO: Need to leave due to library loading issues
addRecipe('apple', '🍎', 'Apple', true);
addRecipe('pineapple', '🍍', 'Pineapple', true);
addRecipe('grape', '🍇', 'Grape', true);
addRecipe('orange', '🍊', 'Orange', true);
addRecipe('banana', '🍌', 'Banana', true);

export { Recipes, nodeTypes, addRecipeType, addRecipe };
