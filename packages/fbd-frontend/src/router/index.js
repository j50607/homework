import { createRouter, createWebHistory } from 'vue-router';
import Cookie from 'js-cookie';
import store from '@/store';
import Layout from '@/layout';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
    meta: {
      title: 'home',
      layout: Layout,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "Profile" */ '@/views/profile'),
    meta: {
      title: 'Profile',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/betRecord',
    name: 'bet-record',
    component: () => import(/* webpackChunkName: "'," */ '@/views/betRecord'),
    meta: {
      title: 'BetRecord',
      // requiresAuth: true,
    },
  },
  {
    path: '/betting',
    name: 'betting',
    component: () => import(/* webpackChunkName: "'," */ '@/views/betting'),
    meta: {
      title: 'Betting',
      // requiresAuth: true,
    },
  },
  {
    path: '/match',
    name: 'match',
    component: () => import(/* webpackChunkName: "match" */ '@/views/match'),
    meta: {
      title: 'match',
      layout: Layout,
    },
  },
  {
    path: '/profile/withdraw',
    name: 'profile-withdraw',
    component: () => import('@/views/profile/withdraw' /* webpackChunkName: 'Withdraw' */),
    meta: {
      title: 'Withdraw',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/confirmWithdraw',
    name: 'profile-confirm-withdraw',
    component: () => import('@/views/profile/confirmWithdraw' /* webpackChunkName: 'ConfirmWithdraw' */),
    meta: {
      title: 'Withdraw',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/wallet',
    name: 'profile-wallet',
    component: () => import('@/views/profile/wallet' /* webpackChunkName: 'Wallet' */),
    meta: {
      title: 'Wallet',
      layout: Layout,
      // requiresAuth: true,
    },
  },
  {
    path: '/profile/orderDetail',
    name: 'profile-order-detail',
    component: () => import('@/views/profile/orderDetail' /* webpackChunkName: 'OrderDetail' */),
    meta: {
      title: 'OrderDetail',
      layout: Layout,
      // requiresAuth: true,
    },
  },
  {
    path: '/notFound',
    name: 'not-found',
    component: () => import('@/views/notFound' /* webpackChunkName: "notFound" */),
    meta: {
      title: 'notFound',
      layout: Layout,
    },
  },
  {
    path: '/loginAndRegister',
    name: 'loginAndRegister',
    component: () => import('@/views/loginAndRegister' /* webpackChunkName: "loginAndRegister" */),
    meta: {
      title: 'loginAndRegister',
      layout: Layout,
      isLoginPage: true,
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/notFound',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const hasToken = Cookie.get('_tianyin_token');
  const isLogin = store.state.user?.isLogin;
  const isFullfilled = hasToken && isLogin;
  const query = to?.query;
  // 登入状态但 cookie 被清掉
  if (to.meta?.requiresAuth && isLogin && !hasToken) {
    store.commit('CLEAR');
    window.$vue.$message.info(window.$vue.$t('common_reLogin'));
    return { name: 'loginAndRegister', query };
  }
  // 未登入
  if (to.meta?.requiresAuth && !isFullfilled) {
    window.$vue.$message.info(window.$vue.$t('common_loginFirst'));
    return { name: 'loginAndRegister', query };
  }
  // 已登入打網址進登入頁自動導回首頁
  if (to.meta?.isLoginPage && isFullfilled) {
    return { name: 'home', query };
  }
  return true;
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
