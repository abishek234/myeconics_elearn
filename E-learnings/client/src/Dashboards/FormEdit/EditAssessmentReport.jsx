import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextField, Button, Container, Typography } from '@mui/material';

const EditAssessmentReport = ({ assessment, onClose, onUpdate }) => {
    // Initialize state variables with values from props
    const [rollNo, setRollNo] = useState('');
    const [email, setEmail] = useState('');
    const [classId, setClassId] = useState('');
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [chapter, setChapter] = useState('');
    const [score, setScore] = useState('');

    // Update local state when assessment prop changes
    useEffect(() => {
        if (assessment) {
            setRollNo(assessment.rollNo);
            setEmail(assessment.email);
            setClassId(assessment.class);
            setSubject(assessment.subject);
            setTopic(assessment.topic);
            setChapter(assessment.chapter);
            setScore(assessment.score);
        }
    }, [assessment]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Prepare updated assessment object
            const updatedAssessment = { rollNo, email, class: classId, subject, topic, chapter, score };
            
            // Send PUT request to update assessment in backend
            await axios.put(`http://localhost:9000/api/assessments/assessment/${assessment._id}`, updatedAssessment);

            onUpdate({ ...assessment, ...updatedAssessment }); // Call onUpdate prop with updated data
            onClose(); // Close the modal after updating
        } catch (error) {
            console.error('Error updating assessment:', error);
            toast.error('Failed to update assessment. Please try again.');
        }
    }

    return (
        <div className="overlay">
            <Container maxWidth="sm" style={{ padding: '0' }}>
                <div className="edit-form" style={{ 
                    padding: '20px', 
                    backgroundColor: '#fff', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
                    maxHeight: '80vh', 
                    overflowY: 'auto' 
                }}>
                    <Typography variant="h4" gutterBottom align="center">Edit Assessment</Typography>

                    {/* Form for editing assessment */}
                    <form onSubmit={handleSubmit}>
                        {/* Input fields for each property of the assessment */}
                        {[{ label: "Roll No", value: rollNo }, { label: "Email", value: email }, { label: "Class", value: classId }, { label: "Subject", value: subject }, { label: "Chapter", value: chapter }, { label: "Topic", value: topic }, { label: "Score", value: score }]
                          .map((field) => (
                              <TextField key={field.label}
                                  label={field.label}
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  value={field.value}
                                  onChange={(e) => eval(`set${field.label.replace(/ /g,'')}(e.target.value)`)}  // Dynamically setting state based on field name.
                                  required
                              />
                          ))}
                        
                        {/* Buttons for submitting or canceling */}
                        <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Update Assessment
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

export default EditAssessmentReport;