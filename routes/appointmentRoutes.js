const express = require('express');
const Roles = require('../constants/constant');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const router = express.Router();

//This function validates that the patient belongs to the doctor present in the parent id
async function isValidPatientDoctorRelation(patient_id, doctor_id) {
    let patientDetails = await User.findOne({ _id: patient_id });
    if (patientDetails.parent_id != doctor_id) {
        return false;
    }
    return true;
}
router.get('/', async (req, res) => {
    try {
        let whereClause = {};
        if (req.user.role == Roles.ADMIN) {
            whereClause = {};
        } else if (req.user.role == Roles.DOCTOR) {
            whereClause = { doctor: req.user.userId }
        } else {
            whereClause = { patient: req.user.userId }
        }
        let appointments = await Appointment.find(whereClause);
        return res.status(200).json({ appointments });
    } catch (err) {
        return res.status(500).json({ err });
    }
});

router.post('/', async (req, res) => {
    try {
        let appointmentData = {};
        if (req.user.role == Roles.ADMIN) {
            appointmentData = req.body;
            if(!isValidPatientDoctorRelation(req.body.patient, req.body.doctor)){
                return res.status(500).json({ err: "This patient does not belongs to this doctor" });
            }
        } else {
            appointmentData = { ...req.body, patient: req.user.userId, doctor: req.user.parent_id }
        }

        let newAppointment = new Appointment(appointmentData);
        await newAppointment.save()
            .then((result) => {
                return res.status(200).json({ res: "Appointment Created" });
            })
            .catch((err) => {
                return res.status(500).json({ err });
            })
    } catch (err) {
        return res.status(500).json({ err });
    }
});

router.put('/', async (req, res) => {
    try {
        if (req.user.role == Roles.ADMIN) {
            if((req.body.patient && req.body.doctor) && !isValidPatientDoctorRelation(req.body.patient, req.body.doctor)){
                return res.status(500).json({ err: "This patient does not belongs to this doctor" });
            }
            await Appointment.updateOne({ _id: req.body.appointmentId }, req.body);
            return res.status(203).json({ res: "Appointment Updated" });
        } else if (req.user.role == Roles.DOCTOR) {
            let isValidAppointment = await Appointment.findOne({ _id: req.body.appointmentId, doctor: req.user.userId });
            if (isValidAppointment) {
                await Appointment.updateOne({ _id: req.body.appointmentId }, req.body);
                return res.status(203).json({ res: "Appointment Updated" });
            } else {
                return res.status(500).json({ err: "Not Your Appointment" });
            }
        } else {
            let isValidAppointment = await Appointment.findOne({ _id: req.body.appointmentId, patient: req.user.userId });
            if (isValidAppointment) {
                await Appointment.updateOne({ _id: req.body.appointmentId }, req.body);
                return res.status(203).json({ res: "Appointment Updated" });
            } else {
                return res.status(500).json({ err: "Not Your Appointment" });
            }
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
});

router.delete('/', async (req, res) => {
    try {
        if (req.user.role == Roles.ADMIN) {
            await Appointment.updateOne({ _id: req.body.appointmentId }, { isDeleted: true });
            return res.status(203).json({ res: "Appointment Soft Deleted" });
        } else {
            let isValidAppointment = await Appointment.findOne({ _id: req.body.appointmentId, patient: req.user.userId });
            if (isValidAppointment) {
                await Appointment.updateOne({ _id: req.body.appointmentId }, { isDeleted: true });
                return res.status(203).json({ res: "Appointment Soft Deleted" });
            } else {
                return res.status(500).json({ err: "Not Your Appointment" });
            }
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
})

module.exports = router;