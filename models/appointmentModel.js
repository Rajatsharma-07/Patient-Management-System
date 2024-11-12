const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment