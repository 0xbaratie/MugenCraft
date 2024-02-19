import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const data = await kv.keys("[^_]"); // exclude keys with "_" to get only craft_ids
  return response.status(200).json(data);
}
