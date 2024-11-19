import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Header from './Header';
import EditVideoForm from "../FormEdit/EditVideoForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgress, Alert, Container, Typography, TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const VideosReport = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [videos, setVideos] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(10); // Number of videos to display per page

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const teacherId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:9000/api/videos/video/${teacherId}`);
                setVideos(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch videos');
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [])

    const handleEdit = (video) => {
        setSelectedVideo(video);
        setShowEditForm(true);
    };

    const handleUpdate = (updatedVideo) => {
        setVideos(videos.map(video => (video._id === updatedVideo._id ? updatedVideo : video)));
    };

    const handleDelete = async (videoId) => {
        if (window.confirm('Are you sure you want to delete this Video?')) {
            try {
                await axios.delete(`http://localhost:9000/api/videos/video/${videoId}`);
                setVideos(videos.filter(video => video._id !== videoId));
                toast.success('Video deleted successfully!');
            } catch (error) {
                console.error('Error deleting Video:', error);
                toast.error('Failed to delete Video. Please try again.');
            }
        }
    };

    if (loading) {
        return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;
    }
    
    if (error) {
        return <Alert severity="error" style={{ margin: '20px' }}>{error}</Alert>;
    }

   // Filtered videos based on the filter input
   const filteredVideos = videos.filter(video => {
        return (
            video.subject.toLowerCase().includes(filter.toLowerCase()) ||
            video.chapter.toLowerCase().includes(filter.toLowerCase()) ||
            video.topic.toLowerCase().includes(filter.toLowerCase()) ||
            video.videoId.toLowerCase().includes(filter.toLowerCase()) ||
            video.materialId.toLowerCase().includes(filter.toLowerCase()) ||
            video.class.toLowerCase().includes(filter.toLowerCase())
        );
    });

     // Calculate pagination data
     const indexOfLastVideo = currentPage * videosPerPage;
     const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
     const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom align="center">Video Report</Typography>
                    <TextField
                        label="Filter by any attribute..."
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Chapter</TableCell>
                                    <TableCell>Topic</TableCell>
                                    <TableCell>Video ID</TableCell>
                                    <TableCell>Material ID</TableCell>
                                    <TableCell>Class</TableCell>
                                    <TableCell>Forms</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentVideos.map((video) => (
                                    <TableRow key={video._id}>
                                        <TableCell>{video.subject}</TableCell>
                                        <TableCell>{video.chapter}</TableCell>
                                        <TableCell>{video.topic}</TableCell>
                                        <TableCell>{video.videoId}</TableCell>
                                        <TableCell>{video.materialId}</TableCell>
                                        <TableCell>{video.class}</TableCell>
                                        <TableCell>{video.form}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEdit(video)}><FaEdit /></Button>
                                            <Button onClick={() => handleDelete(video._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredVideos.length / videosPerPage) }, (_, i) => i + 1).map((page) => (
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

                    {showEditForm && selectedVideo && (
                        <EditVideoForm
                            video={selectedVideo}
                            onUpdate={handleUpdate}
                            onClose={() => setShowEditForm(false)}
                        />
                    )}
                </Container>
            </main>
        </div>
    );
}

export default VideosReport;