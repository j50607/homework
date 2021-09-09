<template>
  <div class="set">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :right-components="'Service'"
      :middle-components="'Title'"
      :title="$t('views_profile_userinfo_setPhone_title')"
      :bg-color="'linear-gradient(180deg, #F3AC0A 0%, #B58007 100%)'"
    />
    <a-form
      :model="state.form"
      ref="formRef"
      :label-col="{ span: 0 }"
      :wrapper-col="{ span: 24 }"
      :rules="rules"
    >
      <div class="set-area">
        <!-- 手機號碼 -->
        <div class="set-area-title">
          {{ $t('views_profile_userinfo_setPhone_title') }}:
        </div>
        <a-form-item
          class="mb-2"
          name="phone"
        >
          <a-input
            v-model:value="state.form.phone"
            :maxlength="validator && validator.phoneLen"
            :placeholder="$t('views_profile_userinfo_setPhone_pleaseEnterPhoneNumber')"
          />
        </a-form-item>
        <!-- 手機驗證碼 -->
        <template v-if="smsVerifySwitch">
          <div
            class="set-area-title"
          >
            {{ $t('views_profile_userinfo_setPhone_verifyPhoneNumber') }}:
          </div>
          <a-form-item
            class="mb-2 verify-row"
            name="verifyCode"
          >
            <a-input
              v-model:value="state.form.verifyCode"
              :maxlength="6"
              :placeholder="$t('views_profile_userinfo_setPhone_pleaseEnterVerifyPhoneNumber')"
            >
              <template #suffix>
                <a-button
                  type="primary"
                  class="verify is-btn"
                  :loading="loading"
                  :disabled="!state.form.phone || loading || state.form.phone.length !== (validator && validator.phoneLen)"
                  @click="getVerificationCode"
                >
                  {{ $t('views_profile_userinfo_setPhone_sendVerifyNumber') }}
                </a-button>
              </template>
            </a-input>
          </a-form-item>
        </template>
        <!-- 登入密碼 -->
        <div
          class="set-area-title"
        >
          {{ $t('views_profile_userinfo_setPhone_loginPassword') }}:
        </div>
        <a-form-item
          class="mb-2"
          name="password"
        >
          <a-input
            v-model:value="state.form.password"
            :placeholder="$t('views_profile_userinfo_setPhone_pleaseEnterLoginPassword')"
          />
        </a-form-item>
        <!-- 確認按鈕 -->
        <d-button
          type="primary"
          block
          class="mt-8 is-btn"
          :loading="loading"
          :disabled="!state.form.phone || (smsVerifySwitch && !state.form.verifyCode) || !state.form.password || loading"
          @click="submit"
        >
          {{ $t('common_confirm') }}
        </d-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import {
  ref, reactive, computed, inject,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MemberApi from '@/assets/js/api/memberApi';
import SystemApi from '@/assets/js/api/systemApi';

export default {
  setup() {
    // use
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();

    // inject
    const validator = inject('$validator');

    // ref
    const formRef = ref(null);
    const loading = ref(false);

    // reactive
    const state = reactive({
      form: {
        phone: '',
        verifyCode: '',
        password: '',
      },
    });

    const rules = {
      phone: [{ required: true, message: t('common_errorNoEmpty'), trigger: ['change', 'blur'] }],
      verifyCode: [{ required: true, message: t('common_errorNoEmpty'), trigger: ['change', 'blur'] }],
      password: [{ required: true, message: t('common_errorNoEmpty'), trigger: ['change', 'blur'] }],
    };

    // computed
    const nickName = computed(() => store.state.user.nickName);
    const smsResendSec = computed(() => store.state.info.timeSetting.smsResendSec);
    const smsVerifySwitch = computed(() => store.state.info.switchSetting.smsVerifySwitch);

    console.log('smsResendSec :>> ', smsResendSec.value);
    // methods
    const getVerificationCode = async () => {
      console.log('send!');
      const res = await SystemApi.sendSms({ phone: state.form.phone });
      if (res.code === 200) {
        window.$vue.$message.success(t('common_sendSuccess'));
      } else {
        window.$vue.$message.error(res.message);
      }
    };

    const submit = async () => {
      loading.value = true;
      if (state.form.phone) {
        let validateResult = true;

        validateResult = validator.value.validatePhone(state.form.phone);
        if (!validateResult.result) {
          window.$vue.$message.error(validateResult.errorMsg);
          loading.value = false;
          return;
        }
      }
      const params = {
        phone: state.form.phone,
        verifyCode: state.form.verifyCode,
        password: state.form.password,
      };
      const res = await MemberApi.verifySms(params);
      loading.value = false;
      if (res.code === 200) {
        window.$vue.$message.success(t('common_modifySuccess'));
        store.commit('SET_PHONE', state.form.phone);
        router.push('/profile/userinfo');
      } else {
        window.$vue.$message.error(res.message);
      }
    };

    return {
      formRef,
      loading,
      state,
      nickName,
      submit,
      rules,
      validator,
      getVerificationCode,
      smsVerifySwitch,
    };
  },
};
</script>

<style lang="postcss" scoped>
@import '~@/components/DButton/mixin.scss';

.set {
  @apply bg-layout bg-no-repeat bg-contain h-full pt-h-h px-3 pb-4;

  &-area {
    @apply mt-4;

    .ant-input {
      color: #4d5772 !important;
      background-color: #fff !important;
    }

    &-title {
      color: #4d5772;
      font-size: 14px;

      @apply mb-2;
    }

    &-warning {
      color: #f00;
      font-size: 14px;

      @apply mb-2;

      .service {
        color: #0e88f5;
      }
    }

    .verify-row {
      ::v-deep(.ant-input) {
        padding-right: 75px;
        border: none !important;
        background: #fff !important;

        &:focus {
          border: none !important;
        }
      }

      ::v-deep(.ant-input-affix-wrapper) {
        border: none !important;
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
  }
}
</style>
