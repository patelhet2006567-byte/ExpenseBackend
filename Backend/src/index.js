import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./user/user.routes.js";
import cors from "cors"

dotenv.config();
console.log("EMAIL =", process.env.SENDER_EMAIL);
console.log("PASSWORD =", process.env.SENDER_PASSWORD);

const app = express();
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("Database connected !"))
.catch(()=>console.log("Database not connected !"));

app.use(cookieParser())

// cors
app.use(cors({
  origin:  process.env.DOMAIN
}))
// middleware
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Request Hit :", req.method, req.url);
  next();
});

// test route
app.post("/test", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});


app.use("/api/user", userRouter);



app.listen(3030, () => {
  console.log("Server is running on port 3030");
});