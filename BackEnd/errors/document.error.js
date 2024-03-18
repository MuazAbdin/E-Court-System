import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoDocumentsFoundError = errorGenerator.noDataErrorGenerator("documents");

export const DocumentDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Document");

export const FailedToSaveDocumentError = errorGenerator.createErrorClass("Failed to save document, please try again.", StatusCodes.SERVICE_UNAVAILABLE);

export const NoDocumentFileWasUploadedError = errorGenerator.createErrorClass("Document file was not uploaded!", StatusCodes.BAD_REQUEST);