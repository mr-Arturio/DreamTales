// Import the generateToken function from the auth.js file
import { comparePasswords, generateToken } from './auth.js';
import { serialize } from 'cookie';
import db from 'db/database.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      const query = 'SELECT id, email, password FROM users WHERE email = $1';
      const result = await db.query(query, [email]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const user = result.rows[0];
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }

      // If authentication is successful, generate a JWT token and store it in a cookie
      const token = generateToken(user.id);

      const serialized = serialize('UserCookie', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 3,
        path: '/',
      });

      res.setHeader('Set-Cookie', serialized).json({ message: 'User logged in successfully!' });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
