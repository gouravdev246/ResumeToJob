import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { PdfData } from "../models/pdf-data.model.js";
import { RawPdfData } from "../models/rawpdf.model.js";
import { internshala } from "../scrappers/apify.scrapper.js";
import {normalizeInternshalaJob} from '../normalization/restructureScrapper.js'
import { JobData } from "../models/jobs.model.js";
import { calculateCosineSimilarity } from "../services/cosine-similarity.js";
import { generateEmbedding } from "../services/convert-embeddings.js";



const jobRanking = async (req , res) =>{
    try{
        const userId = req.user?._id;
        const userData = await PdfData.findOne({ author: userId });

        if (!userData || !userData.pdfdata || !userData.pdfdata.preferences_role || !userData.pdfdata.preferences_role.length) {
            return res.status(400).json({ message: "User resume data or preferred role not found." });
        }
        const role = userData.pdfdata.preferences_role[0]?.role;
        if (!role) {
            return res.status(400).json({ message: "Preferred role is missing in resume data." });
        }
        const scrapData = await internshala(role);

        if (!scrapData || scrapData.length === 0) {
            return res.status(404).json({ message: "No jobs found for the specified role." });
        }

        const reStructure = await Promise.all(scrapData.map(async (job) => {
            const normalizedJob = await normalizeInternshalaJob(job);
            
            // Combine title and skills for the embedding text
            const skillsText = Array.isArray(normalizedJob.skills) 
                ? normalizedJob.skills.join(", ") 
                : (normalizedJob.skills || "");
                
            const textToEmbed = `${normalizedJob.title}. Skills: ${skillsText}`;
            
            // Generate embedding and attach it to the job object
            normalizedJob.embeddings = await generateEmbedding(textToEmbed);
            const pdf_emd = userData.pdfdata.resume_embedding ;

            normalizedJob.rank_score = await calculateCosineSimilarity(pdf_emd , normalizedJob.embeddings)
            
            
            return normalizedJob;
        }));

        const newJobData = await JobData.findOneAndUpdate(
            { author: userId },
            { jobdata: reStructure },
            { new: true, upsert: true }
        );
        
        return res.status(200).json({ message: "Done", newjob: newJobData });
    }catch(err){
        console.log("Error in job Ranking " , err) ;
    }
}



const getRankedJobs = async (req , res) =>{
    try {
        const userID = req.user?._id;
        const jobs = await JobData.findOne({author : userID }).sort({ createdAt: -1 });
        
        if (!jobs || !jobs.jobdata) {
            return res.status(404).json({ message: "No ranked jobs found. Please generate jobs first." });
        }
        
        // Sort descending: Higher cosine similarity means a better match
        const sortedjobs = [...jobs.jobdata].sort((a , b ) => b.rank_score - a.rank_score);
        
        return res.status(200).json({jobs : sortedjobs});
    } catch (error) {
        console.error("Error fetching ranked jobs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export {jobRanking , getRankedJobs} ;