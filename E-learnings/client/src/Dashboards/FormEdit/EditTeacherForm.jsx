import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

const EditTeacherForm = ({ teacher, onUpdate, onClose }) => {
    // Function to format date to YYYY-MM-DD
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [firstname, setFirstName] = useState(teacher.firstname);
    const [lastname, setLastName] = useState(teacher.lastname);
    const [email, setEmail] = useState(teacher.email);
    const [phoneNumber, setPhoneNumber] = useState(teacher.phoneNumber);
    const [gender, setGender] = useState(teacher.gender);
    const [designation, setDesignation] = useState(teacher.designation);
    const [handlingclass, setHandlingclass] = useState(teacher.handlingclass);
    const [dateofbirth, setDateofbirth] = useState(formatDate(teacher.dateofbirth));
    const [schoolname, setSchoolname] = useState(teacher.schoolname);
    const [address, setAddress] = useState(teacher.Address);
    const [state, setState] = useState(teacher.State);
    const [city, setCity] = useState(teacher.City);
    const [pincode, setPincode] = useState(teacher.Pincode);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedTeacher = {
            firstname,
            lastname,
            email,
            phoneNumber,
            gender,
            designation,
            handlingclass,
            dateofbirth,
            schoolname,
            Address: address,
            State: state,
            City: city,
            Pincode: pincode,
        };

        try {
            const response = await axios.put(`http://localhost:9000/api/teachers/teacher/${teacher._id}`, updatedTeacher);
            onUpdate(response.data); // Call the onUpdate prop to update the teacher list
            toast.success('Teacher updated successfully!');
            onClose(); // Close the overlay
        } catch (error) {
            console.error('Error updating teacher:', error);
            toast.error('Failed to update teacher. Please try again.');
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
            <Typography variant="h5" align="center" gutterBottom>
                Edit Teacher
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
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
                <TextField
                   label='Designation'
                   variant='outlined'
                   fullWidth 
                   margin='normal' 
                   value={designation} 
                   onChange={(e) =>setDesignation(e.target.value)} 
                   required 
               />
               <TextField
                   label='Handling Class'
                   variant='outlined'
                   fullWidth 
                   margin='normal' 
                   value={handlingclass} 
                   onChange={(e) =>setHandlingclass(e.target.value)} 
                   required 
               />
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
               <TextField
                   label='School Name'
                   variant='outlined'
                   fullWidth 
                   margin='normal' 
                   value={schoolname} 
                   onChange={(e) =>setSchoolname(e.target.value)} 
                   required 
               />
               <TextField
                   label='Address'
                   variant='outlined'
                   fullWidth 
                   margin='normal' 
                   value={address} 
                   onChange={(e) =>setAddress(e.target.value)} 
                   required 
               />
               <TextField
                   label='State'
                   variant='outlined'
                   fullWidth 
                   margin='normal' 
                   value={state} 
                   onChange={(e) =>setState(e.target.value)} 
                   required 
               />
               <TextField
                   label='City'
                   variant='outlined'
                   fullWidth 
                   margin='normal' 
                   value={city} 
                   onChange={(e) =>setCity(e.target.value)} 
                   required 
               />
               <TextField
                  label='Pincode'
                  variant='outlined'
                  fullWidth 
                  margin='normal' 
                  type='text'  
                  value={pincode} 
                  onChange={(e) =>setPincode(e.target.value)}  
                  required  
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <Button type="submit" variant="contained" color="primary">
                      Update Teacher
                  </Button>
                  <Button type="button" onClick={onClose} variant="outlined" color="secondary">
                      Cancel
                  </Button>
              </div>
          </form>
        </div>
      </Container>
      </div>
  );
};

export default EditTeacherForm;