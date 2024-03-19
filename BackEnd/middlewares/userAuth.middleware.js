import { StatusCodes } from "http-status-codes";
import Config from "../config.js";
import jwt from "jsonwebtoken";

export function authorizationMiddleWare(req, res, next) {
    const { token } = req.cookies;
    try {
        const payload = jwt.verify(token, Config.JWT_SECRET_KEY);
        if(payload.visitor) {
            req.userType = "Visitor";
            req.userGID = payload.userGID;
            req.firstName = payload.firstName;
            req.lastName = payload.lastName;
            req.email = payload.email;
        }
        else {
            req.userId = payload.userId;
        }
        next();
    } catch (error) {
        res.clearCookie("token")
        .status(StatusCodes.UNAUTHORIZED)
        .send("Invalid JWT token!");
    }
}
