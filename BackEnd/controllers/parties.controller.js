import { DBConfig } from "../config.js";
import errorHandler from "../errors/errorHandler.js";
import { NoPartiesFoundError, PartyDoesNotExistError } from "../errors/party.error.js";
import Party from "../models/party.model.js";
import Stakeholder from "../models/stakeholder.model.js";
import GenericValidator from "../validators/generic.validate.js";
import PartyValidator from "../validators/parties.validate.js";
import StackholderValidator from "../validators/stackholders.validate.js";

class PartiesController {
	async createParty(req, res) {
		// TODO - possibly delete saved Documents if an error happens!
		const { lawyer, client, caseId, stakeholders } = req.body;
		try {
			PartyValidator.validatePartyData({ client, lawyer, caseId })
			for(const stakeholder of stakeholders) {
				StackholderValidator.validateStackholderData(stakeholder);
			}

			const newParty = new Party({ lawyer, case: caseId, name: DBConfig.PARTY_NAMES[1] });

			const { idNumber, firstName, lastName, email, phoneNumber, city, street } = client;
			const newClient = new Stakeholder({ type: DBConfig.STAKEHOLDER_TYPES[0], newParty, idNumber, firstName, lastName, email, phoneNumber, city, street });

			const newStakeholders = [];
			for(const stakeholder of stakeholders) {
				const { stakeholderType, newParty, idNumber, firstName, lastName, email, phoneNumber, city, street } = stakeholder;
				newStakeholders.push(
					new Stakeholder({ type: stakeholderType, party: newParty, idNumber, firstName, lastName, email, phoneNumber, city, street }));
			}

			newParty.client = newClient;
			newParty.stakeholders = newStakeholders;
			newParty.save();
			newClient.save();
			for(const stakeholder of stakeholders) {
				stakeholder.save();
			}

			res.send(newParty);
		}
		catch(error) {
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

	updateParty(req, res) {
		res.status(404).send("Work In Progress!");
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
