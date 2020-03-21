import { EVENTS } from '../../constants';

export default (io, activeUsers, messages, connection) => (socket) => {
  io.emit('start', { activeUsers, messages });

  connection.query('SELECT userName, DATE_FORMAT(lastConnection, "%Y-%m-%d %H:%i") as lastConn FROM users WHERE lastConnection BETWEEN(DATE_SUB(NOW(), INTERVAL 5 MINUTE)) AND NOW()', (err, result) => {
    console.log(33, result, err);
    if (!err) {
      io.emit('BROADCAST_RECENT_USERS', result);
    }
  });
  
  socket.on(EVENTS.TEST, (data) => {
    console.log('test connection', data);
  });

  socket.on(EVENTS.SEND_MESSAGE, (data) => {
    console.log(1, messages);
    console.log(data, socket.id);
    data.currentDate = Date.now();
    messages.push(data);

    connection.query('insert into messages (message, userName) values (?, ?)', [data.value, data.userName], (err, result) => {
      if (!err) {
        io.emit(EVENTS.BROADCAST_MESSSAGE, data);
      }
    });
  });

  socket.on('SEND_USERNAME', (userName) => {
    console.log(userName);
    if (!activeUsers.find(u => u.userName === userName || u.id === socket.id)) {
      activeUsers.push({
        id: socket.id,
        userName
      });

      connection.query('select * from users where userName = ?', [userName], (err, results) => {
        console.log(2, results);
        if (results.length === 1) {
          connection.query('update users set lastConnection = now() where userName = ?', [userName]);
        } else if (results.length === 0) {
          connection.query('insert into users (userName) values (?)', [userName]);
        }
      });

      io.emit(EVENTS.BROADCAST_USERS, userName);
    }
  });

  socket.on(EVENTS.DISCONNECT, () => {
    const disconnectedUser = activeUsers.find(u => u.id === socket.id);
    activeUsers = activeUsers.filter(u => u.id !== socket.id);
    if (disconnectedUser) {
      connection.query('update users set lastConnection = now() where userName = ?', [disconnectedUser.userName]);
    }
    console.log(activeUsers);
    console.log('disconnet', socket.id);
    io.emit(EVENTS.BROADCAST_USERS_LIST, activeUsers);
  });

};
