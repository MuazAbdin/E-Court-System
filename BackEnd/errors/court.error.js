import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoCourtsFoundError = errorGenerator.noDataErrorGenerator("courts");

export const CourtDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Court");
