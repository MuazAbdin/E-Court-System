import { model, Schema } from 'mongoose';
import dbUtils from '../utils/db.utils.js';

const caseSchema = new Schema({
    caseNumber: { type: String, unique: true, default: getCaseNumber },
    status: { type: String, required: true,
         enum: ["Created", "Closed"] },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: Schema.Types.ObjectId, ref: "Court", required: true },
    judges: { 
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
    creationDate: { type: Date, required: true, default: Date.now },
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
caseSchema.statics.query = function(query) {
    if(query) {
        return Case.find({
        $or: [
                { caseNumber: { $regex: query, $options: "i"} },
                { title: { $regex: query, $options: "i"} },
              ],
        })
    }
    else {
        return Case.find({});
    }
}

const Case = model("Case", caseSchema, "Case");
dbUtils.setFieldCounter(Case, "caseNumber", "caseNumberCounter", 1);

function getCaseNumber() {
    return dbUtils.getCounterAndIncrement(Case, "caseNumberCounter") + "";
}

export default Case;