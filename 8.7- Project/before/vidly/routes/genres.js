const express = require('express');
const router = express.Router();
const { Genre, getAllGenres, getGenre, createGenre, updateGenre, removeGenre } = require('../models/genre');

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


module.exports = router;
