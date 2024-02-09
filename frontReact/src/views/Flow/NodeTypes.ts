import { NodeType } from '../../data/Nodes';
import StandardNode from '../Nodes/StandardNode';
import { NodeTypes } from 'react-flow-renderer';

const nodeTypes: NodeTypes = {
  [NodeType.Apple]: StandardNode as any,
  [NodeType.Pineapple]: StandardNode as any,
  [NodeType.Grape]: StandardNode as any,
  [NodeType.Orange]: StandardNode as any,
  [NodeType.Banana]: StandardNode as any,
};

export default nodeTypes;
