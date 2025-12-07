const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Add a movie
router.post('/', async (req, res) => {
    const { title, genre, year } = req.body;
    try {
        const newMovie = new Movie({ title, genre, year });
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

module.exports = router;
