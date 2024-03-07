import { model, Schema } from 'mongoose';

const eventSchema = new Schema({
    case: { type: Schema.Types.ObjectId, ref: "Case", required: true },
    type: { type: String, required: true, 
        enum: [ "General" ] },
    date: { type: Date, required: true },
    description: { type: String, required: true }
})

const Event = model("Event", eventSchema, "Event");

export default Event;