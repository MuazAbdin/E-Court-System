import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NotAuthorizedError = errorGenerator.createErrorClass("Not Authorized!", StatusCodes.FORBIDDEN);

export const InvalidCredintialsError = errorGenerator.createErrorClass("Invalid credintials!", StatusCodes.FORBIDDEN);

export const ConfirmationPasswordDoesNotMatchError = errorGenerator.createErrorClass("Password and Confirmation Password do not match", StatusCodes.BAD_REQUEST);