import { Node } from "reactflow";

export const initialNodeMap: { [key: string]: Node } = {
  "1": {
    id: "",
    type: "custom",
    data: { craft_id: "1", emoji: "🪨", label: "Stone" },
    position: { x: 0, y: 0 },
  },
  "2": {
    id: "",
    type: "custom",
    data: { craft_id: "2", emoji: "🌱", label: "Seed" },
    position: { x: 0, y: 0 },
  },
  "3": {
    id: "",
    type: "custom",
    data: { craft_id: "3", emoji: "💛", label: "Soul" },
    position: { x: 0, y: 0 },
  },
  "4": {
    id: "",
    type: "custom",
    data: { craft_id: "4", emoji: "🌏", label: "Earth" },
    position: { x: 0, y: 0 },
  },
  "5": {
    id: "",
    type: "custom",
    data: { craft_id: "5", emoji: "🔨", label: "Hammer" },
    position: { x: 0, y: 0 },
  },
  "6": {
    id: "",
    type: "custom",
    data: { craft_id: "6", emoji: "💩", label: "Poop" },
    position: { x: 0, y: 0 },
  },
};

export const initialRecipeMap: { [key: string]: string } = {
  "1_1": "6",
  "1_2": "6",
  "1_3": "6",
  "1_4": "6",
  "1_5": "6",
  "2_2": "6",
  "2_3": "6",
  "2_4": "6",
  "2_5": "6",
  "3_3": "6",
  "3_4": "6",
  "3_5": "6",
  "4_4": "6",
  "4_5": "6",
  "5_5": "6",
};
