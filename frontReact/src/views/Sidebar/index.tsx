import { Nodes } from '../../data/Nodes';
import './Sidebar.scss';
import { Input } from 'antd';

function Sidebar() {
  // TODO: Fixed format
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: any) => {
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
