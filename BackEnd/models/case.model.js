import { model, Schema } from 'mongoose';
import dbUtils from '../utils/db.utils';

const caseSchema = new Schema({
    caseNumber: { type: Number, required: true, unique: true, default: getCaseNumber },
    status: { type: Schema.Types.ObjectId, ref: "CaseStatusType", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: Schema.Types.ObjectId, ref: "Court", required: true },
    judges: { 
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
    creationDate: { type: Date, default: Date.now },
    lastUpdateDate: { type: Date, default: null },
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }],
        default: []
     },
    parties: {
        type: [{ type: Schema.Types.ObjectId, ref: "Party" }],
        default: []
     }
})

caseSchema.statics.caseNumberCounter = 1;

const Case = model("Case", caseSchema, "Case");
dbUtils.setFieldCounter(Case, "caseNumber", "caseNumberCounter", 1);

function getCaseNumber() {
    return dbUtils.getCounterAndIncrement(Case, "caseNumberCounter");
}

export default Case;