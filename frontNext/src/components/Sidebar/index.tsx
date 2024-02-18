import React, { useState } from "react";
import styles from "../../styles/Sidebar.module.css";
import { ConnectKitButton } from "connectkit";
import ReactFlow, { Node } from "reactflow";

let tapSound: any = null;
if (typeof window !== "undefined") {
  tapSound = new Audio("/se/tap.mp3");
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { emoji: "🪨", label: "Stone" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    type: "custom",
    data: { emoji: "🌱", label: "Seed" },
    position: { x: 350, y: 5 },
  },
  {
    id: "3",
    type: "custom",
    data: { emoji: "💛", label: "Soul" },
    position: { x: 450, y: 5 },
  },
  {
    id: "4",
    type: "custom",
    data: { emoji: "🌏", label: "Earth" },
    position: { x: 550, y: 5 },
  },
  {
    id: "5",
    type: "custom",
    data: { emoji: "🔨", label: "Hammer" },
    position: { x: 650, y: 5 },
  },
];

const Sidebar: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  // const { nodes } = useNodeContext();

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

  return (
    <div className={`${styles.sidebar} w-[330px]`}>
      <div className="shadow-custom px-2 flex flex-col justify-between min-h-screen">
        <div className="relative flex items-center justify-between p-2 border-b border-gray-200">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-xl"
            onClick={() => setShowDetails(!showDetails)}
          >
            Points
          </button>
          {showDetails && (
            <div className="absolute top-full w-full p-4 rounded-lg shadow-lg border border-gray-200 z-50 bg-gray-50">
              <span className="text-md">Your points</span>
              {/* TODO: Change numbers dynamically */}
              <p className="text-xl font-bold pb-4 border-b border-gray-200">
                150,000 points
              </p>
              <div className="mt-4">
                <div>20 Object minted | 5,000</div>
                <div>5 Recipe Created | 10,000</div>
                <div>200 Your recipe minted | 20,000</div>
                <div>400 Your recipe assist | 4,000</div>
              </div>
            </div>
          )}
          <ConnectKitButton />
        </div>
        <div className="mt-4 flex-grow">
          <div className="flex flex-wrap">
            {initialNodes.map((node, i) => (
              <div
                key={node.id}
                className="relative border border-gray-300 bg-white p-2 m-1 rounded-md overflow-hidden"
                onDragStart={(event) => onDragStart(event, node.id)}
                draggable
              >
                <span className="font-bold">{node.data.emoji}</span>
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
