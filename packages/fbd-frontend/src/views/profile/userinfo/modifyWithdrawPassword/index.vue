<template>
  <div class="set">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :middle-components="'Title'"
      :title="$t('views_profile_userinfo_modifyWithdrawPassword_title')"
    />

    <withdraw-code
      v-if="step !== 4"
      mode="MODIFY"
      @confirm="submit"
      @close="close"
      :header-title="$t('views_profile_userinfo_modifyWithdrawPassword_title')"
      :modify-step="step"
    />

    <!-- 修改成功 -->
    <div
      v-if="step === 4"
      class="set-result-figure"
    >
      <img
        :src="require('@/assets/img/icon/payment-selected.svg')"
        alt=""
      >
      <figcaption>{{ $t('common_editedSucceeded') }}</figcaption>
    </div>
    <!-- 確認按鈕 -->
    <d-button
      type="primary"
      block
      class="mt-16 is-btn"
      :loading="loading"
      @click="submit"
    >
      {{ $t('common_confirm') }}
    </d-button>
  </div>
</template>

<script>
import {
  ref, reactive, computed,
} from 'vue';
//   inject,
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MemberApi from '@/assets/js/api/memberApi';
import WithdrawCode from '@/components/_pages/profile/WithdrawCode';

export default {
  components: {
    WithdrawCode,
  },
  setup() {
    // use
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();

    // ref
    const formRef = ref(null);
    const loading = ref(false);
    const step = ref(1);

    // reactive
    const state = reactive({
      form: {
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
    const originwithdrawalCode = computed(() => store.state.user.withdrawalCode);

    // methods
    // 设定提现密码
    const changeWithDrawalCode = async () => {
      const { code } = await MemberApi.changeWithDrawalCode({
        oldPassword: originwithdrawalCode.value,
        newPassword: state.form.newPassword,
        confirmPassword: state.form.confirmNewPassword,
      });
      if (code === 200) {
        store.commit('SET_USER_INFO', { withdrawalCode: state.form.confirmNewPassword });
        return true;
      }
      return false;
    };

    const submit = async (val) => {
      if (step.value === 1) {
        if (val !== originwithdrawalCode.value) {
          window.$vue.$message.error(t('error3'));
          return;
        }
        step.value += 1;
        return;
      }

      if (step.value === 2) {
        if (val === originwithdrawalCode.value) {
          window.$vue.$message.error(t('common_errorSamePassword'));
          return;
        }
        state.form.newPassword = val;
        step.value += 1;
        return;
      }

      if (step.value === 3) {
        if (val !== state.form.newPassword) {
          window.$vue.$message.error(t('common_errorPasswordConfirmFailed'));
          return;
        }
        state.form.confirmNewPassword = val;
        await changeWithDrawalCode();
        step.value += 1;
        return;
      }

      if (step.value === 4) {
        step.value = 1;
        router.back();
      }
    };

    const close = () => {
      router.back();
    };

    return {
      changeWithDrawalCode,
      formRef,
      loading,
      state,
      submit,
      rules,
      step,
      close,
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
  }

  &-result-figure {
    padding-top: 80px;

    > figcaption {
      font-weight: bold;
      text-align: center;
    }

    > img {
      width: 80px;
      margin: 0 auto 18px;
    }
  }
}
</style>
