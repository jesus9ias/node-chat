import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import socketHandler from './src/server/socketHandler';
import connection from './modules/connection';

dotenv.config();

const APP = express();
const SERVER = http.createServer(APP);

APP.use(express.static('dist'));
APP.set('views', './src/server/views');
APP.set('view engine', 'pug');
APP.use(bodyParser.json());

const io = socketio(SERVER);

let messages = [];
const activeUsers = [];

io.set('transports', ['websocket', 'polling']);

connection.query('select * from messages', (err, results) => {
  messages = results.map((message) => {
    return {
      userName: message.userName,
      value: message.message,
      currentDate: message.createdAt
    }
  });
  io.on('connection', socketHandler(io, activeUsers, messages, connection));
});

APP.get('/', (req, res) => {
  res.render('home');
});


SERVER.listen(5000);
