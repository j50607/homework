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
   * @param {NUmber} activityId - 活動ID
   * @param {Boolean} simplify - 簡化輸出(default = true)
   * @param {String} start - 活動開始時間
   */
  static async getActivityList({ activityId, simplify, dateTimeStart } = {}) {
    const params = {
      activityId,
      simplify,
      displaySwitch: true,
      status: true,
      dateTimeStart,
    };

    const result = await this.callAxios('POST', '/api/activity/detail/get', params, undefined, false);

    return result;
  }
}

export default SystemApi;
