import React from 'react';
import './Sidebar.scss';
import { useNodeContext } from '../Nodes/NodeContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const tapSound = new Audio('/se/tap.mp3');

const Sidebar: React.FC = () => {
  const { nodes } = useNodeContext();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    tapSound.play().catch((err) => console.error('Audio play failed:', err));
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
      {/* TODO: UI fixed */}
      {/* <ConnectButton /> */}
    </div>
  );
};

export default Sidebar;
