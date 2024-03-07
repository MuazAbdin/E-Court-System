import errorHandler from "../errors/errorHandler.js";
import { PartyDoesNotExistError } from "../errors/party.error.js";
import Party from "../models/party.model.js";

class PartiesController {
	createParty(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getPartyById(req, res) {
		const { id } = req.params;
		try {
			const party = await Party.findById(id);
			if(party === null) {
				throw new PartyDoesNotExistError();
			}
			res.json(party);
		} catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async getPartyByCaseId(req, res) {
		const { caseId } = req.params;
		try {
			const party = await Party.find({ case: caseId });
			res.json(party);
		} catch(error) {
			res.sendStatus(500);
		}
	}

	updateParty(req, res) {
		res.status(404).send("Work In Progress!");
	}

	deleteParty(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const partiesController = new PartiesController();
export default partiesController;
