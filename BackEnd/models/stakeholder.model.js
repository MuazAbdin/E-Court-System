import { model, Schema } from 'mongoose';

const stakeholderSchema = new Schema({
    party: { type: Schema.Types.ObjectId, ref: 'Party', required: true },
    idNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true }
})

const Stakeholder = model("Stakeholder", stakeholderSchema, "Stakeholder");

export default Stakeholder;