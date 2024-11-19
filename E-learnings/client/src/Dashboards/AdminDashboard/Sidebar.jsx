import React from "react";
import { Link } from "react-router-dom";
import { MdFindInPage } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";

const Sidebar = ({isOpen}) => {
    return(
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <nav>
                <ul>
                    <Link to="/admindashboard"><li><FaHome  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Home</li></Link>
                    <Link to="/admindashboard/addteacher"><li><IoPersonAddSharp  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Add Teacher</li></Link>
                    <Link to="/admindashboard/admintracking"><li><MdFindInPage  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Admin Tracking</li></Link>
                    <Link to="/admindashboard/attendancetracking"><li><MdFindInPage style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Attendance Tracking</li></Link>
                    <Link to="/admindashboard/schoolteachers"><li><BiSolidReport  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Teachers Report</li></Link>
                    <Link to="/admindashboard/schoolstudents"><li><BiSolidReport  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Students Report</li></Link>
                    <Link to="/admindashboard/addtimetable"><li><FaTableCells  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Add Time Table</li></Link>
                    <Link to="/admindashboard/timetabletracking"><li><FaTableCells  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Time Table Tracking</li></Link> 
                    <Link to="/admindashboard/profile"><li><FaUserCircle  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Profile</li></Link>
                    

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;