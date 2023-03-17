import * as dotenv from "dotenv";
import express, { json } from "express";
import morgan from "morgan";
import connectDB from "./database/connectDB.js";
import cors from "cors";
import eventRoutes from "./routes/events.js";
import userRoutes from "./routes/users.js";
import session from "express-session";

// const eventsRoutes = require("./routes/events");

dotenv.config();

const app = express();

app.use(morgan("tiny"));

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Expires in 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7, // Expires in 7 days
  },
};
app.use(session(sessionConfig));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const db = new connectDB(process.env.DB);
db.connect();

app.use("/events", eventRoutes);
app.use("/", userRoutes);

const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
