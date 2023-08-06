import db from "/db/database";
import cookie from "cookie";
import { verify } from 'jsonwebtoken';

export default async function connectResponse(req, res) {
  try {
    const client = await db.connect()
    const result = await client.query('SELECT * FROM stories;');
    const cookieValue = await cookie.parse(req.headers.cookie);
    console.log('cookie value', cookieValue)
    const token = await verify(cookieValue.UserCookie, process.env.JWT_SECRET, (error, decoded) => { 
      console.log("decoded--->", decoded)
    });
    
    // console.log('REQ--->',verify(cookie.parse(req.headers.cookie), process.env.JWT_SECRET))
    const story = result.rows;
    client.release();
    res.status(200).json(story)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database' })
  }
}


