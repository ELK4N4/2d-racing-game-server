const express = require('express');
const bodyParser = require('body-parser');

const { cli } = require('./cli/cli');

// Set port
const PORT = process.env.PORT || 3000;

// Init app
const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Import routes
const apiRouter = require('./routes/api.js');

// Middlewares
app.use('/api', apiRouter);

// Listen
app.listen(PORT, '0.0.0.0', cli(PORT));