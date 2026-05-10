import OpenAI from "openai";

function cleanText(text) {
    return text
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8000); // prevent extremely large payloads
}

export const generateEmbedding = async (text) => {
    const client = new OpenAI({
      baseURL: "https://api.studio.nebius.ai/v1/",
      apiKey: process.env.NEBIUS_API_KEY,
    });

  try {

    const cleanedText = cleanText(text);

    const response =
      await client.embeddings.create({
        model: "Qwen/Qwen3-Embedding-8B",
        input: cleanedText,
        encoding_format: "float",
      });

    const vector =
      response.data[0].embedding;

    console.log(
      `Embedding generated: ${vector.length} dimensions`
    );

    return vector;

  } catch (error) {

    console.error(
      "[Embedding Error]:",
      error.response?.data || error.message
    );

    throw new Error(
      "Failed to generate embedding"
    );
  }
};