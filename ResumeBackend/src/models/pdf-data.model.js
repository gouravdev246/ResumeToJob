import mongoose from "mongoose";

const PdfDataSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pdfdata: { type: Object, required: true }
}, { timestamps: true });

export const PdfData = mongoose.model('PdfData', PdfDataSchema);