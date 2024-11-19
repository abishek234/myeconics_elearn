import React from "react";
import { useState, useEffect } from 'react';
import Header from "../Header";
import Sidebar from "../Sidebar";
import '../../CSS/Dashboard.css';
import axios from 'axios';
import EditTeacherForm from "../../FormEdit/EditTeacherForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgress, Alert, Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Grid } from '@mui/material';


const TeachersReport = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterName, setFilterName] = useState(''); // Filter by name
    const [filterClass, setFilterClass] = useState(''); // Filter by handling class
    const [selectedTeacher, setSelectedTeacher] = useState(null); // State for the selected teacher for editing
    const [showEditForm, setShowEditForm] = useState(false); // State to control the overlay visibility

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [TeachersPerPage] = useState(10); // Number of admins to display per page

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/teachers/teachers');

                setTeachers(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch teachers');
                console.error('Error fetching teachers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

   // Filtered teachers based on the name search input
   const filteredTeachers = teachers.filter(teacher => {
    const dobFormatted = new Date(teacher.dateofbirth).toLocaleDateString();
    return (
        teacher.firstname.toLowerCase().includes(filterName.toLowerCase()) ||
        teacher.lastname.toLowerCase().includes(filterName.toLowerCase()) ||
        teacher.email.toLowerCase().includes(filterName.toLowerCase()) ||
        teacher.phoneNumber.toString().includes(filterName) ||
        teacher.gender.toLowerCase().includes(filterName.toLowerCase()) ||
        dobFormatted.includes(filterName) ||
        teacher.designation.toLowerCase().includes(filterName.toLowerCase()) ||
        teacher.schoolname.toLowerCase().includes(filterName.toLowerCase()) ||
        teacher.Address.toLowerCase().includes(filterName.toLowerCase()) ||
        teacher.State.toLowerCase().includes(filterName.toLowerCase()) ||
        teacher.City.toLowerCase().includes(filterName.toLowerCase()) ||
        teacher.Pincode.toString().includes(filterName)
    );
});

    // Filtered teachers based on the class search input
    const filteredTeachersByClass = teachers.filter(teacher => {
        return teacher.handlingclass.toLowerCase().includes(filterClass.toLowerCase());
    });


    const handleEdit = (teacher) => {
        setSelectedTeacher(teacher); // Set the selected teacher for editing
        setShowEditForm(true); // Show the overlay form
    };

    const handleUpdate = (updatedTeacher) => {
        setTeachers(teachers.map(teacher => (teacher._id === updatedTeacher._id ? updatedTeacher : teacher))); // Update the teacher in state
    };

    const handleDelete = async (teacherId) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            try {
                await axios.delete(`http://localhost:9000/api/teachers/teacher/${teacherId}`);
                setTeachers(teachers.filter(teacher => teacher._id !== teacherId)); // Remove the deleted teacher from state
                toast.success('Teacher deleted successfully!');
            } catch (error) {
                console.error('Error deleting teacher:', error);
                toast.error('Failed to delete teacher. Please try again.');
            }
        }
    };

    if (loading) {
        return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;
    }
    if (error) {
        return <Alert severity="error" style={{ margin: '20px' }}>{error}</Alert>;
    }

    // Calculate pagination data
    const indexOfLastTeacher = currentPage * TeachersPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - TeachersPerPage;
    const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

    // Calculate pagination data for class filter
    const indexOfLastTeacherByClass = currentPage * TeachersPerPage;
    const indexOfFirstTeacherByClass = indexOfLastTeacherByClass - TeachersPerPage;
    const currentTeachersByClass = filteredTeachersByClass.slice(indexOfFirstTeacherByClass, indexOfLastTeacherByClass);

    return (
        <div className="app-layout">
        <Header onToggleSidebar={toggleSidebar} userId={userId} />
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className="main-content">
            <Container maxWidth="lg" style={{ padding: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Teacher Report
                </Typography>
            
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
                            placeholder="Filter by Handling Class..."
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
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Designation</TableCell>
                                <TableCell>Handling Class</TableCell>
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
                                currentTeachersByClass.map((teacher) => (
                                    <TableRow key={teacher._id}>
                                        <TableCell>{teacher.firstname}</TableCell>
                                        <TableCell>{teacher.lastname}</TableCell>
                                        <TableCell>{teacher.email}</TableCell>
                                        <TableCell>{teacher.phoneNumber}</TableCell>
                                        <TableCell>{teacher.gender}</TableCell>
                                        <TableCell>{teacher.designation}</TableCell>
                                        <TableCell>{teacher.handlingclass}</TableCell>
                                        <TableCell>{new Date(teacher.dateofbirth).toLocaleDateString()}</TableCell>
                                        <TableCell>{teacher.schoolname}</TableCell>
                                        <TableCell>{teacher.Address}</TableCell>
                                        <TableCell>{teacher.State}</TableCell>
                                        <TableCell>{teacher.City}</TableCell>
                                        <TableCell>{teacher.Pincode}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEdit(teacher)}><FaEdit /></Button>&nbsp;
                                            <Button onClick={() => handleDelete(teacher._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                currentTeachers.map((teacher) => (
                                    <TableRow key={teacher._id}>
                                        <TableCell>{teacher.firstname}</TableCell>
                                        <TableCell>{teacher.lastname}</TableCell>
                                        <TableCell>{teacher.email}</TableCell>
                                        <TableCell>{teacher.phoneNumber}</TableCell>
                                        <TableCell>{teacher.gender}</TableCell>
                                        <TableCell>{teacher.designation}</TableCell>
                                        <TableCell>{teacher.handlingclass}</TableCell>
                                        <TableCell>{new Date(teacher.dateofbirth).toLocaleDateString()}</TableCell>
                                        <TableCell>{teacher.schoolname}</TableCell>
                                        <TableCell>{teacher.Address}</TableCell>
                                        <TableCell>{teacher.State}</TableCell>
                                        <TableCell>{teacher.City}</TableCell>
                                        <TableCell>{teacher.Pincode}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEdit(teacher)}><FaEdit /></Button>&nbsp;
                                            <Button onClick={() => handleDelete(teacher._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {showEditForm && (
                    <EditTeacherForm
                        teacher={selectedTeacher}
                        onUpdate={handleUpdate}
                        onClose={() => setShowEditForm(false)}
                    />
                )}
                {/* Pagination */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredTeachers.length / TeachersPerPage) }, (_, i) => i + 1).map((page) => (
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
            </Container >
        </main >

    </div >
    )
}

export default TeachersReport;