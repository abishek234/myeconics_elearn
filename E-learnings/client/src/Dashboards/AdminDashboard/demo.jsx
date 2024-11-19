import { useState,useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

const AttendanceTracking = ({userId}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };


    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/attendances/attendance/date`, {
                params: { date: selectedDate }
            });
            setAttendanceData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
            toast.error("Failed to fetch attendance data.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendanceData();
    }, [selectedDate]);

    // Handle marking attendance
    const handleMarkAttendance = async (studentId) => {
        try {
            // Logic to mark attendance (you can customize this)
            await axios.post(`http://localhost:9000/api/attendance`, {
                studentId,
                date: selectedDate,
                status: 'present' // or 'absent' based on your logic
            });
            toast.success("Attendance marked successfully!");
            fetchAttendanceData(); // Refresh data after marking
        } catch (error) {
            console.error("Error marking attendance:", error);
            toast.error("Failed to mark attendance.");
        }
    };


    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <h1>Attendance Tracking</h1>
                <Typography variant="h4" align="center" gutterBottom>
                Attendance Tracking
            </Typography>
            
            <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                style={{ marginBottom: '20px' }} 
            />

            {loading ? (
                <Typography variant="h6" align="center">Loading...</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Roll Number</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attendanceData.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.rollNumber}</TableCell>
                                    <TableCell>{student.isPresent ? "Present" : "Absent"}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => handleMarkAttendance(student.id)}
                                        >
                                            Mark Present
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            </main>
        </div>

    );
}


export default AttendanceTracking;