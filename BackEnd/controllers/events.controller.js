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

	async getEventById(req, res) {
		const { id } = req.params;
		try {
			const event = await Event.findById(id);
			res.json(event);
		} catch {
			res.sendStatus(500);
		}
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
