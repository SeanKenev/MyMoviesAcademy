// models/movie.js
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  year: Number,
  poster: { type: String, default: 'https://via.placeholder.com/400x600?text=No+Poster' },
  description: { type: String, default: 'No description available.' }
});

module.exports = mongoose.model('Movie', MovieSchema);
