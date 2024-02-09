import StandardNode from '../Nodes/StandardNode';
import { NodeTypes } from 'react-flow-renderer';

// ノードキーを直接指定して nodeTypes を定義
const nodeTypes: NodeTypes = {
  apple: StandardNode as any,
  pineapple: StandardNode as any,
  grape: StandardNode as any,
  orange: StandardNode as any,
  banana: StandardNode as any,
};

export default nodeTypes;
