
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/View/Aboutview';
import Services from './components/View/ServiceView';
import Contact from "./components/View/ContactView";
import Login from './components/login';
import Elogin from '../E-learnings/client/src/login/login';
import Footer from './components/ui/Footer';
import Home from './components/Home';
import Details from './components/Dashboard/Details';
import Dashboard from './components/Dashboard/Dashboard';
import Process from './components/Process';
import Career from './components/Career';
import View from './components/Dashboard/View';
import DomainJobs from './components/DomainJob';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Form from './components/form';
import Features from "./components/Features";
import LogPage from './components/LogPage';
import SDashboard from '../E-learnings/client/src/Dashboards/SuperAdminDashBoard/Dashboard';
import AdminDashboard from '../E-learnings/client/src/Dashboards/AdminDashboard/Dashboard';
import ManagerDashboard from '../E-learnings/client/src/Dashboards/ManagerDashboard/Dashboard';
import EmployeeDashboard from '../E-learnings/client/src/Dashboards/EmployeeDashboard/Dashboard';
import AdminsReport from '../E-learnings/client/src/Dashboards/SuperAdminDashBoard/Reports/AdminsReport';
import EmployeesReport from '../E-learnings/client/src/Dashboards/SuperAdminDashBoard/Reports/EmployeesReport';
import ManagersReport from '../E-learnings/client/src/Dashboards/SuperAdminDashBoard/Reports/ManagersReport';
import SchoolReport from '../E-learnings/client/src/Dashboards/SuperAdminDashBoard/Reports/SchoolReport';
import AddAdmin from '../E-learnings/client/src/Dashboards/SuperAdminDashBoard/AddAdmin';
import AddManagers from '../E-learnings/client/src/Dashboards/AdminDashboard/AddManagers';
import AddEmployees from '../E-learnings/client/src/Dashboards/ManagerDashboard/AddEmployees';
import AddVideos from '../E-learnings/client/src/Dashboards/ManagerDashboard/AddVideo';  
import AdminsManagersReport from '../E-learnings/client/src/Dashboards/AdminDashboard/ManagersReport';
import AdminsEmployeesReport from '../E-learnings/client/src/Dashboards/AdminDashboard/EmployeesReport';
import ManagersEmployeesReport from '../E-learnings/client/src/Dashboards/ManagerDashboard/EmployeesReport';
import ManagersVideoReport from '../E-learnings/client/src/Dashboards/ManagerDashboard/VideoReport';
import EmployeeProfile from '../E-learnings/client/src/Dashboards/Profiles/EmployeeProfiles';
import ManagerProfile from '../E-learnings/client/src/Dashboards/Profiles/ManagerProfiles';
import AdminProfile from '../E-learnings/client/src/Dashboards/Profiles/AdminProfiles';
import AdminTracking from '../E-learnings/client/src/Dashboards/AdminDashboard/AdminTracking';
import AddTimeTable from '../E-learnings/client/src/Dashboards/AdminDashboard/TimeTable/AddTimeTable';
import TimeTable from '../E-learnings/client/src/Dashboards/EmployeeDashboard/TimeTable';
import ManagerTimeTable from '../E-learnings/client/src/Dashboards/ManagerDashboard/TimeTable';
import TimeTableTracking from '../E-learnings/client/src/Dashboards/AdminDashboard/TimeTable/TimeTableTracking';
import Attendance from '../E-learnings/client/src/Dashboards/ManagerDashboard/Attendance';
import AssessmentUpload from '../E-learnings/client/src/Dashboards/ManagerDashboard/AssessmentReport';
import AttendanceTracking from '../E-learnings/client/src/Dashboards/AdminDashboard/AttendanceTracking';
function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
      const fetchJobs = async () => {
          try {
              const response = await axios.get('http://localhost:3000/jobs');
              setJobs(response.data);
          } catch (error) {
              console.error('Failed to fetch jobs:', error);
          }
      };

      fetchJobs();
  }, []);

  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Get user ID from local storage
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole')); // Get user role from local storage
  const [userSchoolName,setUserSchoolName] =useState(localStorage.getItem('userschool')); //Get user school from local storage
  const [userClassId,setUserClassId] =useState(localStorage.getItem('userclassid')); //Get user class id from local storage
  const [userHandlingClass,setUserHandlingClass] =useState(localStorage.getItem('userhandlingclass')); //Get user handling class from local storage
  const [userDesignation,setUserDesignation] =useState(localStorage.getItem('userdesignation')); //Get user designation from local storage

  useEffect(() => {
    console.log('User ID:', userId);
    console.log('User Role:', userRole);

    if(userRole === 'admin'){
      console.log('User School:',userSchoolName);
    }else if(userRole === 'Manager'){
      console.log('User Handling Class:',userHandlingClass);
      console.log('User Designation:',userDesignation);
    }else if(userRole === 'Employee'){
      console.log('User Class ID:',userClassId);
    }
    
  }, [userId, userRole,userSchoolName,userClassId,userHandlingClass,userDesignation]);
  return (
    <Router>

      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<Home />} /> {/* Use element prop to render components */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={ 
          <>
            <Services />
            <Features />
          </>
        } />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dlogin" element={<Login />} />
        <Route path="/elogin" element={<Elogin   setUser={setUserId} setRole={setUserRole} setSchoolName={setUserSchoolName} setClassId={setUserClassId} setDesignation={setUserDesignation} setHandlingClass={setUserHandlingClass}/>} />
        <Route path="/details" element={<Details />} />
        <Route path="/view" element={<View/>} />
        <Route path="/form" element={<Form />} />
        <Route path="/process" element={<Process />} />
        <Route path="/dashboard/*" element={<Dashboard jobs={jobs} />} />
        <Route path="/career" element={<Career jobs={jobs} />} />
        <Route path="/jobs/:domain" element={<DomainJobs jobs={jobs} />} />
        <Route path="/log" element={<LogPage />} />
        <Route path='/superadmindashboard' element={<SDashboard userId={userId} />} />
      <Route path='/admindashboard' element={<AdminDashboard userId={userId}  />} />
      <Route path='/Managerdashboard' element={<ManagerDashboard userId={userId} />} />
      <Route path='/Employeedashboard' element={<EmployeeDashboard userId={userId} />} />
      <Route path='/superadmindashboard/admins' element={<AdminsReport userId={userId} />} />
      <Route path='/superadmindashboard/Employees' element={<EmployeesReport userId={userId} />} />
      <Route path='/superadmindashboard/Managers' element={<ManagersReport userId={userId} />} />
      <Route path='/superadmindashboard/addadmin' element={<AddAdmin userId={userId} />} />
      <Route path='/admindashboard/addManager' element={<AddManagers userId={userId} />} />
      <Route path='/Managerdashboard/addEmployees' element={<AddEmployees userId={userId} />} />
      <Route path='/Managerdashboard/addvideos' element={<AddVideos userId={userId} />} />
      <Route path='/admindashboard/schoolManagers' element={<AdminsManagersReport userId={userId} /> }/>
      <Route path='/admindashboard/schoolEmployees' element={<AdminsEmployeesReport userId={userId}/>}/>
      <Route path='/Managerdashboard/schoolEmployees' element={<ManagersEmployeesReport userId={userId}/>}/>
      <Route path='/Managerdashboard/schoolvideos' element={<ManagersVideoReport userId={userId}/>}/>
      <Route path='/Employeedashboard/profile' element={<EmployeeProfile userId={userId}/>}/>
      <Route path='/Managerdashboard/profile' element={<ManagerProfile userId={userId}/>}/>
      <Route path='/admindashboard/profile' element={<AdminProfile userId={userId} />} />
      <Route path='/superadmindashboard/schools' element={<SchoolReport userId={userId} />} />
      <Route path='/admindashboard/admintracking' element={<AdminTracking userId={userId} />} />
      <Route path='/admindashboard/addtimetable' element={<AddTimeTable userId={userId} />} />
      <Route path='/Employeedashboard/timetable' element={<TimeTable userId={userId} />} />
      <Route path='/Managerdashboard/timetable' element={<ManagerTimeTable userId={userId} />} />
      <Route path='/admindashboard/timetabletracking' element={<TimeTableTracking userId={userId} />} />
      <Route path='/Managerdashboard/attendance' element={<Attendance userId={userId} />} />
      <Route path='/Managerdashboard/assessmentupload' element={<AssessmentUpload userId={userId} />} />
      <Route path='/admindashboard/attendancetracking' element={<AttendanceTracking userId={userId} />} />
        

        

        <Route path="*" element={<Footer />} /> {/* A catch-all route for the Footer */}
      </Routes>
    </Router>
  );
}

export default App;
