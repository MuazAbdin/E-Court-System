import errorHandler from "../errors/errorHandler.js";
import { NoStakeholdersFoundError, StakeholderDoesNotExistError } from "../errors/stakeholders.error.js";
import Stakeholder from "../models/stakeholder.model.js";
import GenericValidator from "../validators/generic.validate.js";

class StakeholdersController {
	createStakeholder(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getStakeholderById(req, res) {
		const { id } = req.params;
		try {
			const stackHoldlers = await Stakeholder.findById(id);
			if(stackHoldlers === null){
				throw new StakeholderDoesNotExistError()
			}
			res.json(stackHoldlers);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async getStakeholderByPartyId(req, res) {
		const { partyId } = req.params;
		try {
			const stackHoldler = await Stakeholder.find({ party: partyId });               
			if( stackHoldler.length === 0){
				throw new NoStakeholdersFoundError()
			}
			res.json(stackHoldler);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	} 

	updateStakeholder(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async deleteStakeholder(req, res) {
		const { stakeholderId } = req.body;
		try {
			GenericValidator.validateObjectId(stakeholderId);
			await Stakeholder.softDelete(stakeholderId);
			res.sendStatus(204);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}
}

const stakeholdersController = new StakeholdersController();
export default stakeholdersController;
