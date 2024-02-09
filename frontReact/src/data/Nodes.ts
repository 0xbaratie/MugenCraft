import { NodeModel } from '../models/NodeModel';
import { NodeCategoryType } from './NodeCategories';
// import NodeType from '../types/NodeType';

export enum NodeType {
  Apple = 'apple',
  Pineapple = 'pineapple',
  Grape = 'grape ',
  Orange = 'orange',
  Banana = 'banana',
}

const Nodes: { [key in NodeType]: NodeModel } = {
  [NodeType.Apple]: {
    emoji: '🍎',
    label: 'Apple',
    category: NodeCategoryType.CodeRunner,
    key: NodeType.Apple,
  },
  [NodeType.Pineapple]: {
    emoji: '🍍',
    label: 'Pineapple',
    category: NodeCategoryType.CodeRunner,
    key: NodeType.Pineapple,
  },
  [NodeType.Grape]: {
    emoji: '🍇',
    label: 'Grape',
    category: NodeCategoryType.Mapper,
    key: NodeType.Grape,
  },
  [NodeType.Orange]: {
    emoji: '🍊',
    label: 'Orange',
    category: NodeCategoryType.Special,
    key: NodeType.Orange,
  },
  [NodeType.Banana]: {
    emoji: '🍌',
    label: 'Banana',
    category: NodeCategoryType.Standard,
    key: NodeType.Banana,
  },
};

export default Nodes;
