const express = require("express");
const router = express.Router();
const noteController = require("../services/note.service");

module.exports = function () {
  router.post("/create", noteController.createNote);
  router.get("/userid/:id", noteController.viewNotesByUserId);
  router.get("/viewnote/:id", noteController.viewNoteById);
  router.put("/updatenote/:id", noteController.updateNote);
  router.delete("/deletenote/:id", noteController.deleteNote);
  return router;
};
