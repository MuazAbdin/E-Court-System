import Stakeholder from "../models/stakeholder.model";

class StakeholdersController {
	createStakeholder(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getStakeholderById(req, res) {
		const { stackHoldlerId } = req.params;
		try {
			const stackHoldler = await Stakeholder.findById(stackHoldlerId);
			res.json(stackHoldler);
		} catch {
			res.sendStatus(500);
		}
	}

	async getStakeholderByPartyId(req, res) {
		const { partyId } = req.params;
		try {
			const stackHoldler = await Stakeholder.find({ party: partyId });
			res.json(stackHoldler);
		} catch {
			res.sendStatus(500);
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
