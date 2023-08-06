import { Configuration, OpenAIApi } from "openai";
import db from "../../db/database";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }

  let prompt = "Generate a picture of a ginger cat";

  try {
    const completion = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    console.log(completion); // Log the response to inspect its structure

    const imageUrl = completion.data.data[0].url;

    // You can use the 'image_url' to return the URL of the generated image as a response to the client.
    res.status(200).json({ imageUrl: imageUrl });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
