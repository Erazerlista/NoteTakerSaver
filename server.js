// dependencies
const express = require('express');
const path = require('path');
//const cors = require('cors'); // Correct the typo here

// Import the route modules with correct relative paths
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// app use express
const app = express();
// creating environment variable port for other site heroku
const PORT = process.env.PORT || 5000;

// Middleware: Use the 'cors()' middleware before defining routes
//app.use(cors());


// Middleware: Parse incoming requests with JSON payloads
app.use(express.json());

// Middleware: Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Middleware: Serve static files from the 'public' folder
app.use(express.static('public'));

// Use the imported routers for the routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// app listener - starts the server
app.listen(PORT, () => {
  console.log(`Server available at localhost:${PORT}`);
});
