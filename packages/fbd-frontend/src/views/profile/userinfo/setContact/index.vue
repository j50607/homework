<template>
  <div class="set">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :right-components="'Service'"
      :middle-components="'Title'"
      :title="getType"
    />
    <a-form
      :model="state.form"
      ref="formRef"
      :label-col="{ span: 0 }"
      :wrapper-col="{ span: 24 }"
      :rules="rules"
    >
      <div class="set-area">
        <!-- 社交軟體帳號 -->
        <div class="set-area-title">
          {{ $t('views_profile_userinfo_setContact_account', {type: getType}) }}:
        </div>
        <a-form-item
          class="mb-2"
          name="account"
        >
          <a-input
            v-model:value="state.form.account"
            :placeholder="$t('views_profile_userinfo_setContact_pleaseEnterAccount', {type: getType})"
          />
        </a-form-item>
        <!-- 確認按鈕 -->
        <d-button
          type="primary"
          block
          class="mt-8 is-btn"
          :loading="loading"
          :disabled="!state.form.account || loading"
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
  ref, reactive, computed, watch, inject,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MemberApi from '@/assets/js/api/memberApi';

export default {
  setup() {
    // use
    const { t } = useI18n();
    const route = useRoute();
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
        account: '',
      },
    });

    const rules = {
      account: [{ required: true, message: t('common_errorNoEmpty'), trigger: ['change', 'blur'] }],
    };

    // computed
    const account = computed(() => store.state.user.account);
    const user = computed(() => store.state.user);

    // watch
    watch(route, (val) => {
      state.form.account = user.value?.[val?.query?.type];
    }, { immediate: true });

    // methods
    const getType = computed(() => {
      switch (route?.query?.type) {
        case 'qqAccount':
          return t('views_profile_userinfo_qq');
        case 'wechat':
          return t('views_profile_userinfo_wechat');
        case 'email':
          return t('views_profile_userinfo_mailbox');
        case 'line':
          return t('views_profile_userinfo_line');
        default:
          return '';
      }
    });
    const submit = async () => {
      loading.value = true;
      if (state.form.account) {
        let validateResult = true;

        switch (route?.query?.type) {
          case 'qqAccount':
            validateResult = validator.value.validateQq(state.form.account);
            break;
          case 'wechat':
            validateResult = validator.value.validateWechat(state.form.account);
            break;
          case 'email':
            validateResult = validator.value.validateEmail(state.form.account);
            break;
          case 'line':
            validateResult = validator.value.validateLine(state.form.account);
            break;
          default:
            break;
        }

        if (!validateResult.result) {
          window.$vue.$message.error(validateResult.errorMsg);
          loading.value = false;
          return;
        }
      }
      let params = {};
      // update這隻api送參數是weChat，userinfo回來是wechat都小寫，所以做此判斷
      if (route?.query?.type === 'wechat') {
        params = { weChat: state.form.account };
      } else {
        params[route?.query?.type] = state.form.account;
      }

      const res = await MemberApi.updateMember(account.value, params);
      loading.value = false;
      if (res.code === 200) {
        store.commit('SET_USER_INFO', params);
        window.$vue.$message.success(t('common_modifySuccess'));
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
      getType,
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
