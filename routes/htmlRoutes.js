const express = require('express');
const path = require('path');
const router = express.Router(); // Use express.Router() to create a router instance

// Define your HTML routes using the 'router' instance

// Route to serve the homepage (index.html)
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route to serve another HTML page (example.html)
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Route to serve any other HTML page (page not found)
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/404.html'));
});

// Export the router instance
module.exports = router;
