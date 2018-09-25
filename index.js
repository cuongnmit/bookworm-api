var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/bookworm', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', () => console.log('Error connect to db'));
db.once('open', () => {
    console.log('Db connected');
});

var auth = require('./routes/auth');

app.use(bodyParser.json());
app.use('/api/auth', auth);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'));
});

app.listen(8080, () => console.log('Running on localhost:8080'));
