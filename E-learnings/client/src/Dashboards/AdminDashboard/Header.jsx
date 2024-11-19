import React, { useState, useEffect } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';
import avatar7 from '../../assets/avatars/avatar7.png';
import avatar8 from '../../assets/avatars/avatar8.png';
import avatar9 from '../../assets/avatars/avatar9.png';

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

  const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/auth/user/${userId}`);
        setUser(response.data);
        setEmail(response.data.email);
          // Generate a static avatar index based on userId
          if(response.data.photo){
            setPhoto(response.data.photo);
          }else{
          const avatarIndex = generateAvatarIndex(userId); // Use the new function to get an index
          setPhoto(avatarImages[avatarIndex]); // Set the avatar based on the index
          }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch user profile.');
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Function to generate a unique avatar index based on userId
const generateAvatarIndex = (userId) => {
  // Use a simple hash function to get a unique index
  let hash = 0;
  const prime = 31; // A prime number for better hash distribution

  for (let i = 0; i < userId.length; i++) {
    hash = (hash * prime) + userId.charCodeAt(i);
  }
 
  const index = Math.abs(hash) % avatarImages.length; // Ensure index is within bounds
  return index;
};


  return (
    <header className="header">
      <button onClick={onToggleSidebar} className="toggle-button">
        <FaBars />
      </button>

      <div className="owner-info">
      
      
        <p className="owner-email">{user.email}</p>
      </div>
     
      <img
          src={photo}
          alt="Owner"
          className="owner-image"
        />
      


      <FaSignOutAlt
        style={{ fontSize: '21px', marginLeft: '10px' }}
        onClick={logout}
      />
    </header>
  );
};

export default Header;
