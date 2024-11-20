import React from "react";
import { useState,useEffect } from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../CSS/Dashboard.css'; 
import axios from 'axios';
import { PiStudentBold } from "react-icons/pi";
import Face6Icon from '@mui/icons-material/Face6';
import Face3Icon from '@mui/icons-material/Face3';
import SchoolIcon from '@mui/icons-material/School';


const MainLayout = ({userId}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [data, setData] = useState(null);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const school =  localStorage.getItem('userschool')
    console.log('User ID:', userId);
    console.log('user school:',school);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/admins/admin/school/${userId}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    return(
        <div className="app-layout">
              <Header onToggleSidebar={toggleSidebar} userId={userId} />
              <Sidebar isOpen={isSidebarOpen} />
              <main className="main-content">
            <h1> Admin Dashboard Report</h1>
                <div className="stats-card">
                {data && (
                        <>
                            <div className="stat-item">
                               
                                <span>Total Employees:</span><br />&nbsp; <strong>{data.totalEmployees || 0}</strong>
                                <div className="main-icon">
                                    <PiStudentBold  style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                                </div>
                            </div>
                            <div className="stat-item">
                            <span>Boys Count:</span><br />&nbsp; <strong>{data.boysCount || 0}</strong>
                            <div className="main-icon">
                              <Face6Icon style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div>
                              
                            </div>
                            <div className="stat-item">
                            <span>Girls Count:</span><br />&nbsp; <strong>{data.girlsCount || 0}</strong>
                            <div className="main-icon">
                                <Face3Icon style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div>
                            </div>
                            <div className="stat-item">
                            <span>Total Managers:</span><br />&nbsp; <strong>{data.totalManagers || 0}</strong>
                            <div className="main-icon">
                                <SchoolIcon style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div>
                            </div>
                            <div className="stat-item">
                            <span>Total Male Managers:</span><br />&nbsp; <strong>{data.maleManagersCount || 0}</strong>
                            <div className="main-icon">
                                <Face6Icon style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div> 
                            </div>
                            <div className="stat-item">
                            <span>Total Female Managers:</span><br />&nbsp; <strong>{data.femaleManagersCount|| 0}</strong>
                            <div className="main-icon">
                                <Face3Icon style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div>  
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default MainLayout;