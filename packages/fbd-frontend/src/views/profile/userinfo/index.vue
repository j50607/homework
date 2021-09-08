<template>
  <div class="userinfo">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :middle-components="'Title'"
      :title="$t('views_profile_userinfo_title')"
      :bg-color="'linear-gradient(180deg, #F3AC0A 0%, #B58007 100%)'"
    />
    <!-- 大頭貼 -->
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
    <!-- 個人資料區 -->
    <div class="card">
      <div
        class="card-row is-btn"
        v-for="(item, index) in userList"
        :key="`user${index}`"
      >
        <div class="card-row-title">
          <div>
            {{ item.label }}
          </div>
          <div
            v-if="item.value === 'nickName'"
            class="nick-name-warning"
          >
            {{ $t('views_profile_userinfo_nickNameHint') }}
          </div>
        </div>
        <div class="card-row-value">
          <div v-if="getUserValue(item.value)">
            {{ getUserValue(item.value) !== 'wallet' ? getUserValue(item.value) : '' }}
          </div>
          <div
            v-else
            class="not-setting"
          >
            {{ $t('views_profile_userinfo_notSetting') }}
          </div>
        </div>
        <img
          class="arrow-grey"
          :src="$requireSafe('profile/arrow-grey.svg')"
        >
      </div>
      <div class="card-row">
        <div class="card-row-warning">
          {{ $t('views_profile_userinfo_warning') }}
        </div>
      </div>
    </div>
    <!-- 社交軟體及郵箱 -->
    <div class="card">
      <div
        class="card-row is-btn"
        v-for="(item, index) in contactList"
        :key="`contact${index}`"
      >
        <div class="card-row-title">
          {{ item.label }}
        </div>
        <div class="card-row-value">
          <div v-if="getUserValue(item.value)">
            {{ getUserValue(item.value) !== 'wallet' ? getUserValue(item.value) : '' }}
          </div>
          <div
            v-else
            class="not-setting"
          >
            {{ $t('views_profile_userinfo_notSetting') }}
          </div>
        </div>
        <img
          class="arrow-grey"
          :src="$requireSafe('profile/arrow-grey.svg')"
        >
      </div>
    </div>
    <!-- 設置 -->
    <div class="setting">
      {{ $t('views_profile_userinfo_setting') }}
    </div>
    <div class="card">
      <div
        class="card-row is-btn"
        v-for="(item, index) in modifyList"
        :key="`modify${index}`"
      >
        <div class="card-row-title">
          {{ item.label }}
        </div>
        <div class="card-row-value" />
        <img
          class="arrow-grey"
          :src="$requireSafe('profile/arrow-grey.svg')"
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  onBeforeMount, ref, reactive, computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Avatar from '@/components/Avatar';
import MemberApi from '@/assets/js/api/memberApi';

export default {
  components: {
    Avatar,
  },
  setup() {
    // use
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();

    // ref
    const showBalance = ref(false);

    // reactive
    const state = reactive({
    });

    // computed
    const userList = computed(() => [
      { label: t('views_profile_userinfo_nickName'), redirect: '/deposit', value: 'nickName' },
      { label: t('views_profile_userinfo_realName'), redirect: '/deposit', value: 'name' },
      { label: t('views_profile_userinfo_gender'), redirect: '/deposit', value: 'gender' },
      { label: t('views_profile_userinfo_birthday'), redirect: '/deposit', value: 'birthday' },
      { label: t('views_profile_userinfo_phone'), redirect: '/deposit', value: 'phone' },
      { label: t('views_profile_userinfo_walletManagement'), redirect: '/wallet', value: 'wallet' },
    ]);

    const contactList = computed(() => [
      { label: t('views_profile_userinfo_qq'), redirect: '/deposit', value: 'qqAccount' },
      { label: t('views_profile_userinfo_wechat'), redirect: '/deposit', value: 'wechat' },
      { label: t('views_profile_userinfo_mailbox'), redirect: '/deposit', value: 'email' },
      { label: t('views_profile_userinfo_line'), redirect: '/deposit', value: 'line' },
    ]);

    const modifyList = computed(() => [
      { label: t('views_profile_userinfo_modifyLoginPassword'), redirect: '/deposit' },
      { label: t('views_profile_userinfo_modifyWithdrawPassword'), redirect: '/deposit' },
    ]);

    const account = computed(() => store.state.user.account);
    const avatar = computed(() => store.state.user.avatar);
    const vipLevel = computed(() => store.state.user.vipLevel);
    const balance = computed(() => store.state.user.balance);
    const usersLockBalance = computed(() => store.state.user.usersLockBalance);
    const user = computed(() => store.state.user);

    // methods
    const getUserPartialInfo = async () => {
      const params = {
        requestInfo: [
          'account',
          'avatar',
          'vipLevel',
          'balance',
          'usersLockBalance',
          'nickName',
          'name',
          'gender',
          'birthday',
          'phone',
          'email',
          'line',
          'qqAccount',
          'wechat',
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
          nickName: data.nickName,
          name: data.name,
          gender: data.gender,
          birthday: data.birthday,
          phone: data.phone,
          email: data.email,
          line: data.line,
          qqAccount: data.qqAccount,
          wechat: data.wechat,
        });
      }
    };

    const toggleEye = () => {
      showBalance.value = !showBalance.value;
    };

    const goPage = (page) => {
      switch (page) {
        default:
          router.push(page);
          break;
      }
    };

    const getGender = (val) => {
      switch (val) {
        case 0:
          return t('views_profile_userinfo_woman');
        case 1:
          return t('views_profile_userinfo_man');
        default:
          return '';
      }
    };

    const getUserValue = (val) => {
      switch (val) {
        case 'gender':
          return getGender(user?.value?.[val]);
        case 'wallet':
          return val;
        default:
          return user?.value?.[val];
      }
    };

    // hooks
    onBeforeMount(async () => {
      getUserPartialInfo();
    });

    return {
      showBalance,
      state,
      toggleEye,
      goPage,
      account,
      avatar,
      vipLevel,
      balance,
      usersLockBalance,
      user,
      userList,
      contactList,
      modifyList,
      getUserValue,
    };
  },
};
</script>

<style lang="postcss" scoped>
.userinfo {
  background-image: url('~@/assets/img/profile/userinfo/bg.png');
  background-position-y: var(--header-height);

  @apply bg-layout bg-no-repeat bg-contain h-full pt-h-h px-3 pb-4;

  .user {
    color: #4d5772;
    font-size: 14px;

    @apply mt-4 mb-2 flex justify-start items-end;
  }

  .balance {
    border-radius: 5px;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0 2px 4px #4d57721a;

    @apply px-3 py-2 mb-3 flex justify-between;

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

  .card {
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px #4d57721a;

    @apply mb-3;

    &-row {
      color: #4d5772;
      font-size: 12px;

      @apply px-3 py-2 flex items-center;

      &:not(:last-child) {
        border-bottom: 1px solid #f2f2f2;
      }

      &-title {
        .nick-name-warning {
          color: #bdbdbd;

          @apply mt-1;
        }
      }

      &-value {
        @apply ml-auto mr-0;

        .not-setting {
          color: #bdbdbd;
        }
      }

      .arrow-grey {
        @apply w-2 h-2 ml-2 mr-0;
      }

      &-warning {
        color: #f00;

        @apply flex w-full justify-center items-center;
      }
    }
  }

  .setting {
    font-size: 14px;

    @apply mb-2;
  }
}
</style>
