import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
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
  const Parent1Name = req.body.Parent1Name;
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

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(
        name,
        age,
        gender,
        Parent1Name,
        parent2Name,
        friendName,
        favoriteToy,
        location
      ),
      temperature: 0.9,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
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

function generatePrompt(
  name,
  age,
  gender,
  parent1Name,
  parent2Name,
  friendName,
  favoriteToy,
  location
) {
  const capitalizedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return ` "Generate a 5 minute Kids story for the ${age} year old ${gender} kid, named ${capitalizedName}. Include in the story ${parent1Name}, ${parent2Name} and ${capitalizedName} best friend ${friendName}. Also ad ${capitalizedName} favorite toy ${favoriteToy}. Story about frindship and everything happening in ${location}. Kids friendly language",
    `;
}

