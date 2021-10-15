/* eslint-disable */

class Base {
  constructor(phoneLen = 11, bankcardLenArr = [15, 20], nameLen = 16, currency = '￥', locale, phoneBeginning = [13, 19], bankNameLen = 20, personalIdLen = 20, timeZoneUnit = 'PST') {
    // phone
    this.phoneLen = phoneLen;

    // locale
    this.locale = locale;

    // bankcard
    if (bankcardLenArr && Array.isArray(bankcardLenArr) && bankcardLenArr.length === 2) {
      this.bankcardLenArr = bankcardLenArr;
    } else if (bankcardLenArr.length === 1) {
      bankcardLenArr.push(bankcardLenArr[0]);
      this.bankcardLenArr = bankcardLenArr;
    } else if (bankcardLenArr.length > 2) {
      this.bankcardLenArr = bankcardLenArr.splice(0, 2);
    } else {
      this.bankcardLenArr = [1, 20];
    }

    this.currency = currency;

    // name
    this.nameLen = nameLen;

    // phoneBeginning
    if (phoneBeginning && Array.isArray(phoneBeginning) && phoneBeginning.length === 2) {
      this.phoneBeginning = phoneBeginning;
    } else if (phoneBeginning.length === 1) {
      phoneBeginning.push(phoneBeginning[0]);
      this.phoneBeginning = phoneBeginning;
    } else if (phoneBeginning.length > 2) {
      this.phoneBeginning = phoneBeginning.splice(0, 2);
    } else {
      this.phoneBeginning = [13, 19];
    }

    // bankNameLength
    this.bankNameLen = bankNameLen;

    // personalID
    this.personalIdLen = personalIdLen;

    // timeZoneUnit
    this.timeZoneUnit = timeZoneUnit;
  }

  // 工具(这里底线约定私有方法, 不曝露)

  /**
   * 取得结果
   * @param {Boolean} result - 验证结果
   * @param {String} errorMsg - 错误讯息
   */
  _getResult(result = true, errorMsg = '') {
    const validateResult = {
      result,
      errorMsg,
    };

    return validateResult;
  }

  /**
   * 跳出讯息
   * @param {String} message - 要显示的讯息
   */
  _showToast(message) {
    window.$vue.$message.error(message);
  }

  // 共用规则(这里底线约定私有方法, 不曝露)

  /**
   * 验证是否为空
   * @param {String} value - 验证字段
   * @param {String} message - 错误讯息
   * @param {Boolean} [toast = true] - 是否跳出toast错误提示
   */
  _validateEmpty(value, message, toast = false) {
    if (!value || !value.trim()) {
      if (toast) {
        this._showToast(message);
      }
      return false;
    }
    return true;
  }

