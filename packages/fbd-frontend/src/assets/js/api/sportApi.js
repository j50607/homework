import API from '@/assets/js/api/api';

class SportApi extends API {
  static SERVER = process.env.VUE_APP_SPORT_BASE;

  /**
  * 體育賽事投注項目資訊取得
  */
  static async getBetOption({ issueNo }) {
    const params = {
      issueNo,
    };
    const result = await this.callAxios('POST', '/frontend/sport-game/bet-option/get', params, null, true);
    return result;
  }
}

export default SportApi;
