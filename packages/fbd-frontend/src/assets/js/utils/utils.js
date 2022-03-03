/**
 * 空值型別判斷
 * @param {null} val - null || undefined
 */
export const isNil = (val) => val === null || val === undefined;

/**
 * 數字型別判斷
 * @param {Number} val - 數字
 */
export const isNumber = (val) => Object.prototype.toString.call(val) === '[object Number]';

/**
 * 字串型別判斷
 * @param {String} val - 字串
 */
export const isString = (val) => Object.prototype.toString.call(val) === '[object String]';

/**
 * 物件型別判斷
 * @param {Object} val - 物件
 */
export const isObject = (val) => Object.prototype.toString.call(val) === '[object Object]';

/**
 * 陣列型別判斷
 * @param {Array} val - 陣列
 */
export const isArray = (val) => Array.isArray(val);

/**
 * 函式型別判斷
 * @param {Function} val - 函式
 */
export const isFunction = (val) => {
  const type = Object.prototype.toString.call(val);
  return type === '[object Function]'
    || type === '[object AsyncFunction]'
    || type === '[object GeneratorFunction]'
    || type === '[object AsyncGeneratorFunction]';
};

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {Number} wait - 防抖秒数
 * @param {Boolean} immediate - 是否立即执行
 */
export const debounce = (func, wait, immediate) => {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

/**
 * 计算密码强度分数
 * @param {String} password - 密码
 */
export const getPasswordScore = (password) => {
  // eslint-disable-next-line no-useless-escape
  const regexArr = [/\d/, /[a-z]/, /[A-Z]/, /[`~!@#$^&*()=|{}':;',\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/, /\s/];
  let score = 0;
  regexArr.forEach((item) => {
    if (item.test(password)) {
      score += 1;
    }
  });
  if (password.length >= 6) {
    score += 2;
  }
  return score;
};

/**
 * 密码验证
 * @param {String} password - 密码
 */
export const validatePassword = (password) => {
  const value = {
    result: true,
    errorMsg: '',
  };
  if (!password || !password.trim()) {
    value.result = false;
    value.errorMsg = window.$vue.$t('enter54');
    return value;
  }

  if (/[\u4E00-\u9FA5]+/.test(password)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error39');
    return value;
  }

  if (/[\uFF00-\uFFFF]/g.test(password)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error40');
    return value;
  }

  if (password.length < 6 || password.length > 12) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error41');
    return value;
  }

  return value;
};

/**
 * 非必填密码验证
 * @param {String} password - 密码
 */
export const validatePasswordEdit = (password) => {
  const value = {
    result: true,
    errorMsg: '',
  };
  if (!password) {
    return value;
  }

  if (/[\u4E00-\u9FA5]+/.test(password)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error39');
    return value;
  }

  if (/[\uFF00-\uFFFF]/g.test(password)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error40');
    return value;
  }

  if (password && (password.length < 6 || password.length > 12)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error41');
    return value;
  }

  return value;
};

/**
 * 帐号验证
 * @param {String} account - 帐号
 */
export const validateAccount = (account) => {
  const value = {
    result: true,
    errorMsg: '',
  };

  if (!account || !account.trim()) {
    value.result = false;
    value.errorMsg = window.$vue.$t('enter55');
    return value;
  }

  // eslint-disable-next-line no-useless-escape
  if (/[`~!@#$^&*()=|{}':;'\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/.test(account)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error42');
    return value;
  }

  if (/[\u4E00-\u9FA5]+/.test(account)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error43');
    return value;
  }

  if (/[\uFF00-\uFFFF]/g.test(account)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error44');
    return value;
  }

  if (account.length < 6 || account.length > 12) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error45');
    return value;
  }

  if (!/^(?=.*\d)(?=.*[a-zA-Z])/.test(account)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error46');
    return value;
  }

  return value;
};

/**
 * 金额最小两位小数
 * @param {Number} amount - 金额
 */
export const validateAmount = (amount) => {
  const value = {
    result: true,
    errorMsg: '',
  };

  amount = String(amount);

  if (!amount || !amount.trim()) {
    value.result = false;
    value.errorMsg = window.$vue.$t('enter56');
    return value;
  }

  if (amount.startsWith('0')) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error47');
    return value;
  }

  if (!/^\d+\.?\d{0,2}$/.test(amount)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error48');
    return value;
  }

  return value;
};

