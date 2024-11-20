const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    rollno:{
        type: Number,
        required: true,
    },
    classid: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    gender: {
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'employee',
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    schoolname: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Pincode: {
        type: Number,
        required: true,
    },

    photo: {
        type: String, // This will store the path to the uploaded photo
        default: null,
    },
});

// Hash the password before saving the user model
EmployeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);