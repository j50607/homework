<template>
  <div
    ref="profile"
    class="profile"
  >
    <!-- Header -->
    <div
      class="profile-header"
      :class="{'profile-header-color' : changeColor}"
    >
      <div />
      <div class="profile-header-title">
        {{ $t('views_profile_title') }}
      </div>
      <div
        v-if="displayLanguageSwitch"
        class="locale is-btn"
        @click="toggleLanguageModal(true)"
      >
        <d-locale-image :locale-image-mapping="state.langMap" />
      </div>
      <div v-else />
    </div>
    <!-- 個人資料區 -->
    <div class="profile-content">
      <!-- 大頭貼及名稱 -->
      <div class="user">
        <avatar
          :avatar-info="avatar"
          :vip-level="vipLevel"
        />
        <div class="user-name">
          {{ account }}
        </div>
      </div>
      <!-- 餘額及錢包 -->
      <div class="balance">
        <div class="balance-info">
          <div class="balance-info-desc">
            <div class="balance-info-desc-title">
              {{ $t('views_profile_balance') }}
            </div>
            <div class="balance-info-desc-number">
              {{ showBalance ? balance : '*****' }}
            </div>
          </div>
          <div class="balance-info-desc">
            <div class="balance-info-desc-title">
              {{ $t('views_profile_lockWallet') }}
            </div>
            <div class="balance-info-desc-number">
              {{ showBalance ? usersLockBalance : '*****' }}
            </div>
          </div>
        </div>
        <!-- 開關眼睛 -->
        <div
          class="eye is-btn"
          @click="toggleEye"
        >
          <img
            v-if="showBalance"
            class="eye-img"
            :src="$requireSafe('profile/eye-open.svg')"
          >
          <img
            v-else
            class="eye-img"
            :src="$requireSafe('profile/eye-close.svg')"
          >
        </div>
      </div>

      <!-- 充提及錢包 -->
      <div class="btn-area">
        <div
          class="btn is-btn"
          v-for="(item, index) in btnList"
          :key="index"
          @click="goPage(item.redirect)"
        >
          <img
            class="btn-icon"
            :src="$requireSafe(`profile/${item.img}.svg`)"
          >
          <div class="btn-title">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- VIP -->
    <div
      class="vip-area is-btn redirect"
      @click="goPage('/profile/vip')"
    >
      <div class="vip-level">
        {{ $t('views_profile_vip_current_level') }}:{{ `VIP${nowVipLevelRule.level}` }}
        <img
          class="arrow-brown"
          :src="$requireSafe('profile/arrow-brown.svg')"
        >
      </div>
      <div class="line" />
      <div class="vip-area-info">
        <div class="bet-limit">
          <p>{{ $t('views_profile_vip_betLimit') }}</p>
          <p>{{ nowVipLevelRule.singleGameBetLimit }} / {{ nowVipLevelRule.singleDayBetLimit }}</p>
        </div>

        <div class="return-profit">
          <p>{{ $t('components_pages_components_vip_bet_return_profit') }}</p>
          <p>{{ nowVipLevelRule.rebateRate }}%</p>
        </div>
        <div class="envelop">
          <p>{{ $t('components_pages_components_vip_bet_evenlop') }}</p>
          <p>{{ formatRemedyRate(nowVipLevelRule.remedyRate) }}%</p>
        </div>
      </div>
    </div>
    <!-- 轉導頁面列表 -->
    <div class="redirect mb-3">
      <div
        class="redirect-item is-btn"
        v-for="(item, index) in redirectListTop"
        :key="index"
        @click="goPage(item.redirect)"
      >
        <img
          class="redirect-item-icon"
          :src="$requireSafe(`profile/${item.img}.svg`)"
        >
        <div class="redirect-item-title">
          {{ item.label }}
        </div>
        <img
          class="arrow-grey"
          :src="$requireSafe('profile/arrow-grey.svg')"
        >
      </div>
    </div>
    <div class="redirect mb-6">
      <div
        class="redirect-item is-btn"
        v-for="(item, index) in checkServiceList(redirectListBottom)"
        :key="index"
        @click="goPage(item.redirect)"
      >
        <img
          class="redirect-item-icon"
          :src="$requireSafe(`profile/${item.img}.svg`)"
        >
        <div class="redirect-item-title">
          {{ item.label }}
        </div>
        <img
          class="arrow-grey"
          :src="$requireSafe('profile/arrow-grey.svg')"
        >
      </div>
    </div>
    <!-- 更換語言彈窗 -->
    <d-language-modal
      v-model:isShow="state.isLanguageModalShow"
      @cancel="toggleLanguageModal"
    />
    <d-footer-row />
  </div>
