/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Node } from "reactflow";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useToast } from "@/components/ui/use-toast"
import Image from 'next/image'
import { useAccount } from "wagmi";
import { ConnectWallet } from "components/Button/ConnectWallet";
interface FooterMintProps {
  node: Node | undefined;
  remainSum: number;
  minted: boolean;
}

const FooterMint: React.FC<FooterMintProps> = ({
  node,
  remainSum,
  minted,
}) => {
  const { isConnected } = useAccount()
  if (!node) return null;
  let mintable = !minted && remainSum > 0;
  return (
    <>
      <div className="left-12 inset-x-0 bottom-0 bg-white px-4 pb-4 flex items-center justify-center z-10 mx-auto">
        <p className="mx-2 font-bold">{remainSum > 0 ? `${remainSum} / 69 Left` : ''}</p>
        <div className="mx-2 items-center border border-blue-gray-100 bg-gray-100 rounded-md">
          {node.data.label ? (
            <div className="p-2">
              <span className="font-bold">{`${node.data.emoji}${node.data.label}`}</span>
            </div>
          ) : null}
        </div>
        <p className="mx-2">{' -> '}</p>
        {isConnected ? (
          <button
            disabled={!mintable}
            className={`${
              mintable ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
            } mx-2 text-white font-bold py-2 px-4 rounded m-1`}
          >
            {minted ? 'Already minted' : 'Mint'}
          </button>
        ) : (
          <ConnectWallet />
        )}
      </div>
    </>
  );
};

export default FooterMint;
