import errorHandler from "../errors/errorHandler.js";
import { NoStakeholdersFoundError, StakeholderDoesNotExistError } from "../errors/stakeholders.error.js";
import Stakeholder from "../models/stakeholder.model.js";
import StackholderValidator from "../validators/stackholders.validate.js";

class StakeholdersController {
	
	async createStakeholder(req, res) {
		    const { partyId, idNumber, firstName, lastName, email, phoneNumber, city, street } = req.body;
		try {
			StackholderValidator.validateStackholderData(req.body);
			const stackholder = await Stakeholder.create({ partyId, idNumber, firstName, lastName, email, phoneNumber, city, street });
			res.json(stackholder);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
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

	deleteStakeholder(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const stakeholdersController = new StakeholdersController();
export default stakeholdersController;
