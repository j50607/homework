<template>
  <div class="absolute top-0 right-0 bottom-0 left-0 bg-layout z-10">
    <d-header-row
      :title="isSet ? $t('views_profile_walletManagement') : $t('views_profile_withdraw') "
      right-components="service"
    >
      <template #left>
        <img
          class="go-back"
          :src="require('@/assets/img/header/icon-left-white.svg')"
          alt=""
          @click="close"
        >
      </template>
    </d-header-row>
    <div class="h-full pt-h-h pl-6 pr-6 text-center">
      <div class="mt-8 text-2xl">
        {{ $t('views_profile_withdrawCodeTitle') }}
      </div>
      <div class="mt-1 text-primary text-sm">
        {{ isSet ? $t('views_profile_withdrawCode_notice2') : $t('views_profile_withdrawCode_notice1') }}
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
        class="mt-8"
        :disabled="withdrawCode.length !== 6"
        @click="submit"
      >
        {{ $t('common_confirm') }}
      </d-button>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue';

export default {
  props: {
    /**
     * 判断新增或验证密码 SET: 设定提现密码 VERIFY: 验证提现密码
     */
    mode: {
      type: String,
      default: 'SET',
    },
  },
  emits: ['confirm', 'close'],
  setup(props, { emit }) {
    const state = reactive({
      withdrawCode: '',
      isFocus: false,
    });

    const isSet = computed(() => props.mode === 'SET');

    const submit = () => {
      emit('confirm', state.withdrawCode);
    };

    const close = () => {
      emit('close');
    };
    return {
      isSet,
      submit,
      close,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.password-item {
  width: 44px;
  box-shadow: 0 2px 4px #4d57721a;

  &.on {
    border: 1px solid var(--primary-color);
  }
}

.go-back {
  width: 18px;
  height: 18px;
}
</style>
