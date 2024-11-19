/* eslint-disable no-undef */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"; // Import mongoose for MongoDB object modeling
import cors from "cors";
import User from "./Models/User.js";
import Job from "./Models/Job.js";
import nodemailer from "nodemailer";
import multer from "multer";

// Configure Multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });


const MONGO_URI = "mongodb+srv://avinesh14:Abishek14@cluster0.wf5jq0s.mongodb.net/myeconics?retryWrites=true&w=majority";

// Connect to your MongoDB database

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from http://localhost:5173
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());



// Endpoint for logging in
app.post('/login', async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials or not an admin' });
        }

        if (user.isAdmin) {
            res.status(200).json({ message: 'Logged in successfully' });
        } else {
            res.status(403).json({ message: 'Not an admin' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/jobs', async (req, res) => {
    try {
      const jobs = await Job.find({});
      res.send(jobs);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  app.post('/jobs', async (req, res) => {
    const job = new Job(req.body);
    try {
      await job.save();
      res.status(201).send(job);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.put('/jobs/:id', async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedJob) {
        return res.status(404).send('Job not found');
      }
      res.send(updatedJob);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  app.delete('/jobs/:id', async (req, res) => {
    try {
      const deletedJob = await Job.findByIdAndDelete(req.params.id);
      if (!deletedJob) {
        return res.status(404).send('Job not found');
      }
      console.log("Job Deleted")
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  app.get('/jobs/domains', async (req, res) => {
    try {
        const domainCounts = await Job.aggregate([
            {
                $addFields: {
                    normalizedDomain: { $toLower: '$domain' }
                }
            },
            {
                $group: {
                    _id: '$normalizedDomain',
                    count: { $sum: 1 },
                    originalDomain: { $first: '$domain' }
                }
            },
            {
                $project: {
                    _id: 0,
                    domain: '$originalDomain',
                    count: 1
                }
            }
        ]);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(domainCounts));
    } catch (error) {
        console.error('Error fetching domain counts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/send-email', upload.single('file'), async (req, res) => {
  const { name, email, phone, domain } = req.body;
  const attachment = req.file;

  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    auth: {
      user: 'abishek.cs21@bitsathy.ac.in', // Your Gmail address
      pass: 'myznyxbaqwrgazyp' // Your Gmail password
    }
  });

  // Dynamically setting the recipient to the email provided in the form
  let mailOptions = {
    from: 'abishek.cs21@bitsathy.ac.in',
    to: 'abishek.cs21@bitsathy.ac.in', // Set the recipient to the email address filled in the form
    subject: 'New Message from Career',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDomain: ${domain}`,
    attachments: attachment ? [{ filename: attachment.originalname, content: attachment.buffer }] : []
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      console.log(email);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
});
 
  
 
  
  

  
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
