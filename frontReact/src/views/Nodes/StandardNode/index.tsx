import React, { useState } from 'react';
import { Node } from 'reactflow';
import { NodeModel } from '../../../data/Nodes';
import './StandardNode.scss';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import { NodeProps } from 'react-flow-renderer';

const StandardNode: React.FC<NodeProps<NodeModel>> = (props) => {
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
      <div className="dnd-node standard-node" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="standard-node-body">
          <span className="standard-node-body-label">{props.data.emoji}</span>
          <span className="standard-node-body-label">{props.data.label}</span>
        </div>
      </div>
      {isHovered && (
        <div className="hover-content standard-node-body" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* TODO: Change numbers dynamically */}
          <span className="standard-node-body-label">53 left</span>
          {!isConnected || chain?.id !== 168587773 ? <ConnectButton /> : <button className="standard-node-body-label">Mint</button>}
        </div>
      )}
    </>
  );
};

export default StandardNode;
