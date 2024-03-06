import { StatusCodes } from "http-status-codes";

export class NotAuthorizedError extends Error {
    static msg = "Not Authorized!";
    static statusCode = StatusCodes.NotAuthorizedError;
}