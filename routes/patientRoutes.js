const express = require('express');
const User = require('../models/userModel');
const Roles = require('../constants/constant');
const Role = require('../models/roleModel');
const router = express.Router();

router.get('/', async(req, res) => {
    let whereClause = {};
    if(req.user.role == Roles.ADMIN){
        whereClause = {};
    }else if(req.user.role == Roles.DOCTOR){
        whereClause = {parent_id: req.user.userId}
    }else{
        whereClause = {_id: req.user.userId}
        const info = await User.findOne(whereClause).select('-password');
        return res.status(200).json({info});
    }
    try {
        const patients = await User.find(whereClause).select('-password');
        return res.status(200).json({patients});
    } catch (err) {
        return res.status(500).json({err});
    }
});

router.post('/', async (req, res) => {
    try {
        let patientRole = await Role.findOne({name: Roles.PATIENT});
        let patientDetails = new User({
            ...req.body,
            role: patientRole._id,
            parent_id: req.user.userId
        });
        await patientDetails.save()
            .then((result) => {
                return res.status(200).json({res: 'Patient Created'});
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({err});
            })
    } catch (err) {
        console.log(err);
        return res.status(500).json({err});
    }
})

router.put('/', async (req, res) => {
    try {
        let isValidPatient = await User.findOne({_id: req.body.patientId, parent_id: req.user.userId});
        if(isValidPatient){
            const update = await User.updateOne({_id: req.body.patientId}, req.body);
            return res.status(200).json({res: 'Patient Updated'});
        }
        return res.status(500).json({err: "Not your Patient. You can only update your patient."}); // We can also write Wrong Patient Id here
    } catch (err) {
        return res.status(500).json({err});
    }
});

router.delete('/', async (req, res) => {
    try {
        await User.updateOne({_id: req.body.patientId}, {isDeleted: true});
        return res.status(200).json({res: "Patient Soft Deleted!"});
    } catch (err) {
        return res.status(500).json({err});
    }
})

module.exports = router;