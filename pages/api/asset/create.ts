import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount, currencyId } = req.body;

  const result = await prisma.asset.create({ data: { amount, currencyId } });
  res.json(result);
}
