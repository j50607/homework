import Api from '@/assets/js/api/api';

class FinanceApi extends Api {
  static SERVER = process.env.VUE_APP_FINANCE_BASE;

  /**
    * 取得支付平台
    */
  static async getPayPlatform() {
    const params = {
      id: 'all',
    };
    const result = await this.callAxios('POST', '/finance/pay-platform/get/all', params, null, true);
    return result;
  }

  /* 取得支付類型
    */
  static async getDepositChannel() {
    const result = await this.callAxios('POST', '/finance/deposit-channel', null, null, true);
    return result;
  }

  /* 申請存款
  */

  static async applyDeposit({
    channelId,
    amount,
    applicant,
    applicantBank,
    applicantId,
    extendContent,
    certificate,
    unit,
    depositAccountId,
  }) {
    const formData = new FormData();
    const inputData = {
      channelId,
      amount,
      applicant,
      applicantBank,
      applicantId,
      extendContent,
      certificate,
      unit,
      depositAccountId,
    };
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    Object.keys(inputData).map((key) => {
      if (inputData[key] !== undefined) {
        formData.append(`${key}`, inputData[key]);
      }
      return null;
    });
    const result = await this.callAxios('POST', '/finance/deposit/apply', formData, headers, true);

    return result;
  }

  /**
   * 前台審核紀錄查詢(tellerLog)
   */
  static async getQueryLog(params) {
    const result = await this.callAxios('POST', '/finance/teller/log/query', params, null, true);
    return result;
  }

  /**
   * 前台交易紀錄
   */
  static async getFrontendQueryLog(params) {
    const result = await this.callAxios('POST', '/finance/log/query', params, null, true);
    return result;
  }

  /**
   * 取款確認
   */
  static async getWithdrawalCode(withdrawalCode) {
    const params = {
      withdrawalCode,
    };
    const result = await this.callAxios('POST', '/finance/withdrawal/check', params, null, true);
    return result;
  }

  /**
   * 前台申請取款
   * @param {String} bankName - 取款銀行名稱
   * @param {Number} amount - 取款金額
   * @param {String} accountName - 帳戶名稱
   * @param {String} accountId - 銀行帳號/卡號
   * @param {String} accountBank - 分行名稱
   * @param {String} withdrawalCode - 資金密碼
   * @param {Boolean} force - 是否強制取款
   */
  static async applyWithdrawal({
    bankName, amount, accountName, accountId, accountBank, withdrawalCode, force,
  }) {
    const params = {
      bankName,
      amount,
      accountName,
      accountId,
      accountBank,
      withdrawalCode,
      force,
    };
    const result = await this.callAxios('POST', '/finance/withdrawal/apply', params, null, true);
    return result;
  }

  /**
   * 前台資金轉賬
   */
  static async transfer(params) {
    const result = await this.callAxios('POST', '/frontend/transfer-money', params, null, true);
    return result;
  }

  /**
   * 個人當前流水計算
   */
  static async getWaterCaculate() {
    const reuslt = await this.callAxios('POST', '/finance/withdraw-water/caculate', null, null, true, false, undefined, 30000);
    return reuslt;
  }
}
export default FinanceApi;
