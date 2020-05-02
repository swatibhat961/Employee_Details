const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Employee");

app.use(bodyParser.json());

const Employee = mongoose.model("Employee");
const moogourl =
  "mongodb+srv://emp:fjyMzxaAqXZzMoJY@cluster0-g8pww.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(moogourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("yes its connecgted to database");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.get("/", (req, res) => {
  Employee.find({})
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send", (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,
    position: req.body.position,
    picture: req.body.picture,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((Err) => {
      console.log(Err);
    });
});

app.post("/delete", (req, res) => {
  Employee.findByIdAndRemove(req.body.id)
    .then((data) => {
      res.send(data);
    })
    .catch((Err) => {
      console.log(Err);
    });
});

app.post("/update", (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,
    position: req.body.position,
    picture: req.body.picture,
  })
    .then((data) => {
      res.send(data);
    })
    .then((err) => {
      console.log(err);
    });
});

app.listen(19002, () => {
  console.log("server is running");
});
