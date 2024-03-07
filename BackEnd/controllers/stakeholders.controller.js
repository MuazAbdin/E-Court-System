import errorHandler from "../errors/errorHandler.js";
import { NoStakeholdersFoundError, StakeholderDoesNotExistError } from "../errors/stakeholders.error.js";
import Stakeholder from "../models/stakeholder.model.js";

class StakeholdersController {
	createStakeholder(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getStakeholderById(req, res) {
		const { id } = req.params;
		try {
			const stackHoldler = await Stakeholder.findById(id);
			if(stackHoldler === null){
				throw new StakeholderDoesNotExistError()
			}
			res.json(stackHoldler);
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

	deleteStakeholder(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const stakeholdersController = new StakeholdersController();
export default stakeholdersController;
