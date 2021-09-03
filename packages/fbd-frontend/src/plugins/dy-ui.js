import DButton from '@/components/DButton';
import DCountdown from '@/components/DCountdown';
import DDialog from '@/components/DDialog';
import DGoTop from '@/components/DGoTop';
import DHeaderRow from '@/components/DHeaderRow';
import DLanguageModal from '@/components/DLanguageModal';
import DLayout from '@/components/DLayout';
import DLoading from '@/components/DLoading';
import DLocale from '@/components/DLocale';
import DLocaleImage from '@/components/DLocaleImage';
import DPopup from '@/components/DPopup';
import DRollingNumber from '@/components/DRollingNumber';
import DScroll from '@/components/DScroll';
import DSearchList from '@/components/DSearchList';
import DSelectDateModal from '@/components/DSelectDateModal';
import DSwiper from '@/components/DSwiper';
import DTabs from '@/components/DTabs';
import DFooterRow from '@/components/DFooterRow';
import DSelect from '@/components/DSelect';

const useDyUI = (app) => {
  const curApp = app;
  const plugins = (Vue) => {
    Vue.component('DButton', DButton);
    Vue.component('DCountdown', DCountdown);
    Vue.component('DDialog', DDialog);
    Vue.component('DGoTop', DGoTop);
    Vue.component('DHeaderRow', DHeaderRow);
    Vue.component('DLanguageModal', DLanguageModal);
    Vue.component('DLayout', DLayout);
    Vue.component('DLoading', DLoading);
    Vue.component('DLocale', DLocale);
    Vue.component('DLocaleImage', DLocaleImage);
    Vue.component('DPopup', DPopup);
    Vue.component('DRollingNumber', DRollingNumber);
    Vue.component('DScroll', DScroll);
    Vue.component('DSearchList', DSearchList);
    Vue.component('DSelectDateModal', DSelectDateModal);
    Vue.component('DSwiper', DSwiper);
    Vue.component('DTabs', DTabs);
    Vue.component('DFooterRow', DFooterRow);
    Vue.component('DSelect', DSelect);
  };
  curApp.use(plugins);
  return curApp;
};

export default useDyUI;