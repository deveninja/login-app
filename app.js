const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to Database', config.database);
});

mongoose.connection.on('err', (err) => {
    console.log('Database error '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 8080;

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Router
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});


// Start Server
app.listen(port, () => {
    console.log('Server Started on port '+port);
});