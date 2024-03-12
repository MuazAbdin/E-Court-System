import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoStakeholdersFoundError = errorGenerator.noDataErrorGenerator("stakeholders");

export const StakeholderDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Stakeholder");

export const InvalidStakeholderTypeError = errorGenerator.invalidValueErrorGenerator("stakeholder type");