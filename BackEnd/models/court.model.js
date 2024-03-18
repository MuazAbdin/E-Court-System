import { model, Schema } from 'mongoose';

const courtSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    judges: { 
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
    email: { type: String, required: true, lowercase: true}
})

courtSchema.statics.getAllCourtsWithJudgeName = async function() {
    const courts = await Court.find().populate("judges");
    for(const court of courts) {
        for(const judge of court.judges) {
            [ 
                judge.idNumber,
                judge.email,
                judge.phoneNumber,
                judge.city,
                judge.street,
                judge.licenseNumber,
                judge.documents 
            ] = []; // set values to undefind
        }
    }
    return courts
}

courtSchema.statics.getCourtByIdWithJudgeName = async function(id) {
    const court = await Court.findById(id).populate("judges");
    for(const judge of court.judges) {
        [ 
            judge.idNumber,
            judge.email,
            judge.phoneNumber,
            judge.city,
            judge.street,
            judge.licenseNumber,
            judge.documents 
        ] = []; // set values to undefind
    }
    return court;
}

const Court = model("Court", courtSchema, "Court");

export default Court;