  /**
   * 验证特殊符号
   * @param {String} value - 验证字段
   * @param {String} message - 错误讯息
   * @param {Boolean} [toast = true] - 是否跳出toast错误提示
   */
  _validateSpecialSymbol(value, message, toast = false) {
    if (/[`~!@#$^&%*()=|{}':;',[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？/+/-]/.test(value)) {
      if (toast) {
        this._showToast(message);
      }
      return false;
    }
    return true;
  }

  /**
   * 验证特殊符号及数字
   * @param {String} value - 验证字段
   * @param {String} message - 错误讯息
   * @param {Boolean} [toast = true] - 是否跳出toast错误提示
   */
  _validateSpecialSymbolWithNum(value, message, toast = false) {
    if (/[`~!@#$^&%*()=|{}':;',[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？/+/-\d]/.test(value)) {
      if (toast) {
        this._showToast(message);
      }
      return false;
    }
    return true;
  }

  /**
   * 验证特殊符号及数字(.跟,除外)
   * @param {String} value - 验证字段
   * @param {String} message - 错误讯息
   * @param {Boolean} [toast = true] - 是否跳出toast错误提示
   */
  _validateSpecialSymbolWithNum1(value, message, toast = false) {
    if (/[`~!@#$^&%*()=|{}':;'[\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？/+/-\d]/.test(value)) {
      if (toast) {
        this._showToast(message);
      }
      return false;
    }
    return true;
  }

  /**
   * 验证中文
   * @param {String} value - 验证字段
   * @param {String} message - 错误讯息
   * @param {Boolean} [toast = true] - 是否跳出toast错误提示
   */
  _validateChinese(value, message, toast = false) {
    if (/[\u4E00-\u9FA5]+/.test(value)) {
      if (toast) {
        this._showToast(message);
      }
      return false;
    }
    return true;
  }

  /**
   * 验证全形英文
   * @param {String} value - 验证字段
   * @param {String} message - 错误讯息
   * @param {Boolean} [toast = true] - 是否跳出toast错误提示
   */
  _validateFullWidth(value, message, toast = false) {
    if (/[\uFF00-\uFFFF]/g.test(value)) {
      if (toast) {
        this._showToast(message);
      }
      return false;
    }
    return true;
  }

  /**
   * 验证是否包含英文与数字
   * @param {String} value - 验证字段
   * @param {String} message - 错误讯息
   * @param {Boolean} [toast = true] - 是否跳出toast错误提示
   */
  _validateIncludeNumberAndLetter(value, message, toast = false) {
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
      if (toast) {
        this._showToast(message);
      }
      return false;
    }
    return true;
  }

  // 验证栏位

  /**
   * 帐号验证
   * @param {String} account - 帐号
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateAccount(account, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyAccount');
    if (!this._validateEmpty(account, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const symbolMessage = window.$vue.$t('common_errorSpecialSymbolAccount');
    if (!this._validateSpecialSymbol(account, symbolMessage, toast)) {
      return this._getResult(false, symbolMessage);
    }

    const chineseMessage = window.$vue.$t('common_errorNoChineseAccount');
    if (!this._validateChinese(account, chineseMessage, toast)) {
      return this._getResult(false, chineseMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthAccount');
    if (!this._validateFullWidth(account, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    if (account.length < 6 || account.length > 12) {
      const lengthMessage = window.$vue.$t('common_errorLenAccount');
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    if (!/^(?=.*\d)(?=.*[a-zA-Z])/.test(account)) {
      const formatMessage = window.$vue.$t('common_errorFormatAccount');
      if (toast) {
        this._showToast(formatMessage);
      }
      return this._getResult(false, formatMessage);
    }

    return this._getResult(true);
  }

  /**
   * 密码验证
   * @param {String} password - 密码
   * @param {Boolean} toast - 是否显示错误讯息
   * @param {Boolean} isValidateNumAndLetter - 是否限制至少要有一个英文跟数字
   */
  validatePassword(password, toast = false, isValidateNumAndLetter = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyPwd');
    if (!this._validateEmpty(password, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const symbolMessage = window.$vue.$t('common_errorSpecialSymbolPwd');
    if (!this._validateSpecialSymbol(password, symbolMessage, toast)) {
      return this._getResult(false, symbolMessage);
    }

    const chineseMessage = window.$vue.$t('common_errorNoChinesePwd');
    if (!this._validateChinese(password, chineseMessage, toast)) {
      return this._getResult(false, chineseMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthPwd');
    if (!this._validateFullWidth(password, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    if (isValidateNumAndLetter) {
      const numberAndLetterMessage = window.$vue.$t('common_errorNeedNumAndLetterPwd');
      if (!this._validateIncludeNumberAndLetter(password, numberAndLetterMessage, toast)) {
        return this._getResult(false, numberAndLetterMessage);
      }
    }

    if (password.length < 6 || password.length > 12) {
      const lengthMessage = window.$vue.$t('common_errorLenPwd');
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * 昵称验证
   * @param {String} nickName - 昵称
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateNickname(nickName, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyNickName');
    if (!this._validateEmpty(nickName, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    if (nickName.length > 8) {
      const lengthMessage = window.$vue.$t('common_errorLenNickName');
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * 姓名验证
   * @param {String} name - 姓名
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateName(name, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyRealName');
    if (!this._validateEmpty(name, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthRealName');
    if (!this._validateFullWidth(name, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    if (name.length > this.nameLen) {
      const { nameLen } = this;
      const lengthMessage = window.$vue.$t('common_errorLenRealName', { nameLen });
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * 銀行名验证
   * @param {String} bankName - 銀行名
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateBankName(bankName, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyBanklName');
    if (!this._validateEmpty(bankName, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const symbolMessage = window.$vue.$t('common_errorSpecialSymbolBankName');
    if (!this._validateSpecialSymbolWithNum(bankName, symbolMessage, toast)) {
      return this._getResult(false, symbolMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthBanklName');
    if (!this._validateFullWidth(bankName, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    if (bankName.length > this.bankNameLen) {
      const { bankNameLen } = this;
      const lengthMessage = window.$vue.$t('common_errorLenBankName', { bankNameLen });
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * 證件號验证
   * @param {String} id - 銀行名
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validatePersonalId(id, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyPersonId');
    if (!this._validateEmpty(id, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const chineseMessage = window.$vue.$t('common_errorNoChinesePersonalId');
    if (!this._validateChinese(id, chineseMessage, toast)) {
      return this._getResult(false, chineseMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthPersonalId');
    if (!this._validateFullWidth(id, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    if (id.length > this.personalIdLen) {
      const { personalIdLen } = this;
      const lengthMessage = window.$vue.$t('common_errorLenPersonalId', { personalIdLen });
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * 电话验证
   * @param {String} phone - 电话
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validatePhone(phone, toast = false) {
    let thePhone = phone;

    if (typeof thePhone === 'number') {
      thePhone = String(thePhone);
    }

    const emptyMessage = window.$vue.$t('common_errorEmptyPhone');
    if (!this._validateEmpty(thePhone, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    // const phoneBeginning = Number(thePhone.substr(0, 2));
    // if (phoneBeginning < this.phoneBeginning[0] || phoneBeginning > this.phoneBeginning[1]) {
    //   const [phoneBeginning0, phoneBeginning1] = this.phoneBeginning || [];
    //   const formatMessage = window.$vue.$t('common_errorPhoneBeginLimit', { phoneBeginning0, phoneBeginning1 });
    //   if (toast) {
    //     this._showToast(formatMessage);
    //   }
    //   return this._getResult(false, formatMessage);
    // }

    if (thePhone && thePhone.length !== this.phoneLen) {
      const { phoneLen } = this || {};
      const lengthMessage = window.$vue.$t('common_errorPhoneLenLimitVar', { phoneLen });
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * 銀行卡號
   * @param {String} bankNumber - 银行卡账号
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateBankNumber(bankNumber, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorNoEmpty');
    if (!this._validateEmpty(bankNumber, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }
    let bankNumRange;
    if (this.bankcardLenArr[0] === this.bankcardLenArr[1]) {
      bankNumRange = `${this.bankcardLenArr[0]}`;
    } else {
      bankNumRange = `${this.bankcardLenArr[0]} ~ ${this.bankcardLenArr[1]}`;
    }
    if (bankNumber.length < this.bankcardLenArr[0] || bankNumber.length > this.bankcardLenArr[1]) {
      const lengthMessage = window.$vue.$t('common_errorLenLimitVar', { bankNumRange });
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * Email验证
   * @param {String} email - Email
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateEmail(email, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyEmail');
    if (!this._validateEmpty(email, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    /* eslint-disable no-useless-escape */
    if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])/.test(email)) {
      const formatMessage = window.$vue.$t('common_errorFormat');
      if (toast) {
        this._showToast(formatMessage);
      }
      return this._getResult(false, formatMessage);
    }

    const lengthMessage = window.$vue.$t('common_errorLength');
    if (email.length > 50) {
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * 邀请码验证
   * @param {String} phone - 邀请码
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateAgentCode(agentCode, toast = false) {
    if (agentCode.length !== 8) {
      const lengthMessage = window.$vue.$t('common_errorInviteCodeLen');
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * 郵遞區號验证
   * @param {String} phone - 邀请码
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateAddrNo(addrNo, toast = false) {
    const chineseMessage = window.$vue.$t('common_errorNoChineseAddrNo');
    if (!this._validateChinese(addrNo, chineseMessage, toast)) {
      return this._getResult(false, chineseMessage);
    }

    const symbolMessage = window.$vue.$t('common_errorSpecialSymbolAddrNo');
    if (!this._validateSpecialSymbol(addrNo, symbolMessage, toast)) {
      return this._getResult(false, symbolMessage);
    }

    return this._getResult(true);
  }

  /**
   * QQ验证
   * @param {String} qq - QQ
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateQq(qq, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyQq');
    if (!this._validateEmpty(qq, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthQq');
    if (!this._validateFullWidth(qq, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    const formatMessage = window.$vue.$t('common_errorFormat');
    if (!this._validateChinese(qq, formatMessage, toast)) {
      return this._getResult(false, formatMessage);
    }

    const lengthMessage = window.$vue.$t('common_errorLength');
    if (qq.length > 30) {
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * whatsapp验证
   * @param {String} whatsApp - whatsApp
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateWhatsApp(whatsApp, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyWhatsApp');
    if (!this._validateEmpty(whatsApp, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthWhatsApp');
    if (!this._validateFullWidth(whatsApp, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    const formatMessage = window.$vue.$t('common_errorFormat');
    if (!this._validateChinese(whatsApp, formatMessage, toast)) {
      return this._getResult(false, formatMessage);
    }

    const lengthMessage = window.$vue.$t('common_errorLength');
    if (whatsApp.length > 30) {
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * wechat验证
   * @param {String} wechat - wechat
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateWechat(wechat, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyWechat');
    if (!this._validateEmpty(wechat, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthWechat');
    if (!this._validateFullWidth(wechat, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    const formatMessage = window.$vue.$t('common_errorFormat');
    if (!this._validateChinese(wechat, formatMessage, toast)) {
      return this._getResult(false, formatMessage);
    }

    const lengthMessage = window.$vue.$t('common_errorLength');
    if (wechat.length > 30) {
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

    /**
   * telegram验证
   * @param {String} telegram - telegram
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateTelegram(telegram, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyTelegram');
    if (!this._validateEmpty(telegram, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthTelegram');
    if (!this._validateFullWidth(telegram, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    const formatMessage = window.$vue.$t('common_errorFormat');
    if (!this._validateChinese(telegram, formatMessage, toast)) {
      return this._getResult(false, formatMessage);
    }

    const lengthMessage = window.$vue.$t('common_errorLength');
    if (telegram.length > 30) {
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * line
   * @param {String} line - line
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateLine(line, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyLine');
    if (!this._validateEmpty(line, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthLine');
    if (!this._validateFullWidth(line, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    const formatMessage = window.$vue.$t('common_errorFormat');
    if (!this._validateChinese(line, formatMessage, toast)) {
      return this._getResult(false, formatMessage);
    }

    const lengthMessage = window.$vue.$t('common_errorLength');
    if (line.length > 30) {
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * birthday验证
   * @param {String} birthday - birthday
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateBirthday(birthday, toast = false) {
    if (!birthday || !birthday.trim() || (birthday instanceof Date && Number.isNaN(birthday)) || birthday === 'Invalid date') {
      const formatMessage = window.$vue.$t('common_errorBirth');
      if (toast) {
        this._showToast(formatMessage);
      }
      return this._getResult(false, formatMessage);
    }

    return this._getResult(true);
  }

  /**
   * gender验证
   * @param {String} gender - birthday
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateGender(gender, toast = false) {
    if (gender !== 0 && gender !== 1 && gender !== 2) {
      const formatMessage = window.$vue.$t('common_errorGender');
      if (toast) {
        this._showToast(formatMessage);
      }
      return this._getResult(false, formatMessage);
    }

    return this._getResult(true);
  }

  /**
   * zalo
   * @param {String} zalo - zalo
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateZalo(zalo, toast = false) {
    const emptyMessage = window.$vue.$t('common_errorEmptyZalo');
    if (!this._validateEmpty(zalo, emptyMessage, toast)) {
      return this._getResult(false, emptyMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidthZalo');
    if (!this._validateFullWidth(zalo, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    const formatMessage = window.$vue.$t('common_errorFormat');
    if (!this._validateChinese(zalo, formatMessage, toast)) {
      return this._getResult(false, formatMessage);
    }

    const lengthMessage = window.$vue.$t('common_errorLength');
    if (zalo.length > 30) {
      if (toast) {
        this._showToast(lengthMessage);
      }
      return this._getResult(false, lengthMessage);
    }

    return this._getResult(true);
  }

  /**
   * 錢包地址验证
   * @param {String} addr - 錢包地址
   * @param {Boolean} toast - 是否显示错误讯息
   */
  validateWalletAddress(addr, toast = false, titleName) {
    const formatMessage = window.$vue.$t('common_errorFormat');
    if (!this._validateChinese(addr, formatMessage, toast)) {
      return this._getResult(false, formatMessage);
    }

    const symbolMessage = window.$vue.$t('common_errorSpecialSymbol', { titleName });
    if (!this._validateSpecialSymbol(addr, symbolMessage, toast)) {
      return this._getResult(false, symbolMessage);
    }

    const fullWidthMessage = window.$vue.$t('common_errorNoFullWidth', { titleName });
    if (!this._validateFullWidth(addr, fullWidthMessage, toast)) {
      return this._getResult(false, fullWidthMessage);
    }

    return this._getResult(true);
  }
}

export default Base;
