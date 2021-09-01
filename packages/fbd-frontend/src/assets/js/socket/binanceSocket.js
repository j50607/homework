import { delay } from '@/assets/js/utils/utils';

const socketFactory = () => ({
  CLOSE_EVENT_CODE: {
    NORMAL_CLOSURE: 1000,
  },
  READY_STATE: {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
  },
  BASE_URL: 'wss://stream.binance.com:9443/stream',
  sendPool: [],
  socket: undefined,
  reconnectCount: 0,
  connect: (() => {
    let connectLock;
    return async function fn() {
      if (connectLock) {
        return this.socket;
      }

      connectLock = true;

      const init = () => {
        if (this.socket && this.socket.readyState === this.READY_STATE.OPEN) {
          try {
            this.socket.close();
          } catch (err) {
            throw new Error(err);
          }
        }
        this.socket = new WebSocket(this.BASE_URL);
        this.socket.onopen = this.onopen.bind(this);
        this.socket.onmessage = this.onmessage.bind(this);
        this.socket.onclose = this.onclose.bind(this);

        connectLock = false;
      };

      await delay(1000);
      init();
      return this.socket;
    };
  })(),
  send(data) {
    if (!this.socket || this.socket?.readyState !== this.READY_STATE.OPEN) {
      this.sendPool.push(data);
      return;
    }

    this.socket.send(JSON.stringify(data));
  },
  onmessage() {

  },
  onopen() {
    this.reconnectCount = 0;
    this.sendPool.forEach((params) => {
      this.socket.send(JSON.stringify(params));
    });
  },
  onclose(event) {
    if (event.code !== this.CLOSE_EVENT_CODE.NORMAL_CLOSURE) {
      this.reconnectCount += 1;
      if (this.reconnectCount <= 100) {
        setTimeout(() => {
          if (this.socket.readyState === this.READY_STATE.CLOSING || this.socket.readyState === this.READY_STATE.CLOSED) {
            this.connect();
          }
        }, 10000);
      }
    }
  },
});

export default socketFactory;
