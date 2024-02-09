import { NodeTypes } from 'react-flow-renderer';
import StandardNode from '../views/Flow/NodeTypes';

export interface NodeModel {
  emoji: string;
  label: string;
  key: string;
}

const Nodes: { [key: string]: NodeModel } = {};

const nodeTypes: NodeTypes = {};

function addNode(key: string, emoji: string, label: string): void {
  Nodes[key] = { key, emoji, label };
  nodeTypes[key] = StandardNode as any;
}

function getNode(key: string): NodeModel | undefined {
  return Nodes[key];
}

// TODO: Initial objects
addNode('apple', '🍎', 'Apple');
addNode('pineapple', '🍍', 'Pineapple');
addNode('grape', '🍇', 'Grape');
addNode('orange', '🍊', 'Orange');
addNode('banana', '🍌', 'Banana');

export { Nodes, addNode, getNode };
