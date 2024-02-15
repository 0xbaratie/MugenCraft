import React, { useState } from 'react';
import { Node } from 'reactflow';
import { NodeModel } from '../../../data/Nodes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork } from 'wagmi';

function StandardNode(props: Node<NodeModel>) {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <div className="relative flex border border-blue-gray-100 bg-white rounded-md" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="relative overflow-hidden p-2">
          <span className="font-bold">{props.data.emoji}</span>
          <span className="font-bold">{props.data.label}</span>
        </div>
      </div>
      {isHovered && (
        <div
          className="hover-content absolute z-50 flex flex-col items-center border border-blue-gray-100 bg-white rounded-md min-w-[180px] top-0 left-full p-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* TODO: Change numbers dynamically */}
          <span className="font-bold">53 left</span>
          {!isConnected || chain?.id !== 168587773 ? <ConnectButton /> : <button className="font-bold">Mint</button>}
        </div>
      )}
    </>
  );
}

export default StandardNode;
