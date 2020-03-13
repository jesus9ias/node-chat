import { EVENTS } from '../../constants';

export default (socketClient) => {
  socketClient.emit(EVENTS.TEST, { values: 'hello' });
  const userName = document.getElementById('user-name');
  const message = document.getElementById('message');
  const sendMessage = document.getElementById('send-message');
  const messagesList = document.getElementById('messages-list');
  const usersList = document.getElementById('users-list');

  sendMessage.addEventListener('click', () => {
    if (userName.value.length > 0 && message.value.length > 0) {
      socketClient.emit(EVENTS.SEND_MESSAGE, {
        userName: userName.value,
        value: message.value
      });
      message.value = '';
    }
  });

  return {
    usersList,
    messagesList
  }
};
