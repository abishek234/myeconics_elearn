import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; 
import Header from './Header';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { Alert, Container, Typography, TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import EditAssessmentReport from '../FormEdit/EditAssessmentReport'; 
import { FaEdit, FaTrash } from 'react-icons/fa';

const AssessmentUpload = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [file, setFile] = useState(null);
    const [uploadedData, setUploadedData] = useState([]);
    const [existingData, setExistingData] = useState([]); 
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedAssessment, setSelectedAssessment] = useState(null); 
    const [openEditModal, setOpenEditModal] = useState(false); 

    // State for filtering and pagination
    const [filterText, setFilterText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const classId = localStorage.getItem('userhandlingclass'); 
    const subject = localStorage.getItem('userdesignation'); 

    useEffect(() => {
        const fetchExistingData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/assessments/assessment/${classId}/${subject}`);
                console.log("API Response:", response.data);
                if (Array.isArray(response.data)) {
                    setExistingData(response.data); 
                } else {
                    console.error("Unexpected response format:", response.data);
                    setErrorMessage("Failed to fetch existing assessment data.");
                }
            } catch (error) {
                console.error("Error fetching existing data:", error);
                setErrorMessage("Failed to fetch existing assessment data.");
            }
        };

        fetchExistingData();
    }, [classId, subject]); 

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setErrorMessage('');
    
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
    
                    // Convert sheet to JSON with raw option to preserve original cell values
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    
                    // Log parsed data for debugging
                    console.log("Parsed Data:", jsonData);
    
                    const requiredHeaders = ['class', 'subject', 'topic', 'chapter', 'email', 'rollNo', 'score'];
                    const missingHeaders = requiredHeaders.filter(header => !jsonData[0]?.hasOwnProperty(header));
    
                    if (missingHeaders.length > 0) {
                        setErrorMessage(`Missing headers: ${missingHeaders.join(', ')}`);
                        setFile(null);
                    } else {
                        // Process each row to ensure score is formatted correctly
                        const processedData = jsonData.map(data => {
                            let score = data.score || data.Score;
    
                            // Check if score is in "X/Y" format or a simple number
                            if (typeof score === 'string' && score.includes('/')) {
                                score = score.trim(); // Keep it as is if it's already in "X/Y" format
                            } else if (typeof score === 'number') {
                                // Assuming full score is 10 for conversion
                                score = `${score}/10`; // Convert number to string and append "/10"
                            } else if (typeof score === 'string') {
                                // Handle cases where score might be a string but not in "X/Y" format
                                score = score.trim();
                            } else {
                                console.warn(`Invalid score format for ${data.email}: ${score}`);
                                return null; // Skip this row or handle as needed
                            }
    
                            return {
                                ...data,
                                score: score // Ensure it's stored as a string in "X/Y" format
                            };
                        }).filter(data => data !== null); // Filter out any null entries
    
                        console.log("Processed Data:", processedData); // Log processed data for debugging
                        
                      
    
                        // Continue with further processing or saving processedData as needed
                    }
                } catch (error) {
                    console.error("Error processing file:", error);
                    setErrorMessage('An error occurred while processing the file.');
                    setFile(null);
                }
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    };


    const handleUpload = async () => {
        if (!file) {
            setErrorMessage("Please fill in all fields and upload the file.");
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post('http://localhost:9000/api/assessments/assessment/upload', formData);
            console.log("Upload Response:", response.data);
    
            if (Array.isArray(response.data.data)) { // Accessing nested data correctly
                // Ensure scores are in "X/Y" format before setting uploaded data
                const formattedData = response.data.data.map(item => {
                    // Assuming item.score is a number, change it to "score/score"
                    if (typeof item.score === 'number') {
                        return {
                            ...item,
                            score: `${item.score}/${item.score}` // Format as "X/Y"
                        };
                    }
                    return item; // Return unchanged if it's already formatted
                });
    
                setUploadedData(formattedData); 
                console.log("Uploaded Data:", formattedData);
                
                // Combine existing and newly uploaded data
                setExistingData(prevData => [...prevData, ...formattedData]);
                
                // Show success toast notification
                toast.success('Files uploaded successfully!');
            } 
            resetFields();
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Failed to upload file.");
            }
            setSuccessMessage('');
        }
    };

    const resetFields = () => {
        setFile(null);
    };

   // Function to handle editing an assessment
   const handleEditClick = (assessment) => {
       setSelectedAssessment(assessment); 
       setOpenEditModal(true); 
   };

   // Function to handle deleting an assessment
   const handleDeleteClick = async (id) => {
       if (window.confirm('Are you sure you want to delete this student?')) {
           try {
               await axios.delete(`http://localhost:9000/api/assessments/assessment/${id}`);
               setExistingData(existingData.filter(item => item._id !== id)); 
               toast.success('Assessment deleted successfully!');
           } catch (error) {
               console.error('Error deleting assessment:', error);
               toast.error('Failed to delete assessment.');
           }
       }
   };

   // Filtered data based on filterText
   const filteredData = existingData.filter(item =>
       item.rollNo.toString().includes(filterText) ||
       item.email.toLowerCase().includes(filterText.toLowerCase()) ||
       item.class.toLowerCase().includes(filterText.toLowerCase()) ||
       item.subject.toLowerCase().includes(filterText.toLowerCase()) ||
       item.chapter.toLowerCase().includes(filterText.toLowerCase()) ||
       item.topic.toLowerCase().includes(filterText.toLowerCase()) ||
       item.score.toString().includes(filterText)
   );

   // Pagination handling
   const handleChangePage = (event, newPage) => {
       setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
       setRowsPerPage(parseInt(event.target.value));
       setPage(0); // Reset to first page when changing rows per page
   };

   return (
       <div className="app-layout">
           <Header onToggleSidebar={toggleSidebar} userId={userId}/>
           <Sidebar isOpen={isSidebarOpen} />
           <main className="main-content">
               <Container>
                   <Typography variant="h4" gutterBottom>
                       Upload Assessment Scores
                   </Typography>
                   <form onSubmit={(e) => e.preventDefault()}>
                       <Grid container spacing={2}>
                           <Grid item xs={12}>
                               <TextField 
                                   type="file" 
                                   accept=".xlsx, .xls, .csv" 
                                   onChange={handleFileChange} 
                                   fullWidth 
                                   required 
                                   inputProps={{ style: { padding: '10px' } }} 
                               />
                           </Grid>
                           
                           <Grid item xs={12}>
                               <Button variant="contained" color="primary" onClick={handleUpload}>
                                   Upload
                               </Button>
                           </Grid>
                           <Grid item xs={12}>
                               {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                               {successMessage && <Alert severity="success">{successMessage}</Alert>}
                           </Grid>
                       </Grid>
                   </form>

                   {/* Filter Input */}
                   <Grid container spacing={2} style={{ marginTop: '20px' }}>
                       <Grid item xs={12}>
                           <TextField
                               label="Filter by Roll No / Email / Class / Subject// Chapter / Topic / Score"
                               variant="outlined"
                               fullWidth
                               value={filterText}
                               onChange={(e) => setFilterText(e.target.value)}
                           />
                       </Grid>
                   </Grid>

                   {filteredData.length > 0 && (
                       <>
                           <br />
                           <Typography variant="h5" gutterBottom>
                               All Assessment Data
                           </Typography>
                           <TableContainer component={Paper}>
                               <Table>
                                   <TableHead>
                                       <TableRow>
                                           <TableCell>Roll No</TableCell>
                                           <TableCell>Email</TableCell>
                                           <TableCell>Class</TableCell>
                                           <TableCell>Subject</TableCell>
                                           <TableCell>Chapter</TableCell>
                                           <TableCell>Topic</TableCell>
                                           <TableCell>Score</TableCell>
                                           <TableCell>Actions</TableCell> {/* New Actions Column */}
                                       </TableRow>
                                   </TableHead>
                                   <TableBody>
                                       {/* Display filtered data */}
                                       {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                           <TableRow key={item._id}>
                                               <TableCell>{item.rollNo}</TableCell>
                                               <TableCell>{item.email}</TableCell>
                                               <TableCell>{item.class}</TableCell>
                                               <TableCell>{item.subject}</TableCell>
                                               <TableCell>{item.chapter}</TableCell>
                                               <TableCell>{item.topic}</TableCell>
                                               <TableCell>{item.score}</TableCell>

                                               {/* Actions Buttons */}
                                               <TableCell>
                                                   {/* Edit Button */}
                                                   <Button onClick={() => handleEditClick(item)}>
                                                       <FaEdit />
                                                   </Button>

                                                   {/* Delete Button */}
                                                   <Button onClick={() => handleDeleteClick(item._id)} >
                                                       <FaTrash />
                                                   </Button>
                                               </TableCell>
                                           </TableRow>
                                       ))}
                                   </TableBody>
                               </Table>

                               {/* Pagination Component */}
                               {filteredData.length > 0 && (
                                   <TablePagination
                                       rowsPerPageOptions={[5, 10, 25]}
                                       component="div"
                                       count={filteredData.length}
                                       rowsPerPage={rowsPerPage}
                                       page={page}
                                       onPageChange={handleChangePage}
                                       onRowsPerPageChange={handleChangeRowsPerPage}
                                   />
                               )}
                           </TableContainer>

                           {/* Edit Assessment Modal */}
                           {openEditModal && (
                               <EditAssessmentReport 
                                   assessment={selectedAssessment} 
                                   onClose={() => setOpenEditModal(false)} 
                                   onUpdate={(updatedAssessment) => {
                                       // Update local state with updated assessment details
                                       setExistingData(existingData.map(item => item._id === updatedAssessment._id ? updatedAssessment : item));
                                       setOpenEditModal(false);
                                       toast.success('Assessment updated successfully!');
                                   }} 
                               />
                           )}
                       </>
                   )}
               </Container>
           </main>
       </div>
   );
};

export default AssessmentUpload;