import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    console.log("req.body", request.body);
    const recipe_id: string = request.body.recipe_id;
    const craft_id: string = request.body.craft_id;

    await kv.hset(recipe_id, { craft_id: craft_id });
    return response.status(200).json({ craft_id });
  } else {
    const recipe_id: string = request.query["recipe_id"] as string;
    const data = await kv.hgetall(recipe_id);
    return response.status(200).json(data);
  }
}
