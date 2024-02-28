/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Node } from "reactflow";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ConnectWallet } from "components/Button/ConnectWallet";
import { MugenTokenForTestAbi } from "constants/abis";
import { addresses } from "constants/addresses";
interface FooterMintProps {
  node: Node | undefined;
  remainSum: number;
  minted: boolean;
}

const FooterMint: React.FC<FooterMintProps> = ({ node, remainSum, minted }) => {
  const { isConnected } = useAccount();
  const { data: hash, writeContract } = useWriteContract();

  const writeMint = async () => {
    writeContract({
      address: addresses.MugenTokenForTest as `0x${string}`,
      abi: MugenTokenForTestAbi,
      functionName: "setMetadataAndMint",
      args: [
        BigInt(node!.data.craft_id),
        node!.data.label,
        `${node!.data.emoji} ${node!.data.label}`,
      ],
    });
  };

  //for test
  const { data: uri } = useReadContract({
    address: addresses.MugenTokenForTest as `0x${string}`,
    abi: MugenTokenForTestAbi,
    functionName: "uri",
    args: [BigInt(1)],
  });

  if (!node) return null;
  let mintable = !minted && remainSum > 0;
  return (
    <>
      <div className="left-12 inset-x-0 bottom-0 bg-white p-4 flex items-center justify-center z-10 mx-auto">
        <p className="mx-2 font-bold">
          {remainSum > 0 ? `${remainSum} / 69 Left` : ""}
        </p>
        <div className="mx-2 items-center border border-gray-100 bg-gray-100 rounded-md">
          {node.data.label ? (
            <div className="p-2">
              <span className="font-bold">{`${node.data.emoji}${node.data.label}`}</span>
            </div>
          ) : null}
        </div>
        <p className="mx-2">{" -> "}</p>
        {isConnected ? (
          <button
            disabled={!mintable}
            className={`${
              mintable
                ? "bg-orange hover:bg-orangeHover"
                : "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
            } mx-2 text-white font-bold py-2 px-4 rounded m-1`}
            onClick={writeMint}
          >
            {minted ? "Already minted" : "Mint"}
          </button>
        ) : (
          <ConnectWallet />
        )}
        {/* for test <div>Uri: {uri?.toString()}</div> */}
      </div>
    </>
  );
};

export default FooterMint;
