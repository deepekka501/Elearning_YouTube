require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require('./routes/enrollment');
const assessmentRoutes = require('./routes/assessmentRoutes');
const adminRoutes = require('./routes/adminRoutes');


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());




// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
// app.use("/api/enroll", enrollmentRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/assessments', assessmentRoutes);



app.use('/api/admin', adminRoutes);








const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
