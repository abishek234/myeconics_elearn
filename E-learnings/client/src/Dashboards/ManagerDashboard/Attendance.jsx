import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Alert,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import axios from 'axios';
import Header from "./Header";
import Sidebar from "./Sidebar";

const Attendance = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [students, setEmployees] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState(1); // Default to 1st period

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Fetch students based on class ID
    const fetchEmployees = async () => {
        const classId = localStorage.getItem("userhandlingclass");
        const schoolname = localStorage.getItem("userschool");
        try {
            const response = await axios.get(`http://localhost:9000/api/managers/manager/class/students?classid=${classId}&schoolname=${schoolname}`);
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching students:", error);
            setErrorMessage("Failed to load students.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle attendance checkbox change
    const handleCheckboxChange = (rollNo) => {
        // Toggle the attendance status for the specific employee
        setAttendanceData(prevData => ({
            ...prevData,
            [rollNo]: !prevData[rollNo]
        }));
    };

    // Handle period selection change
    const handlePeriodChange = (event) => {
        setSelectedPeriod(Number(event.target.value));
    };

    const handleSubmit = async () => {
        const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const subject = localStorage.getItem("userhandlingclass");
    
        // Prepare periods data
        const periods = [
            {
                periodNumber: selectedPeriod, // Use selected period number
                subject: subject,
                presentEmployees: Object.keys(attendanceData).filter(rollNo => attendanceData[rollNo]), // Collect roll numbers that are marked present
                absentEmployees: students.map(employee => employee.rollno).filter(rollNo => !attendanceData[rollNo]) // Collect roll numbers that are marked absent
            }
        ];
    
        try {
            await axios.post('http://localhost:9000/api/attendances/attendance', {
                classId: localStorage.getItem("userhandlingclass"),
                date,
                periods
            });
            setSuccessMessage('Attendance marked successfully!');
            setErrorMessage('');
            setAttendanceData({});
        } catch (error) {
            console.error("Error marking attendance:", error);
            setErrorMessage(error.response?.data.message || "Failed to mark attendance.");
            setSuccessMessage('');
        }
    };

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <Container maxWidth="lg" style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Mark Attendance
                    </Typography>

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {/* Period Selection */}
                            <Typography variant="h6" align="center" gutterBottom>
                                Select Period:
                            </Typography>
                            <Grid container justifyContent="center" spacing={2}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(period => (
                                    <Grid item key={period}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedPeriod === period}
                                                    onChange={handlePeriodChange}
                                                    value={period}
                                                />
                                            }
                                            label={`Period ${period}`}
                                        />
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Employee List */}
                            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                                {students.map(employee => (
                                    <Grid item xs={12} sm={6} md={4} key={employee._id}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6">{employee.firstname}</Typography>
                                                <Typography variant="h6">{employee.rollno}</Typography>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={attendanceData[employee.rollno] || false}
                                                            onChange={() => handleCheckboxChange(employee.rollno)}
                                                        />
                                                    }
                                                    label="Present"
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            {successMessage && (
                                <Alert severity="success" style={{ marginTop: '20px' }}>
                                    {successMessage}
                                </Alert>
                            )}
                            {errorMessage && (
                                <Alert severity="error" style={{ marginTop: '20px' }}>
                                    {errorMessage}
                                </Alert>
                            )}

                            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                                Submit Attendance
                            </Button>
                        </>
                    )}
                </Container>
            </main>
        </div>
    );
};

export default Attendance;