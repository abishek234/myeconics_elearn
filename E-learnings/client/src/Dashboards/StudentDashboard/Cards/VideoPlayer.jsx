import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Button, Typography } from '@mui/material'; 
import "../../CSS/Dashboard.css";

const VideoPlayer = ({ className, subject, chapter, topic }) => {
    const [videoIds, setVideoIds] = useState([]);
    const [loadingCompletion, setLoadingCompletion] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [userId] = useState(localStorage.getItem('userId')); 
    const [formLink, setFormLink] = useState(''); 
    const [selectedVideoId, setSelectedVideoId] = useState(null); 

    useEffect(() => {
        const fetchVideoIds = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/videos/videos/${className}/${subject}/${chapter}/${topic}/videos`);
                const videosWithCompletion = response.data.map(video => ({
                    ...video,
                    completedBy: video.completedBy || [],
                }));
                setFormLink(videosWithCompletion[0]?.form); 
                setVideoIds(videosWithCompletion);
                await fetchCompletionStatus(videosWithCompletion); 
            } catch (error) {
                console.error('Error fetching video IDs:', error);
                toast.error('Failed to fetch video IDs.');
            }
        };

        fetchVideoIds();
    }, [className, subject, chapter, topic]);

    const fetchCompletionStatus = async (videos) => {
        try {
            const completionPromises = videos.map(video =>
                axios.get(`http://localhost:9000/api/videos/video/${video._id}/completed/${userId}`)
            );

            const completionResults = await Promise.all(completionPromises);
            const updatedVideos = videos.map((video, index) => ({
                ...video,
                isCompleted: completionResults[index].data.isCompleted
            }));

            setVideoIds(updatedVideos);
        } catch (error) {
            console.error('Error fetching completion status:', error);
            toast.error('Failed to fetch completion status.');
        }
    };

    const handleCompletion = (videoId) => {
        setSelectedVideoId(videoId); 
    };

    const handleMarkAsCompleted = async () => {
        toast.success('Form submitted successfully!');
    };

    const handleDownload = (materialId) => {
        setLoadingDownload(true);
        const downloadLink = `https://drive.google.com/uc?export=download&id=${materialId.split('/')[5]}`;
        
        window.open(downloadLink, '_blank');

        setTimeout(() => {
            setLoadingDownload(false);
        }, 1000);
    };

    // Disable actions in the parent document when the form is opened
    useEffect(() => {
        if (selectedVideoId) {
            document.body.style.userSelect = 'none'; // Disable text selection
            document.addEventListener("contextmenu", (e) => e.preventDefault()); // Disable right-click

            return () => {
                document.body.style.userSelect = ''; // Re-enable text selection
                document.removeEventListener("contextmenu", (e) => e.preventDefault()); // Re-enable right-click
            };
        }
    }, [selectedVideoId]);

    return (
        <>
            <br />
            <br />
            <div className="video-player">
                {videoIds.map((video) => (
                    <div key={video._id} className="video-card">
                        <div>
                            <iframe
                                width="560"
                                height="315"
                                src={video.videoId}
                                title={chapter}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                            <br />
                            <br />
                            {loadingCompletion ? (
                                <ClipLoader size={20} color="#000" />
                            ) : !video.isCompleted ? (
                                <button className="btn-download" onClick={() => handleCompletion(video._id)}>
                                    Mark as Completed
                                </button>
                            ) : (
                                <button className="btn-download">Completed</button>
                            )}
                        </div>
                        <div>
                            {video.materialId && (
                                <div className="download-link">
                                    <h2>Material PDF:</h2>
                                    <br />
                                    {loadingDownload ? (
                                        <ClipLoader size={20} color="#000" />
                                    ) : (
                                        <button className="btn-download" onClick={() => handleDownload(video.materialId)}>
                                            Click here to download
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Google Form Section */}
                        {selectedVideoId === video._id && formLink && (
                            <div style={{ marginTop: '20px' }}>
                                <Typography variant="h6">Please fill out this form:</Typography>
                                <iframe 
                                    src={formLink} 
                                    width="100%" 
                                    height="500px" 
                                    style={{ border: 'none' }} 
                                    title="Google Form"
                                ></iframe>
                                <Button variant="contained" color="primary" onClick={handleMarkAsCompleted} style={{ marginTop: '10px' }}>
                                    Submit and Mark as Completed
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default VideoPlayer; 