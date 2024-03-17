import { NoCaseStatusFoundError, CaseDoesNotExistError, InvalidCaseStatusError, NoCasesFoundError } from "../errors/case.error.js";
import errorHandler from "../errors/errorHandler.js";
import CaseValidator from "../validators/cases.validate.js";
import Case from "../models/case.model.js";
import PartyValidator from "../validators/parties.validate.js";
import Party from "../models/party.model.js";
import Stakeholder from "../models/stakeholder.model.js";
import mongoose from "mongoose";
import { DBConfig } from "../config.js";
import dbUtils from "../utils/db.utils.js";

class CasesController {
	async createCase(req, res) {
		const { title, description, status, court, judge, parties } = req.body;
		// Saves created Documents to delete them on faliure/error
		const savedDocs = [];
		try {
			// Validate parties!
			CaseValidator.validateCaseData({ title, description, status, court, judge, parties });
			for(const party of parties) {
			 	PartyValidator.validateCaseCreatePartyData(party);
			}

			const newCase = new Case({title, description, status, court, judge});
			const newParties = [];
			for(const index in parties) {
				const { lawyer, client } = parties[index];
				const newParty = new Party({ lawyer, case: newCase, name: DBConfig.PARTY_NAMES[index], stakeholders: [] });
				const { idNumber, firstName, lastName, email, phoneNumber, city, street } = client;
				const newClient = new Stakeholder({ type: DBConfig.STAKEHOLDER_TYPES[0], party: newParty._id, idNumber, firstName, lastName, email, phoneNumber, city, street });
				await newClient.save();
				savedDocs.push(newClient);
				newParty.client = newClient;
				newParties.push(newParty)
			}
			
			newCase.parties = newParties.map(party => party._id);
			await newCase.save();
			savedDocs.push(newCase);
			for(const party of newParties) {
				await party.save();
				savedDocs.push(party);
			}
			res.json(newCase);
		}
		catch(error) {
			dbUtils.deleteDocuments(savedDocs);
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
            res.json(DBConfig.CASE_STATUS_TYPES);
        } catch (error) {
            errorHandler.handleError(res, error);
        }
    }

	async updateCase(req, res) {
		const { id } = req.params;
		const { title, description, court, judge } = req.body;
		Case.findByIdAndUpdate(id, { title, description, court, judge }, { new: true })
			.then(updatedCase => {
				if (!updatedCase) {
					throw new CaseDoesNotExistError();
				}
				res.json(updatedCase);
			})
			.catch(error => {
				errorHandler.handleError(res, error);
			});
	}

	updateCaseStatus(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const casesController = new CasesController();
export default casesController;
