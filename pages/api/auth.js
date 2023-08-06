import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';


// Function to compare passwords
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compareSync(password, hashedPassword);
};

// Function to generate a JSON Web Token
const generateToken = (email, id) => {
  return jwt.sign({ user: { id, email } }, process.env.JWT_SECRET, { expiresIn: '16h' }); // Replace 'your_secret_key' with a secret key for JWT
};

// Function to verify and decode the JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with the same secret key used for JWT
};

export { comparePasswords, generateToken, verifyToken, };