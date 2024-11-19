import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { TextField, Button, Container, Typography, Alert, Grid } from '@mui/material';

const AddTimeTable = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [classId, setClassId] = useState('');
    const [subject, setSubject] = useState('');
    const [schedule, setSchedule] = useState([{ day: '', startTime: '', endTime: '' }]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleScheduleChange = (index, field, value) => {
        const newSchedule = [...schedule];
        newSchedule[index][field] = value;
        setSchedule(newSchedule);
    };

    const addScheduleRow = () => {
        setSchedule([...schedule, { day: '', startTime: '', endTime: '' }]);
    };

    const removeScheduleRow = (index) => {
        const newSchedule = schedule.filter((_, i) => i !== index);
        setSchedule(newSchedule);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/timetables/addtimetable', {
                firstname,
                lastname,
                classId,
                subject,
                schedule
            });
            setSuccessMessage('Timetable added successfully!');
            setError(null);
            // Reset form fields after successful submission
            setFirstname('');
            setLastname('');
            setClassId('');
            setSubject('');
            setSchedule([{ day: '', startTime: '', endTime: '' }]);
        } catch (err) {
            setError('Failed to add timetable. Please check your input.');
            console.error(err);
        }
    };

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <Container maxWidth="sm">
                    <Typography variant="h4" gutterBottom align="center">Add Timetable</Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Class ID"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={classId}
                                    onChange={(e) => setClassId(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Subject"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </Grid>

                            {schedule.map((item, index) => (
                                <Grid container item xs={12} spacing={2} key={index} style={{ marginBottom: '10px' }}>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Day (e.g., Monday)"
                                            variant="outlined"
                                            fullWidth
                                            value={item.day}
                                            onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Start Time (HH:mm)"
                                            variant="outlined"
                                            fullWidth
                                            value={item.startTime}
                                            onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="End Time (HH:mm)"
                                            variant="outlined"
                                            fullWidth
                                            value={item.endTime}
                                            onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button onClick={() => removeScheduleRow(index)} color="secondary">Remove</Button>
                                    </Grid>
                                </Grid>
                            ))}

                            <Grid item xs={12}>
                                <Button onClick={addScheduleRow} color="primary">Add Schedule Row</Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                    Submit Timetable
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </main>
        </div>
    );
};

export default AddTimeTable;