import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import logo from '../assets/Exams.gif';
import { toast } from 'react-toastify';
import"react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; 

const Login = ({ setUser, setRole,setSchoolName,setClassId,setHandlingClass,setDesignation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill out all required fields.");
      setLoading(false); // Reset loading state
      return;
    }

    try {
        const response = await axios.post(`http://localhost:9000/api/auth/login`, { email, password });
        
        if (response.status === 200) {
            const userData = response.data.responseData; // Access the responseData object

            // Setting local storage
            localStorage.setItem('userId', userData.id); // Now this should work
            localStorage.setItem('userEmail', userData.email);
            localStorage.setItem('userRole', userData.role);

            if (userData.role === 'admin') {
                localStorage.setItem('userschool', userData.schoolname);
                
            } else if (userData.role === 'manager') {
                localStorage.setItem('userschool', userData.schoolname);
                
                localStorage.setItem('userhandlingclass', userData.handlingclass);
                localStorage.setItem('userdesignation', userData.designation);
               
            } else if (userData.role === 'employee') {
                localStorage.setItem('userclassid', userData.classid);
                
            }

        const role = userData.role;

        if (role === 'CEO') {
          navigate('/superadmindashboard');
        }else if (role === 'admin') {
          navigate('/admindashboard');
        }else if (role === 'employee') {
            navigate('/Employeedashboard');
        }else if (role === 'manager') {
            navigate('/Managerdashboard');
        }else {
          navigate('/');
        }

        setUser(userData.id);
        setRole(userData.role);
        toast.success('Logged in successfully');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  function handleErrors(error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      toast.error('Invalid credentials');
    } else {
      console.error(error);
      toast.error('An unexpected error occurred.');
    }
  }

  return (
    <div className="main-login">
    <div className="left-login">

      <img src={logo} alt="Fingerprint" className="fingerprint"  height={550}/>
    </div>

    <div className="right-login">
      <div className="card-login">
        <h1>LOGIN</h1>
        <div className="textfield">
          <label htmlFor="email">Email ID</label>
          <input type="email" name="email" placeholder="Email ID"  onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="textfield">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn-login" onClick={handleSubmit} disabled={loading} >
        {loading ? <ClipLoader size={20} color="#000" /> : 'Login'}
        </button>
      </div>
    </div>
  </div>
  );
}

export default Login;
