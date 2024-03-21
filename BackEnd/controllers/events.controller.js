import { StatusCodes } from "http-status-codes";
import errorHandler from "../errors/errorHandler.js";
import { EventDoesNotExistError, NoEventsFoundError, NoEventTypesFoundError } from "../errors/event.error.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import GenericValidator from "../validators/generic.validate.js";
import { DBConfig } from "../config.js";
import EventValidator from "../validators/events.validate.js";
import Case from "../models/case.model.js";
import Court from "../models/court.model.js";
import notificationsManager from "../utils/notifications.utils.js";
import { CaseDoesNotExistError } from "../errors/case.error.js";
import { UserDoesNotExistError } from "../errors/user.error.js";
import Party from "../models/party.model.js";

class EventsController {
	async createEvent(req, res) {
		const { caseId, eventType, date, description } = req.body;
		try {
			EventValidator.validateEventData({ caseId, eventType, date, description });

			const court = (await Case.findById(caseId).populate("court")).court;
			const location = court.city;

			const newEvent = await Event.create({case: caseId, type: eventType, date, description, location});
			const case_ = await Case.findByIdAndUpdate(caseId, { $push: { events: newEvent }}, { new: true })
			.populate({ path: "parties", populate: { path: "lawyer client stakeholders" } }).exec();

			if(case_ === null) {
				await Event.findByIdAndDelete(newEvent._id);
				throw new CaseDoesNotExistError();
			}

			const notifiedUsers = [];
			for(const party of case_.parties) {
				party.lawyer && notifiedUsers.push({ type: "Lawyer", email: party.lawyer.email, phoneNumber: party.lawyer.phoneNumber });
				notifiedUsers.push({ type: "client", email: party.client.email, phoneNumber: party.client.phoneNumber });
				for(const stakeholder of party.stakeholders) {
					notifiedUsers.push({ type: "stakeholder", email: stakeholder.email, phoneNumber: stakeholder.phoneNumber });
				}
			}

			notificationsManager.sendEventNotifications(
				date, newEvent.type, case_.title, newEvent.location, 
				notifiedUsers
			);

			res.send(newEvent);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

    async getUpcomingEvents(req, res) {
		const userId = req.userId;
		const userType = req.userType;
		try {
			const caseIds = userType === "Judge" ?
				(await Case.find({ judge: userId })).map(c => c._id) :
				(await Party.find({ lawyer: userId })).map(p => p.case);

			const events = await Event.find({ case: { $in: caseIds }, date: { $gte: Date.now() } }).sort({ date: 1 });
			res.send(events);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
    }

	async getEventById(req, res) {
		const { id } = req.params;
		try {
			const event = await Event.findById(id);
			if( event === null){
				throw new EventDoesNotExistError()
			}
			res.json(event);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async updateEvent(req, res) {
		const { eventId, date, description } = req.body;
		try {
			EventValidator.validateUpdateEventData(req.body);
			const updatedEvent = await Event.findByIdAndUpdate(eventId, {$set: { date, description }}, { new: true });
			if(updatedEvent === null) {
				throw new EventDoesNotExistError();
			}
			res.json(updatedEvent);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	getEventTypes(req, res) {
        try {
            res.json(DBConfig.EVENT_TYPES);
		} catch (error) {
            errorHandler.handleError(res, error); 
        }
	}
	
    async getEventsByCaseId(req, res) {
        const { caseId } = req.params;
        try {
            const events = await Event.find({ case: caseId });
            if (events.length === 0) {
                throw new NoEventsFoundError();
            }
            res.json(events);
        } catch (error) {
            return errorHandler.handleError(res, error);
        }
    }


	async deleteEvent(req, res) {
		const { eventId } = req.body;
		try {
			GenericValidator.validateObjectId(eventId);
			await Event.softDelete(eventId);
			res.sendStatus(204);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}
}

const eventsController = new EventsController();
export default eventsController;
