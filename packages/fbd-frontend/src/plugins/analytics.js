import Analytics from '@frontend/analytics';
import router from '@/router';
import store from '@/store';

export default () => {
  const options = {
    router,
    user: store.state.user,
  };

  Analytics.init();
  Analytics.bind(options);
};
