<template>
  <div class="set">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :middle-components="'Title'"
      :title="$t('views_profile_userinfo_realName')"
    />
    <a-form
      :model="state.form"
      ref="formRef"
      :label-col="{ span: 0 }"
      :wrapper-col="{ span: 24 }"
      :rules="rules"
    >
      <div class="set-area">
        <!-- 真實姓名 -->
        <div class="set-area-title">
          {{ $t('views_profile_userinfo_realName') }}:
        </div>
        <a-form-item
          class="mb-2"
          name="realName"
        >
          <a-input
            v-model:value="state.form.realName"
            :placeholder="$t('views_profile_userinfo_setNickName_pleaseEnterRealName')"
          />
        </a-form-item>
        <!-- 修改警告 -->
        <div
          class="set-area-warning"
        >
          {{ $t('views_profile_userinfo_setRealName_warning') }}
        </div>
        <!-- 確認按鈕 -->
        <d-button
          type="primary"
          block
          class="mt-8 is-btn"
          :loading="loading"
          :disabled="!state.form.realName || loading"
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
        realName: '',
      },
    });

    const rules = {
      realName: [{ required: true, message: t('common_errorNoEmpty'), trigger: ['change', 'blur'] }],
    };

    // computed
    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const account = computed(() => store.state.user.account);

    // methods
    const submit = async () => {
      loading.value = true;
      if (state.form.realName) {
        let validateResult = true;

        validateResult = validator.value.validateName(state.form.realName);
        if (!validateResult.result) {
          window.$vue.$message.error(validateResult.errorMsg);
          loading.value = false;
          return;
        }
      }
      const params = {
        name: state.form.realName,
      };
      const res = await MemberApi.updateMember(account.value, params);
      loading.value = false;
      if (res.code === 200) {
        store.commit('SET_NAME', res.data.name);
        window.$vue.$message.success(t('common_modifySuccess'));
        state.form.realName = '';
        router.push('/profile/userinfo');
      } else {
        window.$vue.$message.error(res.message);
      }
    };

    return {
      formRef,
      loading,
      state,
      serviceUrl,
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
