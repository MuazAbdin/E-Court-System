import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoUsersFoundError = errorGenerator.noDataErrorGenerator("users");
export const NoJudgesFoundError = errorGenerator.noDataErrorGenerator("judgess");
export const NoLawyersFoundError = errorGenerator.noDataErrorGenerator("lawyers");

export const UserDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("User");
export const LawyerDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Lawyer");
export const JudgeDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Judge");

export const UserIsNotAJudgeError = errorGenerator.createErrorClass("User is not a judge", StatusCodes.BAD_REQUEST)
export const UserIsNotALawyerError = errorGenerator.createErrorClass("User is not a lawyer", StatusCodes.BAD_REQUEST)

export const EmailAlreadyUsedError = errorGenerator.createErrorClass("An account with this email already exists!", StatusCodes.CONFLICT);
export const IdNumberAlreadyUsedError = errorGenerator.createErrorClass("An account with this ID Number already exists!", StatusCodes.CONFLICT);

export const NoUserTypesFoundError = errorGenerator.noDataErrorGenerator("user types");
export const InvalidUserTypeError = errorGenerator.invalidValueErrorGenerator("user type");