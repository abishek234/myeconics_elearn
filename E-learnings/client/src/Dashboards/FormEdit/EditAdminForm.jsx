import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

const EditAdminForm = ({ admin, onClose, onUpdate }) => {
    const [name, setName] = useState(admin.name);
    const [email, setEmail] = useState(admin.email);
    const [phoneNumber, setPhoneNumber] = useState(admin.phoneNumber);
    const [gender, setGender] = useState(admin.gender);
    const [designation, setDesignation] = useState(admin.designation);
    const [schoolname, setSchoolname] = useState(admin.schoolname);
    const [address, setAddress] = useState(admin.Address);
    const [state, setState] = useState(admin.State);
    const [city, setCity] = useState(admin.City);
    const [pincode, setPincode] = useState(admin.Pincode);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedAdmin = {
            name,
            email,
            phoneNumber,
            gender,
            designation,
            schoolname,
            Address: address,
            State: state,
            City: city,
            Pincode: pincode,
        };

        try {
            const response = await axios.put(`http://localhost:9000/api/admins/admin/${admin._id}`, updatedAdmin);
            onUpdate(response.data); // Call the onUpdate prop to update the admin list
            toast.success('Admin updated successfully!');
            onClose(); // Close the overlay
        } catch (error) {
            console.error('Error updating admin:', error);
            toast.error('Failed to update admin. Please try again.');
        }
    };

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
                    <Typography variant="h4" gutterBottom align="center">Edit Admin</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth required>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        label="Gender"
                                    >
                                        <MenuItem value="">
                                            <em>Select Gender</em>
                                        </MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Designation"
                                    variant="outlined"
                                    fullWidth
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="School Name"
                                    variant="outlined"
                                    fullWidth
                                    value={schoolname}
                                    onChange={(e) => setSchoolname(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="State"
                                    variant="outlined"
                                    fullWidth
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="City"
                                    variant="outlined"
                                    fullWidth
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Pincode"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    required
                                />
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <Button className='action' type="submit" variant="contained" color="primary">Update Admin</Button>
                            <Button className='action' type="button" variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default EditAdminForm;