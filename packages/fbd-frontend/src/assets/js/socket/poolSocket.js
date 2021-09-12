import Stomp from 'stompjs';

let STORE;
let stompClient = null;
let reconnectCount = 0;
const maxReconnectCount = 100;
const reconnectDuration = 10 * 1000;

const url = process.env.VUE_APP_IS_SELF_API === 'true' ? `wss://${window.location.host}/${process.env.VUE_APP_SOCKET_BASE}` : process.env.VUE_APP_SOCKET_BASE;

let TOPIC_RAVAGE_LEVEL;

class PoolSocket {
  static async init() {
    STORE = window.$vue.$store;

    const { siteId } = STORE?.state?.info;
    const { levelId } = STORE?.state?.user;

    if (siteId && levelId > 0) {
      TOPIC_RAVAGE_LEVEL = `/topic/ravage-level/${levelId}`;
      PoolSocket.connect();
    }
  }

  static onReceiveRavageLevel(message) {
    const payload = JSON.parse(message.body);

    if (payload) {
      STORE.commit('SET_USER_INFO', {
        poolPeople: payload?.poolPeople,
        poolAmount: payload?.poolAmount,
        poolCharge: payload?.poolCharge,
      });
    }
  }

  static async successCallback() {
    stompClient.reconnect_delay = reconnectDuration;
    stompClient.subscribe(TOPIC_RAVAGE_LEVEL, PoolSocket.onReceiveRavageLevel);
  }

  static errorCallback(error) {
    stompClient.disconnect();

    if (error.includes('Lost connection')) {
      reconnectCount += 1;
      if (reconnectCount < maxReconnectCount) {
        setTimeout(PoolSocket.connect, reconnectDuration);
      }
    }
  }

  static connect() {
    stompClient = Stomp.client(url);
    stompClient.debug = undefined;
    stompClient.connect({}, PoolSocket.successCallback, PoolSocket.errorCallback);
    stompClient.reconnect_delay = 5000;
  }

  static close() {
    stompClient.disconnect();
  }
}

export default PoolSocket;
