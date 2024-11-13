const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticateToken = require('./middlewares/authenticateUser');
const authorizeUser = require('./middlewares/authorizeUser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//connecting nodejs server to mongodb compass
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
})
  .catch((error) => console.error('MongoDB connection error:', error));

//auth routes
app.use('/auth', authRoutes);

//appointment routes
app.use('/appointment', authenticateToken, authorizeUser, appointmentRoutes);

//patient routes
app.use('/patient', authenticateToken, authorizeUser, patientRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});