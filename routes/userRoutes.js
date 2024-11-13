const express = require('express');
const User = require('../models/userModel');
const Roles = require('../constants/constant');
const Role = require('../models/roleModel');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let whereClause = {};
        if (req.user.role == Roles.ADMIN) {
            whereClause = {};
            const users = await User.find(whereClause).select('-password');
            return res.status(200).json({ users });
        } else {
            return res.status(403).json({ err: "Forbidden Request" });
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
});

module.exports = router;