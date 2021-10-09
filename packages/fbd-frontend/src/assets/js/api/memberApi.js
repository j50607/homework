import API from '@/assets/js/api/api';

class MemberApi extends API {
  static SERVER = process.env.VUE_APP_MEMBER_BASE;

  /**
    * 登入
    */
  static async login({
    account, password, agentType, answer, deviceId, authCode, authCodeKey,
  }) {
    let params;
    if (!agentType) {
      params = {
        account,
        password,
        answer,
        deviceId,
        authCode,
        authCodeKey,
      };
    } else {
      params = {
        agentType,
      };
    }

    const result = await this.callAxios('POST', '/member/login', params, null, false);

    if (result.code === 200) {
      API.TOKEN = result.data;
      window.$vue.$store.commit('SET_TOKEN', result.data);
    }

    return result;
  }

  /**
    * 登出
    */
  static async logout() {
    const params = {};

    const result = await this.callAxios('POST', '/member/logout', params, null, true);
    return result;
  }

  /**
    * 註冊
    */
  static async register(data) {
    const result = await this.callAxios('POST', '/member/register', data, null, false);
    return result;
  }

  /**
   * 註冊驗證 =>
   * 使用時機: 先打註冊驗證API, 再打註冊API, 而賬號註冊不用註冊驗證, 直接打註冊API即可
   */
  static async registerValidate(data) {
    const result = await this.callAxios('POST', '/frontend/member/register-authenticate', data, null, false);
    return result;
  }

  /**
   * 用戶初始化資料
   */
  static async getUserInfoInit(data = {}) {
    const result = await this.callAxios('POST', '/frontend/user-init-info/get', data, null, true);
    return result;
  }

  /**
 * 第三方登入资讯
 */
  static async getThirdPartyInfo() {
    const result = await this.callAxios('POST', '/member/third-party/info/get', {}, null, false);

    return result;
  }

  /**
   * 第三方登陆
   */
  static async thirdPartyLogin({
    token, type, lineRedirectUri, agentCode, deviceType,
  }) {
    const params = {
      token,
      type,
      lineRedirectUri,
      agentCode,
      deviceType,
    };

    const result = await this.callAxios('POST', '/frontend/third-party/login/verify', params, null, false);
    return result;
  }

  /**
   * 取得圖形驗證資訊
   */
  static async getVerification({ authCodeKey }) {
    const params = {
      authCodeKey,
    };
    const result = await this.callAxios('POST', '/member/img-verification/get', params, null, null);

    return result;
  }

  /**
   * 取得用戶部分資訊
   */
  static async getUserPartialInfo(params = {}) {
    const result = await this.callAxios('POST', '/frontend/user-partial-info/get', params, null, true);

    return result;
  }

  /**
   * 取得會員上級階層樹
   */
  static async getAccountUpHierarchy(params = {}) {
    const result = await this.callAxios('POST', '/agent/user/account-up-hierarchy/get', params, null, true);

    return result;
  }

  static async getUserList(params = {}) {
    const result = await this.callAxios('POST', '/frontend/user-list/get', params, null, true);

    return result;
  }

  /**
   * 取得可領取返傭金額
   */
  static async getAgentCommission(getRawData = false) {
    const params = {
      getRawData,
    };
    const result = await this.callAxios('POST', '/agent/commission/get', params, null, true);

    return result;
  }

  /**
   * 领取返佣金额
   */
  static async drawAgentCommission() {
    const result = await this.callAxios('POST', '/agent/commission/draw', undefined, null, true);

    return result;
  }

  /**
  * 個人銀行卡資料
   */
  static async getBankcard(params) {
    const result = await this.callAxios('POST', '/member/bankcard', params, null, true);
    return result;
  }

  /**
  * 新增銀行卡
   */
  static async addBankcard(params = {}) {
    const result = await this.callAxios('POST', '/member/bankcard/add', params, null, true);
    return result;
  }

  /**
  * 删除銀行卡
   */
  static async deleteBankcard(params = {}) {
    const result = await this.callAxios('POST', '/member/bankcard/delete', params, null, true);
    return result;
  }

  /**
  * 更新銀行卡
   */
  static async updateBankcard(params = {}) {
    const result = await this.callAxios('POST', '/member/bankcard/update', params, null, true);
    return result;
  }

  /**
  *  更新取款代碼
  */
  static async changeWithDrawalCode(params) {
    const result = await this.callAxios('POST', '/member/change-withdrawal-code', params, null, true);
    return result;
  }

  /**
  * 更新密碼
  */
  static async changePassword(params) {
    const result = await this.callAxios('POST', '/member/change-password', params, undefined, true);
    return result;
  }

  /**
  * 下級使用者資料分頁

  */
  static async getSubUserInfo(params) {
    const result = await this.callAxios('POST', '/member/user-info/sub/page', params, undefined, true);
    return result;
  }

