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
    path: '/profile/transfer',
    name: 'Transfer',
    component: () => import(/* webpackChunkName: "Userinfo" */ '@/views/profile/transfer'),
    meta: {
      title: 'Transfer',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/userinfo',
    name: 'Userinfo',
    component: () => import(/* webpackChunkName: "Userinfo" */ '@/views/profile/userinfo'),
    meta: {
      title: 'Userinfo',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/userinfo/setNickName',
    name: 'setNickName',
    component: () => import(/* webpackChunkName: "SetNickName" */ '@/views/profile/userinfo/setNickName'),
    meta: {
      title: 'SetNickName',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/userinfo/setRealName',
    name: 'setRealName',
    component: () => import(/* webpackChunkName: "SetRealName" */ '@/views/profile/userinfo/setRealName'),
    meta: {
      title: 'SetRealName',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/userinfo/setPhone',
    name: 'setPhone',
    component: () => import(/* webpackChunkName: "SetPhone" */ '@/views/profile/userinfo/setPhone'),
    meta: {
      title: 'SetPhone',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/userinfo/modifyLoginPassword',
    name: 'modifyLoginPassword',
    component: () => import(/* webpackChunkName: "ModifyLoginPassword" */ '@/views/profile/userinfo/modifyLoginPassword'),
    meta: {
      title: 'ModifyLoginPassword',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/userinfo/modifyWithdrawPassword',
    name: 'modifyWithdrawPassword',
    component: () => import(/* webpackChunkName: "ModifyWithdrawPassword" */ '@/views/profile/userinfo/modifyWithdrawPassword'),
    meta: {
      title: 'ModifyWithdrawPassword',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/userinfo/setContact',
    name: 'setContact',
    component: () => import(/* webpackChunkName: "SetContact" */ '@/views/profile/userinfo/setContact'),
    meta: {
      title: 'SetContact',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/share',
    name: 'share',
    component: () => import(/* webpackChunkName: "Profile" */ '@/views/profile/share'),
    meta: {
      title: 'Share',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/betRecord',
    name: 'bet-record',
    component: () => import(/* webpackChunkName: "BetRecord" */ '@/views/betRecord'),
    meta: {
      title: 'BetRecord',
      requiresAuth: true,
    },
  },
  {
    path: '/betting',
    name: 'betting',
    component: () => import(/* webpackChunkName: "Betting" */ '@/views/betting'),
    meta: {
      title: 'Betting',
      // requiresAuth: true,
    },
  },
  {
    path: '/match',
    name: 'match',
    component: () => import(/* webpackChunkName: "Match" */ '@/views/match'),
    meta: {
      title: 'Match',
      layout: Layout,
    },
  },
  {
    path: '/profile/deposit',
    name: 'profile-deposit',
    component: () => import(/* webpackChunkName: 'Deposit' */ '@/views/profile/deposit'),
    meta: {
      title: 'Deposit',
      layout: Layout,
      requiresAuth: true,
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
      requiresAuth: true,
    },
  },
  {
    path: '/profile/orderDetail',
    name: 'profile-order-detail',
    component: () => import('@/views/profile/orderDetail' /* webpackChunkName: 'OrderDetail' */),
    meta: {
      title: 'OrderDetail',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/notFound',
    name: 'not-found',
    component: () => import('@/views/notFound' /* webpackChunkName: "NotFound" */),
    meta: {
      title: 'NotFound',
      layout: Layout,
    },
  },
  {
    path: '/loginAndRegister',
    name: 'loginAndRegister',
    component: () => import('@/views/loginAndRegister' /* webpackChunkName: "LoginAndRegister" */),
    meta: {
      title: 'LoginAndRegister',
      layout: Layout,
      isLoginPage: true,
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/notFound',
  },
  {
    path: '/finance',
    name: 'finance',
    component: () => import('@/views/finance' /* webpackChunkName: "Finance" */),
    meta: {
      title: 'Finance',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/transaction',
    name: 'transaction',
    component: () => import(/* webpackChunkName: "Transaction" */ '@/views/profile/transaction'),
    meta: {
      title: 'Transaction',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/transaction/transactionDetail',
    name: 'transactionDetail',
    component: () => import(/* webpackChunkName: "Transaction" */ '@/views/profile/transaction/transactionDetail'),
    meta: {
      title: 'TransactionDetail',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/promotion',
    name: 'Promotion',
    component: () => import(/* webpackChunkName: "Transaction" */ '@/views/profile/promotion'),
    meta: {
      title: 'Promotion',
      layout: Layout,
      requiresAuth: true,
    },
  },
  {
    path: '/profile/vip',
    name: 'Vip',
    component: () => import(/* webpackChunkName: "Transaction" */ '@/views/profile/vip'),
    meta: {
      title: 'Vip',
      layout: Layout,
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  // 若有帶語言參數顯示該語言
  const langQuery = to.query.lang;
  if (langQuery) {
    let formatLang;
    switch (langQuery) {
      case 'vi_vn':
        formatLang = 'vi_vn';
        break;
      case 'zh_cn':
        formatLang = 'zh_cn';
        break;
      case 'en_us':
        formatLang = 'en_us';
        break;
      default:
        formatLang = 'en_us';
    }
    Cookie.remove('language');
    window.$vue.$i18n.locale = formatLang;
    store.commit('SET_LOCALE', { lang: formatLang });
  }

  const hasToken = Cookie.get('_tianyin_token');
  const isLogin = store.state.user?.isLogin;
  const transToSub = store.state.user?.transToSub;
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

  // 轉帳功能未開啟，打網址進入
  if (to.path === '/profile/transfer') {
    if (!transToSub) {
      window.$vue.$message.info(window.$vue.$t('views_profile_transfer_transfer_disable'));
      return { name: 'home' };
    }
  }
  return true;
});

export default router;
