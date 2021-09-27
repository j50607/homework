<template>
  <div class="userinfo">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :middle-components="'Title'"
      :title="$t('views_profile_userinfo_title')"
    />
    <!-- 大頭貼 -->
    <div class="user">
      <avatar
        :avatar-info="avatar"
        :vip-level="vipLevel"
        :show-vip="false"
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
          :src="$requireSafe('icon/style2/eye.svg')"
        >
        <img
          v-else
          class="eye-img"
          :src="$requireSafe('icon/style2/eye-invisible.svg')"
        >
      </div>
    </div>
    <!-- 個人資料區 -->
    <div class="card mb-3">
      <template
        v-for="(item, index) in userList"
        :key="`contact${index}`"
      >
        <div
          class="card-row is-btn"
          @click="goPage(item)"
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
            :src="$requireSafe('icon/style2/arrow.svg')"
          >
        </div>
      </template>
      <div class="card-row">
        <div class="card-row-warning">
          {{ $t('views_profile_userinfo_warning') }}
        </div>
      </div>
    </div>
    <!-- 社交軟體及郵箱 -->
    <div class="card mb-3">
      <template
        v-for="(item, index) in contactList"
        :key="`contact${index}`"
      >
        <div
          v-if="showInfo(item.value)"
          class="card-row is-btn"
          @click="goPage(item)"
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
            :src="$requireSafe('icon/style2/arrow.svg')"
          >
        </div>
      </template>
    </div>
    <!-- 設置 -->
    <div class="setting">
      {{ $t('views_profile_userinfo_setting') }}
    </div>
    <div class="card mb-6">
      <div
        class="card-row is-btn"
        v-for="(item, index) in modifyList"
        :key="`modify${index}`"
        @click="goPage(item)"
      >
        <div class="card-row-title">
          {{ item.label }}
        </div>
        <div class="card-row-value" />
        <img
          class="arrow-grey"
          :src="$requireSafe('icon/style2/arrow.svg')"
        >
      </div>
    </div>
  </div>
  <d-popup
    v-model:value="showGenderPopup"
    position="bottom"
    :round="true"
    :title="$t('views_profile_userinfo_gender')"
    class="gender-popup"
  >
    <div
      class="checkbox is-btn"

      @click="changeGender(1)"
    >
      {{ $t('views_profile_userinfo_man') }}
      <div
        class="circle"
        :class="{'seleted-checkbox' : selectGender === 1}"
      />
    </div>
    <div
      class="checkbox is-btn"

      @click="changeGender(0)"
    >
      {{ $t('views_profile_userinfo_woman') }}
      <div
        class="circle"
        :class="{'seleted-checkbox' : selectGender === 0}"
      />
    </div>
    <!-- 確認按鈕 -->
    <d-button
      type="primary"
      block
      class="my-2 is-btn"
      :loading="genderLoading"
      :disabled="genderLoading"
      @click="checkGender"
    >
      {{ $t('common_confirm') }}
    </d-button>
  </d-popup>
  <d-dialog
    v-model:visible="showBindDialog"
    :footer="null"
    :title="$t('views_profile_noWallet')"
    :width="'90%'"
    v-if="showBindDialog"
  >
    <template #body>
      <div class="text-center text-xs text-normal">
        {{ $t('views_profile_userinfo_noWallet') }}
      </div>
    </template>
    <template #footer>
      <div class="flex justify-center mt-3">
        <d-button
          type="primary"
          @click="router.push('/profile/wallet')"
        >
          {{ $t('views_profile_goBind') }}
        </d-button>
      </div>
    </template>
  </d-dialog>
  <date-picker-popup
    v-model:visible="showBirthPopup"
    :use-select="false"
    :min-date="1901"
    :max-date="2021"
    not-show-today
    @confirm="datePickerConfirm"
  />
</template>

