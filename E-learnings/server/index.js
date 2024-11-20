const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const managerRoutes = require('./routes/managerRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Backend server is running');
});



app.use('/api/admins', adminRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/superAdmins', superAdminRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/videos',videoRoutes);
app.use('/api/timetables',timetableRoutes);
app.use('/api/attendances',attendanceRoutes); 
app.use('/api/assessments',assessmentRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});