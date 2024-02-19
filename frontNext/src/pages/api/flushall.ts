import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await kv.flushall();
  return response.status(200).json({ message: "flushall" });
}
