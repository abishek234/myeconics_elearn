
import React from 'react';
import MainLayout from './MainLayout';
import { useState } from 'react';
function Dashboard() {
    const [userId, setUserId] = useState(localStorage.getItem('userId')); // Corrected variable name

    console.log(userId);
    
  return (
   
      <MainLayout userId={userId}/>
   
  );
}

export default Dashboard;
