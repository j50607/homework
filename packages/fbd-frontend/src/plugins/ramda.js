import * as R from 'ramda';

const useRamda = (app) => {
  const curApp = app;
  const ramda = R;
  curApp.config.globalProperties.$R = ramda;
  return curApp;
};

export default useRamda;
