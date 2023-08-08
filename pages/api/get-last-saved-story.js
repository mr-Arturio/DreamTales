const db = require("../../db/database.js");
import { verifyToken } from "../api/auth";
import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.UserCookie;
      const decodedToken = verifyToken(token);
      const userId = decodedToken?.user?.id;

      // const client = await db.connect();
      // Fetch the last saved story for the user with 'userId' = '1'
      const lastSavedStoryQuery =
        "SELECT * FROM stories WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1";
      const values = userId; // 'userId' is hardcoded as '1'
      const result = await db.query(lastSavedStoryQuery, values);

      if (result.rowCount > 0) {
        console.log("+++++++++++", result.rows);
        return res.status(200).json({ story: result.rows[0] });
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
