import { NoCasesFoundError, NoCaseStatusFoundError, CaseDoesNotExistError } from '../errors/case.error.js';
import Case from '../models/case.model.js';
import errorHandler from '../errors/errorHandler.js';
import { dbConfig } from "../config.js"

class CasesController {
	createCase(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getCases(req, res) {
		const { query } = req.query;
		try {
			const cases = await Case.query(query);
			if(cases.length === 0) {
				throw new NoCasesFoundError();
			}
			res.json(cases);
		} catch(error) {
			errorHandler.handleError(res, error);
		}
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

	getCaseStatusTypes(req, res) {
        try {
            res.json(dbConfig.CASE_STATUS_TYPES);
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
