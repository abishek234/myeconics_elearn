import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Header from './Header';
import EditEmployeeForm from "../FormEdit/EditEmployeeForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgress, Alert, Container, Typography, TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmployeesReport = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const [students, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState(''); // State for the filter input
    const [selectedEmployee, setSelectedEmployee] = useState(null); // State for the selected employee for editing
    const [showEditForm, setShowEditForm] = useState(false); // State to control the overlay visibility

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10); // Number of students to display per page

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const schoolname = localStorage.getItem('userschool');
                const handlingClass = localStorage.getItem('userhandlingclass');
                const response = await axios.get(`http://localhost:9000/api/employees/employee?schoolname=${schoolname}&classid=${handlingClass}`);

                console.log(response.data);     
                setEmployees(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch students');
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [])

    const handleEdit = (employee) => {
        setSelectedEmployee(employee); // Set the selected employee for editing
        setShowEditForm(true); // Show the overlay form
    };
    
    const handleUpdate = (updatedEmployee) => {
        setEmployees(students.map(employee => (employee._id === updatedEmployee._id ? updatedEmployee : employee))); // Update the employee in state
    };
    
    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`http://localhost:9000/api/employees/employee/${studentId}`);
                setEmployees(students.filter(employee => employee._id !== studentId)); // Remove the deleted employee from state
                toast.success('Employee deleted successfully!');
            } catch (error) {
                console.error('Error deleting employee:', error);
                toast.error('Failed to delete employee. Please try again.');
            }
        }
    };

    if (loading) {
        return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;
    }
    
    if (error) {
        return <Alert severity="error" style={{ margin: '20px' }}>{error}</Alert>;
    }

    // Filtered students based on the filter input
    const filteredEmployees = students.filter(employee => {
        return (
            employee.firstname.toLowerCase().includes(filter.toLowerCase()) ||
            employee.lastname.toLowerCase().includes(filter.toLowerCase()) ||
            employee.rollno.toString().includes(filter) ||
            employee.classid.toString().includes(filter) ||
            employee.email.toLowerCase().includes(filter.toLowerCase()) ||
            employee.phoneNumber.toString().includes(filter) ||
            employee.gender.toLowerCase().includes(filter.toLowerCase()) || 
            new Date(employee.dateofbirth).toLocaleDateString().includes(filter) || 
            employee.schoolname.toLowerCase().includes(filter.toLowerCase()) ||
            employee.Address.toLowerCase().includes(filter.toLowerCase()) ||
            employee.State.toLowerCase().includes(filter.toLowerCase()) ||
            employee.City.toLowerCase().includes(filter.toLowerCase()) ||
            employee.Pincode.toString().includes(filter)
        );
    });

     // Calculate pagination data
     const indexOfLastEmployee = currentPage * studentsPerPage;
     const indexOfFirstEmployee = indexOfLastEmployee - studentsPerPage;
     const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

     return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom align="center">Employees Report</Typography>
                    <TextField
                        label="Filter by any attribute..."
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Roll No</TableCell>
                                    <TableCell>Class</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>School Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Pincode</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentEmployees.map((employee) => (
                                    <TableRow key={employee._id}>
                                        <TableCell>{employee.firstname}</TableCell>
                                        <TableCell>{employee.lastname}</TableCell>
                                        <TableCell>{employee.rollno}</TableCell>
                                        <TableCell>{employee.classid}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{employee.phoneNumber}</TableCell>
                                        <TableCell>{employee.gender}</TableCell>
                                        <TableCell>{new Date(employee.dateofbirth).toLocaleDateString()}</TableCell>
                                        <TableCell>{employee.schoolname}</TableCell>
                                        <TableCell>{employee.Address}</TableCell>
                                        <TableCell>{employee.State}</TableCell>
                                        <TableCell>{employee.City}</TableCell>
                                        <TableCell>{employee.Pincode}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEdit(employee)}><FaEdit /></Button><br /><br />
                                            <Button onClick={() => handleDelete(employee._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredEmployees.length / studentsPerPage) }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant="outlined"
                                color={currentPage === page ? 'primary' : 'default'}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    {showEditForm && selectedEmployee && (
                        <EditEmployeeForm
                            employee={selectedEmployee}
                            onUpdate={handleUpdate}
                            onClose={() => setShowEditForm(false)}
                        />
                    )}
                </Container>
            </main>
        </div>
     );
}

export default EmployeesReport;