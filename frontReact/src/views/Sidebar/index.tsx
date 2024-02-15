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
    <div className="dnd-flow-sidebar flex flex-col justify-between min-h-screen">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-xl">Points</button>
        <ConnectButton />
      </div>
      <div className="sidebar-body flex-grow">
        <div className="sidebar-nodes">
          {Object.entries(nodes).map(([key, node], i) => (
            <div
              key={key}
              className="relative border border-gray-300 bg-white p-2 m-1 rounded-md overflow-hidden"
              onDragStart={(event) => onDragStart(event, node.key)}
              draggable
            >
              <span className="font-bold">{node.emoji}</span>
              <span className="font-bold">{node.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 text-center border-t border-gray-200 flex items-center justify-center h-16">
        <div className="text-gray-500">You earned 0.1 ETH ⛽️</div>
      </div>
    </div>
  );
};

export default Sidebar;
