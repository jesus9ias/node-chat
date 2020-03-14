import { EVENTS } from '../../constants';

export default (io, activeUsers, messages) => (socket) => {
  io.emit('start', { activeUsers, messages });
  
  socket.on(EVENTS.TEST, (data) => {
    console.log('test connection', data);
  });

  socket.on(EVENTS.SEND_MESSAGE, (data) => {
    console.log(data, socket.id);
    data.currentDate = Date.now();
    messages.push(data);
    io.emit(EVENTS.BROADCAST_MESSSAGE, data);
  });

  socket.on('SEND_USERNAME', (userName) => {
    console.log(userName);
    if (!activeUsers.find(u => u.userName === userName || u.id === socket.id)) {
      activeUsers.push({
        id: socket.id,
        userName
      });
      io.emit(EVENTS.BROADCAST_USERS, userName);
    }
  });

  socket.on(EVENTS.DISCONNECT, () => {
    activeUsers = activeUsers.filter(u => u.id !== socket.id);
    console.log(activeUsers);
    console.log('disconnet', socket.id);
    io.emit(EVENTS.BROADCAST_USERS_LIST, activeUsers);
  });

};
