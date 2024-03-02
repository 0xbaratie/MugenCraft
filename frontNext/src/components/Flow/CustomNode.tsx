import { memo, FC, CSSProperties, useEffect, useState } from "react";
import { NodeProps } from "reactflow";

const CustomNode: FC<NodeProps> = ({ data }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const shouldHighlight = currentTime <= data.highlightEndTime;
    setIsHighlighted(shouldHighlight);

    if (shouldHighlight) {
      const remainingTime = data.highlightEndTime - currentTime;
      const timer = setTimeout(() => setIsHighlighted(false), remainingTime);

      return () => clearTimeout(timer);
    }
  }, [data.highlightEndTime]);

  // Apply the animation based on the highlighted state
  const boxStyle: CSSProperties = {
    animation: isHighlighted ? "radiant-rotation 3s linear infinite" : "",
  };

  return (
    <>
      <div
        className="border border-gray-300 bg-white px-2 py-1 m-1 rounded-md overflow-hidden hover:bg-gradient-to-b"
        style={boxStyle}
      >
        <span className="font-semibold mr-1">{data.emoji}</span>
        <span className="font-semibold">{data.label}</span>
      </div>
    </>
  );
};

export default memo(CustomNode);
