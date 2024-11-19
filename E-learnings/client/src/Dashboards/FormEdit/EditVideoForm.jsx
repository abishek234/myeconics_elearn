import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextField, Button, Container, Typography } from '@mui/material';

const EditVideoForm = ({ video, onClose, onUpdate }) => {
    // Initialize state variables
    const [subject, setSubject] = useState('');
    const [chapter, setChapter] = useState('');
    const [topic, setTopic] = useState('');    
    const [videoId, setVideoId] = useState('');
    const [materialId, setMaterialId] = useState('');
    const [className, setClassName] = useState('');
    const [form,setForm] = useState('');

    // Update local state when video prop changes
    useEffect(() => {
        if (video) {
            setSubject(video.subject);
            setChapter(video.chapter);
            setTopic(video.topic);
            setVideoId(video.videoId);
            setMaterialId(video.materialId);
            setClassName(video.class);
            setForm(video.form);
        }
    }, [video]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedVideo = { subject, chapter, topic, videoId, materialId, class: className,form };

        try {
            const response = await axios.put(`http://localhost:9000/api/videos/video/${video._id}`, updatedVideo);
            onUpdate(response.data); // Call the onUpdate prop to update the video list
            toast.success('Video updated successfully!');
            onClose(); // Close the overlay
        } catch (error) {
            console.error('Error updating video:', error);
            toast.error('Failed to update video. Please try again.');
        }
    }

    return (
        <div className="overlay">
            <Container maxWidth="sm" style={{padding:'0'}}>
                <div className="edit-form" style={{ 
                    padding: '20px', 
                    backgroundColor: '#fff', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
                    maxHeight: '80vh', 
                    overflowY: 'auto' 
                }}>
                    <Typography variant="h4" gutterBottom align="center">Edit Video</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Subject"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                        <TextField
                            label="Chapter"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={chapter}
                            onChange={(e) => setChapter(e.target.value)}
                            required
                        />
                        <TextField
                            label="Topic"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                        />
                        <TextField
                            label="Video ID"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={videoId}
                            onChange={(e) => setVideoId(e.target.value)}
                            required
                        />
                        <TextField
                            label="Material ID"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={materialId}
                            onChange={(e) => setMaterialId(e.target.value)}
                            required
                        />
                        <TextField
                            label="Class"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Form"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={form}
                            onChange={(e) => setForm(e.target.value)}
                            required
                        />
                        <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Update Video
                            </Button>
                            <Button type="button" variant="outlined" color="secondary" onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default EditVideoForm;