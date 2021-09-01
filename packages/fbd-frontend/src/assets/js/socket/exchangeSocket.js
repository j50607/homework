let SOCKET;

let STORE;
let connectIndex = 0;
const url = process.env.VUE_APP_IS_SELF_API === 'true' ? `wss://${window.location.host}/${process.env.VUE_APP_SOCKET_BASE}` : process.env.VUE_APP_SOCKET_BASE;

const TYPE = {
  EXCHANGE_TICKER: 'exchange_ticker',
};

class ExchangeSocket {
  static async init() {
    STORE = window.$vue.$store;

    ExchangeSocket.connect();
  }

  static connectRetry() {
    connectIndex += 1;
    STORE.dispatch('getRavageExchangeList');
  }

  static onopen() {
    connectIndex = 0;
  }

  static onclose() {
    ExchangeSocket.connectRetry();
    if (connectIndex <= 100) {
      setTimeout(() => {
        STORE.dispatch('getRavageExchangeList');
        ExchangeSocket.connect();
      }, 10000);
    }
  }

  static connect() {
    SOCKET = new WebSocket(url);
    SOCKET.onopen = ExchangeSocket.onopen;
    SOCKET.onmessage = ExchangeSocket.onmessage;
    SOCKET.onclose = ExchangeSocket.onclose;
  }

  static send(data) { // 等待ws连接后才发送message
    if (SOCKET.readyState !== 1) {
      const connect = setInterval(() => {
        SOCKET.send(data);
        clearInterval(connect);
      }, 1000);
    } else if (SOCKET.readyState === 1) {
      SOCKET.send(data);
    }
  }

  static onmessage(event) {
    const payload = JSON.parse(event.data);
    if (!payload.message) return;
    if (payload.message.action === TYPE.EXCHANGE_TICKER) {
      const updateSource = payload.message.data.source;
      const updatePrice = payload.message.data.price;
      STORE.commit('SET_EXCHANGE_SINGLE_PRICE', { updateSource, updatePrice });
      STORE.commit('SET_IS_EXCHANGE_INFO_LOADING', false);
    }
  }

  static close() {
    SOCKET.close();
  }
}

export default async function () {
  if (!SOCKET) {
    await ExchangeSocket.init();
  }
  return ExchangeSocket;
}
