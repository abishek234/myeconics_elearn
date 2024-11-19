import React, { useState, useEffect } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = ({ onToggleSidebar, userId }) => {
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState('');
  const Navigate = useNavigate();

  const logout = () => {
    // Clear user data from state or local storage here
    localStorage.clear(); // Example: clearing local storage

    // Redirect to login page
    Navigate('/');
    toast.success('Logout Successfully');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/auth/user/${userId}`);
        setUser(response.data);
        setEmail(response.data.email);
        setPhoto(response.data.photo); // Set the photo URL
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch user profile.');
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <header className="header">
      <button onClick={onToggleSidebar} className="toggle-button">
        <FaBars />
      </button>

      <div className="owner-info">
        {/* Display photo and email next to the logout icon */}
        {/* <img
          src={`https://bike-service-gdnd.onrender.com/uploads/${user.photo}`}
          alt="Owner"
          className="owner-image"
        /> */}
        <p className="owner-email">{user.email}</p>
      </div>

      <FaSignOutAlt
        style={{ fontSize: '21px', marginLeft: '10px' }}
        onClick={logout}
      />
    </header>
  );
};

export default Header;
