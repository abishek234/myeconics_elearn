import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";

const Sidebar = ({isOpen}) => {
    return(
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <nav>
                <ul>
                    <Link to="/employeedashboard"><li><FaHome  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Home</li></Link>
                    <Link to="/employeedashboard/timetable"><li><FaTableCells  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;TimeTable</li></Link>
                    <Link to="/employeedashboard/profile"><li><FaUserCircle  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Profile</li></Link>
                   

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;