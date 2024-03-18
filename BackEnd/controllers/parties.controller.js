import { DBConfig } from "../config.js";
import errorHandler from "../errors/errorHandler.js";
import { NoPartiesFoundError, PartyDoesNotExistError } from "../errors/party.error.js";
import Case from "../models/case.model.js";
import Party from "../models/party.model.js";
import Stakeholder from "../models/stakeholder.model.js";
import dbUtils from "../utils/db.utils.js";
import GenericValidator from "../validators/generic.validate.js";
import PartyValidator from "../validators/parties.validate.js";
import StakeholderValidator from "../validators/stakeholders.validate.js";

class PartiesController {
	async createParty(req, res) {
		const { lawyer, client, caseId, stakeholders } = req.body;
		// Saves created Documents to delete them on faliure/error
		const savedDocs = [];
		try {
			await PartyValidator.validatePartyData({ client, lawyer, caseId })
			if(stakeholders) {
				for(const stakeholder of stakeholders) {
					StakeholderValidator.validateStakeholderData(stakeholder);
				}
			}

			const newParty = new Party({ lawyer, case: caseId, name: DBConfig.PARTY_NAMES[1] });

			const { idNumber, firstName, lastName, email, phoneNumber, city, street } = client;
			const newClient = new Stakeholder({ type: DBConfig.STAKEHOLDER_TYPES[0], party: newParty._id, idNumber, firstName, lastName, email, phoneNumber, city, street });

			const newStakeholders = [];
			if(stakeholders) {
				for(const stakeholder of stakeholders) {
					const { stakeholderType, newParty, idNumber, firstName, lastName, email, phoneNumber, city, street } = stakeholder;
					newStakeholders.push(
						new Stakeholder({ type: stakeholderType, party: newParty, idNumber, firstName, lastName, email, phoneNumber, city, street }));
				}
			}

			newParty.client = newClient;
			newParty.stakeholders = newStakeholders;
			newParty.save();
			savedDocs.push(newParty);
			newClient.save();
			savedDocs.push(newClient);
			for(const stakeholder of newStakeholders) {
				stakeholder.save();
				savedDocs.push(stakeholder);
			}

			await Case.findByIdAndUpdate(caseId, {$push: { parties: newParty }})

			res.send(newParty);
		}
		catch(error) {
			dbUtils.deleteDocuments(savedDocs);
			errorHandler.handleError(res, error);
		}
	}

	async getPartyById(req, res) {
		const { id } = req.params;
		try {
			const party = await Party.findById(id);
			if( party === null) {
				throw new PartyDoesNotExistError()
			}
			res.json(party);
		} catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async getPartyByCaseId(req, res) {
		const { caseId } = req.params;
		try {
			const parties = await Party.find({ case: caseId });
			if(parties.length === 0 ){
				throw new NoPartiesFoundError()
			}
			res.json(parties);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async updateParty(req, res) {
		const { partyId, lawyer } = req.body
		try {
			PartyValidator.validateUpdatePartyData(req.body);
			const updatedParty = await Party.findByIdAndUpdate(partyId, {$set: { lawyer  }}, { new: true });
			if(updatedParty === null) {
				throw new PartyDoesNotExistError();
			}
			res.json(updatedParty);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async deleteParty(req, res) {
		const { partyId } = req.body;
		try {
			GenericValidator.validateObjectId(partyId);
			await Party.softDelete(partyId);
			res.sendStatus(204);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}
}

const partiesController = new PartiesController();
export default partiesController;
