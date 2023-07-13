const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    department: { type: String, require: true },
    salary: { type: Number, require: true },
  },
  {
    versionKey: false,
  }
);

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = {
  EmployeeModel,
};
