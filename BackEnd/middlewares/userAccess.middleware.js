import { StatusCodes } from "http-status-codes";
import AccessConfig from "../config.js";

export function permissionsMiddleWare(req, res, next) {
    const userId = req.userId;
    try {
        next();
    } catch (error) {
        res
        .status(StatusCodes.FORBIDDEN)
        .send("Invalid Permissions!");
    }
}
