import React, { useState, useEffect } from "react";
import { Node } from "reactflow";
import { ConnectWallet } from "components/Button/ConnectWallet";
import { useAccount, useReadContracts } from "wagmi";
import { MugenRecipeAbi } from "constants/MugenRecipeAbi";
import { MugenTokenAbi } from "constants/MugenTokenAbi";
import { addresses } from "constants/addresses";

let tapSound: any = null;
if (typeof window !== "undefined") {
  tapSound = new Audio("/se/tap.mp3");
}

interface SidebarProps {
  sideNodes: Node[];
}

const Sidebar: React.FC<SidebarProps> = ({ sideNodes: sideNodes }) => {
  const { address, isConnected } = useAccount();
  const [showDetails, setShowDetails] = useState(false);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    tapSound
      .play()
      .catch((err: Error) => console.error("Audio play failed:", err));
  };

  const mugenTokenContract = {
    address: addresses.MugenToken as `0x${string}`,
    abi: MugenTokenAbi,
  } as const;

  const mugenRecipeContract = {
    address: addresses.MugenRecipe as `0x${string}`,
    abi: MugenRecipeAbi,
  } as const;

  const results = useReadContracts({
    contracts: [
      {
        ...mugenTokenContract,
        functionName: "mintPoints",
        args: [address as `0x${string}`],
      },
      {
        ...mugenRecipeContract,
        functionName: "recipePoints",
        args: [address as `0x${string}`],
      },
      {
        ...mugenTokenContract,
        functionName: "recipeCreatorPoints",
        args: [address as `0x${string}`],
      },
      {
        ...mugenTokenContract,
        functionName: "refferalRecipeCreatorPoints",
        args: [address as `0x${string}`],
      },
    ],
  });

  // Calculate total points
  const totalPoints = results.isSuccess ? results.data.reduce((total, current) => {
    const points = Number(current.result?.toString()) || 0;
    return total + points;
  }, 0) : 0;

  return (
    <div className="w-[400px] border-l border-gray-400">
      <div className="shadow-custom px-2 flex flex-col justify-between min-h-screen">
        <div className="relative flex items-center justify-between p-2 border-b border-gray-200">
          <button
            className="px-4 py-2 bg-white text-orange border border-orange rounded-xl mr-4"
            onClick={() => setShowDetails(!showDetails)}
          >
            Points
          </button>
          {showDetails && (
            <div className="absolute top-full w-full p-6 rounded-lg shadow-lg border border-gray-200 z-50 bg-white">
              <span className="text-lg font-semibold text-gray-800">Your points</span>
              <p className="text-2xl font-bold text-gray-900 py-4 border-b border-gray-200">
                {totalPoints.toLocaleString()} points
              </p>
              <div className="mt-6 space-y-2">
                {results.isSuccess && (
                  <>
                    <div className="flex items-center text-gray-700">
                      <span className="inline-block w-4 h-4 mr-2 rounded-full bg-green-500"></span>
                      Object minted {results.data[0].result?.toString() || 0}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="inline-block w-4 h-4 mr-2 rounded-full bg-blue-500"></span>
                      Recipe Created {results.data[1].result?.toString() || 0}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="inline-block w-4 h-4 mr-2 rounded-full bg-purple-500"></span>
                      Your recipe minted {results.data[2].result?.toString() || 0}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="inline-block w-4 h-4 mr-2 rounded-full bg-red-500"></span>
                      Your recipe assist {results.data[3].result?.toString() || 0}
                    </div>
                  </>
                
                )}
              </div>
            </div>
          )}

          <ConnectWallet />
        </div>
        <div className="mt-4 flex-grow overflow-y-auto">
          <div className="flex flex-wrap">
            {sideNodes.map((node, i) => (
              <div
                key={node.id}
                className="relative border border-gray-300 bg-white p-2 m-1 rounded-md overflow-hidden hover:bg-gradient-to-b"
                onDragStart={(event) => onDragStart(event, node.data.craft_id)}
                draggable
              >
                <span className="font-bold mr-1">{node.data.emoji}</span>
                <span className="font-bold">{node.data.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 text-center border-t border-gray-200 flex items-center justify-center h-16">
          {/* TODO: Change numbers dynamically */}
          <div className="text-gray-500">You earned 0.1 ETH ⛽️</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
