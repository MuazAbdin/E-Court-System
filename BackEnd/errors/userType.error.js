import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoUserTypesFoundError = errorGenerator.noDataErrorGenerator("user types");

export const UserTypeDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("User type");

export const InvalidUserType = errorGenerator.invalidValueErrorGenerator("user type");

export const UserTypeAlreadyExistsError = errorGenerator.createErrorClass("User type already exists!", StatusCodes.CONFLICT);
