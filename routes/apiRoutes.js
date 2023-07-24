// dependencies
const path = require('path');
const fs = require('fs').promises; // Use fs.promises for async file operations

// npm package that allows for unique ids to be created
const uniqid = require('uniqid');

// routing
module.exports = (app) => {

  // GET /api/notes should read the db.json file and return all saved notes as JSON.
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8")
      .then(function (data) {
        const notes = JSON.parse(data); // No need to use [].concat() here
        res.json(notes);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read notes.' });
      });
  });

  // POST receive a new note to save on the request body.
  app.post('/api/notes', function (req, res) {
    const note = req.body;

    fs.readFile("./db/db.json", "utf8")
      .then(function (data) {
        const notes = JSON.parse(data);
        note.id = uniqid(); // Use uniqid() to generate a unique ID
        notes.push(note);
        return notes;
      })
      .then(function (notes) {
        return fs.writeFile("./db/db.json", JSON.stringify(notes));
      })
      .then(function () {
        res.json(note);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save note.' });
      });
  });

  // DELETE receive a query parameter containing the id of a note to delete.
  app.delete('/api/notes/:id', function (req, res) {
    const idToDelete = req.params.id; // No need to parse as it's already a string

    fs.readFile("./db/db.json", "utf8")
      .then(function (data) {
        const notes = JSON.parse(data);
        const newNotesData = notes.filter((note) => note.id !== idToDelete);
        return newNotesData;
      })
      .then(function (notes) {
        return fs.writeFile("./db/db.json", JSON.stringify(notes));
      })
      .then(function () {
        res.send('Note deleted successfully!');
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete note.' });
      });
  });
};
