const mongoose = require('mongoose');
const Role = require('../models/roleModel');
const User = require('../models/userModel');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
    .then((res) => console.log('mongodb connected'))
    .catch((err) => console.log("error whle connecting mongodb", err));

const roles = [
    {
        name: "Admin"
    },
    {
        name: "Doctor"
    },
    {
        name: "Patient"
    }
];

//Insertion of Roles in the database
Role.insertMany(roles)
    .then((res) => {
        console.log('Roles Created', res);
        //Creating a Admin user
        const createUser = async () => {
            const newUser = new User({
              name: 'Admin',
              email: 'admin@gmail.com',
              password: 'admin@123',
              role: res.find((role) => role.name == 'Admin')._id
            });
            try {
              await newUser.save();
              console.log('User created:', newUser);
            } catch (error) {
              console.error('Error creating user:', error);
            }
          };
        createUser();
    })
    .catch((error) => {
        if (error.code === 11000) {
            console.log('Roles already created');
          } else {
            console.error('Error creating role:', error);
          }
    });