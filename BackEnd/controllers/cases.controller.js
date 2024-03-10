import errorHandler from "../errors/errorHandler.js";
import Case from "../models/case.model.js";
import { NoCasesFoundError } from "../errors/case.error.js";

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


	getCaseById(req, res) {
		res.status(404).send("Work In Progress!");
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
