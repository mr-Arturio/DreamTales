import fs from "fs";
import path from "path";
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
    console.log("image URL:", imageUrl);

    // Fetch the image data using the fetch function
    const response = await fetch(imageUrl);
    const imageArrayBuffer = await response.arrayBuffer();

    // Convert the ArrayBuffer to a Buffer
    const imageBuffer = Buffer.from(imageArrayBuffer);

    // Save the image data to a file
    const imageFileName = `generated_image_${Date.now()}.png`;
    const imagePath = path.join(process.cwd(), "public/images", imageFileName);
    fs.writeFileSync(imagePath, imageBuffer);

    return `/images/${imageFileName}`;

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
