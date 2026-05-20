import { ApifyClient } from 'apify-client';

const validCategories = [
    "architecture", "backend-development", "campus-ambassador", "chemical", "civil", "computer-science", 
    "content-writing", "digital-marketing", "electronics", "engineering", "finance", "front-end-development", 
    "full-stack-development", "graphic-design", "hr", "humanities", "international", "law", "marketing", 
    "mba", "mechanical", "mobile-app-development", "programming", "science", "software-development", 
    "software-testing", "web-development"
];

export const mapRoleToCategory = (role) => {
    if (!role) return "software-development";
    
    const roleLower = role.toLowerCase();
    
    if (roleLower.includes("full stack") || roleLower.includes("mern") || roleLower.includes("mean") || roleLower.includes("full-stack")) return "full-stack-development";
    if (roleLower.includes("front end") || roleLower.includes("frontend") || roleLower.includes("react") || roleLower.includes("angular") || roleLower.includes("vue") || roleLower.includes("ui")) return "front-end-development";
    if (roleLower.includes("back end") || roleLower.includes("backend") || roleLower.includes("node") || roleLower.includes("python") || roleLower.includes("java ") || roleLower.includes("django") || roleLower.includes("spring")) return "backend-development";
    if (roleLower.includes("mobile") || roleLower.includes("android") || roleLower.includes("ios") || roleLower.includes("flutter") || roleLower.includes("react native")) return "mobile-app-development";
    if (roleLower.includes("web")) return "web-development";
    if (roleLower.includes("test") || roleLower.includes("qa") || roleLower.includes("quality")) return "software-testing";
    if (roleLower.includes("design") || roleLower.includes("graphic")) return "graphic-design";
    if (roleLower.includes("data") || roleLower.includes("machine learning") || roleLower.includes("ai") || roleLower.includes("science")) return "computer-science";
    if (roleLower.includes("content") || roleLower.includes("writer")) return "content-writing";
    if (roleLower.includes("marketing") || roleLower.includes("seo")) return "digital-marketing";
    if (roleLower.includes("hr") || roleLower.includes("human resources") || roleLower.includes("talent")) return "hr";
    if (roleLower.includes("finance") || roleLower.includes("account")) return "finance";
    if (roleLower.includes("software") || roleLower.includes("engineer") || roleLower.includes("developer")) return "software-development";
    
    // Check if the original role exactly matches a valid category
    if (validCategories.includes(roleLower)) return roleLower;

    return "software-development"; // Fallback
};

export const internshala = async (category)=>{

    // Initialize the ApifyClient with API token
    const client = new ApifyClient({
        token: process.env.APIFY_API ,
    });
    
    const mappedCategory = mapRoleToCategory(category);
    console.log(`Mapping user role "${category}" to Internshala category "${mappedCategory}"`);

    // Prepare Actor input
    const input = {
        "listingType": "internships",
        "categories": [mappedCategory],
        "cities": [], 
        "workFromHome": false,
        "partTime": false,
        "minStipend": 0,
        "maxListings": 5,
        "maxPages": 10,
        "scrapeDetails": true,
        "proxyConfiguration": {
            "useApifyProxy": false
        },
        "requestDelay": 500,
        "maxConcurrency": 3
    };
    
    // Run the Actor and wait for it to finish
    const run = await client.actor("TKhVyjHu2dHCYTaMg").call(input);
    
    // Fetch and print Actor results from the run's dataset (if any)
    console.log('Results from dataset');
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
}

