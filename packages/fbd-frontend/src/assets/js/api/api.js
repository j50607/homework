import axios from 'axios';
// import * as moment from 'moment';
import dayjs from 'dayjs';
import Cookie from 'js-cookie';
import { pipe } from '@/assets/js/utils/utils';
import FetchCompleteEvent from '@/assets/js/api/fetchCompleteEvent';
import EventDispatcher from '@/assets/js/api/eventDispatcher';
import ErrorCode from '@/assets/js/api/errorCode';

const MAX_CACHE = 20;

// 用於請求成功時使用的事件監聽器
const eventEmitter = new EventDispatcher();

const getRequestIdentify = (config) => {
  const { url } = config;
  const getParams = (httpConfig) => {
    let params = {};
    if (httpConfig?.method !== 'get') {
      params = httpConfig?.data;
    }
    return params;
  };

  const formatParams = (params) => {
    let newParams = '';
    if (typeof params === 'object') {
      newParams = { ...params };
      newParams = JSON.stringify(newParams);
    } else if (params) {
      newParams = params;
    }
    return newParams;
  };

  const getPendingKey = (httpUrl) => (params) => encodeURIComponent(`${httpUrl}${params}`);
  const requestIdentify = pipe(
    getParams,
    formatParams,
    getPendingKey(url),
  )(config);

  return requestIdentify;
};

const getNowTime = () => +new Date();

const cache = new Map();

const unShiftCache = () => {
  const keys = cache.entries().next().value;
  if (cache?.size === MAX_CACHE) {
    cache.delete(keys[0]);
  }
};

const addCacheRes = (key) => (res) => (cacheTime) => {
  cache.set(key, {
    data: res,
    expireTime: getNowTime() + cacheTime,
  });
};

const getCacheRes = (key) => cache.get(key);

const pending = {};

const addPending = (key) => {
  pending[key] = true;
};

const deletePending = (key) => {
  if (pending[key]) {
    delete pending[key];
  }
};

const dispatchLockEvent = (key) => (res) => {
  eventEmitter.dispatchEvent(new FetchCompleteEvent(key, res));
};

axios.interceptors.request.use((request) => request, (error) => Promise.reject(error));

axios.interceptors.response.use((response) => {
  const key = getRequestIdentify(response.config);
  dispatchLockEvent(key)(response);
  deletePending(key);
  const res = response.data;
  if (response.status === 429) {
    window.$vue.$emit('showResponseModal');
  }
  if (res.code !== 200) {
    ErrorCode.httpErrorHandler(res);
  }
  return response;
});
const deviceType = () => {
  let device;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(navigator.userAgent);
  const isAPP = /android|ios/.test(navigator.userAgent);
  if (isMobile) {
    device = 'WAP';
  } else if (isAPP) {
    device = 'APP';
  } else {
    device = 'PC';
  }
  return device;
};

class Api {
  static TOKEN;

  static async callAxios(method, url, params, contentType, auth, customHeaders, locale, cacheResTime = 0, startFromStartOfDay = true) {
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (key === 'start' || key === 'startTime' || key === 'startDate') {
          if (!startFromStartOfDay) {
            params[key] = dayjs(value).format('YYYY/MM/DD HH:mm:ss');
          } else {
            params[key] = dayjs(value).tz('Asia/Shanghai').startOf('day').format('YYYY/MM/DD HH:mm:ss');
          }
        }
        if (key === 'end' || key === 'endTime' || key === 'endDate') {
          params[key] = dayjs(value).tz('Asia/Shanghai').endOf('day').format('YYYY/MM/DD HH:mm:ss');
        }
        if (value && value.toString().includes('23:59:59')) {
          params[key] = dayjs(value).add(1, 'second').format('YYYY/MM/DD HH:mm:ss');
        }
      });
    }

    const key = getRequestIdentify({
      url: this.SERVER + url,
      data: params,
    });
    const headers = customHeaders || { 'Content-Type': contentType || 'application/json' };
    const langMap = {
      en_us: 'en_US',
      zh_cn: 'zh_CN',
      zh_tw: 'zh_TW',
      th_th: 'th_TH',
      vi_vn: 'vi_VN',
      ja_jp: 'ja_JP',
    };
    let lang = '';
    headers.Locale = 'zh_CN';
    headers.loginDeviceType = deviceType();
    if (cacheResTime) {
      const cacheRes = getCacheRes(key);
      if (cacheRes && getNowTime() <= cacheRes.expireTime) {
        return cacheRes.data;
      }
    }

    addPending(key);

    const langChanged = window.localStorage.getItem('hasLangChanged');
    if (!langChanged) {
      lang = window.$vue.$store.state.info.language || Cookie.get('language');
    } else {
      lang = Cookie.get('language');
    }
    headers.Locale = langMap[lang];

    if (auth) {
      const token = window?.$vue?.$store?.state?.user?.token;
      const isLogin = window?.$vue?.$store?.state?.user?.isLogin;

      if (token) {
        if (!isLogin) {
          window.$vue.$store.commit('SET_IS_LOGIN', true);
        }
        headers.Authorization = `Bearer ${token}`;
      }
    }

    try {
      const { status, data } = await axios({
        headers,
        method,
        url: this.SERVER + url,
        data: params,
      });
      if (status === 200) {
        if (cacheResTime) {
          unShiftCache();
          addCacheRes(key)(data)(cacheResTime);
        }
        return data;
      }
      throw new Error('request error');
    } catch (error) {
      return error;
    }
  }
}

export default Api;
