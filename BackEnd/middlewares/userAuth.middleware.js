import Config from "../config.js";
import jwt from "jsonwebtoken";

export function authorizationMiddleWare(req, res, next) {
  //   console.log(req);
  const { token } = req.cookies;
  try {
    const { userId } = jwt.verify(token, Config.JWT_SECRET_KEY);
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).send("Invalid JWT token!");
  }
}
