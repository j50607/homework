<template>
  <div class="absolute top-0 right-0 bottom-0 left-0 bg-layout z-10">
    <d-header-row
      :title="headerTitle"
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
    <div class="h-full pt-h-h pl-6 pr-6 text-center">
      <div
        v-if="isModify"
        class="mt-8 text-2xl"
      >
        {{ titleText() }}
      </div>
      <div
        v-else
        class="mt-8 text-2xl"
      >
        {{ $t('views_profile_withdrawCodeTitle') }}
      </div>
      <div class="mt-1 text-sm hint">
        {{ noticeText() }}
      </div>
      <div class="relative flex justify-between mt-10">
        <input
          v-positive-places="6"
          v-model="withdrawCode"
          class="absolute top-0 left-0 w-full h-full opacity-0"
          type="text"
          @focus="isFocus = true"
          @blur="isFocus = false"
        >
        <div
          v-for="(item, index) in 6"
          :key="index"
          class="password-item flex items-center justify-center h-14 bg-white font-bold text-2xl rounded-3"
          :class="{'on': withdrawCode.length === item || (isFocus && !withdrawCode && !index)}"
        >
          {{ withdrawCode[index] }}
        </div>
      </div>
      <d-button
        type="primary"
        block
        class="mt-10"
        :disabled="withdrawCode.length !== 6"
        @click="submit"
      >
        {{ $t('common_confirm') }}
      </d-button>
    </div>
  </div>
</template>

<script>
import {
  computed, reactive, toRefs, watch,
} from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    /**
     * 判断新增或验证密码 SET: 设定提现密码 VERIFY: 验证提现密码
     */
    mode: {
      type: String,
      default: 'SET',
    },
    headerTitle: {
      type: String,
      default: window.$vue.$t('views_profile_withdraw'),
    },
    modifyStep: {
      type: Number,
      default: 1,
    },
  },
  emits: ['confirm', 'close'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const state = reactive({
      withdrawCode: '',
      isFocus: false,
    });

    const isSet = computed(() => props.mode === 'SET');
    const isModify = computed(() => props.mode === 'MODIFY');

    const submit = () => {
      emit('confirm', state.withdrawCode);
    };

    // watch
    watch(() => props.modifyStep, () => {
      state.withdrawCode = '';
    }, { immediate: true });

    const noticeText = () => {
      if (isSet.value) {
        return t('views_profile_withdrawCode_notice2');
      }
      if (isModify.value) {
        switch (props.modifyStep) {
          case 1:
            return t('views_profile_userinfo_modifyWithdrawPassword_enterWithdrawCode');
          default:
            return t('views_profile_userinfo_modifyWithdrawPassword_settingWithdrawCode');
        }
      }
      return t('views_profile_withdrawCode_notice1');
    };

    const titleText = () => {
      switch (props.modifyStep) {
        case 1:
          return t('views_profile_userinfo_modifyWithdrawPassword_withdrawCode');
        case 2:
          return t('views_profile_userinfo_modifyWithdrawPassword_newWithdrawCode');
        default:
          return t('views_profile_userinfo_modifyWithdrawPassword_confirmNewWithdrawCode');
      }
    };

    const close = () => {
      emit('close');
    };
    return {
      state,
      isSet,
      isModify,
      noticeText,
      titleText,
      submit,
      close,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.password-item {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: #fff;
  background-color: #21304e;
  box-shadow: 0 2px 4px #4d57721a;

  &.on {
    border: 2px solid #ffb83d;
  }
}

.go-back {
  width: 18px;
  height: 18px;
}

.hint {
  color: #6c82ac;
}
</style>
