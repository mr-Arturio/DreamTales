import db from "/db/database";
import { verifyToken } from "../api/auth";
import { parse } from "cookie";


export default async function connectResponse(req, res) {
  if (req.method === "GET") {


    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.Cookie;
      const decodedToken = verifyToken(token);
      const userId = decodedToken?.user?.id;


      const result = await db.query('SELECT * FROM stories WHERE user_id = $1;', [userId])
      const story = result.rows;
      // console.log('RESULT ROWS---->', result.rows)
      res.status(200).json(story)

    } catch (error) {
      console.log('ERROR--->', error)
      res.status(500).json({ error: 'Error fetching data from database' })
    }



  }
}
