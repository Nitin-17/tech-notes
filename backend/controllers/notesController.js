const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

// @desc Get All notes
// @router GET /notes
// @acess private
const getAllNotes = asyncHandler(async (req, res) => {
  const notesWithUser = await Note.aggregate([
    {
      $lookup: {
        from: "users", // MongoDB collection name (lowercase plural of model)
        localField: "user", // field in Note
        foreignField: "_id", // field in User
        as: "userInfo", // will be an array
      },
    },
    {
      $unwind: "$userInfo", // convert userInfo array to object
    },
    {
      $project: {
        _id: 1,
        title: 1,
        text: 1,
        completed: 1,
        createdAt: 1,
        updatedAt: 1,
        user: {
          _id: "$userInfo._id",
          username: "$userInfo.username",
          email: "$userInfo.email",
          roles: "$userInfo.roles",
          bio: "$userInfo.bio",
          active: "$userInfo.active",
        },
      },
    },
  ]);

  if (!notesWithUser.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  res.json(notesWithUser);
});

// @desc Create notes
// @router POST /notes
// @acess private
const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req?.body;

  //confirm the data
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check for duplicates
  const duplicate = await Note.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Note Title" });
  }

  //create and store new note
  const note = await Note.create({ user, title, text });

  if (note) {
    return res
      .status(201)
      .json({ message: `Note with ${title} created successfully` });
  } else {
    return res.status(400).json({ message: "Invalid notedata received" });
  }
});

// @desc Update note
// @router PATCH /notes
// @acess private
const updateNote = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, user, text, completed } = req?.body;
  console.log(title, text, id, completed);

  //confirm the data
  if (!title || !text || !id || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  //check for duplicates
  const duplicate = await User.findOne({ title }).lean().exec();

  //allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(404).json({ message: "Duplicate Note name" });
  }

  if (user) {
    note.user = user;
  }
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json(`'${updatedNote.title}' updated`);
});

// @desc Delete note
// @router DELETE /notes
// @acess private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Note Id required" });
  }

  const note = await Note.findOne({ _id: id }).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();

  const reply = `Note with ID ${id} deleted`;

  res.json({ message: reply });
});

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote };
