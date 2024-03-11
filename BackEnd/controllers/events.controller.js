import { StatusCodes } from "http-status-codes";
import errorHandler from "../errors/errorHandler.js";
import { EventDoesNotExistError, NoEventsFoundError, NoEventTypesFoundError } from "../errors/event.error.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import GenericValidator from "../validators/generic.validate.js";
import { dbConfig } from "../config.js";

class EventsController {
    createEvent(req, res) {
        res.status(404).send("Work In Progress!");
    }

    async getUpcomingEvents(req, res) {
        // console.log(req);
        const user = await User.findOne({ _id: req.userId });
        // console.log(user);
        res.status(StatusCodes.OK).send({ user });
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
  
	getEventTypes(req, res) {
        try {
            res.json(dbConfig.EVENT_TYPES);
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

    updateEvent(req, res) {
        res.status(404).send("Work In Progress!");
    }
}

const eventsController = new EventsController();
export default eventsController;
