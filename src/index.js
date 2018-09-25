import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

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
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Running on localhost:8080'));
