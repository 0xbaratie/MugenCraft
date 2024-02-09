import { Handle, Position } from 'react-flow-renderer';
import { Node } from 'reactflow';
import { NodeModel } from '../../../models/NodeModel';
import './StandardNode.scss';

function StandardNode(props: Node<NodeModel>) {
  return (
    <div className="dnd-node standard-node">
      <div className="standard-node-body">
        <span>{props.data.emoji}</span>
        <span>{props.data.label}</span>
      </div>
    </div>
  );
}

export default StandardNode;
