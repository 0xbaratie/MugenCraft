import { NodeModel } from '../models/NodeModel';
import { NodeCategoryType } from './NodeCategories';
// import NodeType from '../types/NodeType';

export enum NodeType {
  PythonRunner = 'python-runner',
  NodeJsRunner = 'nodejs-runner',
  DataMapper = 'data-mapper',
  Analyzer = 'analyzer',
  Graph = 'graph',
}

const Nodes: { [key in NodeType]: NodeModel } = {
  [NodeType.PythonRunner]: {
    label: '🍎 Apple',
    category: NodeCategoryType.CodeRunner,
    key: NodeType.PythonRunner,
  },
  [NodeType.NodeJsRunner]: {
    label: '🍍 Pineapple',
    category: NodeCategoryType.CodeRunner,
    key: NodeType.NodeJsRunner,
  },
  [NodeType.DataMapper]: {
    label: '🍇 Grape',
    category: NodeCategoryType.Mapper,
    key: NodeType.DataMapper,
  },
  [NodeType.Analyzer]: {
    label: '🍊 Orange',
    category: NodeCategoryType.Special,
    key: NodeType.Analyzer,
  },
  [NodeType.Graph]: {
    label: '🍌 Banana',
    category: NodeCategoryType.Standard,
    key: NodeType.Graph,
  },
};

export default Nodes;
