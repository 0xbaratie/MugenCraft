import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const data = await kv.keys("*"); // Get all data
  return response.status(200).json(data);
}