  /**
  * 取得認證等級設定參數

  */
  static async getVerifyConfig() {
    const result = await this.callAxios('POST', '/frontend/verify/config/get', {}, undefined, true);
    return result;
  }

  /**
  * 取得會員認證資料與記錄列表

  */
  static async getUserVerifyLog(params) {
    const result = await this.callAxios('POST', '/frontend/verify/user-info-log/get', params, undefined, true);
    return result;
  }

  /**
  * 取得會員個人認證記錄列表

  */
  static async getUserVerifyListLog() {
    const result = await this.callAxios('POST', '/frontend/verify/user-log/list/get', {}, undefined, true);
    return result;
  }

  /**
  * 申請認證 - Email - 發送驗證碼
  */
  static async emailSendCode({ email }) {
    const formData = new FormData();
    formData.append('email', email);
    const result = await this.callAxios('POST', '/frontend/verify/email/send-code', formData, undefined, true);
    return result;
  }

  /**
  * 申請認證 - 手機  - 發送驗證碼
  */
  static async mobileSendCode({
    mobile,
  }) {
    const formData = new FormData();
    formData.append('mobile', mobile);
    const result = await this.callAxios('POST', '/frontend/verify/mobile/send-code', formData, undefined, true);
    return result;
  }

  /**
  * 申請認證 - 真實資料認證(基本信息)

  */
  static async sendRealDataBasic({
    realName, birthday, idNo,
  }) {
    const formData = new FormData();
    formData.append('realName', realName);
    formData.append('birthday', birthday);
    formData.append('idNo', idNo);
    const result = await this.callAxios('POST', '/frontend/verify/real-data/basic/apply', formData, undefined, true);
    return result;
  }

  /**
  * 申請認證 - 真實資料認證(進階信息)

  */
  static async sendRealDataAdvence({
    idNoPic, idNoPic2,
  }) {
    const formData = new FormData();
    formData.append('idNoPic', idNoPic);
    formData.append('idNoPic2', idNoPic2);
    const result = await this.callAxios('POST', '/frontend/verify/real-data/advence/apply', formData, undefined, true);
    return result;
  }

  /**
  * 申請認證 - 銀行卡
  */
  static async sendVerifyBankcard({
    bankName, bankAccountName, bankCardNumber,
  }) {
    const formData = new FormData();
    formData.append('bankName', bankName);
    formData.append('bankAccountName', bankAccountName);
    formData.append('bankCardNumber', bankCardNumber);
    const result = await this.callAxios('POST', '/frontend/verify/bank-card/apply', formData, undefined, true);
    return result;
  }

  /**
  *  申請認證 - Email - 輸入驗證碼
  */
  static async emailVerifyCode({ email, code }) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('code', code);
    const result = await this.callAxios('POST', '/frontend/verify/email/verify-code', formData, undefined, true);
    return result;
  }

  /**
  *  申請認證 - 手機 - 輸入驗證碼
  */
  static async mobilelVerifyCode({
    mobile, code,
  }) {
    const formData = new FormData();
    formData.append('mobile', mobile);
    formData.append('code', code);
    const result = await this.callAxios('POST', '/frontend/verify/mobile/verify-code', formData, undefined, true);
    return result;
  }

  /**
  *  申請認證 - 居住地
  */
  static async sendVerifyLocation({
    residence, residencePic,
  }) {
    const formData = new FormData();
    formData.append('residence', residence);
    formData.append('residencePic', residencePic);
    const result = await this.callAxios('POST', '/frontend/verify/residence/apply', formData, undefined, true);
    return result;
  }

  /**
  * 更新大頭貼
  */
  static async updateAvatar({ account, system, upload }) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    const params = {
      system,
      upload,
    };

    Object.keys(params).map((key) => {
      if (params[key] !== undefined) {
        formData.append(`${key}`, params[key]);
      }
      return key;
    });
    const result = await this.callAxios('POST', `/member/avatar/update/${account}`, formData, headers, true);
    return result;
  }

  /**
  * 更新會員資料
  */
  static async updateMember(account, params) {
    const result = await this.callAxios('POST', `/member/update/${account}`, params, undefined, true);
    return result;
  }

  /**
  * 電話綁定驗證
  */
  static async verifySms({ phone, verifyCode, password }) {
    const params = { phone, verifyCode, password };

    const result = await this.callAxios('POST', '/member/bind-phone/verify', params, null, true);
    return result;
  }

  /**
     * 取得返点设定状态
     */
  static async getAgentSetting(params) {
    const result = await this.callAxios('POST', '/agent/commission-rate-setting/get', params, null, true);

    return result;
  }

  /**
     * 设定返点代理比例
     */
  static async setAgentSetting(params) {
    const result = await this.callAxios('POST', '/agent/commission-rate-setting/set', params, null, true);

    return result;
  }

  /**
   * 领取返点金额
   */
  static async getAgentDraw() {
    const result = await this.callAxios('POST', '/agent/commission/draw', undefined, null, true);

    return result;
  }
}

export default MemberApi;
