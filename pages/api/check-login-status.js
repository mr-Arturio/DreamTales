import { parse } from "cookie";
import { verifyToken } from "./auth";
import db from "@/db/database";

export default async function checkingLoginStatus(req, res) {
  if (req.method === "GET") {
    try {

      const cookies = parse(req.headers.cookie || "");
      const token = cookies.Cookie;
      const decodedToken = verifyToken(token);
      const userId = decodedToken?.user?.id;
      

      if (!userId) {
        return res.status(403).json({ error: 'User not logged in' });
      }
      res.status(200).json({ isLoggedIn: true });
    } catch (error) {
      console.error('Error checking login status:', error);
      res.status(500).json({ error: 'Error checking login status' });
    }
  }
}