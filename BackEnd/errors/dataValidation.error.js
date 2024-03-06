import { StatusCodes } from "http-status-codes";

export class UserIsNotALawyerError {
    static msg = "Some data is missing!";
    static statusCode = StatusCodes.BAD_REQUEST;
}
