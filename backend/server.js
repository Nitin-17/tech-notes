const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

app.use(logger);

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3500;

//let app receive and parse json data
app.use(express.json());

app.use(cookieParser());

//use to find the static files such as html, css, img
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

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

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
