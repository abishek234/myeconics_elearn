import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { CircularProgress, Alert, Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Grid } from '@mui/material';
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';
import EditManagerForm from "../FormEdit/EditManagerForm";

const ManagersReport = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [teachers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterName, setFilterName] = useState(''); // Filter by name
    const [filterClass, setFilterClass] = useState(''); // Filter by handling class
    const [selectedManager, setSelectedManager] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [teachersPerPage] = useState(10);

    useEffect(() => {
        const fetchManagers = async () => {
            const adminSchoolName = localStorage.getItem('userschool');

            try {
                const response = await axios.get(`http://localhost:9000/api/managers/manager?schoolname=${adminSchoolName}`);
                setManagers(response.data);
            } catch (error) {
                setError('Failed to fetch teachers');
                console.error('Error fetching teachers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchManagers();
    }, []);

    // Filtered teachers based on the name search input
    const filteredManagersByName = teachers.filter(manager => {
        const dobFormatted = new Date(manager.dateofbirth).toLocaleDateString();
        return (
            manager.firstname.toLowerCase().includes(filterName.toLowerCase()) ||
            manager.lastname.toLowerCase().includes(filterName.toLowerCase()) ||
            manager.email.toLowerCase().includes(filterName.toLowerCase()) ||
            manager.phoneNumber.toString().includes(filterName) ||
            manager.gender.toLowerCase().includes(filterName.toLowerCase()) ||
            dobFormatted.includes(filterName) ||
            manager.designation.toLowerCase().includes(filterName.toLowerCase()) ||
            manager.schoolname.toLowerCase().includes(filterName.toLowerCase()) ||
            manager.Address.toLowerCase().includes(filterName.toLowerCase()) ||
            manager.State.toLowerCase().includes(filterName.toLowerCase()) ||
            manager.City.toLowerCase().includes(filterName.toLowerCase()) ||
            manager.Pincode.toString().includes(filterName)
        );
    });

    // Filtered teachers based on the class search input
    const filteredManagersByClass = teachers.filter(manager => {
        return manager.handlingclass.toLowerCase().includes(filterClass.toLowerCase());
    });

    const handleEdit = (manager) => {
        setSelectedManager(manager);
        setShowEditForm(true);
    };

    const handleUpdate = (updatedManager) => {
        setManagers(teachers.map(manager => (manager._id === updatedManager._id ? updatedManager : manager)));
    };

    const handleDelete = async (teacherId) => {
        if (window.confirm('Are you sure you want to delete this manager?')) {
            try {
                await axios.delete(`http://localhost:9000/api/managers/manager/${teacherId}`);
                setManagers(teachers.filter(manager => manager._id !== teacherId));
                toast.success('manager deleted successfully!');
            } catch (error) {
                console.error('Error deleting manager:', error);
                toast.error('Failed to delete manager. Please try again.');
            }
        }
    };

    if (loading) {
        return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;
    }

    if (error) {
        return <Alert severity="error" style={{ margin: '20px' }}>{error}</Alert>;
    }

    // Calculate pagination data for name filter
    const indexOfLastManagerByName = currentPage * teachersPerPage;
    const indexOfFirstManagerByName = indexOfLastManagerByName - teachersPerPage;
    const currentManagersByName = filteredManagersByName.slice(indexOfFirstManagerByName, indexOfLastManagerByName);

    // Calculate pagination data for class filter
    const indexOfLastManagerByClass = currentPage * teachersPerPage;
    const indexOfFirstManagerByClass = indexOfLastManagerByClass - teachersPerPage;
    const currentManagersByClass = filteredManagersByClass.slice(indexOfFirstManagerByClass, indexOfLastManagerByClass);

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            
            <main className="main-content">
                <Container maxWidth="lg" style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        manager Report
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
                                    currentManagersByClass.map((manager) => (
                                        <TableRow key={manager._id}>
                                            <TableCell>{manager.firstname}</TableCell>
                                            <TableCell>{manager.lastname}</TableCell>
                                            <TableCell>{manager.email}</TableCell>
                                            <TableCell>{manager.phoneNumber}</TableCell>
                                            <TableCell>{manager.gender}</TableCell>
                                            <TableCell>{manager.designation}</TableCell>
                                            <TableCell>{manager.handlingclass}</TableCell>
                                            <TableCell>{new Date(manager.dateofbirth).toLocaleDateString()}</TableCell>
                                            <TableCell>{manager.schoolname}</TableCell>
                                            <TableCell>{manager.Address}</TableCell>
                                            <TableCell>{manager.State}</TableCell>
                                            <TableCell>{manager.City}</TableCell>
                                            <TableCell>{manager.Pincode}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleEdit(manager)}><FaEdit /></Button>&nbsp;
                                                <Button onClick={() => handleDelete(manager._id)}><FaTrash /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    currentManagersByName.map((manager) => (
                                        <TableRow key={manager._id}>
                                            <TableCell>{manager.firstname}</TableCell>
                                            <TableCell>{manager.lastname}</TableCell>
                                            <TableCell>{manager.email}</TableCell>
                                            <TableCell>{manager.phoneNumber}</TableCell>
                                            <TableCell>{manager.gender}</TableCell>
                                            <TableCell>{manager.designation}</TableCell>
                                            <TableCell>{manager.handlingclass}</TableCell>
                                            <TableCell>{new Date(manager.dateofbirth).toLocaleDateString()}</TableCell>
                                            <TableCell>{manager.schoolname}</TableCell>
                                            <TableCell>{manager.Address}</TableCell>
                                            <TableCell>{manager.State}</TableCell>
                                            <TableCell>{manager.City}</TableCell>
                                            <TableCell>{manager.Pincode}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleEdit(manager)}><FaEdit /></Button>&nbsp;
                                                <Button onClick={() => handleDelete(manager._id)}><FaTrash /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {showEditForm && (
                        <EditManagerForm
                            manager={selectedManager}
                            onUpdate={handleUpdate}
                            onClose={() => setShowEditForm(false)}
                        />
                    )}
                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredManagersByName.length / teachersPerPage) }, (_, i) => i + 1).map((page) => (
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
    );
};

export default ManagersReport;

