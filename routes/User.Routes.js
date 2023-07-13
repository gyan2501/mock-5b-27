const express = require("express");
const { UserModel } = require("../model/User.Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();




// register
userRouter.post("/signup", async (req, res) => {
  const { email, password,} = req.body;
  try {
    const existingUser = await UserModel.findOne({email});
    if(existingUser){
        res.status(409).send({message:"User already exists"})
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ email, password: hash });
      await user.save();
      res.status(200).send({ msg: "Signup Successful!" });
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});


// login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send({ err: err.message });
        } else if (result) {
          const token = jwt.sign({ userId: user._id }, "masai"); 
          res.status(200).send({ msg: "Login Successfull", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credentials!" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials!" });
    }
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};