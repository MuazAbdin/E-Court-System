import Court from "../models/court.model.js";

class CourtsController {
	createCourt(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getCourtById(req, res) {
		const { id } = req.params;
		try {
			const court = await Court.findById(courtId);
			res.json(court);
		} catch {
			res.sendStatus(500);
		}
	}

	updateCourt(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const courtsController = new CourtsController();
export default courtsController;
