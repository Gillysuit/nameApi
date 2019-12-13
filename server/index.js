const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// accept all origins, headers, methods
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

mongoose
  .connect("mongodb://127.0.0.1:27017/people", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 8000
  })
  .catch(err => console.log("app starting error", err));

mongoose.connection.once("open", () => {
  console.log(`connection has been made to mongods`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
