import { model, Schema } from 'mongoose';

const stakeholderSchema = new Schema({
    party,
    idNumber,
    firstName,
    lastName,
    email,
    phoneNumber,
    city,
    street
})

const Stakeholder = model("Stakeholder", stakeholderSchema, "Stakeholder");

export default Stakeholder;