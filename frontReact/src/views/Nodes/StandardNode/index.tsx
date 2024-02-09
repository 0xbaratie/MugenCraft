import { Handle, Position } from 'react-flow-renderer';
import { Node } from 'reactflow';
import { NodeModel } from '../../../data/Nodes';
import './StandardNode.scss';

function StandardNode(props: Node<NodeModel>) {
  return (
    <div className="dnd-node standard-node">
      <div className="standard-node-body">
        <span className="standard-node-body-label">{props.data.emoji}</span>
        <span className="standard-node-body-label">{props.data.label}</span>
      </div>
    </div>
  );
}

export default StandardNode;
