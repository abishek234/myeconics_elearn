// Dashboard.jsx
import { Routes, Route } from 'react-router-dom';
import DashContent from './DashContent'; // Import your Dashboard component
import Details from './Details'; // Import your Details component
import Sidebar from './Sidebar2'; // Import your Sidebar component
import Header from './Header';
import { useState } from 'react';

export default function Dashboard() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };
  return (
    <div className="flex">
   {/* <Sidebar /> */}
   <Sidebar menu={menuOpen} />
      <Header toggleMenu={toggleMenu} />
    {/* <Header /> */}
       <Routes>
        <Route path="/" element={<DashContent  />} />
        <Route path="/details" element={<Details />} />
       
      </Routes> 
    </div>
  );
}
