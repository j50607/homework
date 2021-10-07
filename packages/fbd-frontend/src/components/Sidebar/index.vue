<template>
  <div class="sidebar">
    <d-popup
      v-model:value="show"
      position="right"
      duration="0.4"
    >
      <div class="ml-8 mr-8 mb-5">
        <div class="user-info">
          <img
            class="avatar"
            :src="$requireSafe(`avatar/${userInfo.avatar && userInfo.avatar.system ? userInfo.avatar.system : 0 }.png`)"
            alt=""
          >
          <div>
            <div class="font-bold mb-1">
              {{ userInfo.name }}
            </div>
            <div
              class="logout"
              @click="logout"
            >
              {{ $t('views_profile_logout') }}
            </div>
          </div>
        </div>
        <div class="balance-content">
          <div>
            <div class="mb-2">
              <span class="mr-8">{{ $t('views_profile_balance') }}</span>
              <span>{{ showBalance ? userInfo.balance : '*****' }}</span>
            </div>
            <div>
              <span class="mr-3">{{ $t('views_profile_lockWallet') }}</span>
              <span>{{ showBalance ? userInfo.usersLockBalance || 0 : '*****' }}</span>
            </div>
          </div>
          <img
            class="h-4 w-4 ml-auto"
            :src="require(`@/assets/img/profile/eye-${showBalance ? 'open' : 'close'}-white.svg`)"
            alt=""
            @click="toggle"
          >
        </div>
        <div class="menu-list">
          <div
            v-for="(item, index) in menu"
            :key="index"
            class="menu-item is-btn"
            @click="goPage(item.url)"
          >
            <img
              class="h-4 w-4 mr-4"
              :src="$requireSafe(`sidebar/${item.img}.svg`)"
              alt=""
            >
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </d-popup>
  </div>
</template>

<script>
import {
  computed, reactive, toRefs, onUnmounted, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import MemberApi from '@/assets/js/api/memberApi';

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();
    const router = useRouter();

    const state = reactive({
      showBalance: true,
      menu: [
        { name: t('views_profile_goDeposit'), img: 'side-deposit', url: '/profile/deposit' },
        { name: t('views_profile_goWithdraw'), img: 'side-withdraw', url: '/profile/withdraw' },
        { name: t('views_profile_transactionRecord'), img: 'side-record', url: '/profile/transaction' },
        { name: t('views_profile_walletManagement'), img: 'side-wallet', url: '/profile/wallet' },
        { name: t('views_profile_personalityProfile'), img: 'side-user', url: '/profile/userinfo' },
        { name: t('views_profile_myReport'), img: 'side-report', url: '/profile/report' },
        { name: t('views_profile_myVip'), img: 'side-vip', url: '/profile/vip' },
        { name: t('views_profile_memberTransfer'), img: 'side-transfer', url: '/profile/transfer' },
        { name: t('views_profile_verify'), img: 'side-verify', url: '' },
        { name: t('views_profile_share'), img: 'side-share', url: '/profile/share' },
        { name: t('views_profile_promotion'), img: 'side-promotion', url: '/profile/promotion' },
      ],
    });

    const userInfo = computed(() => store.state.user);
    const serviceUrl = computed(() => store.state.info.serviceUrl);

    const show = computed({
      get: () => {
        if (props.value) {
          document.getElementById('app').classList.add('side-show-right');
        } else {
          document.getElementById('app').classList.remove('side-show-right');
        }
        return props.value;
      },
      set: (val) => emit('update:value', val),
    });

    const goPage = (url) => {
      if (url === 'service') {
        window.location = serviceUrl.value;
        return;
      }

      if (!url) {
        window.$vue.$message.info(t('common_comingSoon'));
        return;
      }
      router.push(url);
    };

    const toggle = () => {
      state.showBalance = !state.showBalance;
    };

    const logout = async () => {
      const { code } = await MemberApi.logout();
      if (code === 200) {
        window.$vue.$message.success(t('views_profile_logoutSuccess'));
        store.commit('CLEAR');
        show.value = false;
        router.replace('/');
      }
    };

    onBeforeMount(() => {
      if (serviceUrl.value && !state.menu.some((item) => item.url === 'service')) {
        state.menu.push({ name: t('views_profile_service'), img: 'side-service', url: 'service' });
      }
    });

    onUnmounted(() => {
      document.getElementById('app').classList.remove('side-show-right');
    });
    return {
      show,
      ...toRefs(state),
      userInfo,
      toggle,
      goPage,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  ::v-deep(.d-popup) {
    width: 260px;
    height: 100%;
    transform: translateX(260px);

    .d-popup-content {
      padding: 0;
      background: var(--layout-bg);
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    margin: 68px 0 20px;
    font-size: 14px;

    .avatar {
      width: 55px;
      height: 55px;
      margin-right: 10px;
      border: 2px solid #f3ac0a;
      border-radius: 50%;
    }

    .logout {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 64px;
      height: 26px;
      border: 1px solid #6c82ac;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
    }
  }

  .balance-content {
    display: flex;
    align-items: center;
    margin-bottom: 70px;
    font-size: 12px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
    cursor: pointer;

    &:first-child {
      padding-top: 20px;
      border-top: 1px solid #1d3158;
    }

    &:nth-child(4n):not(:last-child) {
      margin-bottom: 10px;
      padding-bottom: 20px;
      border-bottom: 1px solid #1d3158;
    }
  }
}
</style>
