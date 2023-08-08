const db = require("../../db/database.js");
import { verifyToken } from "./auth";
import { parse } from "cookie";

export default async function handler(req, res) {
  // Parse the 'UserCookie' from the request headers
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.Cookie;

  if (req.method === "GET") {
    try {
      // Fetch the last saved story for the user with 'userId' extracted from the token
      const lastSavedStoryQuery =
      "SELECT story, photo FROM stories WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1";

      // Verify the JWT token and extract the user ID from the decoded token
      const decodedToken = verifyToken(token);
      const userId = decodedToken?.user?.id;

      const result = await db.query(lastSavedStoryQuery, [userId]);

      if (result.rowCount > 0) {
        console.log("+++++++++++", result.rows);
        return res.status(200).json({ story: result.rows[0], photo: result.rows[0].photo });
      }

      return res.status(404).json({ error: "No story available." });
    } catch (error) {
      console.error("Error fetching last saved story:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the story." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
