
function normalizeTitle(title) {
  if (!title || typeof title !== "string") {
    return "Untitled Role";
  }
  return title
    .replace(/internship/i, "Intern")
    .trim();
}

export async function normalizeInternshalaJob(job = {}) {
  const safeJob = job || {};

  return {
    id: safeJob.listingId || safeJob.id || "",

    source: "Internshala",

    title: normalizeTitle(safeJob.title || safeJob.profile || safeJob.role || safeJob.jobTitle),

    company: safeJob.company || safeJob.companyName || "Unknown Company",

    companyUrl: safeJob.companyUrl || "",

    employmentType:
      safeJob.listingType === "internships"
        ? "Internship"
        : "Full-time",

    category: safeJob.category || "",

    location: safeJob.location || "Remote",

    remote: safeJob.isRemote || false,

    salary: {
      min: safeJob.stipendMin || safeJob.salaryMin || 0,
      max: safeJob.stipendMax || safeJob.salaryMax || 0,
      currency: "INR",
      period: "month"
    },

    duration: safeJob.duration || "",

    skills: Array.isArray(safeJob.skills) ? safeJob.skills : [],

    description: safeJob.description || "",

    experienceLevel: safeJob.experienceLevel || "Beginner",

    applyLink: safeJob.url || safeJob.applyLink || "",

    metadata: {
      openings: safeJob.openings || 0,
      applicants: safeJob.applicants || 0,
      perks: safeJob.perks || [],
      hasJobOffer: safeJob.hasJobOffer || false,
      isPartTime: safeJob.isPartTime || false
    },
    postedAt: safeJob.postedAt || null,

    scrapedAt: safeJob.scrapedAt || new Date().toISOString(),

    embeddings: [],
    rank_score: safeJob.rank || 0
  };
}