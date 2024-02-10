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

export { Nodes, nodeTypes, addNodeType, addNode };
