import db from 'db/database.js';
import { comparePasswords } from './auth.js';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const query = 'SELECT id, email, password FROM users WHERE email = $1';
      const result = await db.query(query, [email]);
      if (result.rowCount === 0) {
        alert('User not found.');
       // client.release();
        res.status(404).send('User not found');
        return;
      }

      const user = result.rows[0];
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }

      // If authentication is successful, generate a JWT token and store it in a cookie

      const secret = process.env.JWT_SECRET;
      const token = sign({ user }, secret, { expiresIn: 60 * 60 * 24 * 3 })

      const serialized = serialize('UserCookie', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 3,
        path: '/',
      });

     return res.setHeader('Set-Cookie', serialized).send('Welcome Signed In!')
     
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