</template>

<script>
import {
  onBeforeMount, onBeforeUnmount, ref, reactive, computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import NP from 'number-precision';
import DLocaleImage from '@/components/DLocaleImage';
import DLanguageModal from '@/components/DLanguageModal';
import Avatar from '@/components/Avatar';
import MemberApi from '@/assets/js/api/memberApi';
import SportApi from '@/assets/js/api/sportApi';

export default {
  components: {
    DLocaleImage,
    DLanguageModal,
    Avatar,
  },
  setup() {
    // use
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();

    // ref
    const showBalance = ref(false);
    const changeColor = ref(false);
    const profile = ref(null);

    // reactive
    const state = reactive({
      isLanguageModalShow: false,
      langMap: {
        zh_cn: 'locale/zh_cn.svg',
        zh_tw: 'locale/zh_tw.svg',
        th_th: 'locale/th_th.svg',
        vi_vn: 'locale/vi_vn.svg',
        ja_jp: 'locale/ja_jp.svg',
        en_us: 'locale/en_us.svg',
      },
    });

    // computed
    const btnList = computed(() => [
      { label: t('views_profile_goDeposit'), img: 'deposit', redirect: '/profile/deposit' },
      { label: t('views_profile_goWithdraw'), img: 'withdraw', redirect: '/profile/withdraw' },
      { label: t('views_profile_transactionRecord'), img: 'transaction', redirect: '/profile/transaction' },
      { label: t('views_profile_walletManagement'), img: 'wallet', redirect: '/profile/wallet' },
    ]);

    const redirectListTop = computed(() => [
      { label: t('views_profile_personalityProfile'), img: 'profile', redirect: '/profile/userinfo' },
      { label: t('views_profile_myReport'), img: 'report', redirect: '/profile/report' },
      { label: t('views_profile_myVip'), img: 'vip', redirect: '/profile/vip' },
      { label: t('views_profile_memberTransfer'), img: 'transfer', redirect: '/profile/transfer' },
    ]);

    const redirectListBottom = computed(() => [
      { label: t('views_profile_share'), img: 'share', redirect: '/profile/share' },
      { label: t('views_profile_promotion'), img: 'promotion', redirect: '/profile/promotion' },
      { label: t('views_profile_verify'), img: 'verify', redirect: '/profile/verify' },
      { label: t('views_profile_service'), img: 'service', redirect: 'service' },
      { label: t('views_profile_logout'), img: 'logout', redirect: 'logout' },
    ]);

    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const account = computed(() => store.state.user.account);
    const transToSub = computed(() => store.state.user.transToSub);
    const avatar = computed(() => store.state.user.avatar);
    const vipLevel = computed(() => store.state.user.vipLevel);
    const balance = computed(() => store.state.user.balance);
    const usersLockBalance = computed(() => store.state.user.usersLockBalance);
    const displayLanguageSwitch = computed(() => store.state.info.switchSetting.displayLanguageSwitch);
    const nowVipLevelRule = computed(() => store.state.user.nowVipLevelRule);

    // methods
    const toggleLanguageModal = (val) => {
      state.isLanguageModalShow = val;
    };

    const getUserPartialInfo = async () => {
      const params = {
        requestInfo: [
          'account',
          'avatar',
          'vipLevel',
          'balance',
          'usersLockBalance',
          'transToSub',
        ],
      };
      const { code, data } = await MemberApi.getUserPartialInfo(params);

      if (code === 200) {
        store.commit('SET_USER_INFO', {
          account: data.account,
          avatar: data.avatar,
          vipLevel: data.vipLevel,
          balance: data.balance,
          usersLockBalance: data.usersLockBalance,
          transToSub: data.transToSub,
        });
      }
    };

    const getVipLevelInfo = async () => {
      const { code, data } = await SportApi.getVipLevelInfo();
      if (code === 200) {
        store.commit('SET_VIP_USER_INFO', {
          levelStatus: data.levelStatus,
          nextVipLevelRule: data.nextVipLevelRule,
          nowVipLevelRule: data.nowVipLevelRule,
          remedyAmount: data.remedyAmount,
        });
      }
    };

    const toggleEye = () => {
      showBalance.value = !showBalance.value;
    };

    const logout = async () => {
      const { code } = await MemberApi.logout();
      if (code === 200) {
        window.$vue.$message.success(t('views_profile_logoutSuccess'));
        store.commit('CLEAR');
        router.replace('/');
      }
    };

    const goPage = (page) => {
      switch (page) {
        case '/profile/report':
        case '/profile/verify':
          window.$vue.$message.info(t('common_comingSoon'));
          break;
        case 'service':
          window.location = serviceUrl.value;
          break;
        case '/profile/transfer':
          if (!transToSub.value) {
            window.$vue.$message.info(t('views_profile_transfer_transfer_disable'));
          } else {
            router.push(page);
          }
          break;
        case 'logout':
          logout();
          break;

        default:
          router.push(page);
          break;
      }
    };

    const changeHeaderColor = () => {
      if (window?.scrollY > 40) {
        changeColor.value = true;
      } else {
        changeColor.value = false;
      }
    };

    const checkServiceList = (list) => {
      let result = [];

      const serviceIndex = list.findIndex((e) => e.redirect === 'service');

      if (!serviceUrl.value && serviceIndex > 0) {
        result = list.splice(serviceIndex, 1);
      } else {
        result = list;
      }

      return result;
    };
    const formatRemedyRate = (remedyRate) => NP.times(remedyRate || 0, 100);

    // hooks
    onBeforeMount(async () => {
      getUserPartialInfo();
      getVipLevelInfo();
      window.addEventListener('scroll', changeHeaderColor);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', changeHeaderColor);
    });

    return {
      showBalance,
      changeColor,
      profile,
      state,
      toggleLanguageModal,
      btnList,
      redirectListTop,
      redirectListBottom,
      toggleEye,
      goPage,
      account,
      avatar,
      vipLevel,
      balance,
      usersLockBalance,
      displayLanguageSwitch,
      transToSub,
      checkServiceList,
      nowVipLevelRule,
      formatRemedyRate,
    };
  },
};
</script>

<style lang="postcss" scoped>
.profile {
  background-image: url('~@/assets/img/profile/bg.png');

  @apply bg-layout bg-top bg-no-repeat bg-contain pt-h-h pb-f-h;

  &-header {
    top: 0;
    left: 0;
    z-index: 1;

    @apply h-h-h p-3 flex items-center justify-between mb-7 fixed w-full;

    &.profile-header-color {
      color: #fff;
      background: var(--header-primary-bg);
      transition: 0.2s;
    }
  }

  &-title {
    @apply font-bold;
  }

  .locale {
    @apply w-4 h-4;
  }

  &-content {
    @apply px-3;

    .user {
      @apply flex items-end mb-3;

      &-name {
        font-size: 14px;
      }
    }

    .balance {
      border-radius: 5px;
      font-size: 12px;
      background-color: #fff;
      box-shadow: 0 2px 4px #4d57721a;

      @apply px-3 py-2 mb-2 flex justify-between;

      &-info {
        &-desc {
          @apply flex;

          &:not(:last-child) {
            @apply mb-1;
          }

          &-title {
            color: #4d5772;

            @apply w-10 mr-3;
          }

          &-number {
            color: #7a5605;

            @apply text-left;
          }
        }
      }

      .eye {
        @apply flex items-center;

        &-img {
          width: 16px;
          height: 16px;
        }
      }
    }

    .btn-area {
      @apply flex;

      .btn {
        flex: 0 0 25%;

        @apply flex flex-col justify-center items-center;

        &-icon {
          @apply w-6 h-6 mb-1;
        }

        &-title {
          color: #4d5772;
          font-size: 12px;
        }
      }
    }
  }

  .vip-area {
    border-radius: 5px;
    color: #4d5772;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0 2px 4px #4d57721a;

    @apply py-2 px-3 mb-3 mt-4;

    .vip-level {
      @apply font-bold flex justify-between items-center;
    }

    .arrow-brown {
      @apply w-2 h-2;
    }

    &-info {
      div {
        @apply flex mb-2;

        p {
          &:last-child {
            @apply ml-auto text-secondary font-bold;
          }
        }

        &:last-child {
          @apply mb-0;
        }
      }
    }
  }

  .line {
    height: 2px;
    background-color: #f2f2f2;

    @apply w-full mt-2 mb-2;
  }

  .redirect {
    border-radius: 5px;
    background: #fff 0% 0% no-repeat padding-box;
    box-shadow: 0 2px 4px #4d57721a;

    @apply mx-3;

    &-item {
      @apply flex items-center px-3 py-2;

      &:not(:last-child) {
        border-bottom: 1px solid #f2f2f2;
      }

      &-icon {
        width: 16px;
        height: 16px;

        @apply flex items-center mr-2;
      }

      &-title {
        color: #4d5772;
        font-size: 12px;

        @apply flex items-center;
      }

      .arrow-grey {
        @apply w-2 h-2 ml-auto mr-0;
      }
    }
  }
}
</style>
