import { NoCaseStatusFoundError, CaseDoesNotExistError } from '../errors/case.error.js';
import Case from '../models/Case.model.js'; 
import errorHandler from '../errors/errorHandler.js'; 
import { dbConfig } from "../config.js"

class CasesController {
	createCase(req, res) {
		res.status(404).send("Work In Progress!");
	}
	getCases(req, res) {
		res.status(404).send("Work In Progress!");
	}
	async getCaseById(req, res) {
        const { id } = req.params;
        try {
            const case_ = Case.findById(id);
			if(!case_) {
				throw new CaseDoesNotExistError();
			}
            res.json(case_);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }
	getCasesStatusTypes(req, res) {
        try {
            const caseStatusTypes = dbConfig.CASE_STATUS_TYPES;
            if (!caseStatusTypes || caseStatusTypes.length === 0) {
                throw new NoCaseStatusFoundError();
            }
            res.json(caseStatusTypes);
        } catch (error) {
            errorHandler.handleError(res, error);
        }
    }

	updateCase(req, res) {
		res.status(404).send("Work In Progress!");
	}

	updateCaseStatus(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const casesController = new CasesController();
export default casesController;
