//import  db  from 'db/databse.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to compare passwords
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compareSync(password, hashedPassword);
};

// Function to generate a JSON Web Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '16h' }); // Replace 'your_secret_key' with a secret key for JWT
};

const verifyToken = (token) => {
  try {
    console.log('Token:', token); // Log the token to check its format

    // Verify the token and decode its payload
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with the same secret key used for JWT

        // Log the user ID (if the user is logged in)
    console.log('User ID:', decodedToken.userId);

    // Return the decoded payload (in this case, the 'email' field)
    return decodedToken;
  } catch (error) {
    // If the token is invalid or has expired, an error will be thrown
    console.error('Token verification error:', error);
    throw new Error('Invalid or expired token');
  }
};

export { comparePasswords, generateToken, verifyToken, };
