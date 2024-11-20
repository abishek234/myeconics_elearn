import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Header from './Header';
import { TextField, Button, Container, Typography, Alert, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddEmployees = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [rollno, setRollno] = useState('');
    const [classid, setClassid] = useState(''); // classid is the class in which employee is studying
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [dateofbirth, setDateofbirth] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const schoolname = localStorage.getItem('userschool');

        const studentData = {
            firstname,
            lastname,
            rollno,
            classid,
            email,
            phoneNumber,
            gender,
            password,
            dateofbirth,
            schoolname: schoolname,
            Address: address,
            State: state,
            City: city,
            Pincode: pincode,
        };

        try {
            console.log(studentData);
            const response = await axios.post('http://localhost:9000/api/students/employee', studentData);
            if (response.status === 201) {
                toast.success('Employee added successfully!');
                resetForm();
                setSuccessMessage('Employee added successfully!');
                setError(null);
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            toast.error('Failed to add employee. Please try again.');
            setError('Failed to add employee. Please try again.');
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setRollno('');
        setClassid('');
        setEmail('');
        setPhoneNumber('');
        setGender('');
        setPassword('');
        setDateofbirth('')
        setAddress('');
        setState('');
        setCity('');
        setPincode('');
    };

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <Container maxWidth="sm">
                    <Typography variant="h4" gutterBottom align="center">Add Employee</Typography>
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
                                    onChange={(e) => setFirstName(e.target.value)}
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
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Roll No"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    value={rollno}
                                    onChange={(e) => setRollno(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" margin="normal">
                                    <InputLabel>Class</InputLabel>
                                    <Select
                                        value={classid}
                                        onChange={(e) => setClassid(e.target.value)}
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
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="email"
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
                                    margin="normal"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" margin="normal">
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        label="Gender"
                                        required
                                    >
                                        <MenuItem value=""><em>Select Gender</em></MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
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
                                   value={dateofbirth} 
                                   onChange={(e) =>setDateofbirth(e.target.value)} 
                                   required 
                               />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                   label='Address'
                                   variant='outlined'
                                   fullWidth 
                                   margin='normal' 
                                   value={address} 
                                   onChange={(e) =>setAddress(e.target.value)} 
                                   required 
                               />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                   label='State'
                                   variant='outlined'
                                   fullWidth 
                                   margin='normal' 
                                   value={state} 
                                   onChange={(e) =>setState(e.target.value)} 
                                   required 
                               />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                   label='City'
                                   variant='outlined'
                                   fullWidth 
                                   margin='normal' 
                                   value={city} 
                                   onChange={(e) =>setCity(e.target.value)} 
                                   required 
                               />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                  label='Pincode'
                                  variant='outlined'
                                  fullWidth 
                                  margin='normal' 
                                  type='number' 
                                  value={pincode} 
                                  onChange={(e) =>setPincode(e.target.value)} 
                                  required 
                              />
                          </Grid>

                          {/* Uncomment for photo upload */}
                          {/*<Grid item xs={12}>
                              <input type='file' onChange={(e) =>setPhoto(e.target.files[0])} />
                          </Grid>*/}

                          <Grid item xs={12}>
                              <Button type='submit' variant='contained' color='primary' style={{ marginTop: '20px' }}>
                                  Add Employee
                              </Button>
                          </Grid>

                        </Grid>
                    </form>
                </Container>
            </main>
        </div>
    );
};

export default AddEmployees;