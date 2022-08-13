const Note = require("../models/note.model");

const createNote = async (req, res) => {
  if (req.body) {
    const note = new Note();
    note.userId = req.body.userId;
    note.noteTittle = req.body.noteTittle;
    note.noteMessage = req.body.noteMessage;
    await note
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;

  //delete product 
  await Note.findByIdAndDelete(id)
    .then((response) => {
      console.log("Data sucessfully deleted from the mongo db!");

      res.status(200).send(response);

      console.log("Response sent!");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateNote = async (req, res) => {
  await Note.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        noteTittle: req.body.noteTittle,
        noteMessage: req.body.noteMessage,
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

const viewNotesByUserId = async (req, res) => {
  await Note.find({ userId: req.params.id })
    .sort({ noteDate: -1 })
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const viewNoteById = async (req, res) => {
  if (req.params && req.params.id) {
    await Note.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

module.exports = { 
  createNote, deleteNote, updateNote, viewNotesByUserId, viewNoteById,
};
