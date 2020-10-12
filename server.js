const express = require('express');
const bodyParser = require('body-parser');



// Set port
const PORT = process.env.PORT || 3000;


// Init app
const app = express();


// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const apiRouter = require('./routes/api.js');

app.use('/api', apiRouter);

/* Server Listening */
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    console.log(`Listening at port ${PORT}...`);
});