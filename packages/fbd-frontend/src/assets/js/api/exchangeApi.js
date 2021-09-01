import Api from '@/assets/js/api/api';

class ExchangeApi extends Api {
  static SERVER = process.env.VUE_APP_EXCHANGE_BASE;

  /**
    * 取得支付平台
    */
  static async getCoinInfo(cryptocurrency) {
    const params = {
      cryptocurrency,
    };
    const result = await this.callAxios('POST', '/frontend/coin/info', params, null, true);
    return result;
  }

  /**
   * 钱包总览
   * @param {String} unit -虚拟币缩写
   */
  static async getWalletOverview({ unit = 'BTC' }) {
    const params = { unit };
    const result = await this.callAxios('POST', '/frontend/wallet/overview', params, null, true);
    return result;
  }

  /**
   * 錢包類型
   * @param {String} walletType - 錢包類型: SPOT_WALLET 現貨錢包 | LEVERAGED_WALLET 槓桿錢包 | C2C_WALLET C2C錢包
   */
  static async getWalletType({ walletType, unit = 'BTC' }) {
    const params = {
      walletType,
      unit,
    };

    const result = await this.callAxios('POST', '/frontend/wallet/type', params, null, true);
    return result;
  }

  /**
   * 錢包劃轉
   * @param {String} unit - 幣種
   * @param {String} transferOutWallet - 轉出錢包
   * @param {String} transferInWallet - 轉入錢包
   * @param {Number} amount - 金額
   */
  static async walletTransfer({
    unit, transferOutWallet, transferInWallet, amount,
  }) {
    const params = {
      unit,
      transferInWallet,
      transferOutWallet,
      amount,
    };
    const result = await this.callAxios('POST', '/frontend/wallet/transfer', params, null, true);
    return result;
  }

  /**
   * 取得划转记录
   * @param {String} walletType 類型
   * @param {String} Start 起始日期。yyyy/MM/dd HH:mm:ss
   * @param {String} End 起始日期。yyyy/MM/dd HH:mm:ss
   * @param {Number} pageIndex
   * @param {Number} pageSize
   * @returns
   */
  static async getWalletLog({
    walletType, start, end, pageIndex = 1, pageSize = 20,
  }) {
    const params = {
      walletType,
      start,
      end,
      pageIndex,
      pageSize,
    };
    const result = await this.callAxios('POST', '/frontend/wallet-transfer-log/page', params, null, true);
    return result;
  }

  /**
   * 取得前台檔次列表
   * @param {String} unit 幣種簡稱
   */
  static async getRavageLevelList(unit) {
    const result = await this.callAxios('POST', `/frontend/ravage/level/list/${unit}`, unit, null, true);
    return result;
  }

  /**
   * 取得前台交易所列表
   */
  static async getRavageExchangeList() {
    const result = await this.callAxios('POST', '/frontend/ravage/exchange/list', undefined, null, true);
    return result;
  }

  /**
   * 取得前台用戶資訊
   */
  static async getRavageUserInfo(minutes = 30) {
    const params = {
      minutes,
    };
    const result = await this.callAxios('POST', '/frontend/ravage/user-info', params, null, true);
    return result;
  }

  /**
   * 取得前台用戶餘額
   */
  static async getRavageUserBalance() {
    const result = await this.callAxios('POST', '/frontend/ravage/user-balance', undefined, null, true);
    return result;
  }

  /**
   * 取得前台收益紀錄
   */
  static async getRavageEarningsRecord() {
    const result = await this.callAxios('POST', '/frontend/ravage/earnings/record', undefined, null, true);
    return result;
  }

  /**
   * 取得前台領取收益
   */
  static async recieveRavageEarnings(id) {
    const params = {
      id, // id為0時為一鍵領取
    };
    const result = await this.callAxios('POST', `/frontend/ravage/earnings/receive/${id}`, params, null, true);
    return result;
  }

  /**
   * 前台實時交易紀錄
   */
  static async getRavageTransactionRecord() {
    const result = await this.callAxios('POST', '/frontend/ravage/transaction/record', undefined, null, true);
    return result;
  }

  /**
   * 前台餘額轉入
   */
  static async ravageTransferIn({ amount }) {
    const params = {
      amount,
    };
    const result = await this.callAxios('POST', '/frontend/ravage/transfer-in', params, null, true);
    return result;
  }

  /**
   * 前台配置取得
   */
  static async getRavageConfig() {
    const result = await this.callAxios('POST', '/frontend/ravage/configuration/get', null, null, true);
    return result;
  }

  /**
   * 前台交易所信息版本
   */
  static async getExchangeInfoVersion() {
    const result = await this.callAxios('POST', '/frontend/exchange/info/version', undefined, undefined, true);

    return result;
  }

  /**
   * 幣種選單
   * @param {Boolean} cryptocurrency 币种 是否為虛擬幣
   */
  static async getCoinMenu(cryptocurrency) {
    const params = {
      cryptocurrency,
    };
    const result = await this.callAxios('POST', '/frontend/coin/menu', params, null, true);
    return result;
  }

  // 前台交易所信息列表
  static async getExchangeInfoList() {
    const vm = this;
    // 先取得目前版本资料
    const { code, data } = await vm.getExchangeInfoVersion();
    const stateData = { code, data: window.$vue.$store?.state?.exchange.exchangeInfoList, info: window.$vue.$store?.state?.exchange };
    const { exchangeInfoApiBool } = stateData.info;
    if (code === 200 && data) {
      // 如果版本没变就使用store里面的资料
      if (stateData?.info?.exchangeInfoVersion === data && exchangeInfoApiBool) {
        window.$vue.$store.commit('SET_EXCHANGE_INFO_API_BOOL', true);
        return stateData;
      }
      window.$vue.$store.commit('SET_EXCHANGE_INFO_API_BOOL', false);
      window.$vue.$store.commit('SET_EXCHANGE_INFO_VERSION', data);
      const result = await this.callAxios('POST', '/frontend/exchange/info/list', undefined, undefined, true, false, undefined);
      window.$vue.$store.commit('SET_EXCHANGE_INFO_API_BOOL', true);
      return result;
    }
    return stateData;
  }
}
export default ExchangeApi;
