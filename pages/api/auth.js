//import  db  from 'db/databse.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import Cookies from 'js-cookie'


// Function to compare passwords
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compareSync(password, hashedPassword);
};

// Function to generate a JSON Web Token
const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '16h' }); // Replace 'your_secret_key' with a secret key for JWT
};

// Function to verify and decode the JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with the same secret key used for JWT
};

function getCookie(name) {

 return localStorage.getItem(name)
}

export { comparePasswords, generateToken, verifyToken, getCookie };
