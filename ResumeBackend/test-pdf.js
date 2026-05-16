import { extractResumeToJSON } from "./src/scrappers/pdf-to-json.js";
import mongoose from "mongoose";

async function test() {
    try {
        const result = await extractResumeToJSON("./dummy.pdf");
        console.log(result);
    } catch (e) {
        console.error("Test Error:", e);
    }
}
test();
