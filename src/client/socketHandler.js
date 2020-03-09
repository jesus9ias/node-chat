import { EVENTS } from '../../modules/constants';

export default (socketClient, ui) => {
  socketClient.on(EVENTS.BROADCAST_MESSAGE, (data) => {
    ui.messagesList.innerHTML += `<p>${data.value}</p>`
  });
};
