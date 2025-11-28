const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./app/config/db");

const ADRoutes = require("./app/routes/adminroutes");
const AuthRoutes = require("./app/routes/authroutes");
const UserRoutes = require("./app/routes/defaultroutes");
const Authenticated = require("./app/controller/auth/Authenticated");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
app.use("/", UserRoutes);
app.use("/admin", Authenticated.AuthenticationAD ,ADRoutes);
app.use('/auth', AuthRoutes);

// RunningServer
const PORT = process.env.NODE_PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at PORT : ${PORT}`);
  });
});
