import mongoose from "mongoose";

const RawPdfSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rawdata : { type: String  }
}, { timestamps: true });

export const RawPdfData = mongoose.model('RawPdfData', RawPdfSchema);