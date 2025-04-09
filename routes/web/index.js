const express = require('express');
const home_router = require('./home');

const router = express.Router();

// Use the home router for all root URL requests
router.use('/', home_router);
module.exports = router;
