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
  static async getDepositChannel(unit) {
    const params = {
      unit,
    };
    const result = await this.callAxios('POST', '/frontend/deposit-channel', params, null, true);
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
    const result = await this.callAxios('POST', '/frontend/deposit/apply', formData, headers, true);

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
    const result = await this.callAxios('POST', '/frontend/log/query', params, null, true);
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
   */
  static async applyWithdrawal(params) {
    const result = await this.callAxios('POST', '/frontend/withdrawal/apply', params, null, true);
    return result;
  }

  /**
   * 前台資金轉賬
   */
  static async transfer(params) {
    const result = await this.callAxios('POST', '/frontend/transfer-money', params, null, true);
    return result;
  }
}
export default FinanceApi;