/**
 * 数字只能是整数
 * @param {Number} betAmount - 本金金额(打码量)
 */
export const validateBetAmount = (betAmount) => {
  const value = {
    result: true,
    errorMsg: '',
  };

  betAmount = String(betAmount);

  if (!betAmount || !betAmount.trim()) {
    value.result = false;
    value.errorMsg = window.$vue.$t('enter56');
    return value;
  }

  if (/[^\d]/g.test(betAmount)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('enter57');
    return value;
  }

  return value;
};

/**
 * 赔率最多小数两位
 * @param {Number} tmpPayRate - 赔率
 */
export const validateOdds = (tmpPayRate) => {
  const value = {
    result: true,
    errorMsg: '',
  };

  tmpPayRate = String(tmpPayRate);

  if (!tmpPayRate || !tmpPayRate.trim()) {
    value.result = false;
    value.errorMsg = window.$vue.$t('enter58');
    return value;
  }

  if (tmpPayRate === '0') {
    value.result = false;
    value.errorMsg = window.$vue.$t('error21');
    return value;
  }

  if (!/^(\d|[1-9]\d+)\.?\d{0,2}$/.test(tmpPayRate)) {
    value.result = false;
    value.errorMsg = window.$vue.$t('error29');
    return value;
  }

  return value;
};

/**
 * 時間戳記轉日期
 * @param {number} time 時間戳記數字
 */
export const timeStamp = (time) => {
  const date = new Date(time);
  const Y = `${date.getFullYear()}/`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/`;
  const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
  const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
  const m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`;
  const s = `${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
  return (Y + M + D + h + m + s);
};

/**
   * 複製文本內容
   * @param {String} text - 要複製的內容
   * @param {Boolean} showToast - 是否显示讯息
   */
export const copyByText = (text, showToast = true) => {
  const oInput = document.createElement('input');
  if (text) {
    oInput.value = text;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand('Copy');
    oInput.className = 'oInput';
    oInput.parentNode.removeChild(oInput);
    if (showToast) {
      window.$vue.$message.success(window.$vue.$t('copySuccess'));
    }
  } else if (showToast) {
    window.$vue.$message.error(window.$vue.$t('noContenttoCopy'));
  }
};

/**
 * format數字格式為千分位以及取值到小數點
 * @param {Number || String} number - 數字或數字字串
 */
export const currentNumber = (number) => Number(number).toFixed(2);
// return Number(number).toLocaleString('zh-Hans-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * 每三位數金额加上逗号
 * @param {number} num
 */
export const toThousandFilter = (num) => {
  num = (Math.abs(num) || 0).toString();
  let number = 0;
  let floatNum = '';
  let intNum = '';
  // 判断是否有小数位，有则截取小数点后的数字
  if (num.indexOf('.') > 0) {
    number = num.indexOf('.'); // 获取小数点出现的位置
    floatNum = num.substr(number); // 截取arr.substr(form, length)
    intNum = num.substring(0, number); // 截取arr.substring(start, end)
  } else {
    intNum = num;
  }
  const result = [];
  let counter = 0;
  intNum = intNum.split('');
  // 利用3的倍数，向数组插入','
  for (let i = intNum.length - 1; i >= 0; i--) {
    counter += 1;
    result.unshift(intNum[i]);
    if (!(counter % 3) && i !== 0) {
      result.unshift(',');
    }
  }
  return result.join('') + floatNum || '';
};

/**
 * 絕對值
 * @param {number} num
 */
export const mathAbs = (num) => {
  if (!isNumber(num)) return 0;
  return Math.abs(num);
};

/**
 * 延遲函式
 * @param {Number} delay - 數字
 */
export const delay = (interval) => new Promise((resolve) => {
  if (!isNumber(interval)) return;
  setTimeout(() => {
    resolve();
  }, interval);
});

export const pipe = (...fns) => (x) => fns.reduce((acc, cur) => cur(acc), x);

export const andThen = (func) => (promise) => promise.then(func);

export const isValidUrl = (url) => url.trim() && url.trim() !== 'https://';
