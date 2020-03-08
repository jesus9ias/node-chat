import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const APP = express();

APP.use(bodyParser.json());

const SERVER = http.createServer(APP);

const { PORT } = process.env;

APP.get('/', (req, res) => {
  res.send('hello world!!!');
});

SERVER.listen(PORT, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server listening at http://localhost:' + PORT);
});
