import { NodeModel } from '../models/NodeModel';

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
    key: NodeType.Apple,
  },
  [NodeType.Pineapple]: {
    emoji: '🍍',
    label: 'Pineapple',
    key: NodeType.Pineapple,
  },
  [NodeType.Grape]: {
    emoji: '🍇',
    label: 'Grape',
    key: NodeType.Grape,
  },
  [NodeType.Orange]: {
    emoji: '🍊',
    label: 'Orange',
    key: NodeType.Orange,
  },
  [NodeType.Banana]: {
    emoji: '🍌',
    label: 'Banana',
    key: NodeType.Banana,
  },
};

export default Nodes;
