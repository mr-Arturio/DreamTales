// generateImage.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateImage() {
  if (!configuration.apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  let prompt = "Generate a picture of a ginger cat";

  try {
    const completion = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = completion.data.data[0].url;
    return imageUrl;
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      throw new Error(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw new Error("An error occurred during your request.");
    }
  }
}
