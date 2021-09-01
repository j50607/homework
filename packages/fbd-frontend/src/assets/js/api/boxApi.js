import Api from '@/assets/js/api/api';

class BoxApi extends Api {
  static SERVER = process.env.VUE_APP_BOX_API_BASE;

  /**
    * 新增試玩 url
    */
  static async playDemo({ gameCode, device }) {
    const params = {
      gameCode,
      device,
    };
    const result = await this.callAxios('POST', '/game/play-demo', params, null, false);
    return result;
  }
}
export default BoxApi;
