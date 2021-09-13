<template>
  <div class="set">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :middle-components="'Title'"
      :title="$t('views_profile_userinfo_modifyLoginPassword_title')"
    />
    <!-- step1 -->
    <template v-if="step === 1">
      <a-form
        :model="state.form"
        ref="formRef"
        :label-col="{ span: 0 }"
        :wrapper-col="{ span: 24 }"
        :rules="rules"
      >
        <div class="set-area">
          <!-- 舊登入密碼 -->
          <div class="set-area-title">
            {{ $t('views_profile_userinfo_modifyLoginPassword_oldPassword') }}:
          </div>
          <a-form-item
            class="mb-2"
            name="oldPassword"
          >
            <a-input
              v-model:value="state.form.oldPassword"
              :maxlength="12"
              :placeholder="$t('views_profile_userinfo_modifyLoginPassword_pleaseEnterOldPassword')"
            />
          </a-form-item>
          <!-- 新登入密碼 -->
          <div class="set-area-title">
            {{ $t('views_profile_userinfo_modifyLoginPassword_newPassword') }}:
          </div>
          <a-form-item
            class="mb-2"
            name="newPassword"
          >
            <a-input
              v-model:value="state.form.newPassword"
              :maxlength="12"
              :placeholder="$t('views_profile_userinfo_modifyLoginPassword_pleaseEnterNewPassword')"
            />
          </a-form-item>
          <!-- 確認新登入密碼 -->
          <div class="set-area-title">
            {{ $t('views_profile_userinfo_modifyLoginPassword_confirmNewPassword') }}:
          </div>
          <a-form-item
            class="mb-2"
            name="confirmNewPassword"
          >
            <a-input
              v-model:value="state.form.confirmNewPassword"
              :maxlength="12"
              :placeholder="$t('views_profile_userinfo_modifyLoginPassword_confirmNewPasswordAgain')"
            />
          </a-form-item>
          <!-- 確認按鈕 -->
          <d-button
            type="primary"
            block
            class="mt-8 is-btn"
            :loading="loading"
            :disabled="!state.form.oldPassword || !state.form.newPassword || !state.form.confirmNewPassword || loading"
            @click="submit"
          >
            {{ $t('common_confirm') }}
          </d-button>
        </div>
      </a-form>
    </template>
    <template v-if="step === 2">
      <img
        class="success"
        :src="$requireSafe(`profile/userinfo/success.svg`)"
      >
      <div class="modify-text">
        {{ $t('common_editedSucceeded') }}
      </div>
      <!-- 確認按鈕 -->
      <d-button
        type="primary"
        block
        class="modify-btn is-btn"
        :loading="reloginLoading"
        @click="relogin"
      >
        {{ $t('common_confirm') }}
      </d-button>
    </template>
  </div>
</template>

<script>
import {
  ref, reactive, inject,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MemberApi from '@/assets/js/api/memberApi';

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
    const reloginLoading = ref(false);
    const step = ref(1);

    // reactive
    const state = reactive({
      form: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
    });

    const rules = {
      oldPassword: [{ required: true, message: t('common_errorNoEmpty'), trigger: ['change', 'blur'] }],
      newPassword: [{ required: true, message: t('common_errorNoEmpty'), trigger: ['change', 'blur'] }],
      confirmNewPassword: [{ required: true, message: t('common_errorNoEmpty'), trigger: ['change', 'blur'] }],
    };

    // methods
    const relogin = async () => {
      reloginLoading.value = true;
      const { code } = await MemberApi.logout();
      if (code === 200) {
        window.$vue.$message.success(t('common_passwordModifySuccessNeedRelogin'));
        store.commit('CLEAR');
        router.push('/loginAndRegister');
      }
      reloginLoading.value = false;
    };
    const submit = async () => {
      loading.value = true;
      if (state.form.newPassword !== state.form.confirmNewPassword) {
        window.$vue.$message.error(t('common_errorPasswordConfirmFailed'));
        loading.value = false;
        return;
      }
      if (state.form.newPassword) {
        let validateResult = true;

        validateResult = validator.value.validatePassword(state.form.newPassword);
        if (!validateResult.result) {
          window.$vue.$message.error(validateResult.errorMsg);
          loading.value = false;
          return;
        }
      }
      const params = {
        oldPassword: state.form.oldPassword,
        newPassword: state.form.newPassword,
        confirmPassword: state.form.confirmNewPassword,
      };
      const res = await MemberApi.changePassword(params);
      loading.value = false;
      if (res.code === 200) {
        state.form.newPassword = '';
        step.value = 2;
      } else {
        window.$vue.$message.error(res.message);
      }
    };

    return {
      formRef,
      loading,
      reloginLoading,
      state,
      submit,
      rules,
      step,
      relogin,
    };
  },
};
</script>

<style lang="postcss" scoped>
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
  }

  .success {
    width: 80px;
    height: 80px;
    margin-top: 80px;

    @apply flex items-center justify-center w-full mb-4;
  }

  .modify-text {
    margin-bottom: 80px;
    color: #4d5772;

    @apply text-center font-bold;
  }
}
</style>
