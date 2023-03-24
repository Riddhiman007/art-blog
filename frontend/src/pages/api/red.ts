import { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";

export default function redirect(req: NextApiRequest, res: NextApiResponse) {
  const {data} = useSession();

  if (req.method === "GET") {
    
    res.status(200).json({ name: data.FullName });
  }
}
