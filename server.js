const express = require('express');
const bodyParser = require('body-parser');

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

// Server listening
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    console.log(`Listening at port ${PORT}...`);
});