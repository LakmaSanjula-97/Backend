const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// user login
//the email and password is received in the request body.
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    //checking if the user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User is not Registered." });
    } else {
      //validate password 
      if (password != existingUser.password) {
        return res.status(400).json({ message: "Incorrect Password." });
      } else {
        //create jwt token
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          "test",
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({ message: "Login Success", result: existingUser, token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  login,
};
