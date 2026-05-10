import mongoose from "mongoose";

const JobDataSchema =new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    jobdata: { 
        type: Object ,

    }
    
}, { timestamps: true });

export const JobData = mongoose.model('JobData', JobDataSchema);