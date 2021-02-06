const Joi = require('joi');
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


function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.getAllGenres = getAllGenres;
module.exports.getGenre = getGenre;
module.exports.createGenre = createGenre;
module.exports.updateGenre = updateGenre;
module.exports.removeGenre = removeGenre;
module.exports.validateGenre = validateGenre;
