import React, { useState, useEffect } from "react";
import { Node } from "reactflow";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useToast } from "@/components/ui/use-toast"

interface FooterProps {
  nodeA: Node | undefined;
  nodeB: Node | undefined;
  footerInput: { label: string; emoji: string };
  setFooterInput: React.Dispatch<
    React.SetStateAction<{ label: string; emoji: string }>
  >;
  updateNodeFromFooter: () => void;
}

const Footer: React.FC<FooterProps> = ({
  nodeA,
  nodeB,
  footerInput,
  setFooterInput,
  updateNodeFromFooter,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const { toast } = useToast()

  useEffect(() => {
    // Disable buttons by default
    let isDisabled = true;
    let message = "";
  
    if (footerInput.label.length === 0) {
      // Empty input does not display a message and disables the button
      message = "";
    } else if (footerInput.label.length > 30) {
      message = "The label must be within 30 characters.";
    } else if (!/^[A-Z]/.test(footerInput.label)) {
      message = "The first character must be an uppercase letter.";
    } else if (!/^[A-Z][A-Za-z0-9 ]*$/.test(footerInput.label)) {
      message = "Use only alphanumeric characters and spaces.";
    } else {
      // If all validations are passed, activate the button
      isDisabled = false;
      message = ""; // Clear if no validation message
    }
  
    if (message) {
      toast({
        title: "Input alert🚨",
        description: message,
      });
    }
  
    setIsButtonDisabled(isDisabled);
  }, [footerInput.label]);
  

  if (!nodeA || !nodeB) return null;

  return (
    <div>
      <div className="left-12 bottom-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-blue-gray-100 bg-white rounded-md">
            {nodeA.data.label ? (
              <div className="p-2">
                <span className="font-bold">{`${nodeA.data.emoji}${nodeA.data.label}`}</span>
              </div>
            ) : null}
          </div>
          <span className="flex items-center">+</span>
          <div className="flex items-center border border-blue-gray-100 bg-white rounded-md">
            {nodeB.data.label ? (
              <div className="p-2">
                <span className="font-bold">{`${nodeB.data.emoji}${nodeB.data.label}`}</span>
              </div>
            ) : null}
          </div>
        </div>
        <span className="flex items-center mx-2">=</span>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Toggle visibility on click
          className="border border-gray-300 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
        >
          {footerInput.emoji ? footerInput.emoji : "🌏"}
        </button>

        {showEmojiPicker && (
          <div className="fixed left-12 bottom-0 bg-white shadow-md p-4 flex justify-between items-center z-100">
            <EmojiPicker
              onEmojiClick={(emojiData: EmojiClickData, event: MouseEvent) => {
                setFooterInput((prev) => ({ ...prev, emoji: emojiData.emoji }));
                setShowEmojiPicker(false);
              }}
              autoFocusSearch={false}
            />
          </div>
        )}
        <input
          type="text"
          name="label"
          placeholder="Label"
          value={footerInput.label}
          onChange={(e) =>
            setFooterInput((prev) => ({ ...prev, label: e.target.value }))
          }
          onMouseDown={(e) => e.stopPropagation()}
          className="border border-gray-300 rounded-md p-2 m-1 flex-1"
        />
        <button
          onClick={updateNodeFromFooter}
          disabled={isButtonDisabled}
          className={`${
            isButtonDisabled ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded m-1`}
        >
          Define
        </button>
      </div>
      
    </div>
  );
};

export default Footer;
