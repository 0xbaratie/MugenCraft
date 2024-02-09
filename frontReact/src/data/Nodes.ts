import { NodeTypes } from 'react-flow-renderer';
import StandardNode from '../views/Flow/NodeTypes';

export interface NodeModel {
  emoji: string;
  label: string;
  key: string; // 以前の NodeType enum の代わり
}

// Nodes オブジェクトを空で初期化
const Nodes: { [key: string]: NodeModel } = {};

// 新しいノードを Nodes オブジェクトに追加する関数
const nodeTypes: NodeTypes = {};

// addNode 関数を拡張して、nodeTypes も更新する
function addNode(key: string, emoji: string, label: string): void {
  // 既存の Nodes オブジェクトに新しいノードを追加
  Nodes[key] = { key, emoji, label };

  // nodeTypes オブジェクトに新しいノードタイプを追加
  nodeTypes[key] = StandardNode as any;
}

// 指定されたキーのノードを取得する関数
function getNode(key: string): NodeModel | undefined {
  return Nodes[key];
}

// 初期ノードの追加
addNode('apple', '🍎', 'Apple');
addNode('pineapple', '🍍', 'Pineapple');
addNode('grape', '🍇', 'Grape');
addNode('orange', '🍊', 'Orange');
addNode('banana', '🍌', 'Banana');

// Nodes オブジェクトをエクスポート
export { Nodes, addNode, getNode };
