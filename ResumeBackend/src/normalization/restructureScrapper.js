// import { normalizeSkills } from "./normalizeSkiils.js";

function normalizeTitle(title) {
  return title
    .replace(/internship/i, "Intern")
    .trim();
}



export async function normalizeInternshalaJob(job) {
  return {
    id: job.listingId,

    source: "Internshala",

    title: normalizeTitle(job.title),

    company: job.company,

    companyUrl: job.companyUrl || "",

    employmentType:
      job.listingType === "internships"
        ? "Internship"
        : "Full-time",

    category: job.category || "",

    location: job.location,

    remote: job.isRemote || false,

    salary: {
      min: job.stipendMin || 0,
      max: job.stipendMax || 0,
      currency: "INR",
      period: "month"
    },

    duration: job.duration || "",

    skills: job.skills || [],

    description: job.description || "",

    experienceLevel: "Beginer",

    applyLink: job.url,

    metadata: {
      openings: job.openings || 0,
      applicants: job.applicants || 0,
      perks: job.perks || [],
      hasJobOffer: job.hasJobOffer || false,
      isPartTime: job.isPartTime || false
    },
    postedAt: job.postedAt || null,

    scrapedAt: job.scrapedAt,

    embeddings: [] ,
    rank_score : job.rank || 0 
  };
}