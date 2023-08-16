import db from "@/db/database";
import { verifyToken } from "./auth";
import { parse } from "cookie";

export default async function deleteStory(req, res) {
  if (req.method === "DELETE") {
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.Cookie;
      const decodedToken = verifyToken(token);
      const userId = decodedToken?.user?.id;
      const storyId = req.body.id;

      const result = await db.query(
        "DELETE FROM stories WHERE favorites = true AND id = $1;",
        [storyId]
      );
      const trueStory = result.rows;
      res.status(200).json(trueStory);
    } catch (error) {
      console.log("ERROR--->", error);
      res.status(500).json({ error: "Error fetching data form database" });
    }
  }
}
