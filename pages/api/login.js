
import  db  from 'db/database.js'; 
import { comparePasswords } from './auth.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const {email, password} = req.body;

    try {
      const client = await db.connect();

      const query = 'SELECT id, email, password FROM users WHERE email = $1';
      const result = await client.query(query, [email]);
      if (result.rowCount === 0) {
        alert('User not found.');

        client.release();
        res.status(404).send('User not found');
      }

      const user = result.rows[0];

      const isPasswordValid = await comparePasswords(password, user.password);
      client.release()

      if (!isPasswordValid) {
        alert('Invalid password.');
       
        res.status(400).send('Invalid Password');
      }

      // If authentication is successful, generate a JWT token and store it in a cookie
      const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET); // Use the user's ID for generating the token
      res.status(200).json({token})

    } catch (error){
      console.log('Login error:', error)
    }

  }

  // Handle other HTTP methods (GET, PUT, DELETE, etc.)
    res.status(405).end(); // Method Not Allowed
}