import { model, Schema } from 'mongoose';

const courtSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true}
})

const Court = model("Court", courtSchema, "Court");

export default Court;