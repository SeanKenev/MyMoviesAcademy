// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// connect to local mongodb
mongoose.connect('mongodb://localhost:27017/mymoviesacademy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB error:', err));

// routes
const moviesRouter = require('./routes/movies');
app.use('/movies', moviesRouter);

// optional explicit homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 MyMoviesAcademy running at http://localhost:${PORT}`);
});
