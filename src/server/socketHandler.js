import { EVENTS } from '../../modules/constants';

export default (io) => (socket) => {
  socket.on(EVENTS.TEST, (data) => {
    console.log('test connection', data, socket.id);
  });

  socket.on(EVENTS.DISCONNECT, () => {
    console.log('dissconected');
  });

  socket.on(EVENTS.SEND_MESSAGE, (data) => {
    io.emit(EVENTS.BROADCAST_MESSAGE, data);
  });
};
