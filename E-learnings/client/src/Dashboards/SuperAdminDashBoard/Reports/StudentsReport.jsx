import React from "react";
import { useState,useEffect } from 'react';
import Header from "../Header";
import Sidebar from "../Sidebar";
import '../../CSS/Dashboard.css';   
import axios from 'axios';
import EditStudentForm from "../../FormEdit/EditStudentForm";
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

const StudentsReport = ({userId}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const [students, setStudents] = useState([]);   
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterName, setFilterName] = useState(''); // Filter by name
    const [filterClass, setFilterClass] = useState(''); // Filter by handling class
    const [selectedStudent, setSelectedStudent] = useState(null); // State for the selected student for editing
    const [showEditForm, setShowEditForm] = useState(false); // State to control the overlay visibility

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5); // Number of admins to display per page

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/students/students');
              
                setStudents(response.data);
                setLoading(false);
            }catch (error) {
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
        const dobFormatted = new Date(student.dateofbirth).toLocaleDateString(); // Format date of birth as DD/MM/YYYY
        return (
            student.firstname.toLowerCase().includes(filterName.toLowerCase()) ||
            student.lastname.toLowerCase().includes(filterName.toLowerCase()) ||
            student.rollno.toString().includes(filterName) ||
            student.email.toLowerCase().includes(filterName.toLowerCase()) ||
            student.phoneNumber.toString().includes(filterName) ||
            student.gender.toLowerCase().includes(filterName.toLowerCase()) || // Include gender in the filter
            dobFormatted.includes(filterName) || // Include date of birth in the filter
            student.schoolname.toLowerCase().includes(filterName.toLowerCase()) ||
            student.Address.toLowerCase().includes(filterName.toLowerCase()) ||
            student.State.toLowerCase().includes(filterName.toLowerCase()) ||
            student.City.toLowerCase().includes(filterName.toLowerCase()) ||
            student.Pincode.toString().includes(filterName) 

        );
    });

    //Filtered students based on the class input  
    const filteredStudentsClass = students.filter(student => {
        return student.classid.toString().includes(filterClass.toLowerCase());
    });

    // Calculate pagination data
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

     // Calculate pagination data based on class
     const indexOfLastStudentClass = currentPage * studentsPerPage;
     const indexOfFirstStudentClass = indexOfLastStudentClass - studentsPerPage;
     const currentStudentsClass = filteredStudentsClass.slice(indexOfFirstStudentClass, indexOfLastStudentClass);

    return(
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />

            <main className="main-content">
                <Container maxWidth="lg" style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Student  Report
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
                                currentStudentsClass.map((student) => (
                                    <TableRow key={student._id}>
                                        <TableCell>{student.firstname}</TableCell>
                                        <TableCell>{student.lastname}</TableCell>
                                        <TableCell>{student.rollno}</TableCell>
                                        <TableCell>{student.classid}</TableCell> {/* Ensure this field exists */}
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
                                            <Button onClick={() => handleEdit(student)}><FaEdit /></Button>&nbsp;
                                            <Button onClick={() => handleDelete(student._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ):(
                                currentStudents.map((student) => (
                                    <TableRow key={student._id}>
                                        <TableCell>{student.firstname}</TableCell>
                                        <TableCell>{student.lastname}</TableCell>
                                        <TableCell>{student.rollno}</TableCell>
                                        <TableCell>{student.classid}</TableCell> {/* Ensure this field exists */}
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
                                            <Button onClick={() => handleEdit(student)}><FaEdit /></Button>&nbsp;
                                            <Button onClick={() => handleDelete(student._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {showEditForm && (
                        <EditStudentForm
                            student={selectedStudent}
                            onUpdate={handleUpdate}
                            onClose={() => setShowEditForm(false)}
                        />
                    )}

                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }, (_, i) => i + 1).map((page) => (
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

export default StudentsReport;