const { Configuration, OpenAIApi } = require("openai");

const db = require("../../db/database");

//'userId' is hardcoded as '1'
const userId = '1';

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

  console.log(req.body);

  const name = req.body.name || "";
  const age = req.body.age;
  const gender = req.body.gender;
  const parent1Name = req.body.Parent1Name;
  const parent2Name = req.body.parent2Name;
  const friendName = req.body.friendName;
  const favoriteToy = req.body.favoriteToy;
  const location = req.body.location;
  if (name.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid name",
      },
    });
    return;
  }

  const capitalizedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  let prompt = ` Generate a 3 minute Kids story for the ${age} year old ${gender} kid, named ${capitalizedName}. Include in the story ${parent1Name}, ${parent2Name} and ${capitalizedName} best friend ${friendName}. Also ad ${capitalizedName} favorite toy ${favoriteToy}. Story about frindship and everything happening in ${location}. Kids friendly language`;

  try {
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
    try {
      const insertQuery = `
      INSERT INTO story (user_id, story, created_at, favorites)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;

      const values = [userId, generatedStory, new Date(), false];


      //send request for your server to wait for the completion
      const result = await db.query(insertQuery, values);
      //newly saved story
      const storyId = result.rows[0].id;

      res.status(200).json({ result: completion.data.choices[0].text });

      // res.status(200).json({ result: generatedStory, storyId: storyId });

    } catch (error) {
      console.error("Error saving story to the database:", error.message);
      res.status(500).json({
        error: {
          message: "An error occurred while saving the story to the database.",
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
}