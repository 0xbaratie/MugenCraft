import { memo, FC, CSSProperties } from "react";
import { Handle, Position, NodeProps, NodeResizer } from "reactflow";

const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: "auto",
};

const CustomNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <>
      <div
        className="border border-gray-400 bg-white px-2 py-1 m-1 rounded-md overflow-hidden  hover:bg-gradient-to-b"
      >
        <span className="font-semibold mr-1">{data.emoji}</span>
        <span className="font-semibold">{data.label}</span>
      </div>
    </>
  );
};

export default memo(CustomNode);
