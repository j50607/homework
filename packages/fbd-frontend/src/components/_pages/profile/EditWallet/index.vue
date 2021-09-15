<template>
  <div class="absolute top-0 right-0 bottom-0 left-0 bg-layout z-10">
    <d-header-row
      :title="$t('views_profile_walletManagement')"
      right-components="Service"
    >
      <template #left>
        <img
          class="go-back is-btn"
          :src="require('@/assets/img/header/icon-left-white.svg')"
          alt=""
          @click="close"
        >
      </template>
    </d-header-row>
    <div class="h-full pt-h-h pl-3 pr-3 text-xs">
      <!-- 手機號碼 -->
      <div
        class="mt-4 mb-1"
        v-if="smsVerifySwitch"
      >
        {{ $t('views_profile_userinfo_setPhone_title') }}:
      </div>

      <a-input
        v-model:value="phoneNum"
        v-if="smsVerifySwitch"
        disabled
        style=" color: #666 !important; background: #eee !important;"
      />

      <!-- 手機驗證碼 -->
      <template v-if="smsVerifySwitch">
        <div
          class="mt-4 mb-1"
        >
          {{ $t('views_profile_userinfo_setPhone_verifyPhoneNumber') }}:
        </div>
        <a-input
          class="verify-row"
          v-model:value="verifyCode"
          type="number"
          v-positive-places="6"
          :placeholder="$t('views_profile_userinfo_setPhone_pleaseEnterVerifyPhoneNumber')"
        >
          <template #suffix>
            <a-button
              type="primary"
              class="verify is-btn"
              :disabled="countdowning"
              @click="getVerificationCode"
            >
              <span class="count-down-timer">
                <a-statistic-countdown
                  v-if="countdowning"
                  format="ss"
                  :value="Date.now() + 1000 * smsResendSec"
                  value-style="color: #fff; font-size: 14px; margin-right:5px;"
                  @finish="countdowning = false"
                />
                <span v-if="countdowning">
                  {{ $t('views_profile_userinfo_setPhone_sec') }}
                </span>
                <span v-else>
                  {{ $t('views_profile_userinfo_setPhone_sendVerifyNumber') }}
                </span>
              </span>
            </a-button>
          </template>
        </a-input>
      </template>

      <!-- 钱包地址 -->
      <div class="mt-4 mb-1">
        {{ $t('views_profile_wallet_walletAddress') }}
      </div>
      <a-input
        v-model:value="walletAddress"
        :placeholder="$t('views_profile_wallet_placeholder2')"
      />

      <!-- 主网类型 -->
      <div class="mt-4 mb-1">
        {{ $t('views_profile_chainType') }}
      </div>
      <a-input
        v-model:value="chainType"
        :placeholder="$t('views_profile_wallet_placeholder1')"
      />
      <d-button
        type="primary"
        block
        class="mt-8"
        :disabled="!walletAddress || !chainType || (smsVerifySwitch && (!isClickSms || !verifyCode))"
        @click="submit"
      >
        {{ $t('common_confirm') }}
      </d-button>
    </div>
  </div>
</template>

<script>
import {
  reactive, toRefs, computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import SystemApi from '@/assets/js/api/systemApi';

export default {
  props: {
    address: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    smsVerifySwitch: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['confirm', 'close'],
  setup(props, { emit }) {
    const state = reactive({
      walletAddress: props.address,
      chainType: props.type,
      phoneNum: props.phone,
      verifyCode: '',
      countdowning: false,
      isClickSms: false,
    });

    const { t } = useI18n();
    const store = useStore();

    const smsResendSec = computed(() => store.state.info.timeSetting.smsResendSec);

    const submit = async () => {
      emit('confirm', state.walletAddress, state.chainType, state.verifyCode);
    };

    const getVerificationCode = async () => {
      if (state.countdowning) {
        return;
      }

      const res = await SystemApi.sendSms({ phone: state.phoneNum });
      if (res.code === 200) {
        state.isClickSms = true;
        state.countdowning = true;
        window.$vue.$message.success(t('common_sendSuccess'));
      } else {
        window.$vue.$message.error(res.message);
      }
    };

    const close = () => {
      emit('close');
    };
    return {
      state,
      submit,
      close,
      getVerificationCode,
      smsResendSec,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/components/DButton/mixin.scss';

.ant-input {
  height: 32px;
  border: 1px solid #f2f2f2 !important;
  font-size: 12px;
  background-color: #fff !important;
}

.verify-row {
  height: 32px;
  border: none !important;

  ::v-deep(.ant-input) {
    padding-right: 75px;
    border: none !important;
    font-size: 12px;
    background: #fff !important;

    &:focus {
      border: none !important;
    }
  }

  &.ant-input-affix-wrapper-focused {
    box-shadow: none !important;
  }

  .verify {
    right: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 0 15px;
    border: none;
    border-radius: 3px;
    color: $btn-primary-color;
    font-size: 14px;
    background: var(--btn-primary-bg);
    transition: all 0.3s ease;
    outline: 0;
    cursor: pointer;

    &:disabled {
      border: none;
      background: #999 !important;
    }

    > .anticon + span {
      margin-left: 8px;
    }

    &.loading {
      cursor: auto;
    }

    &.border-none {
      border: none;
    }

    @apply absolute h-full px-2 flex items-center justify-center;
  }
}

.count-down-timer {
  @apply flex items-center;
}

.go-back {
  width: 18px;
  height: 18px;
}
</style>
