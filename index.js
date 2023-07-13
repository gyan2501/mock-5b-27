const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.Routes");
const { auth } = require("./middleware/Auth.Middleware");
const { employeeRouter } = require("./routes/Employee.Routes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);

app.use(auth);

app.use("/employees", employeeRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB!");
  } catch (error) {
    console.log(error);
    console.log("not able to connect");
  }
  console.log(`Server running on port ${process.env.port}`);
});