<script>
import {
  onBeforeMount, ref, reactive, computed, watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as moment from 'moment';
import Avatar from '@/components/Avatar';
import MemberApi from '@/assets/js/api/memberApi';
import SystemApi from '@/assets/js/api/systemApi';
import DDialog from '@/components/DDialog';
import DatePickerPopup from '@/components/_pages/DatePickerPopup';

export default {
  components: {
    Avatar,
    DDialog,
    DatePickerPopup,
  },
  setup() {
    // use
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();

    // ref
    const showBalance = ref(false);
    const showGenderPopup = ref(false);
    const genderLoading = ref(false);
    const selectGender = ref(1);
    const showBindDialog = ref(false);
    const showBirthPopup = ref(false);

    // reactive
    const state = reactive({
    });

    // computed
    const userList = computed(() => [
      { label: t('views_profile_userinfo_nickName'), redirect: '/profile/userinfo/setNickName', value: 'nickName' },
      { label: t('views_profile_userinfo_realName'), redirect: '/profile/userinfo/setRealName', value: 'name' },
      { label: t('views_profile_userinfo_gender'), redirect: '/', value: 'gender' },
      { label: t('views_profile_userinfo_birthday'), redirect: '/', value: 'birthday' },
      { label: t('views_profile_userinfo_phone'), redirect: '/profile/userinfo/setPhone', value: 'phone' },
      { label: t('views_profile_userinfo_walletManagement'), redirect: '/profile/wallet', value: 'wallet' },
    ]);

    const contactList = computed(() => [
      { label: t('views_profile_userinfo_qq'), redirect: '/profile/userinfo/setContact', value: 'qqAccount' },
      { label: t('views_profile_userinfo_wechat'), redirect: '/profile/userinfo/setContact', value: 'wechat' },
      { label: t('views_profile_userinfo_mailbox'), redirect: '/profile/userinfo/setContact', value: 'email' },
      { label: t('views_profile_userinfo_line'), redirect: '/profile/userinfo/setContact', value: 'line' },
      { label: t('views_profile_userinfo_zalo'), redirect: '/profile/userinfo/setContact', value: 'zalo' },
    ]);

    const modifyList = computed(() => [
      { label: t('views_profile_userinfo_modifyLoginPassword'), redirect: '/profile/userinfo/modifyLoginPassword', value: 'modifyLoginPassword' },
      { label: t('views_profile_userinfo_modifyWithdrawPassword'), redirect: '/profile/userinfo/modifyWithdrawPassword', value: 'modifyWithdrawPassword' },
    ]);

    const account = computed(() => store.state.user.account);
    const avatar = computed(() => store.state.user.avatar);
    const vipLevel = computed(() => store.state.user.vipLevel);
    const balance = computed(() => store.state.user.balance);
    const usersLockBalance = computed(() => store.state.user.usersLockBalance);
    const user = computed(() => store.state.user);
    const registerSetting = computed(() => store.state.info.registerSetting);
    const withdrawalCode = computed(() => store.state.user.withdrawalCode);

    // watch
    watch(showGenderPopup, () => {
      selectGender.value = user?.value?.gender;
    });

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
          'zalo',
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
          zalo: data.zalo,
          qqAccount: data.qqAccount,
          wechat: data.wechat,
        });
      }
    };

    const checkBankCard = () => {
      if (!withdrawalCode.value) {
        showBindDialog.value = true;
      } else {
        router.push('/profile/userinfo/modifyWithdrawPassword');
      }
    };

    const toggleEye = () => {
      showBalance.value = !showBalance.value;
    };

    const goPage = (item) => {
      switch (item.value) {
        case 'name':
          if (!user.value.name) {
            router.push(item.redirect);
          } else {
            window.$vue.$message.info(t('common_modifyContactService'));
          }
          break;
        case 'gender':
          if (user.value.gender === 2) {
            showGenderPopup.value = true;
          } else {
            window.$vue.$message.info(t('common_modifyContactService'));
          }
          break;
        case 'phone':
          if (user.value.phone) {
            window.$vue.$message.info(t('common_modifyContactService'));
          } else {
            router.push(item.redirect);
          }
          break;
        case 'birthday':
          if (!user.value.birthday) {
            showBirthPopup.value = true;
          } else {
            window.$vue.$message.info(t('common_modifyContactService'));
          }
          break;
        case 'qqAccount':
        case 'wechat':
        case 'email':
        case 'line':
        case 'zalo':
          router.push({ path: item.redirect, query: { type: item.value } });
          break;
        case 'modifyWithdrawPassword':
          checkBankCard();
          break;
        default:
          router.push(item.redirect);
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

    const changeGender = (val) => {
      selectGender.value = val;
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

    const checkGender = async () => {
      genderLoading.value = true;
      const params = {
        gender: selectGender.value,
      };
      const res = await MemberApi.updateMember(account.value, params);
      genderLoading.value = false;
      if (res.code === 200) {
        store.commit('SET_GENDER', res.data.gender);
        window.$vue.$message.success(t('common_modifySuccess'));
      } else {
        window.$vue.$message.error(res.message);
      }
      showGenderPopup.value = false;
    };

    const datePickerConfirm = async ({ startDate }) => {
      const params = {
        birthday: moment(startDate).format('YYYY/MM/DD'),
      };
      const res = await MemberApi.updateMember(account.value, params);
      if (res.code === 200) {
        store.commit('SET_BIRTH', res.data.birthday);
        window.$vue.$message.success(t('common_modifySuccess'));
      } else {
        window.$vue.$message.error(res.message);
      }
    };

    const showInfo = (val) => {
      switch (val) {
        case 'qqAccount':
          return registerSetting.value.showQQ;
        case 'wechat':
          return registerSetting.value.showWechat;
        case 'email':
          return registerSetting.value.showEmail;
        case 'line':
          return registerSetting.value.showLine;
        case 'zalo':
          return registerSetting.value.showZalo;
        default:
          return true;
      }
    };

    const getSystemConfig = async () => {
      const { code, data } = await SystemApi.getSystemConfig();
      if (code === 200 && data) {
        store.commit('SET_SYSTEM_CONFIG', data);
      }
    };

    // hooks
    onBeforeMount(async () => {
      getUserPartialInfo();
      getSystemConfig();
    });

    return {
      showBalance,
      showGenderPopup,
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
      changeGender,
      selectGender,
      genderLoading,
      checkGender,
      showInfo,
      checkBankCard,
      showBindDialog,
      router,
      showBirthPopup,
      datePickerConfirm,
      moment,
    };
  },
};
</script>

<style lang="postcss" scoped>
.userinfo {
  @apply bg-layout bg-no-repeat bg-contain pt-h-h px-3 overflow-auto;

  .user {
    color: #fff;
    font-size: 14px;

    @apply mt-4 mb-2 flex flex-col justify-center items-center;

    ::v-deep(.avatar) {
      @apply mr-0;
    }

    &-name {
      @apply mt-2;
    }
  }

  .balance {
    margin-top: -65px;
    padding-top: 80px;
    border-radius: 5px;
    font-size: 12px;
    background-color: #21304e;
    box-shadow: 0 2px 4px #4d57721a;

    @apply px-3 pb-2 mb-3 flex justify-between;

    &-info {
      &-desc {
        @apply flex;

        &:not(:last-child) {
          @apply mb-1;
        }

        &-title {
          color: #fff;

          @apply w-10 mr-3;
        }

        &-number {
          color: #fff;

          @apply text-left;
        }
      }
    }

    .eye {
      @apply flex items-center;

      &-img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .card {
    border-radius: 5px;
    background-color: #21304e;
    box-shadow: 0 2px 4px #4d57721a;

    &-row {
      color: #fff;
      font-size: 12px;

      @apply px-3 py-2 flex items-center;

      &:not(:last-child) {
        border-bottom: 1px solid #374e7b;
      }

      &-title {
        .nick-name-warning {
          color: #6c82ac;

          @apply mt-1;
        }
      }

      &-value {
        @apply ml-auto mr-0;

        .not-setting {
          color: #6c82ac;
        }
      }

      .arrow-grey {
        @apply w-2 h-2 ml-2 mr-0;
      }

      &-warning {
        color: #ff5a5a;

        @apply flex w-full justify-center items-center;
      }
    }
  }

  .setting {
    font-size: 14px;

    @apply mb-2;
  }
}

.gender-popup {
  .checkbox {
    font-size: 14px;

    @apply flex items-center justify-between pl-3 mb-2;

    .circle {
      width: 16px;
      height: 16px;
      border: 1px solid #f2f2f2;
      border-radius: 50%;

      &.seleted-checkbox {
        background: radial-gradient(#fff 0%, #fff 20%, #fff 30%, #0e88f5 30%, #0e88f5 100%);
      }
    }
  }
}
</style>
