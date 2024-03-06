import Event from "../models/event.model.js";

class EventsController {
	createEvent(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getEventsByCaseId(req, res) {
		const { caseId } = req.params;
		try {
			const events = await Event.find({ case: caseId });
			res.json(events);
		} catch {
			res.sendStatus(500);
		}
	}

	getEventById(req, res) {
		res.status(404).send("Work In Progress!");
	}

	updateEvent(req, res) {
		res.status(404).send("Work In Progress!");
	}

	deleteEvent(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const eventsController = new EventsController();
export default eventsController;
