import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Header from './Header';
import { TextField, Button, Container, Typography, Alert, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddVideo = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [chapter, setChapter] = useState('');
    const [topic, setTopic] = useState('');
    const [videoId, setVideoId] = useState('');
    const [materialId, setMaterialId] = useState('');
    const [form, setForm] = useState('');
    const [className, setClassName] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const teacherId = localStorage.getItem('userId');

        const videoData = { subject, chapter, topic, videoId, materialId,form, class: className, teacherId };

        try {
            const response = await axios.post('http://localhost:9000/api/videos/video', videoData);
            if (response.status === 201) {
                toast.success('Video added successfully!');
                setSubject('');
                setChapter('');
                setTopic('');
                setVideoId('');
                setMaterialId('');
                setForm('');
                setClassName('');
                setSuccessMessage('Video added successfully!');
                setError(null);
            }
        } catch (error) {
            console.error('Error adding video:', error);
            toast.error('Failed to add video. Please try again.');
            setError('Failed to add video. Please try again.');
        }
    };

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <Container maxWidth="sm">
                    <Typography variant="h4" gutterBottom align="center">Add Video</Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
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
                            <Grid item xs={12}>
                                <TextField
                                    label="Chapter"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={chapter}
                                    onChange={(e) => setChapter(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Topic"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Video ID"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={videoId}
                                    onChange={(e) => setVideoId(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Material ID"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={materialId}
                                    onChange={(e) => setMaterialId(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Form"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={form}
                                    onChange={(e) => setForm(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" margin="normal">
                                    <InputLabel>Class</InputLabel>
                                    <Select
                                        value={className}
                                        onChange={(e) => setClassName(e.target.value)}
                                        label="Class"
                                        required
                                    >
                                        <MenuItem value=""><em>Select Class</em></MenuItem>
                                        <MenuItem value="LKG">LKG</MenuItem>
                                        <MenuItem value="UKG">UKG</MenuItem>
                                        {[...Array(12)].map((_, i) => (
                                            <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                    Add Video
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </main>
        </div>
    );
};

export default AddVideo;