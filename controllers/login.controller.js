const express = require("express");
const router = express.Router();
const service = require("../services/login.service");

module.exports = function () {
  
  router.post("/user", service.login);
  
  return router;
};
