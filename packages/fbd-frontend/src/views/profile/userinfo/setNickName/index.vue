<template>
  <div class="set">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :right-components="'Service'"
      :middle-components="'Title'"
      :title="$t('views_profile_userinfo_nickName')"
    />
    <a-form
      :model="state.form"
      ref="formRef"
      :label-col="{ span: 0 }"
      :wrapper-col="{ span: 24 }"
      :rules="rules"
    >
      <div class="set-area">
        <!-- 目前暱稱 -->
        <div class="set-area-title">
          {{ $t('views_profile_userinfo_setNickName_currentNickName') }}:
        </div>
        <a-form-item class="mb-4">
          <a-input
            v-model:value="nickName"
            disabled
          />
        </a-form-item>
        <!-- 新暱稱 -->
        <div
          v-if="traceCount && traceCount.nickname && traceCount.nickname < 2"
          class="set-area-title"
        >
          {{ $t('views_profile_userinfo_setNickName_newNickName') }}:
        </div>
        <a-form-item
          v-if="traceCount && traceCount.nickname && traceCount.nickname < 2"
          class="mb-2"
          name="newNickName"
        >
          <a-input
            v-model:value="state.form.newNickName"
            :placeholder="$t('views_profile_userinfo_setNickName_pleaseEnterNewNickName')"
          />
        </a-form-item>
        <!-- 修改次數警告 -->
        <div
          v-if="traceCount && traceCount.nickname && traceCount.nickname < 2"
          class="set-area-warning"
        >
          {{ $t('views_profile_userinfo_setNickName_nickNameWarning', {times: traceCount && traceCount.nickname}) }}
        </div>
        <div
          v-else
          class="set-area-warning"
        >
          {{ $t('views_profile_userinfo_setNickName_modifyOverLimit', {times: traceCount && traceCount.nickname}) }}
          <a
            :href="serviceUrl"
            class="service"
          >
            {{ $t('views_profile_userinfo_setNickName_onlineService', {times: traceCount && traceCount.nickname}) }}
          </a>
        </div>
        <!-- 確認按鈕 -->
        <d-button
          v-if="traceCount && traceCount.nickname && traceCount.nickname < 2"
          type="primary"
          block
          class="mt-8 is-btn"
          :loading="loading"
          :disabled="!state.form.newNickName || loading"
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
    const showBalance = ref(false);
    const loading = ref(false);

    // reactive
    const state = reactive({
      form: {
        newNickName: '',
      },
    });

    const rules = {
      newNickName: [{ required: true, message: t('common_errorNoEmpty'), trigger: ['change', 'blur'] }],
    };

    // computed
    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const account = computed(() => store.state.user.account);
    const nickName = computed(() => store.state.user.nickName);
    const traceCount = computed(() => store.state.user.traceCount);

    // methods
    const submit = async () => {
      loading.value = true;
      if (state.form.newNickName) {
        let validateResult = true;

        validateResult = validator.value.validateNickname(state.form.newNickName);
        if (!validateResult.result) {
          window.$vue.$message.error(validateResult.errorMsg);
          loading.value = false;
          return;
        }
      }
      if (state.form.newNickName === nickName.value) {
        window.$vue.$message.error(t('views_profile_userinfo_setNickName_nickNameConflict'));
        loading.value = false;
        return;
      }
      const params = {
        nickName: state.form.newNickName,
      };
      const res = await MemberApi.updateMember(account.value, params);
      loading.value = false;
      if (res.code === 200) {
        store.commit('SET_NICK_NAME', res.data.nickName);
        store.commit('SET_TRACE_COUNT', res.data.traceCount);
        window.$vue.$message.success(t('common_modifySuccess'));
        state.form.newNickName = '';
        router.push('/profile/userinfo');
      } else {
        window.$vue.$message.error(res.message);
      }
    };

    return {
      formRef,
      showBalance,
      loading,
      state,
      nickName,
      traceCount,
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
