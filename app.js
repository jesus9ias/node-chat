import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import client from './src/server/subapps/client';
import chatApi from './src/server/subapps/chatApi';
import socketHandler from './src/server/socketHandler';

// Config env
dotenv.config();

// Setup apps
const APP = express();
const CHAT_API = express();

// Set statics, views and subroutes
APP.use(express.static('dist'));
APP.set('views', './src/server/views');
APP.set('view engine', 'pug');
APP.use(bodyParser.json());
APP.use('/chat', CHAT_API);

// Start server
const SERVER = http.createServer(APP);

// Init sockets
const io = socketio(SERVER);
io.set('transports', ['websocket', 'polling']);
io.on('connection', socketHandler(io));

// Global data
const users = [];
const chatApp = {
  io,
  users
};

// Setup Routes
client(APP, chatApp);
chatApi(CHAT_API, chatApp);

const { PORT } = process.env;

// Listen server
SERVER.listen(PORT, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server listening at http://localhost:' + PORT);
});
