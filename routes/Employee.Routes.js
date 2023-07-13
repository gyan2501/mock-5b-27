const express = require("express");
const { EmployeeModel } = require("../model/Employee.Model");

const employeeRouter = express.Router();
// GET Request
employeeRouter.get("/employess", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      department = "",
      sortBy = "",
      search = "",
    } = req.query;
    const filter = {};
    if (department) {
      filter.department = department;
    }

    const sort = {};
    if (sortBy) {
      sort[sortBy] = 1;
    }

    const sQuery = {};
    if (search) {
      sQuery.firstname = { $regex: search, $options: "i" };
    }
    const total = await EmployeeModel.countDoucments(filter);
    const employees = await EmployeeModel.find({ ...filter, ...sQuery })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(+limit);

    res.status(200).send({ total, employees });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// POST Request
employeeRouter.post("/employees", async (req, res) => {
  try {
    const { firstname, lastname, email, department, salary } = req.body;
    const newEmployee = {
      firstname,
      lastname,
      email,
      department,
      salary,
    };
    const employee = await newEmployee.save();
    res.status(200).send({ message: "New Employee added", employee });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// DELETE Request

employeeRouter.delete("/employees/:id", async (req, res) => {
  try {
    const deleteEmployee = await EmployeeModel.findByIdAndDelete(req.params.id);
    if (!deleteEmployee) {
      res.status(404).send({ message: "Not Found!" });
    }
    res.status(200).send({ message: "Employee Deleted!", deleteEmployee });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// Update All
employeeRouter.put("/employees/:id", async (req, res) => {
  try {
    const { firstname, lastname, email, department, salary } = req.body;
    const updateEmployee = {
      firstname,
      lastname,
      email,
      department,
      salary,
    };
    const Updated = await EmployeeModel.findByIdAndUpdate(
      re1.params.id,
      updateEmployee
    );
    if (!Updated) {
      res.status(404).send({ message: " EMployee Not Found" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = {
  employeeRouter,
};
