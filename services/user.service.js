const User = require("../models/user.model");
const nodemailer = require("nodemailer");

//create user
const createUser = async (req, res) => {
  if (req.body) {
    const user = new User(req.body);
    await user
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
        var subject = "Registration confimation";
        var message =
          "Temporary Password : " +
          req.body.password +
          " link to website : " +
          "http://localhost:4000/";
        sendMail(req.body.email, subject, message);
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

//email
const sendMail = async (to, subject, message) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "lakmagamage97@gmail.com",
      pass: "Xyojqvsaljhsdcts",
    },
  });

  var mailOptions = {
    from: "lakmagamage97@gmail.com",
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//updating the user 
const updateUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        mobile: req.body.mobile,
        status: req.body.status,
        password: req.body.password,
      },
    },
    { upsert: true }
  )
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const searchUser = async (req, res) => {
  const query = {
    $or: [
      { firstName: req.params.value },
      { email: req.params.value },
    ],
  };
  await User.find(query)
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const getUserbyId = async (req, res) => {
  await User.findById(req.params.id)
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const getAllUsers = async (req, res) => {
  await User.find()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

module.exports = {
  createUser, updateUser, searchUser, getUserbyId, getAllUsers,
};
