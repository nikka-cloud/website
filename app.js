// app.js

// Require the 'path' module first and set up our global variable.
const path = require('path');
global.mock_db = path.join(__dirname, './data/mock_db.json');

// Now, require other modules.
const express = require('express');
const body_parser = require('body-parser');

// Import routes
const web_route = require('./routes/web');
const api_route = require('./routes/api');

const app = express();

// Set view engine to Pug
app.set('view engine', 'pug');

// Static assets
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

// Built-in body parser for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/api', api_route);   // API routes
app.use('/', web_route);        // Web routes

// Redirect all unknown routes to home page
app.use((req, res) => {
  res.redirect('/');
});

const port = 3002;
app.listen(port, () => console.log(`Server running on port ${port}`));
