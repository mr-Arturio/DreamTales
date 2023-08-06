import db from "/db/database";
import cookie from "cookie";
import { verify } from 'jsonwebtoken';

export default async function connectResponse(req, res) {
  try {
    const client = await db.connect();
    const result = await client.query('SELECT * FROM stories;');
    const cookieValue = await cookie.parse(req.headers.cookie);
    console.log('cookie value', cookieValue);

    // Verify the JWT token
    const token = cookieValue.UserCookie;
    const decodedToken = verify(token, process.env.JWT_SECRET);

    // Log the decoded token to check its contents
    console.log("Decoded Token:", decodedToken);

    // Your code to handle the authenticated user can go here, if needed

    const story = result.rows;
    client.release();
    res.status(200).json(story);
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
}
