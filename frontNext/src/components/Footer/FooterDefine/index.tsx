/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Node } from "reactflow";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ConnectWallet } from "components/Button/ConnectWallet";
import LoadingIndicator from "components/LoadingIndicator";
interface FooterDefineProps {
  nodeA: Node | undefined;
  nodeB: Node | undefined;
  footerInput: { label: string; emoji: string };
  setFooterInput: React.Dispatch<
    React.SetStateAction<{ label: string; emoji: string }>
  >;
  updateNodeFromFooter: () => void;
  isLoading: boolean;
}

const FooterDefine: React.FC<FooterDefineProps> = ({
  nodeA,
  nodeB,
  footerInput,
  setFooterInput,
  updateNodeFromFooter,
  isLoading,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const { toast } = useToast();
  const { isConnected } = useAccount();

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
    <>
      <p className="ml-4 font-bold text-gray-400">
        Point chance! Let's define a new recipe to earn 1000 points!
      </p>
      <div className="left-12 bottom-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
        <div className="relative flex items-center justify-center space-x-4">
          <div className="flex items-center border border-gray-100 bg-gray-100 rounded-md">
            {nodeA.data.label ? (
              <div className="p-2">
                <span className="font-bold">{`${nodeA.data.emoji}${nodeA.data.label}`}</span>
              </div>
            ) : null}
          </div>
          <span className="flex items-center">+</span>
          <div className="flex items-center border border-gray-100 bg-gray-100 rounded-md">
            {nodeB.data.label ? (
              <div className="p-2">
                <span className="font-bold">{`${nodeB.data.emoji}${nodeB.data.label}`}</span>
              </div>
            ) : null}
          </div>
        </div>
        <span className="flex items-center mx-2">=</span>

        <button className="flex items-center justify-between border border-gray-300 text-gray-400  py-2 px-2 rounded min-w-40">
          <div>
            {footerInput.emoji.length > 0 ? footerInput.emoji : "Emoji"}
          </div>

          <div className="flex-shrink-0 flex items-center">
            <Image
              src="/svg/emoji-smile.svg"
              alt="Smile emoji"
              width="20"
              height="20"
              onClick={(e) => {
                e.stopPropagation();
                setShowEmojiPicker(!showEmojiPicker);
              }}
              className="hover:fill-orange"
            />
            <Image
              src="/svg/trash.svg"
              alt="Delete emoji"
              width="20"
              height="20"
              onClick={(e) => {
                e.stopPropagation();
                setFooterInput((prev) => {
                  const emojis = prev.emoji.split(" ").filter(Boolean);
                  emojis.pop();
                  return { ...prev, emoji: emojis.join(" ") };
                });
              }}
              className="hover:fill-orange ml-2"
            />
          </div>
        </button>

        {showEmojiPicker && (
          <>
            <div
              className="fixed inset-0"
              onClick={() => setShowEmojiPicker(false)} // Close EmojiPicker when the overlay is clicked.
            ></div>
            <div className="fixed left-12 bottom-0 bg-white shadow-md p-4 flex justify-between items-center z-100">
              <EmojiPicker
                onEmojiClick={(emojiData: EmojiClickData, event: MouseEvent) => {
                  setFooterInput((prev) => {
                    const emojiCount = prev.emoji
                      .split(" ")
                      .filter(Boolean).length;

                    if (emojiCount < 3) {
                      const newEmoji =
                        prev.emoji + (prev.emoji ? " " : "") + emojiData.emoji;
                      return { ...prev, emoji: newEmoji };
                    } else {
                      toast({
                        title: "Input alert🚨",
                        description: "Maximum of 3 emojis",
                      });
                      return prev;
                    }
                  });
                  setShowEmojiPicker(false);
                }}
                autoFocusSearch={false}
              />
            </div>
          </>
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
        {isConnected ? (
          <button
            onClick={updateNodeFromFooter}
            disabled={isButtonDisabled}
            className={`${
              isButtonDisabled
                ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                : "bg-blue hover:bg-blueHover"
            } text-white font-bold py-2 px-4 rounded m-1`}
          >
            {isLoading ? (
              <LoadingIndicator />
            ) : "Define"}
          </button>
        ) : (
          <ConnectWallet />
        )}
      </div>
    </>
  );
};

export default FooterDefine;
