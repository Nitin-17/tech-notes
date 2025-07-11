const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3500;

//use to find the static files such as html, css, img
app.use("/", express.static(path.join(__dirname, "/public")));

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

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
