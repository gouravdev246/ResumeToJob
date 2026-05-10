import similarity from 'compute-cosine-similarity'

// import { PdfData } from '../models/pdf-data.model.js'
// import { JobData } from '../models/jobs.model.js'


export const calculateCosineSimilarity = async (resumeData , jobData)=>{

    const similarity_vec = similarity(resumeData , jobData)
    return similarity_vec ;

}