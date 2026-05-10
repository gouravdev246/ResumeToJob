import { extractResumeToJSON } from "../scrappers/pdf-to-json.js";
import { PdfData } from "../models/pdf-data.model.js";
import { User } from '../models/user.model.js';
import { RawPdfData } from "../models/rawpdf.model.js";
import { generateEmbedding } from "../services/convert-embeddings.js";
import fs from 'fs';

const pdf_to_json = async (req, res) => {
    try {
        const userId = req.user?._id;
        
        // Check if the user already has parsed resume data
        if (userId) {
            const existingPdfData = await PdfData.findOne({ author: userId });
            if (existingPdfData) {
                return res.status(200).json({
                    message: "Resume data already exists and fetched successfully",
                    data: existingPdfData
                });
            }
        }
        
        if (!req.file) {
            return res.status(400).json({ message: "No PDF file uploaded" });
        }
        
        const filePath = req.file.path;
        const { parsedData , rawText } = await extractResumeToJSON(filePath);
        
        // Delete the file after extracting text to free up space
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        const skillsText = Array.isArray(parsedData.skills) 
                ? parsedData.skills.join(", ") 
                : (parsedData.skills || "");
                
        const projectsText = Array.isArray(parsedData.projects) 
                ? parsedData.projects.map(p => `${p.projectname} - ${p.projectsummary}`).join(" | ") 
                : "";
                
        const prefRoles = Array.isArray(parsedData.preferences_role) ? parsedData.preferences_role.map(p => p.role).join(", ") : "";
        const expRoles = Array.isArray(parsedData.experience) ? parsedData.experience.map(e => e.role).join(", ") : "";
        const rolesText = [prefRoles, expRoles].filter(Boolean).join(", ");

        const textToEmbed = `Roles: ${rolesText}. Skills: ${skillsText}. Projects: ${projectsText}`;
        
        // Generate the embedding and store it in parsedData
        parsedData.resume_embedding = await generateEmbedding(textToEmbed);
                
        const newRawData = new RawPdfData({
            author : userId ,
            rawdata : rawText 
        })
        await newRawData.save() ;


        const newPdfRecord = new PdfData({
            author : userId ,
            pdfdata: parsedData
        });
        await newPdfRecord.save();
        return res.json({ 
            message: "Resume parsed and saved successfully!", 
            data: newPdfRecord 
        });
    } catch (error) {
        console.error("Error processing and saving PDF:", error);
        return res.status(500).json({ error: "Failed to process and save resume." });
    }
}


const deleteExsistingData = async (req , res) =>{
    try{
        const userId = req.user?._id; 
        const pdfdata = await PdfData.findOneAndDelete({author : userId})
        return res.status(200).json({message : "PDF deleted!!"})


        

    }catch(err){
        console.log("Error in Delete " , err)
    }

}
export { pdf_to_json , deleteExsistingData};