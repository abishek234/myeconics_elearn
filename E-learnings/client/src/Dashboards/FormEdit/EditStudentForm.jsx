import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const EditStudentForm = ({ student, onClose, onUpdate }) => {
    // Initialize state variables
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [rollno, setRollno] = useState('');
    const [classid, setClassid] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [dateofbirth, setDateofbirth] = useState('');
    const [schoolname, setSchoolname] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');

    // Update local state when student prop changes
    useEffect(() => {
        if (student) {
            setFirstName(student.firstname);
            setLastName(student.lastname);
            setRollno(student.rollno);
            setClassid(student.classid);
            setEmail(student.email);
            setPhoneNumber(student.phoneNumber);
            setGender(student.gender);
            setDateofbirth(student.dateofbirth.split('T')[0]);
            setSchoolname(student.schoolname);
            setAddress(student.Address);
            setState(student.State);
            setCity(student.City);
            setPincode(student.Pincode);
        }
    }, [student]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedStudent = {
            firstname,
            lastname,
            rollno,
            classid,
            email,
            phoneNumber,
            gender,
            dateofbirth,
            schoolname,
            Address: address,
            State: state,
            City: city,
            Pincode: pincode,
        };

        try {
            const response = await axios.put(`http://localhost:9000/api/students/student/${student._id}`, updatedStudent);
            onUpdate(response.data);
            toast.success('Student updated successfully!');
            onClose();
        } catch (error) {
            console.error('Error updating student:', error);
            toast.error('Failed to update student. Please try again.');
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
                    <Typography variant="h4" gutterBottom align="center" style={{ marginBottom: '20px' }}>
                        Edit Student
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField label="First Name" variant="outlined" fullWidth margin="normal" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
                        <TextField label="Last Name" variant="outlined" fullWidth margin="normal" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
                        <TextField label="Roll No" variant="outlined" fullWidth margin="normal" type="number" value={rollno} onChange={(e) => setRollno(e.target.value)} required />
                        <TextField label="Class ID" variant="outlined" fullWidth margin="normal" type="number" value={classid} onChange={(e) => setClassid(e.target.value)} required />
                        <TextField label="Email" variant="outlined" fullWidth margin="normal" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel>Gender</InputLabel>
                            <Select value={gender} onChange={(e) => setGender(e.target.value)} label="Gender" required>
                                <MenuItem value=""><em>Select Gender</em></MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField label='Date of Birth' type='date' variant='outlined' fullWidth InputLabelProps={{ shrink: true }} value={dateofbirth} onChange={(e) =>setDateofbirth(e.target.value)} required />
                        <TextField label='School Name' variant='outlined' fullWidth margin='normal' value={schoolname} onChange={(e) =>setSchoolname(e.target.value)} required />
                        <TextField label='Address' variant='outlined' fullWidth margin='normal' value={address} onChange={(e) =>setAddress(e.target.value)} required />
                        <TextField label='State' variant='outlined' fullWidth margin='normal' value={state} onChange={(e) =>setState(e.target.value)} required />
                        <TextField label='City' variant='outlined' fullWidth margin='normal' value={city} onChange={(e) =>setCity(e.target.value)} required />
                        <TextField label='Pincode' variant='outlined' fullWidth margin='normal' type='number' value={pincode} onChange={(e) =>setPincode(e.target.value)} required />

                        {/* Uncomment for photo upload */}
                        {/*<Grid item xs={12}>
                            <input type='file' onChange={(e) =>setPhoto(e.target.files[0])} />
                        </Grid>*/}

                        <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Update Student
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

export default EditStudentForm;