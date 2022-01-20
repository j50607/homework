import Analytics from '@frontend/analytics';
import router from '@/router';
import store from '@/store';

export default () => {
  const options = {
    router,
    user: store.state.user,
  };

  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    Analytics.init();
    Analytics.bind(options);
  }
};
