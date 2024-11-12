const jwt = require('jsonwebtoken');
const { AllowedPermission } = require('../constants/permission');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  // console.log('---------------------', req.method, req.originalUrl);
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ err: 'Access denied, token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //role, method, url  --> rolebased related work
    // const permission = AllowedPermission[decoded.role].find((permission) => permission.route == req.originalUrl.split('/')[1]);
    // if (permission) {
    //   if (permission.access.flat(1).includes(req.method)){
    //     req.user = decoded;
    //     next();
    //   } else {
    //     return res.status(401).json({ err: 'Forbidden Request' });
    //   }
    // } else {
    //   return res.status(401).json({ err: 'Forbidden Request' });
    // }
    // rolebased related word
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ err: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
