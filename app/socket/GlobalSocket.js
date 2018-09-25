import Echo from 'laravel-echo';
import { merge } from 'lodash';
import AppConfig from '../utils/AppConfig';
import { getCurrentUser } from "../api/user/UserRequest";

export default class GlobalSocket {

  constructor(publicChannelsOnly) {
    this.connect(publicChannelsOnly);
  }

  connect(publicChannelsOnly) {
    if (!AppConfig.ACCESS_TOKEN) {
      return;
    }

    if (window.Echo) {
      window.Echo.disconnect();
    }

    window.Echo = this.initSocket();
    this.listenEvents(publicChannelsOnly);
  }

  disconnect() {
    if (window.Echo) {
      window.Echo.disconnect();
    }
  }

  initSocket() {
    return new Echo({
      broadcaster: 'socket.io',
      host: AppConfig.getSocketServer(),
      encrypted: true,
      client: require('socket.io-client'),
      auth: {
        headers: {
          'Authorization': 'Bearer ' + AppConfig.ACCESS_TOKEN,
        },
      },
    });
  }

  listenEvents(publicChannelsOnly) {
    //public channels
    // this.listenForOrderTransaction();

    if (!publicChannelsOnly) {
      //user private channels
      getCurrentUser()
        .then(res => {
          let userId = res.data.id;
          this.listenForTransaction(userId);
          this.listenForOrderList(userId);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  listenForTransaction(userId) {
    window.Echo.private('App.User.' + userId)
      .listen('TransactionCreated', (transaction) => {
        this.trigger('TransactionCreated', transaction.data);
      });
  }

  listenForOrderList(userId) {
    window.Echo.private('App.User.' + userId)
      .listen('OrderListUpdated', (data) => {
        this.trigger('OrderListUpdated', data.data);
      });
  }
  //
  // listenForOrderTransaction() {
  //   window.Echo.channel('App.Orders')
  //     .listen('OrderTransactionCreated', (transaction) => {
  //       this.trigger('OrderTransactionCreated', transaction.data);
  //     });
  // }

}
