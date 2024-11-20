import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { LuFileVideo2 } from "react-icons/lu";
import { FaTableCells } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Sidebar = ({ isOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <nav>
                <ul>
                    <Link to="/Managerdashboard"><li><FaHome style={{ fontSize: '21px', marginLeft: '10px' }} /> &nbsp;Home</li></Link>
                    <Link to="/Managerdashboard/addstudents"><li><IoPersonAddSharp style={{ fontSize: '21px', marginLeft: '10px' }} /> &nbsp;Add Employees</li></Link>
                    <Link to="/Managerdashboard/addvideos"><li><MdAddAPhoto style={{ fontSize: '21px', marginLeft: '10px' }} /> &nbsp;Add Videos</li></Link>
                    
                    {/* Dropdown for Reports */}
                    <li onClick={toggleDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center',color:'white' }}>
                        <BiSolidReport style={{ fontSize: '21px', marginLeft: '10px',color:'white' }} /> &nbsp;Reports
                        {isDropdownOpen ? <ExpandLessIcon style={{ fontSize: '21px', marginLeft: '70px' }}  /> : <ExpandMoreIcon  style={{ fontSize: '21px', marginLeft: '70px' }}/>}
                    </li>
                    {isDropdownOpen && (
                        <ul className="dropdown">
                            <Link to="/Managerdashboard/schoolstudents"><li><BiSolidReport  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Employees Report</li></Link>
                            <Link to="/Managerdashboard/schoolvideos"><li><LuFileVideo2  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Videos Report</li></Link>
                            <Link to="/Managerdashboard/assessmentupload"><li><BiSolidReport  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Assessment Report</li></Link>
                        </ul>
                    )}

                    <Link to="/Managerdashboard/timetable"><li><FaTableCells style={{ fontSize: '21px', marginLeft: '10px' }} /> &nbsp;Time Table</li></Link>
                    <Link to="/Managerdashboard/attendance"><li><TbReport style={{ fontSize: '21px', marginLeft: '10px' }} /> &nbsp;Attendance</li></Link>
                    <Link to="/Managerdashboard/profile"><li><FaUserCircle style={{ fontSize: '21px', marginLeft: '10px' }} /> &nbsp;Profile</li></Link>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;