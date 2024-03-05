import { model, Schema } from 'mongoose';

const partySchema = new Schema({
    name: { type: String, required: true },
    lawyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stakeholders: {
        type: [{ type: Schema.Types.ObjectId, ref: "Stakeholder" }],
        default: []
    },
    case: { type: Schema.Types.ObjectId, ref: "Case", required: true }
})

const Party = model("Party", partySchema, "Party");

export default Party;