import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const InvalidEmailError = errorGenerator.invalidValueErrorGenerator("email");
export const InvalidPhoneNumberError = errorGenerator.invalidValueErrorGenerator("phone number");
export const InvalidDateError = errorGenerator.invalidValueErrorGenerator("date");
export const InvalidPasswordError = errorGenerator.invalidValueErrorGenerator("password");
export const InvalidIdNumberError = errorGenerator.invalidValueErrorGenerator("ID number");
export const InvalidObjectIdError = errorGenerator.invalidValueErrorGenerator("id")

export const DataMissingError = errorGenerator.createErrorClass("Some data is missing!", StatusCodes.BAD_REQUEST)
