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

  // TODO: Added condition of being able to Mint or not.
  // TODO: Execute the function when minting.
  // TODO: Implementation of Toast display after minting

  return (
    <>
      <div className="relative flex border border-blue-gray-100 bg-white rounded-md" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="relative overflow-hidden p-2">
          <span className="font-bold">{props.data.emoji}</span>
          <span className="font-bold">{props.data.label}</span>
        </div>
      </div>
      {props.data.emoji !== '🌱' && isHovered && (
        <div
          className="hover-content absolute z-50 flex flex-col items-center border border-blue-gray-100 bg-white rounded-md min-w-[180px] top-0 left-full p-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* TODO: Change numbers dynamically */}
          <span className="font-bold">53 left</span>
          {!isConnected || chain?.id !== 168587773 ? (
            <ConnectButton />
          ) : (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">Mint</button>
          )}
        </div>
      )}
    </>
  );
}

export default StandardNode;
