import { EVENTS } from '../../constants';

export default (socketClient) => {
  socketClient.emit(EVENTS.TEST, { values: 'hello' });
  const userName = document.getElementById('user-name');
  const sendUser = document.getElementById('send-user');
  const message = document.getElementById('message');
  const sendMessage = document.getElementById('send-message');
  const messagesList = document.getElementById('messages-list');
  const usersList = document.getElementById('users-list');
  const recentUsersList = document.getElementById('recent-users-list');

  sendMessage.addEventListener('click', () => {
    if (userName.value.length > 0 && message.value.length > 0) {
      socketClient.emit(EVENTS.SEND_MESSAGE, {
        userName: userName.value,
        value: message.value
      });
      message.value = '';
    }
  });

  sendUser.addEventListener('click', () => {
    if (userName.value.length > 0) {
      console.log(userName.value);
      socketClient.emit('SEND_USERNAME', userName.value);
    }
  });

  return {
    usersList,
    messagesList,
    recentUsersList
  }
};
