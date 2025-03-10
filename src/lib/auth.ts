import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    next();
    return;
  }
  try {
    const decoded = jwt.verify(token, "secret");
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  next();
};
