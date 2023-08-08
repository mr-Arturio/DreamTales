const { Configuration, OpenAIApi } = require("openai");
const db = require("../../db/database");
const { parse } = require("cookie");
import { verifyToken } from "./auth";
import { generateImage } from "./img-generate";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // Parse the 'UserCookie' from the request headers
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.UserCookie;

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }

  // Verify the JWT token sent with the request
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decodedToken = verifyToken(token); // a function  to decode the token
    const userId = decodedToken?.user?.id; // Extract the user ID from the decoded token

    console.log(req.body);

    const name = req.body.name || "";
    const age = req.body.age;
    const gender = req.body.gender;
    const storyStyle = req.body.storyStyle;
    const storyTopic = req.body.storyTopic;
    const language = req.body.language;
    const time = req.body.time;
    const secondaryHero = req.body.secondaryHero;
    const secondaryHeroName = req.body.secondaryHeroName;

    if (name.trim().length === 0) {
      res.status(400).json({
        error: {
          message: "Please enter a valid name",
        },
      });
      return;
    }

    const capitalizedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    let prompt = `Generate a ${time} minute Kids story for the ${age} year old ${gender} kid named ${capitalizedName}. The story should take place in a ${storyStyle} style, centered around ${storyTopic}. The main character, ${capitalizedName}, along with ${secondaryHeroName}, the ${secondaryHero}, should embark on an exciting journey. The narrative should be full of vivid descriptions and kid-friendly language, written in ${language}.

    Title the story with a period at the end.`;

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1200,
        n: 1,
        stop: null,
        temperature: 0.8,
      });

      const generatedStory = completion.data.choices[0].text;

      // Generate the corresponding image for the story
      const generatedImage = await generateImage({
    
        age,
        gender,
        storyStyle,
        storyTopic,
        capitalizedName,
        secondaryHero,
        secondaryHeroName,
        language,
      });

      // Save the generated story to the database
      try {
        const insertQuery = `
          INSERT INTO stories (user_id, story, photo, created_at, favorites)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id;
        `;

        const values = [
          userId,
          generatedStory,
          generatedImage,
          new Date(),
          false,
        ];

        //send request for your server to wait for the completion
        const result = await db.query(insertQuery, values);
        //newly saved story
        const storyId = result.rows[0].id;

        res
          .status(200)
          .json({ story: generatedStory, imageUrl: generatedImage });

        // res.status(200).json({ result: generatedStory, storyId: storyId });
      } catch (error) {
        console.error("Error saving story to the database:", error.message);
        res.status(500).json({
          error: {
            message:
              "An error occurred while saving the story to the database.",
          },
        });
      }
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
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
}
