import { model, Schema } from 'mongoose';
import { PartyDoesNotExistError } from '../errors/party.error.js';
import dbUtils from '../utils/db.utils.js';

const partySchema = new Schema({
    name: { type: String, required: true },
    lawyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stakeholders: {
        type: [{ type: Schema.Types.ObjectId, ref: "Stakeholder" }],
        default: []
    },
    case: { type: Schema.Types.ObjectId, ref: "Case", required: true }
})

partySchema.statics.softDelete = dbUtils.createSoftDeleteFunction(PartyDoesNotExistError);

const Party = model("Party", partySchema, "Party");

export default Party;