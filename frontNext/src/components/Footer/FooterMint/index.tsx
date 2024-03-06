/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Node } from "reactflow";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useToast } from "@/components/ui/use-toast";
import LoadingIndicator from "components/LoadingIndicator";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { ConnectWallet } from "components/Button/ConnectWallet";
import { MugenTokenAbi } from "constants/MugenTokenAbi";
import { addresses } from "constants/addresses";

const FEE = "0.000025";
interface FooterMintProps {
  node: Node | undefined;
  nodeA: Node | undefined;
  nodeB: Node | undefined;
}

const FooterMint: React.FC<FooterMintProps> = ({ node, nodeA, nodeB }) => {
  const { address, isConnected } = useAccount();
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const [sum, setSum] = useState(1);
  const [mintable, setMintable] = useState(false);
  const [minted, setMinted] = useState(false);
  const { toast } = useToast();

  const mugenTokenContract = {
    address: addresses.MugenToken as `0x${string}`,
    abi: MugenTokenAbi,
  } as const;

  const results = useReadContracts({
    contracts: [
      {
        ...mugenTokenContract,
        functionName: "balanceOf",
        args: [address as `0x${string}`, BigInt(node!.data.craft_id)],
      },
      {
        ...mugenTokenContract,
        functionName: "totalSupply",
        args: [BigInt(node!.data.craft_id)],
      },
    ],
  });
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  useEffect(() => {
    if (results.isSuccess) {
      const resultBalance = results.data[0].result;
      setMinted(
        resultBalance != null && parseInt(resultBalance.toString()) > 0
      );

      const resultTotalSupply = results.data[1].result;
      const sum =
        resultTotalSupply != null ? parseInt(resultTotalSupply.toString()) : 0;
      setSum(sum);
    }
  }, [results, hash]);

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: "Transaction confirmed",
        description: hash,
      });
      setMinted(true);
      setMintable(false);
    }
  }, [isConfirmed, hash, toast]);

  useEffect(() => {
    setMintable(!minted && sum > 0 && !isPending && !isConfirming);
  }, [minted, sum, isPending, isConfirming]);

  const writeMint = async () => {
    writeContract({
      address: addresses.MugenToken as `0x${string}`,
      abi: MugenTokenAbi,
      functionName: "mint",
      args: [
        address as `0x${string}`,
        BigInt(node!.data.craft_id),
        BigInt(nodeA?.data.craft_id),
        BigInt(nodeB?.data.craft_id),
      ],
      value: parseEther(FEE),
    });
  };

  if (!node) return null;

  return (
    <>
      <div className="left-12 inset-x-0 bottom-0 bg-white p-4 flex items-center justify-center z-10 mx-auto">
        <p className="mx-2 font-bold">
          {`${sum} minted`}
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
            disabled={!mintable || isPending || isConfirming}
            className={`${
              mintable
                ? "bg-blue hover:bg-blueHover"
                : "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
            } mx-2 text-white font-bold py-2 px-4 rounded m-1`}
            onClick={writeMint}
          >
            {isPending || isConfirming ? (
              <LoadingIndicator />
            ) : minted ? (
              "Already minted"
            ) : (
              "Mint"
            )}
          </button>
        ) : (
          <ConnectWallet buttonText="Connect for mint recipe" />
        )}
        {/* for test <div>Uri: {uri?.toString()}</div> */}
      </div>
    </>
  );
};

export default FooterMint;
