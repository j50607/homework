let SOCKET;

let STORE;
let reconnectCount = 0;
const url = process.env.VUE_APP_IS_SELF_API === 'true' ? `wss://${window.location.host}/${process.env.VUE_APP_SOCKET_BASE}` : process.env.VUE_APP_SOCKET_BASE;

const TYPE = {
  BET_FAIL: 'bet_fail',
};

const CLOSE_EVENT_CODE = {
  NORMAL_CLOSURE: 1000,
};

const READY_STATE = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

const messageQueue = [];

class FbdSocket {
  static async init() {
    STORE = window.$vue.$store;

    FbdSocket.connect();
  }

  static connectRetry() {
    reconnectCount += 1;
  }

  static onopen() {
    reconnectCount = 0;
    messageQueue.forEach((params) => {
      SOCKET.send(params);
    });
  }

  static onclose(event) {
    if (event.code !== CLOSE_EVENT_CODE.NORMAL_CLOSURE) {
      reconnectCount += 1;
      if (reconnectCount <= 100) {
        setTimeout(() => {
          if (SOCKET?.readyState === READY_STATE.CLOSING || SOCKET?.readyState === READY_STATE.CLOSED) {
            this.connect();
          }
        }, 10000);
      }
    }
  }

  static connect() {
    SOCKET = new WebSocket(url);
    SOCKET.onopen = FbdSocket.onopen;
    SOCKET.onmessage = FbdSocket.onmessage;
    SOCKET.onclose = FbdSocket.onclose;
  }

  static send(data) { // 等待ws连接后才发送message
    if (!SOCKET || SOCKET.readyState !== READY_STATE.OPEN) {
      messageQueue.push(data);
    } else {
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
