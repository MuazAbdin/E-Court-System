import { model, Schema } from 'mongoose';
import { PartyDoesNotExistError } from '../errors/party.error.js';
import dbUtils from '../utils/db.utils.js';
import { DBConfig } from '../config.js';

const partySchema = new Schema({
    name: { type: String, required: true, enum: DBConfig.PARTY_NAMES },
    lawyer: { type: Schema.Types.ObjectId, ref: "User" },
    client: { type: Schema.Types.ObjectId, ref: "Stakeholder", required: true },
    stakeholders: {
        type: [{ type: Schema.Types.ObjectId, ref: "Stakeholder" }],
        default: []
    },
    case: { type: Schema.Types.ObjectId, ref: "Case", required: true }
})

partySchema.statics.softDelete = dbUtils.createSoftDeleteFunction(PartyDoesNotExistError);

const Party = model("Party", partySchema, "Party");

export default Party;