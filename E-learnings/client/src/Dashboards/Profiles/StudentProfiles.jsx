import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../StudentDashboard/Header';
import Sidebar from '../StudentDashboard/Sidebar';
import { toast } from 'react-toastify';
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';
import avatar7 from '../../assets/avatars/avatar7.png';
import avatar8 from '../../assets/avatars/avatar8.png';
import avatar9 from '../../assets/avatars/avatar9.png';
import {
    CircularProgress,
    Alert,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton
} from '@mui/material';

const StudentProfile = ({ userId }) => {
    const [student, setStudent] = useState({});
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOverlayOpen, setOverlayOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Array of avatar images
    const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/students/student/${userId}`);
                setStudent(response.data);
                setAvatar(response.data.photo || avatarImages[0]); // Set default avatar if not available
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student profile:', error);
                toast.error('Failed to fetch student profile.');
            }
        };

        fetchStudentProfile();
    }, [userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedStudent = {
                ...student,
                photo: avatar, // Include the selected avatar
            };

            const response = await axios.put(`http://localhost:9000/api/students/student/${userId}`, updatedStudent);
            setStudent(response.data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            setError('Failed to update student profile');
            console.error('Error updating student profile:', error);
            toast.error('Failed to update student profile. Please try again.');
        }
    };

    const handleAvatarChange = (newAvatar) => {
        setAvatar(newAvatar); // Set the selected avatar
        setOverlayOpen(false); // Close the overlay after selecting an avatar
    };
    
    const toggleOverlay = () => {
        setOverlayOpen(!isOverlayOpen); // Toggle overlay visibility
    };

    if (loading) {
        return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;
    }

    if (error) {
        return <Alert severity="error" style={{ margin: '20px' }}>{error}</Alert>;
    }

   return (
        <>
        <div className="app-layout">
             <Header onToggleSidebar={toggleSidebar} userId={userId} />
             <Sidebar isOpen={isSidebarOpen} />

            <main className="main-content">
                <Container maxWidth="md" style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Student Profile
                    </Typography>

                    <div style={{ textAlign: 'center' }}>
                        <img 
                            src={avatar} 
                            alt="profile-img" 
                            className="current-avatar" 
                            onClick={toggleOverlay} 
                            style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }} 
                        />
                        <Typography variant="body1">Click on the avatar to change it.</Typography>
                        <br />
                        <br />
                    </div>

                    <form onSubmit={handleUpdate}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="First Name" 
                                    variant="outlined" 
                                    fullWidth 
                                    value={student.firstname} 
                                    onChange={(e) => setStudent({ ...student, firstname: e.target.value })} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Last Name" 
                                    variant="outlined" 
                                    fullWidth 
                                    value={student.lastname} 
                                    onChange={(e) => setStudent({ ...student, lastname: e.target.value })} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Roll No" 
                                    variant="outlined" 
                                    fullWidth 
                                    value={student.rollno} 
                                    onChange={(e) => setStudent({ ...student, rollno: e.target.value })} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Class" 
                                    variant="outlined" 
                                    fullWidth
                                    value={student.classid}
                                    onChange={(e) => setStudent({ ...student, classid: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Email" 
                                    variant="outlined" 
                                    fullWidth 
                                    type="email"
                                    value={student.email} 
                                    onChange={(e) => setStudent({ ...student, email: e.target.value })} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Phone Number" 
                                    variant="outlined" 
                                    fullWidth
                                    type="tel"
                                    value={student.phoneNumber}
                                    onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={student.gender}
                                        onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                                        label="Gender"
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Date of Birth'
                                    type='date'
                                    variant='outlined'
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={student.dateofbirth.split('T')[0]} // Format date for input
                                    onChange={(e) => setStudent({ ...student, dateofbirth: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Address'
                                    variant='outlined'
                                    fullWidth
                                    value={student.Address}
                                    onChange={(e) => setStudent({ ...student, Address: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label='State'
                                    variant='outlined'
                                    fullWidth
                                    value={student.State}
                                    onChange={(e) => setStudent({ ...student, State: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                     label='City'
                                     variant='outlined'
                                     fullWidth
                                     value={student.City}
                                     onChange={(e) => setStudent({ ...student, City: e.target.value })}
                                 />
                             </Grid>
                             <Grid item xs={12}>
                                 <TextField
                                     label='Pincode'
                                     variant='outlined'
                                     fullWidth
                                     type='text'
                                     value={student.Pincode}
                                     onChange={(e) => setStudent({ ...student, Pincode: e.target.value })}
                                 />
                             </Grid>

                             {/* Update button */}
                             <Grid item xs={12}>
                                 <Button className="btn-service" type="submit" variant="contained" color="primary">
                                     Update Profile
                                 </Button>
                             </Grid>
                         </Grid>
                     </form>

                     {/* Overlay for avatar selection */}
                     {isOverlayOpen && (
                         <div className="overlays">
                             <div className="overlay-content">
                                 <Typography variant="h6">Select an Avatar</Typography>
                                 <div className="avatar-selection">
                                   {avatarImages.map((img, index) => (
                                       <IconButton key={index} onClick={() => handleAvatarChange(img)}>
                                           <img
                                               src={img}
                                               alt={`Avatar ${index + 1}`}
                                               className="avatar-option"
                                               style={{ width: '50px', height: '50px', borderRadius: '50%', border: img === avatar ? '2px solid blue' : 'none', cursor: 'pointer' }} // Highlight selected avatar
                                           />
                                       </IconButton>
                                   ))}
                               </div>
                               <Button className="action" onClick={toggleOverlay}>Close</Button>
                           </div>
                           </div>
                       )}
                   </Container>
               </main>
           </div>
       </>
   );
};

export default StudentProfile;