import { model, Schema } from 'mongoose';

const documentSchema = new Schema({
    case: { type: Schema.Types.ObjectId, ref: "Case", required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    fileLocation: { type: String, required: true },
    fileName: { type: String, required: true }
})

const Document = model("Document", documentSchema, "Document");

export default Document;