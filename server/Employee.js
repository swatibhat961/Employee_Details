const mongoosee = require("mongoose");

const EmpSchema = new mongoosee.Schema({
  name: String,
  email: String,
  phone: String,
  salary: String,
  position: String,
  picture: String,
});

mongoosee.model("Employee", EmpSchema);
