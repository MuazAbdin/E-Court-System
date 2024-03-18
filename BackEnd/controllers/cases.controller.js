import { CaseDoesNotExistError, InvalidCaseStatusError, NoCasesFoundError } from "../errors/case.error.js";
import errorHandler from "../errors/errorHandler.js";
import CaseValidator from "../validators/cases.validate.js";
import Case from "../models/case.model.js";
import PartyValidator from "../validators/parties.validate.js";
import Party from "../models/party.model.js";
import Stakeholder from "../models/stakeholder.model.js";
import { DBConfig } from "../config.js";
import dbUtils from "../utils/db.utils.js";
import GenericValidator from "../validators/generic.validate.js";
import { NotAuthorizedError } from "../errors/userAuth.error.js";

class CasesController {
	async createCase(req, res) {
		const { title, description, status, court, judge, parties } = req.body;
		// Saves created Documents to delete them on faliure/error
		const savedDocs = [];
		try {
			CaseValidator.validateCaseData({ title, description, status, court, judge, parties });
			for(const party of parties) {
			 	PartyValidator.validateCaseCreatePartyData(party);
			}

			const newCase = new Case({title, description, status, court, judge});
			const newParties = [];
			for(const index in parties) {
				const { lawyer, client } = parties[index];
				const newParty = new Party({ lawyer, case: newCase, name: DBConfig.PARTY_NAMES[index], stakeholders: [] });
				const { idNumber, firstName, lastName, email, phoneNumber } = client;
				const newClient = new Stakeholder({ type: DBConfig.STAKEHOLDER_TYPES[0], party: newParty._id, idNumber, firstName, lastName, email, phoneNumber });
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
			errorHandler.handleError(res, error);
		}
	}

	async fileACase(req, res) {
		const { title, description, court, parties, claimantLawyerNotes } = req.body;
		const userId = req.userId;
		// console.log({ title, description, court, parties, claimantLawyerNotes });
		// Saves created Documents to delete them on faliure/error
		const savedDocs = [];
		try {
			CaseValidator.validateFilaACaseData({ title, description, court, parties });
			for(const party of parties) {
			 	PartyValidator.validateFileACasePartyData(party);
			}

			const newCase = new Case({title, description, status: "Pending", court, judge: null, claimantLawyerNotes});

			const newParties = [];
			const clients = [ parties[0].client ];
			if(parties.length === 2) {
				clients.push(parties[1].client);
			}

			for(const index in parties) {
				const lawyer = index == 0 ? userId : null;
				const newParty = new Party({ lawyer, case: newCase, name: DBConfig.PARTY_NAMES[index], stakeholders: [] });

				const { idNumber, firstName, lastName, email, phoneNumber } = clients[index];
				const newClient = new Stakeholder({ type: DBConfig.STAKEHOLDER_TYPES[0], party: newParty._id, idNumber, firstName, lastName, email, phoneNumber });

				await newClient.save();
				savedDocs.push(newClient);
				newParty.client = newClient;
				newParties.push(newParty);
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
			errorHandler.handleError(res, error);
		}
	}

	async getPendingCases(req, res) {
		try {
			const cases = await Case.query(req.query, { status: "Pending" });
			if(cases.length === 0) {
				throw new NoCasesFoundError();
			}
			res.json(cases);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async resolvePendingCase(req, res) {
		const { caseId, status, judge } = req.body;
		try{
			CaseValidator.validateResolvePendingCaseData({ caseId, status, judge });
			const updatedCase = await Case.findByIdAndUpdate(caseId, {$set: { status, judge } }, { new: true });
			if(updatedCase === null) {
				throw new CaseDoesNotExistError();
			}
			res.json(updatedCase);
		} catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async getUserCases(req, res) {
		const userId = req.userId;
		try {
			// TODO use only apply one query based on the user type
			const cases = [
				...(await Case.query(req.query, { judge: userId })),
				...((await Party.find({ lawyer: userId }).populate("case"))
					.map(party => party.case))
			]
			if(cases.length === 0) {
				throw new NoCasesFoundError();
			}
			res.json(cases);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async getPublicCases(req, res) {
		try {
			const cases = await Case.qyery(req.query, { public: true });
			if(cases.length === 0) {
				throw new NoCasesFoundError();
			}
			res.json(cases);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async getCases(req, res) {
		try {
			const cases = await Case.query(req.query);
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
            const case_ = await Case.findById(id)
			.populate("court judge events")
            .populate({ path: "parties", populate: { path: "lawyer client" } })
			.exec();
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
		const { caseId, title, description, status, court, judge } = req.body
		try{
			CaseValidator.validateUpdateCaseData({ caseId, title, description, status, court, judge });
			const updatedCase = await Case.findByIdAndUpdate(caseId, {$set: { title, description, status, court, judge }}, { new: true });
			if(updatedCase === null) {
				throw new CaseDoesNotExistError();
			}
			res.json(updatedCase);
		} catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async updateCaseStatus(req, res) {	
		const { _id, status } = req.body
		try{
			CaseValidator.validateUpdateCaseStatusData({ _id, status });
			const updatedCase = await Case.findByIdAndUpdate(_id, {$set: { status }}, { new: true });
			if(updatedCase === null) {
				throw new CaseDoesNotExistError();
			}
			res.json(updatedCase);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async updateNote(req, res) {
		const { caseId, note } = req.body;
		const userId = req.userId;
		try {
			GenericValidator.validateObjectId(caseId);
			GenericValidator.validateNotEmpty([note]);

			const case_ = await Case.findById(caseId)
				.populate("parties").exec();
			if(case_ === null) {
				throw new CaseDoesNotExistError();
			}

			if(userId == case_.judge) {
				case_.judgeNote = note;
			}
			else if(case_.parties.length && userId == case_.parties[0]) {
				case_.claimantLawyerNote = note;
			}
			else if(case_.parties.length === 2 && userId == case_.parties[1]) {
				case_.respondantLawyerNote = note;
			}
			else {
				throw new NotAuthorizedError();
			}
			
			case_.save();
			res.send(case_);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}
}

const casesController = new CasesController();
export default casesController;