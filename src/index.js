import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import auth from './../routes/auth';
import users from './../routes/users';

dotenv.config();
const app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', () => console.log('Error connect to db'));
db.on('connected', () => console.log('Db connected'));

app.use(bodyParser.json());
app.use('/api/auth', auth);
app.use('/api/users', users);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Running on localhost:8080'));
