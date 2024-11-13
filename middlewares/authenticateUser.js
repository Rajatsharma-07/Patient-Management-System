const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  //check token in the header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  //check if token is present
  if (!token) {
    return res.status(403).json({ err: 'Access denied, token missing' });
  }
  try {
    //decode the token and save the details in req.user object
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ err: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
