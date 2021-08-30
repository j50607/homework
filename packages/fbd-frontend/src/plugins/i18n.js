import VueI18n from '@/locales';

const useI18n = (app) => {
  const curApp = app;
  curApp.use(VueI18n);
  return curApp;
};

export default useI18n;
