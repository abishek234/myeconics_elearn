
const SuperAdmin = require('../models/SuperAdmin');
const Admin = require('../models/Admin');
const manager = require('../models/Manager');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Unified Login Function
exports.login = async (req, res) => {
    const { email, password } = req.body;


    try {
       
let user = await SuperAdmin.findOne({ email });
if (!user) {
    user = await Admin.findOne({ email });
   
}
if (!user) {
    user = await manager.findOne({ email });
  
}
if (!user) {
    user = await Employee.findOne({ email });

}

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        //prepare the response data
        const responseData = {
            id: user._id,
            email: user.email,
            role: user.role
        };

          // Add role-specific data
          if (user.role === 'employee') {
            responseData.classid = user.classid; // Assuming classId exists in the employee model
        } else if(user.role === 'admin'){
            responseData.schoolname = user.schoolname;
        }
        else if (user.role === 'manager') {
            responseData.schoolname = user.schoolname; // Assuming schoolName exists in the manager model
            responseData.designation = user.designation; // Assuming subject exists in the manager model
            responseData.handlingclass = user.handlingclass; // Assuming handlingClass exists in the manager model
        }



        // Respond with user data
        res.status(200).json({responseData});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);
       let user = await SuperAdmin.findById(userId).select('-password');
       if  (!user) user = await Admin.findById(userId).select('-password');
       if  (!user) user = await manager.findById(userId).select('-password');
       if  (!user) user = await Employee.findById(userId).select('-password');

       if (!user) return res.status(404).json({ message: 'User not found' });

       res.send(user);
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};