import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import playListRoute from "./routes/playListRoute.js";
import cors from "cors";
// configure dotenv
dotenv.config();

// database config
connectDb();

// rest object
const app = express();

//
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/", playListRoute);

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(`server running on port ${PORT}`.bgCyan.white);
});
