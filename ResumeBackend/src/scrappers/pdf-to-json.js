import { readFile } from 'node:fs/promises';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import OpenAI from 'openai';
import { RawPdfData } from '../models/rawpdf.model.js';

/**
 * Extracts and cleans text from a PDF resume using ESM.
 * @param {string} filePath - The path to the resume file.
 * @returns {Promise<string>} - The parsed text content.
 * 
 */


// client will be instantiated inside the function to ensure dotenv has loaded



export const extractResumeToJSON = async (filePath) => {
  try {
    const client = new OpenAI({
      baseURL: 'https://api.studio.nebius.ai/v1/',
      apiKey: process.env.NEBIUS_API_KEY,
    });
    
    // 1. PDF Text Extraction
    const dataBuffer = await readFile(filePath);
    const pdfData = await pdf(dataBuffer);
    const rawText = pdfData.text.replace(/\s+/g, ' ').trim();

    console.log("Text Abstracting start")

    // 2. AI Parsing with Nebius
    const response = await client.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct", // Replace with your preferred Nebius model ID
      messages: [
        {
          role: "system",
          content: `You are a specialized Resume Parser. Your task is to extract data from the provided text into a clean JSON format.
          Return ONLY valid JSON.
          Schema:
          {
            "full_name": "string",
            "contact": { "email": "string", "phone": "string" },
            "skills": ["string"],
            "experience": [{ "role": "string", "company": "string", "years": "string" }],
            "projects" : [{"projectname" : "string" , "projectsummary" : "string" , "projectlink" : "string" }] ,
            "education": [{ "degree": "string", "university": "string" }] ,
            "preferences_role" : [{"role : "string" }] , // based on resume specify a role 
            "resume_embedding" : [] // return an empty array 
          }`
        },
        {
          role: "user",
          content: `Extract details from this resume text: ${rawText}`
        }
      ],
      // Note: Check if your specific Nebius model supports response_format: { type: "json_object" }
      // If not, the system prompt above is usually enough for Llama-3 models.
    });

    // 3. Parse and return
    let content = response.choices[0].message.content;
    
    // Remove markdown code block formatting if the model included it
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return {
      parsedData: JSON.parse(content),
      rawText: rawText
    };

  } catch (error) {
    console.error("Extraction Pipeline Error:", error);
    throw new Error("Failed to process resume via Nebius AI.");
  }
};
