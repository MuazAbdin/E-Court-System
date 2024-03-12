import { model, Schema } from 'mongoose';
import dbUtils from '../utils/db.utils.js';
import { EventDoesNotExistError } from '../errors/event.error.js';
import { DBConfig } from '../config.js';

const eventSchema = new Schema({
    case: { type: Schema.Types.ObjectId, ref: "Case", required: true },
    type: { type: String, required: true,  enum: DBConfig.EVENT_TYPES },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true }
})

eventSchema.statics.softDelete = dbUtils.createSoftDeleteFunction(EventDoesNotExistError);

const Event = model("Event", eventSchema, "Event");

export default Event;