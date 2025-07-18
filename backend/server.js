require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const path = require("path");
const connectDatabase = require("./config/dbConnect");
const mongoose = require("mongoose");
const app = express();

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

connectDatabase();

app.use(cors(corsOptions));

app.use(logger);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || 3500;
console.log(process.env.NODE_ENV);

//let app receive and parse json data
app.use(express.json());

app.use(cookieParser());

//use to find the static files such as html, css, img
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

app.all("/{*any}", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "Error.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

// Optional: Monitor disconnected, error, and connected states
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
