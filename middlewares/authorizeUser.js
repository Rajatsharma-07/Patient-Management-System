const { AllowedPermission } = require('../constants/permission');

// Middleware to authorize User
const authorizeUser = (req, res, next) => {
  try {
    //check the route permission according to the role
    const permission = AllowedPermission[req.user.role].find((permission) => permission.route == req.originalUrl.split('/')[1]);
    //if the role has the permission to the route then check for access given to the role
    if (permission) {
      if (permission.access.flat(1).includes(req.method)){
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
