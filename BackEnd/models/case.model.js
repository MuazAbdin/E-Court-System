import { model, Schema } from 'mongoose';
import dbUtils from '../utils/db.utils.js';
import { DBConfig } from '../config.js'

const caseSchema = new Schema({
    caseNumber: { type: String, required: true, unique: true, default: getCaseNumber },
    status: { type: String, required: true, enum: DBConfig.CASE_STATUS_TYPES },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: Schema.Types.ObjectId, ref: "Court", required: true },
    judge: { type: Schema.Types.ObjectId, ref: "User" },
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }],
        default: []
    },
    parties: {
        type: [{ type: Schema.Types.ObjectId, ref: "Party" }],
        default: []
    },
    judgeNotes: { type: String, default: "" },
    claimantLawyerNotes: { type: String, default: "" },
    respondentLawyerNotes: { type: String, default: "" },
    public: { type: Boolean, default: false }
}, { timestamps: true })

caseSchema.statics.caseNumberCounter = 1;
caseSchema.statics.query = async function(queries, mainQuery) {
    const offset = queries.offset ? queries.offset : 0;
    const limit = queries.limit && queries.limit > 0 ? queries.limit : 10;
    const dbMainQuery = mainQuery ? mainQuery : {} ;
    const dbQuery = [];

    if(queries.query) {
        dbQuery.push({ 
            $or: [
                { caseNumber: { $regex: queries.query, $options: "i"} },
                { title: { $regex: queries.query, $options: "i"} }
            ]
        });
    }

    if(queries.start) {
        const startDate = new Date(queries.start);
        dbQuery.push({
            createdAt: {
                $gte: startDate,
            }
        });
    }
    if(queries.end) {
        const endDate = new Date(queries.end);
        endDate.setDate(endDate.getDate() + 1);
        dbQuery.push({
            createdAt: {
                $lte: endDate,
            }
        });
    }

    if(queries.status) {
        dbQuery.push({ 
            status: { $in: queries.status.split(",") } 
        });
    }

    if(dbQuery.length) {
        if(dbMainQuery) {
            dbQuery.push(dbMainQuery);
        }

        const pagesCount = Math.ceil((await this.countDocuments({
            $and: dbQuery 
        })) / limit)
        const result = await this.find({
            $and: dbQuery 
        }) 
        .skip(offset)
        .limit(limit)
            .populate("court judge events")
            .populate({ path: "parties", populate: { path: "lawyer client" } })
        .exec()

        return {
            pagesCount,
            result
        };
    }
    else {
        const pagesCount = Math.ceil((await this.countDocuments(dbMainQuery)) / limit);
        const result = await this.find(dbMainQuery)
            .skip(offset)
            .limit(limit)
            .populate("court judge events")
            .populate({ path: "parties", populate: { path: "lawyer client" } })
            .exec()

        return {
            pagesCount,
            result
        };
    }
}

const Case = model("Case", caseSchema, "Case");
dbUtils.setFieldCounter(Case, "caseNumber", "caseNumberCounter", 1);

function getCaseNumber() {
    return dbUtils.getCounterAndIncrement(Case, "caseNumberCounter") + "";
}

export default Case;