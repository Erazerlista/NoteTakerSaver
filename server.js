const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFileAsuc = util.promisify(fs.readFile);
// app use express
const app = express();
// creating environment variable port for other site heroku
const PORT = process.env.PORT || 5000;

// asks express to create a route
app.use(express.static(path.join(__dirname, 'public')));
// sets up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes to route files middleware
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// app listener - starts the server
app.listen(PORT, () => {
  console.log(`Server available at localhost:${PORT}`);
});
