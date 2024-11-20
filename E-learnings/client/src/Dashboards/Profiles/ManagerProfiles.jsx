import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../ManagerDashboard/Header';
import Sidebar from '../ManagerDashboard/Sidebar';
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
import { PhotoCamera } from '@mui/icons-material';

const ManagerProfile = ({ userId }) => {
    const [manager, setManager] = useState({});
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
        const fetchManagerProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/managers/manager/${userId}`);
                setManager(response.data);
                setAvatar(response.data.photo || avatarImages[0]); // Set default avatar if not available
                setLoading(false);
            } catch (error) {
                console.error('Error fetching manager profile:', error);
                toast.error('Failed to fetch manager profile.');
            }
        };

        fetchManagerProfile();
    }, [userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedManager = {
                ...manager,
                photo: avatar, // Include the selected avatar
            };

            const response = await axios.put(`http://localhost:9000/api/managers/manager/${userId}`, updatedManager);
            setManager(response.data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            setError('Failed to update manager profile');
            console.error('Error updating manager profile:', error);
            toast.error('Failed to update manager profile. Please try again.');
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
                        manager Profile
                    </Typography>

                    <div style={{ textAlign: 'center' }}>
                        <img 
                            src={avatar} 
                            alt="profile-img" 
                            className="current-avatar" 
                            onClick={toggleOverlay} 
                            style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer',justifySelf:'center' }} 
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
                                    value={manager.firstname} 
                                    onChange={(e) => setManager({ ...manager, firstname: e.target.value })} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Last Name" 
                                    variant="outlined" 
                                    fullWidth 
                                    value={manager.lastname} 
                                    onChange={(e) => setManager({ ...manager, lastname: e.target.value })} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Email" 
                                    variant="outlined" 
                                    fullWidth 
                                    type="email"
                                    value={manager.email} 
                                    onChange={(e) => setManager({ ...manager, email: e.target.value })} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Handling Class" 
                                    variant="outlined" 
                                    fullWidth
                                    value={manager.handlingclass}
                                    onChange={(e) => setManager({ ...manager, handlingclass: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Phone Number" 
                                    variant="outlined" 
                                    fullWidth
                                    type="tel"
                                    value={manager.phoneNumber}
                                    onChange={(e) => setManager({ ...manager, phoneNumber: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={manager.gender}
                                        onChange={(e) => setManager({ ...manager, gender: e.target.value })}
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
                                    value={manager.dateofbirth.split('T')[0]} // Format date for input
                                    onChange={(e) => setManager({ ...manager, dateofbirth: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Address'
                                    variant='outlined'
                                    fullWidth
                                    value={manager.Address}
                                    onChange={(e) => setManager({ ...manager, Address: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label='State'
                                    variant='outlined'
                                    fullWidth
                                    value={manager.State}
                                    onChange={(e) => setManager({ ...manager, State: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label='City'
                                    variant='outlined'
                                    fullWidth
                                    value={manager.City}
                                    onChange={(e) => setManager({ ...manager, City: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                   label='Pincode'
                                   variant='outlined'
                                   fullWidth
                                   type='text'
                                   value={manager.Pincode}
                                   onChange={(e) => setManager({ ...manager, Pincode: e.target.value })}
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

export default ManagerProfile;