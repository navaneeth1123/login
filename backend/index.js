const entriesRoute = require("./controllers/EntriesRoute.js");
const cors = require ("cors")
const mongoose = require("mongoose");
const express = require("express");
const route = express.Router();
const app = express();
const dotenv = require("dotenv")
dotenv.config()

// const uri = "mongodb+srv://navaneethrl96:Navaneeth1123@cluster0.yarsxpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(cors());
app.use("/entries", entriesRoute);

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
