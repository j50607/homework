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
        {{ $t('views_profile_userinfo_setPhone_title') }}
      </div>

      <a-input
        v-model:value="state.phoneNum"
        v-if="smsVerifySwitch"
        disabled
        style=" color: #666 !important; background: #eee !important;"
      />

      <!-- 手機驗證碼 -->
      <template v-if="smsVerifySwitch">
        <div
          class="mt-4 mb-1"
        >
          {{ $t('views_profile_userinfo_setPhone_verifyPhoneNumber') }}
        </div>
        <a-input
          class="verify-row"
          v-model:value="state.verifyCode"
          type="number"
          v-positive-places="6"
          :placeholder="$t('views_profile_userinfo_setPhone_pleaseEnterVerifyPhoneNumber')"
        >
          <template #suffix>
            <a-button
              type="primary"
              class="verify is-btn"
              :disabled="state.countdowning"
              @click="getVerificationCode"
            >
              <span class="count-down-timer">
                <a-statistic-countdown
                  v-if="state.countdowning"
                  format="ss"
                  :value="Date.now() + 1000 * smsResendSec"
                  value-style="color: #fff; font-size: 14px; margin-right:5px;"
                  @finish="state.countdowning = false"
                />
                <span v-if="state.countdowning">
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

      <a-form
        ref="formRef"
        class="input-box"
        :model="state.formState"
        :rules="rules"
      >
        <!-- 主网类型 -->
        <a-form-item
          class="main-input"
          name="chainType"
          :label="$t('views_profile_chainType')"
        >
          <a-input
            v-model:value="state.formState.chainType"
            :placeholder="$t('views_profile_wallet_placeholder1')"
          />
        </a-form-item>
        <!-- 钱包地址 -->
        <a-form-item
          class="main-input"
          name="walletAddress"
          :label="$t('views_profile_wallet_walletAddress')"
        >
          <a-input
            v-model:value="state.formState.walletAddress"
            maxlength="100"
            :placeholder="$t('views_profile_wallet_placeholder2')"
          />
        </a-form-item>
        <d-button
          type="primary"
          block
          class="mt-8"
          :disabled="!state.formState.walletAddress || !state.formState.chainType || (smsVerifySwitch && (!state.isClickSms || !verifyCode))"
          @click="submit"
        >
          {{ $t('common_confirm') }}
        </d-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  ref, reactive, computed, onMounted,
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
    const { t } = useI18n();
    const store = useStore();
    // ref
    const formRef = ref();

    const smsResendSec = computed(() => store.state.info.timeSetting.smsResendSec);

    const state = reactive({
      phoneNum: props.phone,
      verifyCode: '',
      countdowning: false,
      isClickSms: false,
      formState: {
        walletAddress: props.address,
        chainType: props.type,
      },
    });

    const walletValidate = async (rule, value) => {
      if (value) {
        if (/[`~!@#$^&*()=|{}':;',[\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？%--+=_.[\\\]\s]/.test(value)) {
          return Promise.reject(new Error(t('error37')));
        }
        if (/[\u4E00-\u9FA5]+/.test(value)) {
          return Promise.reject(new Error(t('error38')));
        }
        if (value.length > 100) {
          return Promise.reject(new Error(t('error39')));
        }
      }
      return Promise.resolve();
    };

    // rules
    const rules = reactive({
      walletAddress: [
        {
          required: true, validator: walletValidate, trigger: 'change',
        },
      ],
    });

    const submit = () => {
      formRef.value.validate().then(async () => {
        emit('confirm', state.formState.walletAddress, state.formState.chainType, state.verifyCode);
      });
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

    onMounted(() => {
      formRef.value.resetFields();
    });
    return {
      state,
      submit,
      close,
      getVerificationCode,
      smsResendSec,
      formRef,
      rules,
      // ...toRefs(state),
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

::v-deep(.ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before) {
  display: none;
}

::v-deep(.ant-form-item-label) {
  padding: 0;

  > label {
    font-size: 12px;
  }
}

::v-deep(.ant-form-item) {
  margin-bottom: 0.5rem;
}
</style>
