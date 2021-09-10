let SOCKET;

let STORE;
let connectIndex = 0;
const url = process.env.VUE_APP_IS_SELF_API === 'true' ? `wss://${window.location.host}/${process.env.VUE_APP_SOCKET_BASE}` : process.env.VUE_APP_SOCKET_BASE;

const TYPE = {
  BET_FAIL: 'bet_fail',
};

class FbdSocket {
  static async init() {
    STORE = window.$vue.$store;

    FbdSocket.connect();
  }

  static connectRetry() {
    connectIndex += 1;
  }

  static onopen() {
    connectIndex = 0;
  }

  static onclose() {
    FbdSocket.connectRetry();
    if (connectIndex <= 100) {
      setTimeout(() => {
      }, 1000);
    }
  }

  static connect() {
    SOCKET = new WebSocket(url);
    SOCKET.onopen = FbdSocket.onopen;
    SOCKET.onmessage = FbdSocket.onmessage;
    SOCKET.onclose = FbdSocket.onclose;
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
    if (payload.message.action === TYPE.BET_FAIL) {
      STORE.commit('SET_BET_FAIL_MESSAGE', payload.message.data);
    }
  }

  static close() {
    SOCKET.close();
  }
}

export default async function () {
  if (!SOCKET) {
    await FbdSocket.init();
  }
  return FbdSocket;
}
