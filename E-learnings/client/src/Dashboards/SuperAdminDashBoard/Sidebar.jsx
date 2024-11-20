import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { IoPersonAddSharp } from "react-icons/io5";

const Sidebar = ({isOpen}) => {
    return(
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <nav>
                <ul>
                    <Link to="/superadmindashboard"><li><FaHome  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Home</li></Link>
                    <Link to="/superadmindashboard/addadmin"><li><IoPersonAddSharp  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Add Admin</li></Link>
                    <Link to="/superadmindashboard/admins"><li><BiSolidReport  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Admins Report</li></Link>
                    <Link to="/superadmindashboard/schools"><li><BiSolidReport  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Schools Report</li></Link>
                    <Link to="/superadmindashboard/Managers"><li><BiSolidReport  style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Managers Report</li></Link>
                    <Link to="/superadmindashboard/Employees"><li><BiSolidReport style={{ fontSize: '21px', marginLeft: '10px' }}/> &nbsp;Employees Report</li></Link>

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;