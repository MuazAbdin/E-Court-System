import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoDocumentsFoundError = errorGenerator.noDataErrorGenerator("documents");

export const DocumentDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Document");

export class FailedToSaveDocumentError {
    static msg = "Failed to save document, please try again.";
    static statusCode = StatusCodes.SERVICE_UNAVAILABLE;
}
