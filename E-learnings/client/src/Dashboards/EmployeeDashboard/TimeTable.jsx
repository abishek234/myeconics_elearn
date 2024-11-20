import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from 'axios';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Box,
} from '@mui/material';
import { Alert } from '@mui/material';

const TimeTable = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const [timetable, setTimetable] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const classId = localStorage.getItem('userclassid');

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                console.log(classId);
                const response = await axios.get(`http://localhost:9000/api/timetables/getperiods/${classId}`);
                setTimetable(response.data);
                console.log(response.data);
            } catch (err) {
                setError('Failed to fetch timetable data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTimetable();
    }, [classId]);

    if (loading) return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;
    if (error) return <Alert severity="error" style={{ margin: '20px' }}>{error}</Alert>;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <Container>
                    <Typography variant="h4" gutterBottom align="center" style={{ marginTop: '20px', fontWeight: 'bold' }}>
                        Weekly Time Table
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#0AB6FF', color: '#fff' }}>Day</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#0AB6FF', color: '#fff' }}>Subject</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#0AB6FF', color: '#fff' }}>Start Time</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#0AB6FF', color: '#fff' }}>End Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {daysOfWeek.map(day => {
                                    const periods = timetable[day] || [];
                                    return periods.length > 0 ? (
                                        periods.map((period, index) => (
                                            <TableRow key={`${day}-${index}`} hover>
                                                {index === 0 && (
                                                    <TableCell rowSpan={periods.length} style={{ backgroundColor: '#FFF' }}>{day}</TableCell>
                                                )}
                                                <TableCell>{period.subject}</TableCell>
                                                <TableCell>{period.startTime}</TableCell>
                                                <TableCell>{period.endTime}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow key={day}>
                                            <TableCell>{day}</TableCell>
                                            <TableCell colSpan="3" align="center">No Classes</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </main>
        </div>
    );
}

export default TimeTable;