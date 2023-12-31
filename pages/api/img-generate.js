import path from "path";
import { Storage } from "@google-cloud/storage";
import { Configuration, OpenAIApi } from "openai";
import { uploadImage } from "@/src/components/storage/storageHelper";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateImage({
  capitalizedName,
  age,
  gender,
  storyStyle,
  storyTopic,
}) {
  if (!configuration.apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  let prompt = `Generate an image that vividly illustrates the following scene from the story:

  Main Character: a ${age} year old ${gender}
  Setting: ${storyTopic} in a ${storyStyle} style
  
  The image should capture the essence of the story. Show ${capitalizedName}  engaged in a memorable moment, surrounded by the enchanting details of the ${storyTopic}. The style should be appealing to ${age} year olds, using kids-friendly visual elements.
  
  Feel free to use bright colors, imaginative details, and expressive characters. The image dimensions should be 512x512 pixels to ensure high quality.
  
  Please make sure the image resonates with the heartwarming nature of the story. The end result should be a beautiful and captivating illustration that children will adore.`;

  try {
    const completion = await openai.createImage({
      model: "dall-e-3",
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

    // Upload the image to Google Cloud Storage
    const imageFileName = `generated_image_${Date.now()}.png`;
    const imageUploadUrl = await uploadImage(imageBuffer, imageFileName);

    return imageUploadUrl;
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
