require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRequirementRoutes = require('./routes/jobRequirementRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const selectionRoutes = require('./routes/selectionRoutes');
const cors = require("cors");
require('./config/passport')(passport); // Passport config

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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