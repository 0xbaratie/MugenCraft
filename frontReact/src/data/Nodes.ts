import { NodeTypes } from 'react-flow-renderer';
import StandardNode from '../views/Nodes/StandardNode';

export interface NodeModel {
  emoji: string;
  label: string;
  key: string;
  initData: boolean;
}

const Nodes: { [key: string]: NodeModel } = {};

const nodeTypes: NodeTypes = {};

// TODO: Will be fixed format
function addNodeType(key: string, component: any = StandardNode): void {
  nodeTypes[key] = component as any;
}

function addNode(key: string, emoji: string, label: string, initData: boolean): void {
  Nodes[key] = { key, emoji, label, initData };
  addNodeType(key, StandardNode);
}

// TODO: Need to leave due to library loading issues
addNode('apple', '🍎', 'Apple', true);
addNode('pineapple', '🍍', 'Pineapple', true);
addNode('grape', '🍇', 'Grape', true);
addNode('orange', '🍊', 'Orange', true);
addNode('banana', '🍌', 'Banana', true);

export { Nodes, nodeTypes, addNodeType, addNode };
