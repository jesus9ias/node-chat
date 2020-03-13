import { EVENTS } from '../../constants';

export default (socketClient, ui) => {
  socketClient.on(EVENTS.BROADCAST_MESSSAGE, (data) => {
    ui.messagesList.innerHTML += `<div>
      <p>${data.currentDate} - ${data.userName}</p>
      <p>${data.value}</p>
    </div>`;
  });

  socketClient.on(EVENTS.BROADCAST_USERS, (userName) => {
    ui.usersList.innerHTML += `<p>${userName}</p>`;
  });

  socketClient.on(EVENTS.BROADCAST_USERS_LIST, (activeUsers) => {
    ui.usersList.innerHTML = '';
    activeUsers.forEach(user => {
      ui.usersList.innerHTML += `<p>${user.userName}</p>`;
    });
  });
};
