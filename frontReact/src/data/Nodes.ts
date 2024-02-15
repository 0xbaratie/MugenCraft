import { NodeTypes } from 'react-flow-renderer';
import StandardNode from '../views/Nodes/StandardNode';

export interface NodeModel {
  emoji: string;
  label: string;
  key: string;
}

const Nodes: { [key: string]: NodeModel } = {};

const nodeTypes: NodeTypes = {};

// TODO: Will be fixed format
function addNodeType(key: string, component: any = StandardNode): void {
  nodeTypes[key] = component as any;
}

function addNode(key: string, emoji: string, label: string): void {
  Nodes[key] = { key, emoji, label };
  addNodeType(key, StandardNode);
}

// TODO: Need to leave due to library loading issues
addNode('stone', '🪨', 'Stone');
addNode('seed', '🌱', 'Seed');
addNode('soul', '💛', 'Soul');
addNode('earth', '🌏', 'Earth');
addNode('hammer', '🔨', 'Hammer');

// TODO: For Demo preset
addNode('mud', '💩', 'Mud');
addNode('tree', '🌲', 'Tree');
addNode('appletree', '🍎', 'Appletree');
addNode('potato', '🥔', 'Potato');
addNode('dog', '🐶', 'Dog');

export { Nodes, nodeTypes, addNodeType, addNode };
