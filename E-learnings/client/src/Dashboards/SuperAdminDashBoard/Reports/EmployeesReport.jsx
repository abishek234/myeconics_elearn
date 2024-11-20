import React from "react";
import { useState,useEffect } from 'react';
import Header from "../Header";
import Sidebar from "../Sidebar";
import '../../CSS/Dashboard.css';   
import axios from 'axios';
import EditEmployeeForm from "../../FormEdit/EditEmployeeForm";
import {FaEdit,FaTrash} from "react-icons/fa";
import {
    CircularProgress,
    Alert,
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid
} from '@mui/material';

const EmployeesReport = ({userId}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const [students, setEmployees] = useState([]);   
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterName, setFilterName] = useState(''); // Filter by name
    const [filterClass, setFilterClass] = useState(''); // Filter by handling class
    const [selectedEmployee, setSelectedEmployee] = useState(null); // State for the selected employee for editing
    const [showEditForm, setShowEditForm] = useState(false); // State to control the overlay visibility

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5); // Number of admins to display per page

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/employees/students');
              
                setEmployees(response.data);
                setLoading(false);
            }catch (error) {
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
        const dobFormatted = new Date(employee.dateofbirth).toLocaleDateString(); // Format date of birth as DD/MM/YYYY
        return (
            employee.firstname.toLowerCase().includes(filterName.toLowerCase()) ||
            employee.lastname.toLowerCase().includes(filterName.toLowerCase()) ||
            employee.rollno.toString().includes(filterName) ||
            employee.email.toLowerCase().includes(filterName.toLowerCase()) ||
            employee.phoneNumber.toString().includes(filterName) ||
            employee.gender.toLowerCase().includes(filterName.toLowerCase()) || // Include gender in the filter
            dobFormatted.includes(filterName) || // Include date of birth in the filter
            employee.schoolname.toLowerCase().includes(filterName.toLowerCase()) ||
            employee.Address.toLowerCase().includes(filterName.toLowerCase()) ||
            employee.State.toLowerCase().includes(filterName.toLowerCase()) ||
            employee.City.toLowerCase().includes(filterName.toLowerCase()) ||
            employee.Pincode.toString().includes(filterName) 

        );
    });

    //Filtered students based on the class input  
    const filteredEmployeesClass = students.filter(employee => {
        return employee.classid.toString().includes(filterClass.toLowerCase());
    });

    // Calculate pagination data
    const indexOfLastEmployee = currentPage * studentsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - studentsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

     // Calculate pagination data based on class
     const indexOfLastEmployeeClass = currentPage * studentsPerPage;
     const indexOfFirstEmployeeClass = indexOfLastEmployeeClass - studentsPerPage;
     const currentEmployeesClass = filteredEmployeesClass.slice(indexOfFirstEmployeeClass, indexOfLastEmployeeClass);

    return(
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />

            <main className="main-content">
                <Container maxWidth="lg" style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Employee  Report
                    </Typography>
                    <br />

                    {/* Grid for filter inputs */}
                    <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                placeholder="Filter by Name..."
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                placeholder="Filter by Class..."
                                value={filterClass}
                                onChange={(e) => setFilterClass(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

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
                                {filterClass ? (
                                currentEmployeesClass.map((employee) => (
                                    <TableRow key={employee._id}>
                                        <TableCell>{employee.firstname}</TableCell>
                                        <TableCell>{employee.lastname}</TableCell>
                                        <TableCell>{employee.rollno}</TableCell>
                                        <TableCell>{employee.classid}</TableCell> {/* Ensure this field exists */}
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
                                            <Button onClick={() => handleEdit(employee)}><FaEdit /></Button>&nbsp;
                                            <Button onClick={() => handleDelete(employee._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ):(
                                currentEmployees.map((employee) => (
                                    <TableRow key={employee._id}>
                                        <TableCell>{employee.firstname}</TableCell>
                                        <TableCell>{employee.lastname}</TableCell>
                                        <TableCell>{employee.rollno}</TableCell>
                                        <TableCell>{employee.classid}</TableCell> {/* Ensure this field exists */}
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
                                            <Button onClick={() => handleEdit(employee)}><FaEdit /></Button>&nbsp;
                                            <Button onClick={() => handleDelete(employee._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {showEditForm && (
                        <EditEmployeeForm
                            employee={selectedEmployee}
                            onUpdate={handleUpdate}
                            onClose={() => setShowEditForm(false)}
                        />
                    )}

                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredEmployees.length / studentsPerPage) }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant="outlined"
                                color={page === currentPage ? 'primary' : 'default'}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                </Container>
            </main>
        </div>
    )
}

export default EmployeesReport;