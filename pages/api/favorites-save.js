import { verifyToken } from "../api/auth";
import { parse } from "cookie";
import db from "@/db/database";

export default async function handler(req, res) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.Cookie;

    if (!token) {
      return res.status(401).json({ error: "Error authenticating token" });
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken || !decodedToken.user || !decodedToken.user.id) {
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    if (req.method === "PUT") {
      const userId = decodedToken?.user?.id;
      const storyId = req.body.id;

      if (typeof userId !== "number" || Number.isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      await db.query("UPDATE stories SET favorites = true WHERE id = $1;", [
        storyId,
      ]);

      res.status(200).json({ message: "Favorites updated successfully" });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.log("ERROR 500 --->", error);
    console.error("Error updating favorites:", error);
    res.status(500).json({ error: "Error updating favorites" });
  }
}
