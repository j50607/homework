<template>
  <div class="set">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :right-components="'Service'"
      :middle-components="'Title'"
      :title="$t('views_profile_userinfo_modifyLoginPassword_title')"
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

    // computed
    const account = computed(() => store.state.user.account);

    // methods
    const submit = async () => {
      loading.value = true;
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
        name: state.form.newPassword,
      };
      const res = await MemberApi.updateMember(account.value, params);
      loading.value = false;
      if (res.code === 200) {
        store.commit('SET_NAME', res.data.name);
        window.$vue.$message.success(t('common_modifySuccess'));
        state.form.newPassword = '';
        router.push('/profile/userinfo');
      } else {
        window.$vue.$message.error(res.message);
      }
    };

    return {
      formRef,
      loading,
      state,
      submit,
      rules,
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
}
</style>
