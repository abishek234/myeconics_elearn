import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Header from './Header';
import EditStudentForm from "../FormEdit/EditStudentForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgress, Alert, Container, Typography, TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StudentsReport = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState(''); // State for the filter input
    const [selectedStudent, setSelectedStudent] = useState(null); // State for the selected student for editing
    const [showEditForm, setShowEditForm] = useState(false); // State to control the overlay visibility

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10); // Number of students to display per page

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const schoolname = localStorage.getItem('userschool');
                const handlingClass = localStorage.getItem('userhandlingclass');
                const response = await axios.get(`http://localhost:9000/api/students/student?schoolname=${schoolname}&classid=${handlingClass}`);

                console.log(response.data);     
                setStudents(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch students');
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [])

    const handleEdit = (student) => {
        setSelectedStudent(student); // Set the selected student for editing
        setShowEditForm(true); // Show the overlay form
    };
    
    const handleUpdate = (updatedStudent) => {
        setStudents(students.map(student => (student._id === updatedStudent._id ? updatedStudent : student))); // Update the student in state
    };
    
    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://localhost:9000/api/students/student/${studentId}`);
                setStudents(students.filter(student => student._id !== studentId)); // Remove the deleted student from state
                toast.success('Student deleted successfully!');
            } catch (error) {
                console.error('Error deleting student:', error);
                toast.error('Failed to delete student. Please try again.');
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
    const filteredStudents = students.filter(student => {
        return (
            student.firstname.toLowerCase().includes(filter.toLowerCase()) ||
            student.lastname.toLowerCase().includes(filter.toLowerCase()) ||
            student.rollno.toString().includes(filter) ||
            student.classid.toString().includes(filter) ||
            student.email.toLowerCase().includes(filter.toLowerCase()) ||
            student.phoneNumber.toString().includes(filter) ||
            student.gender.toLowerCase().includes(filter.toLowerCase()) || 
            new Date(student.dateofbirth).toLocaleDateString().includes(filter) || 
            student.schoolname.toLowerCase().includes(filter.toLowerCase()) ||
            student.Address.toLowerCase().includes(filter.toLowerCase()) ||
            student.State.toLowerCase().includes(filter.toLowerCase()) ||
            student.City.toLowerCase().includes(filter.toLowerCase()) ||
            student.Pincode.toString().includes(filter)
        );
    });

     // Calculate pagination data
     const indexOfLastStudent = currentPage * studentsPerPage;
     const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
     const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

     return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom align="center">Students Report</Typography>
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
                                {currentStudents.map((student) => (
                                    <TableRow key={student._id}>
                                        <TableCell>{student.firstname}</TableCell>
                                        <TableCell>{student.lastname}</TableCell>
                                        <TableCell>{student.rollno}</TableCell>
                                        <TableCell>{student.classid}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{student.phoneNumber}</TableCell>
                                        <TableCell>{student.gender}</TableCell>
                                        <TableCell>{new Date(student.dateofbirth).toLocaleDateString()}</TableCell>
                                        <TableCell>{student.schoolname}</TableCell>
                                        <TableCell>{student.Address}</TableCell>
                                        <TableCell>{student.State}</TableCell>
                                        <TableCell>{student.City}</TableCell>
                                        <TableCell>{student.Pincode}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEdit(student)}><FaEdit /></Button><br /><br />
                                            <Button onClick={() => handleDelete(student._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }, (_, i) => i + 1).map((page) => (
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

                    {showEditForm && selectedStudent && (
                        <EditStudentForm
                            student={selectedStudent}
                            onUpdate={handleUpdate}
                            onClose={() => setShowEditForm(false)}
                        />
                    )}
                </Container>
            </main>
        </div>
     );
}

export default StudentsReport;