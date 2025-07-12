const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote);

router
  .route("/:id")
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

module.exports = router;
