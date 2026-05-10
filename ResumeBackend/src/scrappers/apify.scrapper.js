import { ApifyClient } from 'apify-client';

export const internshala = async (category)=>{

    // Initialize the ApifyClient with API token
    const client = new ApifyClient({
        token: process.env.APIFY_API ,
    });
    
    // Prepare Actor input
    const input = {
        "listingType": "internships",
        "categories": [`${category}`],
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

