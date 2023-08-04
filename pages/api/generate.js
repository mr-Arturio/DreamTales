const { Configuration, OpenAIApi } = require("openai");
const db = require("../../db/database");
import { verifyToken } from "./auth";

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

  // Verify the JWT token sent with the request
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent in the 'Authorization' header as Bearer <token>
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decodedToken = verifyToken(token);
    const userId = decodedToken.userId;

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
    // request text to OpenAi
    let prompt = `Generate a ${time} minute Kids story for the ${age} year old ${gender} kid, named ${capitalizedName}. Include in the story ${secondaryHero} named ${secondaryHeroName} and ${capitalizedName}. Story about ${storyTopic} and everything happening in ${storyStyle} style. Kids friendly language. Language of the story is ${language}. Give title to the story with period at the end.`;

    //settings for AI
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1200,
      n: 1,
      stop: null,
      temperature: 1.0,
    });

    const generatedStory = completion.data.choices[0].text;

    // Save the generated story to the database
    const insertQuery = `
      INSERT INTO stories (user_id, story, created_at, favorites)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;

    const values = [userId, generatedStory, new Date(), false];

    //send request for your server to wait for the completion
    const result = await db.query(insertQuery, values);
    //newly saved story
    const storyId = result.rows[0].id;

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
}
