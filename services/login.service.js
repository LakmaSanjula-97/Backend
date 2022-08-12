const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// user login
//the email and password is received in the request body.
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //   const { email, password } = req.body;

  try {
    //checking if the user exists as a registered user
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User is not Registered." });
    } else {
      //if user (email) exists in db, the password corresponding to the validated email will be checked with the provided password
      //comparison of password the user entered and the saved password to verify the login
      if (password != existingUser.password) {
        return res.status(400).json({ message: "Incorrect Password." });
      } else {
        //when the user is validated for the login, a jwt token is created for the login
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          "test",
          { expiresIn: "1h" }
        );

        //sending response with status, user details and token
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
