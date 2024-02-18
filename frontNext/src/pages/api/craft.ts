import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    console.log("req.body", request.body);
    const craft_id: string = request.body.craft_id;
    const emoji: string = request.body.emoji;
    const label: string = request.body.label;

    await kv.hset(craft_id, { craft_id: craft_id, emoji: emoji, label: label });
    return response.status(200).json({ craft_id, emoji, label });
  } else {
    const craft_id: string = request.query["craft_id"] as string;
    const data = await kv.hgetall(craft_id);
    return response.status(200).json(data);
  }
}
