import NodeCategories from '../../data/NodeCategories';
import Nodes, { NodeType } from '../../data/Nodes';
import './Sidebar.scss';
import { Input } from 'antd';
const { Search } = Input;

function Sidebar() {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="dnd-flow-sidebar">
      <div className="sidebar-body">
        <div className="sidebar-nodes">
          {Object.values(Nodes).map((n, i) => {
            return (
              <div key={'node' + i} className="node-item" onDragStart={(event) => onDragStart(event, n.key)} draggable>
                <span className="node-label">{n.emoji}</span>
                <span className="node-label">{n.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
