import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenCookie = req.cookies.token;
    if (!tokenCookie) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decodedToken = jwt.verify(tokenCookie, process.env.JWT_SECRET) as {
      userId: string;
    };

    if (!decodedToken.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message || "Not authenticated" });
  }
};
