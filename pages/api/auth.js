//import  db  from 'db/databse.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Function to compare passwords
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compareSync(password, hashedPassword);
};

// Function to generate a JSON Web Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Replace 'your_secret_key' with a secret key for JWT
};

// Function to verify and decode the JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with the same secret key used for JWT
};

export { comparePasswords, generateToken, verifyToken };
