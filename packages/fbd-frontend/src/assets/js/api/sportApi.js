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

  /**
  * 體育下注統計清單取得
  */
  static async getCaculateLog({
    gameCode, issueNo, playTypeM, playTypeS, option = [],
  }) {
    const params = {
      gameCode,
      issueNo,
      playTypeM,
      playTypeS,
      option,
    };
    const result = await this.callAxios('POST', '/frontend/sport-game/sport-calculate-log/get', params, null, true);
    return result;
  }

  /**
  * 體育賽事下注
  */
  static async handleBetting({
    gameCode, issueNo, betMainInfo,
  }) {
    const params = {
      gameCode,
      issueNo,
      betMainInfo,
    };
    const result = await this.callAxios('POST', '/frontend/betting', params, null, true);
    return result;
  }

  /*
  * 賽事注單分頁查詢
  */
  static async getBetOrderPage({
    start, end, status, pageIndex,
  }) {
    const params = {
      start,
      end,
      status,
      pageIndex,
      filterTest: false,
    };
    const result = await this.callAxios('POST', '/frontend/sport-game/view/bet/order/page', params, null, true);
    return result;
  }

  /*
  * 賽事注單統計
  */
  static async getBetOrderStatistic({
    start, end, status,
  }) {
    const params = {
      start,
      end,
      status,
    };
    const result = await this.callAxios('POST', '/frontend/sport-game/view/bet/order/statistic', params, null, true);
    return result;
  }

  /*
   * 取得首頁賽事相關資料
   * @returns
   */
  static async getHomePageData() {
    const result = await this.callAxios('POST', '/frontend/sport-game/home-page/get', {}, null, true);
    return result;
  }

  /**
  * 取得聯賽清單
  */
  static async getLeagueSummary(params, isStartFromStartOfDay = true) {
    const result = await this.callAxios('POST', '/frontend/sport-game/league-summary/get', params, null, true, null, null, null, isStartFromStartOfDay);
    return result;
  }

  /**
  * 取得取得比賽大綱清單
  */
  static async getGameSummary(params, isStartFromStartOfDay = true) {
    const result = await this.callAxios('POST', '/frontend/sport-game/game-summary/get', params, null, true, null, null, null, isStartFromStartOfDay);
    return result;
  }

  /**
  * 取得體育歷史賽事清單
  */
  static async getGameSummaryRecord(params) {
    const result = await this.callAxios('POST', '/frontend/sport-game/history-summary/get', params, null, true);
    return result;
  }

  /**
  * 取得投注設定
  */
  static async getBettingConfig(params) {
    const result = await this.callAxios('POST', '/frontend/setting/betting-config/get', params, null, true);
    return result;
  }

  /**
   * 取得比赛详细资讯
   */
  static async getGameDetail(params) {
    const result = await this.callAxios('POST', '/frontend/sport-game/game-detail/get', params, null, true);
    return result;
  }

  /**
   * 取得用戶VIP訊息
   */
  static async getVipLevelInfo() {
    const result = await this.callAxios('POST', '/frontend/sport-game/vip-level-info/get', {}, null, true);
    return result;
  }

  /**
   * 取得VIP階級設定
   */
  static async getVipLevelRule() {
    const result = await this.callAxios('POST', '/frontend/sport-game/vip-level-rule/get', {}, null, true);
    return result;
  }

  /**
   * 負利紅包查詢
   */
  static async getRemedyLog() {
    const result = await this.callAxios('POST', '/frontend/remedy/log/get', {}, null, true);
    return result;
  }
}

export default SportApi;
