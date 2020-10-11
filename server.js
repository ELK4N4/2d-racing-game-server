const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');

// Redis
let client = redis.createClient();

client.on('connect', function(){
    console.log('Connected to Redis');
})

// Set port
const PORT = process.env.PORT || 3000;


// Init app
const app = express();


// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res, next) {
    res.send('Hello World!');
});


/* Server Listening */
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    console.log(`Listening at port ${PORT}...`);
});