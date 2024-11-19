import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../CSS/Dashboard.css'; 
import axios from 'axios';
import { PiStudentBold } from "react-icons/pi";
import Face6Icon from '@mui/icons-material/Face6';
import Face3Icon from '@mui/icons-material/Face3';
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { MdIncompleteCircle } from "react-icons/md";

const MainLayout = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const school = localStorage.getItem('userschool');
    console.log('User ID:', userId);
    console.log('User School:', school);

    // Fetch student data based on teacher ID
    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/teachers/teacher/students/${userId}`); // Fetch student data
            setStudentData(response.data);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, [userId]);

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <h1>Teacher Dashboard Report</h1>
                <div className="stats-card">
                    {studentData && (
                        <>
                            <div className="stat-item">
                               
                                <span>Total Students:</span><br />&nbsp; <strong>{studentData.totalStudents || 0}</strong>
                                <div className="main-icon">
                                    <PiStudentBold  style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                                </div>
                            </div>
                            <div className="stat-item">
                            <span>Boys Count:</span><br />&nbsp; <strong>{studentData.boysCount || 0}</strong>
                            <div className="main-icon">
                              <Face6Icon style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div>
                              
                            </div>
                            <div className="stat-item">
                            <span>Girls Count:</span><br />&nbsp; <strong>{studentData.girlsCount || 0}</strong>
                            <div className="main-icon">
                                <Face3Icon style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div>
                            </div>
                            <div className="stat-item">
                            <span>Total Videos:</span><br />&nbsp; <strong>{studentData.totalVideos || 0}</strong>
                            <div className="main-icon">
                                <MdOutlineVideoLibrary style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div>
                            </div>
                            <div className="stat-item">
                            <span>Total Chapters:</span><br />&nbsp; <strong>{studentData.totalChapters || 0}</strong>
                            <div className="main-icon">
                                <MdOutlineMenuBook style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div> 
                            </div>
                            <div className="stat-item">
                            <span>Total Completed By Students:</span><br />&nbsp; <strong>{studentData.totalCompletedVideos|| 0}</strong>
                            <div className="main-icon">
                                <GrCompliance style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div>  
                            </div>
                            <div className="stat-item">
                            <span>Total Not Completed By Students:</span><br />&nbsp; <strong>{studentData.totalNotCompletedVideos || 0}</strong>
                            <div className="main-icon">
                                <MdIncompleteCircle style={{ fontSize: '40px', marginLeft: '15px' ,marginTop:'-70px' }} />
                            </div> 
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;