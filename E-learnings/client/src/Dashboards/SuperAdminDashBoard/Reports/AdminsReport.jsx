import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
    CircularProgress,
    Alert,
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import axios from 'axios';
import EditAdminForm from "../../FormEdit/EditAdminForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

const AdminsReport = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState(''); // State for the filter input
    const [selectedAdmin, setSelectedAdmin] = useState(null); // State for the selected admin for editing
    const [showEditForm, setShowEditForm] = useState(false); // State to control the overlay visibility

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [adminsPerPage] = useState(10); // Number of admins to display per page

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/admins/admin');
                setAdmins(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch admins');
                console.error('Error fetching admins:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    const handleEdit = (admin) => {
        setSelectedAdmin(admin); // Set the selected admin for editing
        setShowEditForm(true); // Show the overlay form
    };

    const handleUpdate = (updatedAdmin) => {
        setAdmins(admins.map(admin => (admin._id === updatedAdmin._id ? updatedAdmin : admin))); // Update the admin in state
        toast.success('Admin updated successfully!');
        setShowEditForm(false); // Close edit form after update
    };

    const handleDelete = async (adminId) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            try {
                await axios.delete(`http://localhost:9000/api/admins/admin/${adminId}`);
                setAdmins(admins.filter(admin => admin._id !== adminId)); // Remove the deleted admin from state
                toast.success('Admin deleted successfully!');
            } catch (error) {
                console.error('Error deleting admin:', error);
                toast.error('Failed to delete admin. Please try again.');
            }
        }
    };

   // Filtered admins based on the filter input
   const filteredAdmins = admins.filter(admin => {
       return (
           admin.name.toLowerCase().includes(filter.toLowerCase()) ||
           admin.email.toLowerCase().includes(filter.toLowerCase()) ||
           admin.phoneNumber.toString().includes(filter) ||
           admin.gender.toLowerCase().includes(filter.toLowerCase()) ||
           admin.designation.toLowerCase().includes(filter.toLowerCase()) ||
           admin.schoolname.toLowerCase().includes(filter.toLowerCase()) ||
           admin.Address.toLowerCase().includes(filter.toLowerCase()) ||
           admin.State.toLowerCase().includes(filter.toLowerCase()) ||
           admin.City.toLowerCase().includes(filter.toLowerCase()) ||
           admin.Pincode.toString().includes(filter)
       );
   });

   // Calculate pagination data
   const indexOfLastAdmin = currentPage * adminsPerPage;
   const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
   const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);

   return (
       <div className="app-layout">
           <Header onToggleSidebar={toggleSidebar} userId={userId} />
           <Sidebar isOpen={isSidebarOpen} />
           <main className="main-content">
               <Container maxWidth="lg" style={{ padding: '20px' }}>
                   <Typography variant="h4" align="center" gutterBottom>
                       Admin Dashboard Report
                   </Typography>

                   {/* Filter Input */}
                   <TextField
                       variant="outlined"
                       placeholder="Filter by any attribute..."
                       value={filter}
                       onChange={(e) => setFilter(e.target.value)}
                       fullWidth
                       style={{ marginBottom: '20px' }}
                   />

                   {/* Loading and Error Handling */}
                   {loading && <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />}
                   {error && <Alert severity="error" style={{ margin: '20px' }}>{error}</Alert>}

                   {/* Admins Table */}
                   <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                       <Table>
                           <TableHead>
                               <TableRow>
                                   <TableCell>Name</TableCell>
                                   <TableCell>Email</TableCell>
                                   <TableCell>Phone Number</TableCell>
                                   <TableCell>Gender</TableCell>
                                   <TableCell>Designation</TableCell>
                                   <TableCell>School Name</TableCell>
                                   <TableCell>Address</TableCell>
                                   <TableCell>State</TableCell>
                                   <TableCell>City</TableCell>
                                   <TableCell>Pincode</TableCell>
                                   <TableCell>Actions</TableCell>
                               </TableRow>
                           </TableHead>
                           <TableBody>
                               {currentAdmins.map((admin) => (
                                   <TableRow key={admin._id}>
                                       <TableCell>{admin.name}</TableCell>
                                       <TableCell>{admin.email}</TableCell>
                                       <TableCell>{admin.phoneNumber}</TableCell>
                                       <TableCell>{admin.gender}</TableCell>
                                       <TableCell>{admin.designation}</TableCell>
                                       <TableCell>{admin.schoolname}</TableCell>
                                       <TableCell>{admin.Address}</TableCell>
                                       <TableCell>{admin.State}</TableCell>
                                       <TableCell>{admin.City}</TableCell>
                                       <TableCell>{admin.Pincode}</TableCell>
                                       <TableCell>
                                           {/* Action Buttons */}
                                           <Button 
                                            
                                               onClick={() => handleEdit(admin)}
                                               
                                           >
                                                <FaEdit />
                                           </Button>
                                           &nbsp;
                                           <Button 
                                               
                                               onClick={() => handleDelete(admin._id)}
                                               
                                           >
                                               <FaTrash />
                                           </Button>
                                       </TableCell>
                                   </TableRow>
                               ))}
                           </TableBody>
                       </Table>
                   </TableContainer>

                   {/* Edit Admin Form Overlay */}
                   {showEditForm && (
                       <EditAdminForm
                           admin={selectedAdmin}
                           onClose={() => setShowEditForm(false)}
                           onUpdate={handleUpdate}
                       />
                   )}

                   {/* Pagination */}
                   {filteredAdmins.length > adminsPerPage && (
                       <div className="pagination">
                           {Array.from({ length: Math.ceil(filteredAdmins.length / adminsPerPage) }, (_, i) => i + 1).map((page) => (
                               <button
                                   key={page}
                                   className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                   onClick={() => setCurrentPage(page)}
                               >
                                   {page}
                               </button>
                           ))}
                       </div>
                   )}
               </Container>
           </main>
       </div >
   )
}

export default AdminsReport;