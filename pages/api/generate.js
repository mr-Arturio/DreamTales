import { parse } from "cookie";
import { verifyToken } from "./auth";
import { generateImage } from "./img-generate";
import { generateStory } from "./story-generate";
import db from "../../db/database"; // Import your database module here
import db from "../../db/database";

export default async function storyHandler(req, res) {
  // Parse the 'UserCookie' from the request headers
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.Cookie;

  // Verify the JWT token sent with the request
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decodedToken = verifyToken(token);
    const userId = decodedToken?.user?.id;

    const {
      name = "",
      age,
      gender,
      storyStyle,
      storyTopic,
      language,
      time,
      secondaryHero,
      secondaryHeroName,
    } = req.body;

    if (name.trim().length === 0) {
      res.status(400).json({
        error: {
          message: "Please enter a valid name",
        },
      });
      return;
    }

    const capitalizedName = name[0].toUpperCase() + name.slice(1).toLowerCase();

    try {
      const generatedStory = await generateStory({
        time,
        age,
        gender,
        capitalizedName,
        storyStyle,
        storyTopic,
        secondaryHeroName,
        language,
      });

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

      try {
        const generatedStorySentences = generatedStory.split(".");
        const title = generatedStorySentences[0]; // Extract the title from the first sentence
        console.log("TITLE", title);

        const insertQuery = `
          INSERT INTO stories (user_id, title, story, photo, created_at, favorites)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id;
        `;

        const values = [
          userId,
          title,
          generatedStory,
          generatedImage,
          new Date(),
          false,
        ];

        const result = await db.query(insertQuery, values);
        const storyId = result.rows[0].id;

        res
          .status(200)
          .json({ story: generatedStory, imageUrl: generatedImage });
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
