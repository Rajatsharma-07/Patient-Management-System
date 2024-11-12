const express = require('express');
require('dotenv').config();
const Role = require('../models/roleModel');
const User = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Roles = require('../constants/constant');

function generateToken(user) {
    const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name, role_id: user.role_id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
    return token;
}

router.post('/signup', async (req, res) => {
    try {
        const role = await Role.findOne({ name: req.body.role });
        if (!role) {
            return res.status(500).json({ err: 'Role does not exist! Please check the spelling and search is case sensitive.' });
            
        }
        if(role.name == Roles.PATIENT){
            return res.status(500).json({ err: 'Patient Cannot directly signup!' });
        }
        const user = new User({ ...req.body, role: role._id });
        try {
            await user.save()
                .then((user) => {
                    const token = generateToken({ email: user.email, name: user.name, _id: user._id, role_id: role._id, role: role.name });
                    res.status(200).json({ res: 'User created', token });
                })
                .catch(err => { throw err });
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate('role');
        if (!user) {
            return res.status(404).json({ err: 'User not found' });
        }
        if(user.isDeleted){
            return res.status(500).json({err: "Your account has been deleted. Contact your administrator."});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ err: 'Incorrect password' });
        }
        const token = generateToken({email: user.email, _id: user._id, name: user.name, role_id: user.role._id, role: user.role.name})
        res.status(200).json({res: 'Authentication Successfull!', token});
    } catch (err) {
        throw err;
    }
})

module.exports = router;