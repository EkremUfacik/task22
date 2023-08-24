import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import breweryRoutes from "./routes/brewery";
import { config } from "dotenv";

config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/breweries", breweryRoutes);

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
