import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { TextField, Button, Typography, Container, Alert } from "@mui/material";
import { toast } from "react-toastify";

const AttendanceTracking = ({userId}) => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [studentId, setStudentId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [attendancePercentage, setAttendancePercentage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message

        try {
            const response = await axios.get(
                `http://localhost:9000/api/attendances/attendance/percentage`,
                {
                    params: {
                        studentId,
                        startDate,
                        endDate,
                    },
                }
            );
            setAttendancePercentage(response.data.percentage);
        } catch (error) {
            console.error("Error fetching attendance percentage:", error);
            setErrorMessage("Failed to fetch attendance percentage.");
        }
    };


    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <h1>Attendance Tracking</h1>
                <Container maxWidth="sm" style={{ marginTop: "20px" }}>
            <Typography variant="h4" align="center" gutterBottom>
                Attendance Tracking
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Student ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                />
                <TextField
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <TextField
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Get Attendance Percentage
                </Button>
            </form>

            {attendancePercentage !== null && (
                <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
                    Attendance Percentage: {attendancePercentage.toFixed(2)}%
                </Typography>
            )}

            {errorMessage && (
                <Alert severity="error" style={{ marginTop: "20px" }}>
                    {errorMessage}
                </Alert>
            )}
        </Container>
            </main>
        </div>

    );
}


export default AttendanceTracking;