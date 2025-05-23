require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRequirementRoutes = require('./routes/jobRequirementRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const selectionRoutes = require('./routes/selectionRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running.....");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/job-requirements', jobRequirementRoutes);
app.use('/api/job-applications', jobApplicationRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/selections', selectionRoutes);

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync();
    console.log("Models synced successfully");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();