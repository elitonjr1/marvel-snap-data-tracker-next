import type { NextApiRequest, NextApiResponse } from "next";
import * as userRepository from "../../src/users/userRepository";

export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const results = await userRepository.create(req.body, {
      select: {
        id: true,
      },
    });
    res.status(200).json(results);
  }

  res.status(200).json({});
}
