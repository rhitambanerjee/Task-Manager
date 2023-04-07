const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

// Set up the app
const app = express();

// Set up middleware
app.use(bodyParser.json());

// Set up routes
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

// Set up database connection
mongoose.connect('mongodb://localhost/task-manager', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.error(error);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started');
});