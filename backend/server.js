const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB, sequelize } = require("./db/postgres");
const authRoutes = require("./routes/auth");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

sequelize
  .sync({ force: false })
  .then(() => console.log("Database synchronized"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
