import errorHandler from "../errors/errorHandler.js";
import { NoPartiesFoundError, PartyDoesNotExistError } from "../errors/party.error.js";
import Party from "../models/party.model.js";
import GenericValidator from "../validators/generic.validate.js";
import PartyValidator from "../validators/party.validate.js";

class PartiesController {
	createParty(req, res) {
		res.status(404).send("Work In Progress!");
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
		const { partyId, partyName, lawyer } = req.body
		try {
			GenericValidator.validateObjectId(partyId);
			PartyValidator.validatePartyData({ partyName, lawyer });
			const updatedParty = await Party.findByIdAndUpdate(partyId, {$set: { partyName, lawyer  }}, { new: true });
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
