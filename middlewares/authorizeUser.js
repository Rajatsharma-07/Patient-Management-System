const { AllowedPermission } = require('../constants/permission');

// Middleware to authorize User
const authorizeUser = (req, res, next) => {
  try {
    console.log(req.user)
    const permission = AllowedPermission[req.user.role].find((permission) => permission.route == req.originalUrl.split('/')[1]);
    if (permission) {
      if (permission.access.flat(1).includes(req.method)){
        // req.user = decoded;
        next();
      } else {
        return res.status(401).json({ err: 'Forbidden Request' });
      }
    } else {
      return res.status(401).json({ err: 'Forbidden Request' });
    }
  } catch (error) {
    res.status(401).json({ err: 'Forbidden Request' });
  }
};

module.exports = authorizeUser;
