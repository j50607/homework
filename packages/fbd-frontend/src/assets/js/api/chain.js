/*
** Chain of Responsibility
** 參考網站 ↓↓↓
** https://medium.com/starbugs/%E7%94%A8-javascript-%E7%8E%A9%E8%BD%89%E8%A8%AD%E8%A8%88%E6%A8%A1%E5%BC%8F-%E5%90%84%E5%8F%B8%E5%85%B6%E8%81%B7%E7%9A%84-chain-of-responsibility-pattern-%E8%B2%AC%E4%BB%BB%E9%8F%88%E6%A8%A1%E5%BC%8F-864f394cce13
*/

class Chain {
  constructor(handler) {
    this.handler = handler;
    this.successor = null;
  }

  setSuccessor(successor) {
    this.successor = successor;
    return this.successor; /* 此處參考網站寫錯，少寫succesor，會導致一直覆蓋，只有頭尾兩層。 */
  }

  passRequest(...args) {
    const result = this.handler(...args);
    if (result === 'next') {
      return this.successor && this.successor.passRequest(...args);
    }
    return result;
  }
}

export default Chain;
