const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const userApi = require("./controllers/user_controller");
const loginApi = require("./controllers/login_controller");
const noteApi = require("./controllers/note_controller");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log("Database error", error.message);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Database Synced");
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

app.route("/").get((req, res) => {
  res.send("Backend");
});

app.use("/user", userApi());
app.use("/login", loginApi());
app.use("/note", noteApi());
