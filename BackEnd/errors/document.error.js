import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoDocumentsFoundError = errorGenerator.noDataErrorGenerator("documents");

export const DocumentDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Document");
