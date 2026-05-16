export const getRankedJobs = async (jobs) =>{      
        // Sort descending: Higher cosine similarity means a better match
        const sortedjobs = [...jobs.jobdata].sort((a , b ) => b.rank_score - a.rank_score);
        
        return sortedjobs;
   
    
}

