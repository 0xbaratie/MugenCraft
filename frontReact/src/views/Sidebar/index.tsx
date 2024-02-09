// Sidebar.tsx
import React from 'react';
import './Sidebar.scss';
import { useNodeContext } from '../Nodes/NodeContext'; // NodeContext のパスを適切に調整してください

const Sidebar: React.FC = () => {
  const { nodes } = useNodeContext();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="dnd-flow-sidebar">
      <div className="sidebar-body">
        <div className="sidebar-nodes">
          {Object.entries(nodes).map(([key, node], i) => (
            <div key={key} className="node-item" onDragStart={(event) => onDragStart(event, node.key)} draggable>
              <span className="node-emoji">{node.emoji}</span>
              <span className="node-label">{node.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
