import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
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
    Grid,
    MenuItem,
    Select
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const TimeTableTracking = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [teachers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // States for filtering
    const [selectedManager, setSelectedManager] = useState('');
    const [classId, setClassId] = useState('');
    
    // Separate states for timetable data
    const [teacherTimetableData, setManagerTimetableData] = useState([]);
    const [classTimetableData, setClassTimetableData] = useState([]);

    useEffect(() => {
        const fetchManagers = async () => {
            const adminSchoolName = localStorage.getItem('userschool');
            try {
                const response = await axios.get(`http://localhost:9000/api/managers/manager?schoolname=${adminSchoolName}`);
                const teacherOptions = response.data.map(t => ({ label: `${t.firstname} ${t.lastname}`, value: t._id }));
                setManagers(teacherOptions);
            } catch (err) {
                console.error('Error fetching teachers:', err);
                toast.error('Failed to fetch teachers. Please try again.');
            }
            setLoading(false);
        };

        fetchManagers();
    }, []);

    const fetchTimetableByManager = async () => {
        if (!selectedManager) return; // Prevent fetching if no manager is selected

       
        setError(null); // Clear any previous errors
    
        try {
            const selectedManagerData = teachers.find(manager => manager.value === selectedManager);
            const response = await axios.get(`http://localhost:9000/api/timetables/gettimetable/${selectedManagerData.label.split(' ')[0]}/${selectedManagerData.label.split(' ')[1]}`);
            
            console.log('API Response:', response.data); // Log the API response
    
            // Check if response.data is an array
            if (Array.isArray(response.data)) {
                setManagerTimetableData(response.data); // Set timetable data for manager
                setClassTimetableData([]); // Clear class timetable data
            } else {
                console.error('Unexpected response type for manager-based fetch');
                setError('Invalid response format for manager-based fetch');
            }
        } catch (error) {
            console.error('Error fetching timetable by manager:', error);
            setError('Failed to fetch timetable by manager.');
        } finally {
            setLoading(false);
        }
    };

    
    const fetchTimetableByClass = async () => {
        if (!classId) return; // Prevent fetching if no class ID is provided
    
        setLoading(true);
        setError(null); // Clear any previous errors
    
        try {
            const response = await axios.get(`http://localhost:9000/api/timetables/getperiods/${classId}`);
    
            console.log('API Response:', response.data);
    
            // Check if response.data is an object with day keys
            if (typeof response.data === 'object' && response.data !== null) {
                setClassTimetableData(response.data); // Set timetable data for class
                setManagerTimetableData([]); // Clear manager timetable data
            } else {
                console.error('Unexpected object structure for class-based fetch');
                setError('Invalid response format for class-based fetch');
            }
        } catch (error) {
            console.error('Error fetching timetable by class:', error);
            setError('Failed to fetch timetable by class.');
        } finally {
            setLoading(false);
        }
    };
    
   return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            
            <main className="main-content">
                <Container maxWidth="lg" style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Timetable Management
                    </Typography>

                    {/* manager Selection Dropdown */}
                    <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                        <Grid item xs={12}>
                            <Select
                                variant="outlined"
                                value={selectedManager}
                                onChange={(e) => setSelectedManager(e.target.value)}
                                fullWidth
                            >
                                {teachers.map((manager) => (
                                    <MenuItem key={manager.value} value={manager.value}>
                                        {manager.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>

                    {/* Class ID Input */}
                    <TextField
                        variant="outlined"
                        placeholder="Class ID..."
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />

                    {/* Buttons to fetch timetable */}
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={fetchTimetableByManager}
                            >
                                Get Timetable by manager
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={fetchTimetableByClass}
                            >
                                Get Timetable by Class
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Loading and Error Handling */}
                    {loading && <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />}
                    {error && <Alert severity="error" style={{ margin: '20px' }}>{error}</Alert>}

                    {/* Displaying Timetable Data */}
                    {teacherTimetableData.length > 0 && (
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Day</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teacherTimetableData.map((entry) => (
                                        entry.schedule.map((period, index) => (
                                            <TableRow key={`${entry._id}-${index}`}>
                                                
                                                    <TableCell >{period.day}</TableCell>
                                             
                                                <TableCell>{entry.subject}</TableCell>
                                                <TableCell>{period.startTime}</TableCell>
                                                <TableCell>{period.endTime}</TableCell>
                                            </TableRow>
                                        ))
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {Object.keys(classTimetableData).length > 0 && (
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Day</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(classTimetableData).map(([day, periods]) =>{
                                          if (!Array.isArray(periods)) {
                                            console.warn(`Invalid periods data for day ${day}`);
                                            return null;
                                        }
                                       return  periods.map((period, index) => (
                                            <TableRow key={`${day}-${index}`}>
                                                {index === 0 && (
                                                    // Show day only for the first occurrence of that day
                                                    <TableCell rowSpan={periods.length}>{day}</TableCell>
                                                )}
                                                <TableCell>{period.subject}</TableCell>
                                                <TableCell>{period.startTime}</TableCell>
                                                <TableCell>{period.endTime}</TableCell>
                                            </TableRow>
                                        ))
})}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Container>
            </main>

        </div >
    );
};

export default TimeTableTracking;
             