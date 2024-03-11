import { InvalidCaseStatusError, NoCasesFoundError } from "../errors/case.error.js";
import errorHandler from "../errors/errorHandler.js";
import CaseValidator from "../validators/cases.validate.js";
import Case from "../models/case.model.js";
import PartyValidator from "../validators/parties.validate.js";
import Party from "../models/party.model.js";
import Stakeholder from "../models/stakeholder.model.js";

class CasesController {
	createCase(req, res) {
		const { title, description, status, court, judge, parties } = req.body;
		try {
			// Validate parties!
			CaseValidator.validateCaseData({ title, description, status, court, judge, parties });
			for(const party of parties) {
				PartyValidator.validatePartyData(party);
			}

			const newCase = new Case(title, description, status, court, judge);
			const newParties = [];
			for(const index in parties) {
				const { lawyer, client, newCase } = parties[index];
				const newParty = new Party({ lawyer, case: newCase, name: DBConfig.PARTY_NAMES[index], stakeholders: [] });
				const { partyId, idNumber, firstName, lastName, email, phoneNumber, city, street } = client;
				const newClient = new Stakeholder({ type: DBConfig.STAKEHOLDER_TYPES[0], partyId, idNumber, firstName, lastName, email, phoneNumber, city, street });
				newClient.save();
				newParties.client = newClient;
				newParties.push(newParty)
			}

			// add parties to case & create case
			newCase.parties = parties;
			newCase.save();
			// create parties
			for(const party of newParties) {
				party.save();
			}
			res.json(newCase);
		}
		catch(error) {
			if(error instanceof mongoose.Error.ValidationError) {
				if(error.errors.status) {
					return errorHandler.handleError(res, new InvalidCaseStatusError());
				}
			}
			errorHandler.handleError(res, error);
		}
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
