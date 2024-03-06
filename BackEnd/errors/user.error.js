import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoUsersFoundError = errorGenerator.noDataErrorGenerator("users");

export const UserDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("User");
export const LawyerDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Lawyer");
export const JudgeDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Judge");

export class UserIsNotAJudgeError {
    static msg = "User is not a judge";
    static statusCode = StatusCodes.BAD_REQUEST;
}

export class UserIsNotALawyerError {
    static msg = "User is not a lawyer";
    static statusCode = StatusCodes.BAD_REQUEST;
}
