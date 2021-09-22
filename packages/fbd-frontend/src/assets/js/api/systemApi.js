import API from '@/assets/js/api/api';

class SystemApi extends API {
  static SERVER = process.env.VUE_APP_SYSTEM_BASE;

  /**
 * system config 版本
 */
  static async getSystemVersion() {
    const result = await this.callAxios('POST', '/system/configure/version', undefined, undefined, true);

    return result;
  }

  static async getSystemConfig() {
    const vm = this;
    // 先取得目前版本资料
    const { code, data } = await vm.getSystemVersion();
    const stateData = { code, data: window.$vue.$store?.state?.info };
    const { apiBool } = stateData.data;
    if (code === 200 && data) {
      // 如果版本没变就使用store里面的资料
      if (stateData?.data?.systemVersion === data && apiBool) {
        window.$vue.$store.commit('SET_API_BOOL', true);
        return stateData;
      }
      window.$vue.$store.commit('SET_API_BOOL', false);
      window.$vue.$store.commit('SET_VERSION', data);
      const result = await this.callAxios('POST', '/system/config/get', undefined, undefined, true, false, undefined);
      window.$vue.$store.commit('SET_API_BOOL', true);
      return result;
    }
    return stateData;
  }

  /**
   * 银行查询
   */
  static async getBank(locale = 'zh_cn') {
    const result = await this.callAxios('POST', '/system/bank/get/all', null, null, true, false, locale);
    return result;
  }

  /**
   * 代理報表上級
   */
  static async getReportAgencySuperior(data) {
    const result = await this.callAxios('POST', '/frontend/report/agency/superior/get', data, null, true, null, null);

    return result;
  }

  /**
   * 代理報表下級
   */
  static async getReportAgencySubordinate(data) {
    const result = await this.callAxios('POST', '/frontend/report/agency/subordinate/get', data, null, true, null, null);

    return result;
  }

  /**
   * 公告(跑马灯)列表
   */
  static async getMarquee() {
    const params = {};

    const result = await this.callAxios('POST', '/announcement/marquee/list', params, undefined, false);
    return result;
  }

  /**
   * 取得入站弹窗
   */
  static async getAnnouncement() {
    const params = {};

    const result = await this.callAxios('POST', '/announcement/popup/page', params, undefined, false);

    return result;
  }

  /**
   * 取得優惠活動
   * @param {Number} activityId - 活動ID
   * @param {Boolean} simplify - 簡化輸出(default = true)
   * @param {String} start - 活動開始時間
   * @param {Number} type - 活動種類
   */
  static async getActivityList({
    type, activityId, simplify, dateTimeStart,
  } = {}) {
    const params = {
      activityId,
      simplify,
      displaySwitch: true,
      status: true,
      dateTimeStart,
      type,
    };

    const result = await this.callAxios('POST', '/api/activity/detail/get', params, undefined, false);

    return result;
  }

  /**
   * 公告(最新消息/讯息推送)分页
   * @param {Number} read - 已讀狀態。內容值：。內容值：0(所有)、1(已讀)、2(未讀)
   */
  static async getMessage({ pageIndex, read = 0, pageSize }) {
    const params = {
      pageIndex,
      pageSize,
      read,
    };

    const result = await this.callAxios('POST', '/announcement/news-message/page', params, undefined, true);
    return result;
  }

  /**
   * 取得首頁輪播圖
   * @param {String} carouselIdOrAll - 輪播圖id。若為all可同時取得所有資料
   */
  static async getCarousel() {
    const params = {};

    const result = await this.callAxios('POST', '/system/carousel/get/all', params, undefined, false);
    return result;
  }

  // 取得手機驗證碼
  static async sendSms({ phone, auth = true }) {
    const params = { phone };

    const result = await this.callAxios('POST', '/utility/sms/send', params, null, auth);
    return result;
  }

  /**
   * 檢查站台域名
   */

  static checkSiteDomain(domainName) {
    const params = {
      domainName,
    };

    return this.callAxios('POST', '/site/domain/check', params, undefined, false);
  }

  /**
   * 取得活動种类清单
   */
  static async getActivityTypeList() {
    const result = await this.callAxios('POST', '/api/activity/type-list/get', undefined, undefined, false);

    return result;
  }
}

export default SystemApi;
