const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const populatePeopleCollection = require("./dummyData/populatePeople");
const Person = require("./models/personModel");
const personController = require("./controllers/personController");

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

mongoose.connection
  .once("open", () => {
    console.log(`connection has been made to mongods`);

    Person.countDocuments({}, (err, count) => {
      if (err) console.log(err);
      // check if your local db hasn't been populate ~> populate it with dummy data if empty
      if (!count) populatePeopleCollection();
    });
  })
  .catch(error => console.log("connection error", error));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/firstName", personController.getAFirstName, (req, res) => {
  res.status(200).send(JSON.stringify(res.locals.firstName));
});

app.post("/middleName", personController.getAMiddleName, (req, res) => {
  res.status(200).send(JSON.stringify(res.locals.middleName));
});

app.post("/lastName", personController.getALastName, (req, res) => {
  res.status(200).send(JSON.stringify(res.locals.lastName));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
