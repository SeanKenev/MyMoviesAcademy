const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mymoviesacademy', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected to MyMoviesAcademy'))
    .catch(err => console.log(err));

// Routes
const movies = require('./routes/movies');
app.use('/movies', movies);

// Server Start
app.listen(port, () => {
    console.log(`🎬 MyMoviesAcademy running at http://localhost:${port}`);
});
