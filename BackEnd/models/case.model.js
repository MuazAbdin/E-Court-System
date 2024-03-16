import { model, Schema } from 'mongoose';
import dbUtils from '../utils/db.utils.js';
import { DBConfig } from '../config.js'

const caseSchema = new Schema({
    caseNumber: { type: String, required: true, unique: true, default: getCaseNumber },
    status: { type: String, required: true, enum: DBConfig.CASE_STATUS_TYPES },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: Schema.Types.ObjectId, ref: "Court", required: true },
    judge: { type: Schema.Types.ObjectId, ref: "User"},
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }],
        default: []
    },
    parties: {
        type: [{ type: Schema.Types.ObjectId, ref: "Party" }],
        default: []
    },
    public: { type: Boolean, default: false }
}, { timestamps: true })

caseSchema.statics.caseNumberCounter = 1;
caseSchema.statics.query = function(queries, mainQuery) {
    const offset = queries.offset ? queries.offset : 0;
    const limit = queries.limit ? queries.limit : 10;
    const dbMainQuery = mainQuery ? mainQuery : {} ;
    const dbQuery = [];

    console.log(queries)

    if(queries.query) {
        dbQuery.push({ 
            $or: [
                { caseNumber: { $regex: queries.query, $options: "i"} },
                { title: { $regex: queries.query, $options: "i"} }
            ]
        });
    }

    if(queries.start && queries.end) {
        dbQuery.push({
            createdAt: {
                $gte: queries.start,
                $lte: queries.end
            }
        });
    }
    else if(queries.start) {
        dbQuery.push({
            createdAt: {
                $gte: queries.start,
            }
        });
    }
    else if(queries.end) {
        dbQuery.push({
            createdAt: {
                $lte: queries.end,
            }
        });
    }

    if(queries.status) {
        dbQuery.push({ 
            status: queries.status 
        });
    }

    if(dbQuery.length) {
        if(dbMainQuery) {
            dbQuery.push(dbMainQuery);
        }

        return this.find({
                $and: dbQuery 
            })
            .skip(offset * limit)
            .limit(limit);
    }
    else {
        return this.find(dbMainQuery)
            .skip(offset * limit)
            .limit(limit);
    }
}

const Case = model("Case", caseSchema, "Case");
dbUtils.setFieldCounter(Case, "caseNumber", "caseNumberCounter", 1);

function getCaseNumber() {
    return dbUtils.getCounterAndIncrement(Case, "caseNumberCounter") + "";
}

export default Case;