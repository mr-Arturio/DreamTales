import { hash } from 'bcryptjs';
import  db  from 'db/database.js'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const user = req.body;
      user.password = await hash(user.password, 10);

      // const addedUser = await db.addUser(user);
      const addedUser = await db.query('INSERT into users (name, email, password) values ($1, $2, $3) returning *;', [user.name, user.email, user.password]);

      if (!addedUser) {
        // If the db.addUser() method returns null or false for some reason
        return res.status(400).json({ error: 'User could not be added to the database.' });
      }

      // Successfully added the user to the database
      return res.status(201).json({ message: 'User added successfully.', user: addedUser.rows[0] });

    } catch (error) {
      console.error('An error occurred:', error);
      return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  }

  // Handle other HTTP methods (GET, PUT, DELETE, etc.)
  return res.status(405).end(); // Method Not Allowed
}