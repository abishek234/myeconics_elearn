import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdFindInPage } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Sidebar = ({ isOpen }) => {
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [isTrackDropdownOpen, setIsTrackDropdownOpen] = useState(false);
  const [isReportDropdownOpen, setIsReportDropdownOpen] = useState(false);

  const toggleAddDropdown = () => setIsAddDropdownOpen((prev) => !prev);
  const toggleTrackDropdown = () => setIsTrackDropdownOpen((prev) => !prev);
  const toggleReportDropdown = () => setIsReportDropdownOpen((prev) => !prev);

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <ul>
          <Link to="/admindashboard">
            <li>
              <FaHome style={{ fontSize: "21px", marginLeft: "10px" }} /> &nbsp;Home
            </li>
          </Link>

          {/* ADD Dropdown */}
          <li
            onClick={toggleAddDropdown}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", color: "white" }}
          >
            <BiSolidReport style={{ fontSize: "21px", marginLeft: "10px", color: "white" }} /> &nbsp;ADD
            {isAddDropdownOpen ? (
              <ExpandLessIcon style={{ fontSize: "21px", marginLeft: "70px" }} />
            ) : (
              <ExpandMoreIcon style={{ fontSize: "21px", marginLeft: "70px" }} />
            )}
          </li>
          {isAddDropdownOpen && (
            <ul className="dropdown">
              <Link to="/admindashboard/addManager">
                <li>
                  <IoPersonAddSharp style={{ fontSize: "21px", marginLeft: "10px" }} /> &nbsp;Add Manager
                </li>
              </Link>
              <Link to="/admindashboard/addtimetable">
                <li>
                  <FaTableCells style={{ fontSize: "21px", marginLeft: "10px" }} /> &nbsp;Add Time Table
                </li>
              </Link>
            </ul>
          )}

          {/* Tracking Dropdown */}
          <li
            onClick={toggleTrackDropdown}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", color: "white" }}
          >
            <BiSolidReport style={{ fontSize: "21px", marginLeft: "10px", color: "white" }} /> &nbsp;Tracking
            {isTrackDropdownOpen ? (
              <ExpandLessIcon style={{ fontSize: "21px", marginLeft: "70px" }} />
            ) : (
              <ExpandMoreIcon style={{ fontSize: "21px", marginLeft: "70px" }} />
            )}
          </li>
          {isTrackDropdownOpen && (
            <ul className="dropdown">
              <Link to="/admindashboard/admintracking">
                <li>
                  <MdFindInPage style={{ fontSize: "21px", marginLeft: "10px" }} /> &nbsp;Admin Tracking
                </li>
              </Link>
              <Link to="/admindashboard/attendancetracking">
                <li>
                  <MdFindInPage style={{ fontSize: "21px", marginLeft: "10px" }} /> &nbsp;Attendance Tracking
                </li>
              </Link>
              <Link to="/admindashboard/timetabletracking">
            <li>
              <FaTableCells style={{ fontSize: "21px", marginLeft: "10px" }} /> &nbsp;Time Table Tracking
            </li>
          </Link>
            </ul>
          )}

          {/* Reports Dropdown */}
          <li
            onClick={toggleReportDropdown}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", color: "white" }}
          >
            <BiSolidReport style={{ fontSize: "21px", marginLeft: "10px", color: "white" }} /> &nbsp;Reports
            {isReportDropdownOpen ? (
              <ExpandLessIcon style={{ fontSize: "21px", marginLeft: "70px" }} />
            ) : (
              <ExpandMoreIcon style={{ fontSize: "21px", marginLeft: "70px" }} />
            )}
          </li>
          {isReportDropdownOpen && (
            <ul className="dropdown">
              <Link to="/admindashboard/schoolManagers">
                <li>
                  <BiSolidReport style={{ fontSize: "21px", marginLeft: "10px" }} /> &nbsp;Managers Report
                </li>
              </Link>
              <Link to="/admindashboard/schoolEmployees">
                <li>
                  <BiSolidReport style={{ fontSize: "21px", marginLeft: "10px" }} /> &nbsp;Employees Report
                </li>
              </Link>
            </ul>
          )}

          {/* Other Static Links */}
        
          <Link to="/admindashboard/profile">
            <li>
              <FaUserCircle style={{ fontSize: "21px", marginLeft: "10px" }} /> &nbsp;Profile
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
