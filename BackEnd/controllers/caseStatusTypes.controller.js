import { StatusCodes } from "http-status-codes";
import { CaseStatusTypeDoesNotExistError, NoCaseStatusTypesFoundError } from "../errors/caseStatusType.error.js";
import errorHandler from "../errors/errorHandler.js";
import CaseStatusType from "../models/caseStatusType.model.js";
import CaseStatusTypesValidator from "../validators/caseStatusTypes.validate.js";

class CaseStatusTypesController {
    async createCaseStatusType(req, res) {
        const { caseStatusType } = req.body;
        try {
            CaseStatusTypesValidator.validateUserType(caseStatusType);
            const newCaseStatusType = await CaseStatusType.createNew(caseStatusType);
            res.send(newCaseStatusType);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    async getAllCaseStatusTypes(req, res) {
        try {
            const caseStatusTypes = await CaseStatusType.getAll();
            if(caseStatusTypes.length === 0) {
                throw new NoCaseStatusTypesFoundError();
            }
            res.send(caseStatusTypes);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    async updateCaseStatusType(req, res) {
        const { id, status } = req.body;
        try {
            const updatedCaseStatusType = await CaseStatusType.findByIdAndUpdate(id, { status }, { new: true});
            if(updatedCaseStatusType === null) {
                console.log(updatedCaseStatusType)
                throw new CaseStatusTypeDoesNotExistError();
            }
            updatedCaseStatusType.deleted = undefined;
            res.send(updatedCaseStatusType);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    deleteCaseStatusType(req, res) {
        const { id } = req.body;
        try {
            const updatedCaseStatusType = CaseStatusType.softDelete(id);
            if(updatedCaseStatusType === null) {
                throw new CaseStatusTypeDoesNotExistError();
            }
            res.sendStatus(StatusCodes.NO_CONTENT);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }
}

const caseStatusTypesController = new CaseStatusTypesController();
export default caseStatusTypesController;