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

  socketClient.on('start', (data) => {
    ui.usersList.innerHTML = '';
    data.activeUsers.forEach(user => {
      ui.usersList.innerHTML += `<p>${user.userName}</p>`;
    });

    ui.messagesList.innerHTML = '';
    data.messages.forEach(message => {
      ui.messagesList.innerHTML += `<div>
        <p>${message.currentDate} - ${message.userName}</p>
        <p>${message.value}</p>
      </div>`;
    });
  });

  socketClient.on('BROADCAST_RECENT_USERS', (data) => {
    console.log(11, data);
    ui.recentUsersList.innerHTML = '';
    data.forEach(user => {
      ui.recentUsersList.innerHTML += `<p>${user.userName} - ${user.lastConn}</p>`;
    });
  });
};
