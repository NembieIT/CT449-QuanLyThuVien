const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./app/config/db");

const ADRoutes = require("./app/routes/adminroutes");
const NVRoutes = require("./app/routes/nvroutes");
const UserRoutes = require("./app/routes/userroutes");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
app.use("/nhanvien", NVRoutes);
app.use("/admin", ADRoutes);
app.use("/", UserRoutes);

// RunningServer
const PORT = process.env.NODE_PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at PORT : ${PORT}`);
  });
});
