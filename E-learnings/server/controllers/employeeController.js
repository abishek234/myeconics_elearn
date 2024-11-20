const Employee = require('../models/Employee'); // Adjust the path as necessary

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEmployeesBySchoolClass = async (req, res) => {
    try {
        const schoolName = req.query.schoolname; // Ensure this matches the query parameter used in the frontend
        const handlingClass = req.query.classid; // Get the handling class from the query parameters

        // Fetch employees based on school name and class id
        const employees = await Employee.find({ schoolname: schoolName, classid: handlingClass });
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error.message); // Log the error message
        res.status(500).json({ message: error.message });
    }
};


exports.getEmployeesBySchool = async (req, res) => {
    try {
        const schoolName = req.query.schoolname; // Ensure this matches the query parameter used in the frontend
      
        const employees = await Employee.find({ schoolname: schoolName });
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error.message); // Log the error message
        res.status(500).json({ message: error.message });
    }
}


// Update a employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};