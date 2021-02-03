const express = require('express');
const Joi = require('joi');
const router = express.Router();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/vidly")
  .then(() => console.log("Connect to Vidly database"))
  .catch(err => console.error("Could not connect to Vidly MongoDB"));

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true},
})

const Genre = mongoose.model("Genre", genreSchema);

async function getAllGenres() {
  const genres = await Genre.find();
  return genres;
}

async function getGenre(id) {
  const genre = await Genre.findById(id);
  console.log(id);
  return genre;
}

async function createGenre(name) {
  const genre = new Genre({
    name: name
  })
  const result = await genre.save();
  return result;
}

async function updateGenre(id, name) {
  const genre = await Genre.findByIdAndUpdate(id, { name: name }, { new: true});
  return genre;
}

async function removeGenre(id) {
  const result = Genre.deleteOne({ _id: id});
  return result;
}

/***************************************************/
router.get('/', (req, res) => {
  getAllGenres().then((result) => res.send(result));
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = createGenre(req.body.name);
  console.log(genre)
  res.send(genre);
});

router.put('/:id', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  updateGenre(req.params.id, req.body.name)
    .then((result) => res.send(result))
    .catch((error) => res.status(404).send('The genre with the given ID was not found.'));
});

router.delete('/:id', (req, res) => {
  removeGenre(req.params.id)
    .then((result) => res.send(result))
    .catch(error => res.status(404).send('The genre with the given ID was not found.'));
});

router.get('/:id', (req, res) => {
  getGenre(req.params.id)
    .then((result) => res.send(result))
    .catch(error => res.status(404).send('The genre with the given ID was not found.'));
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
