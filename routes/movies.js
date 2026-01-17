// routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Create a movie (title required)
router.post('/', async (req, res) => {
  try {
    const { title, genre, year, poster, description } = req.body;
    const newMovie = new Movie({ title, genre, year, poster, description });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one movie by id
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
