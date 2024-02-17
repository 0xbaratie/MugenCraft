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
      <div>
        <div>
          {data.emoji} {data.label}
        </div>
      </div>
    </>
  );
};

export default memo(CustomNode);
