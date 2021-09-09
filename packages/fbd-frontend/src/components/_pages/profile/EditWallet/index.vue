<template>
  <div class="absolute top-0 right-0 bottom-0 left-0 bg-layout z-10">
    <d-header-row
      :title="$t('views_profile_walletManagement')"
      right-components="Service"
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
    <div class="h-full pt-h-h pl-3 pr-3 text-xs">
      <div class="mt-4 mb-1">
        {{ $t('views_profile_wallet_walletAddress') }}
      </div>
      <a-input
        v-model:value="walletAddress"
        :placeholder="$t('views_profile_wallet_placeholder2')"
      />
      <div class="mt-4 mb-1">
        {{ $t('views_profile_chainType') }}
      </div>
      <a-input
        v-model:value="chainType"
        :placeholder="$t('views_profile_wallet_placeholder1')"
      />
      <d-button
        type="primary"
        block
        class="mt-8"
        :disabled="!walletAddress || !chainType"
        @click="submit"
      >
        {{ $t('common_confirm') }}
      </d-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';

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
  },
  emits: ['confirm', 'close'],
  setup(props, { emit }) {
    const state = reactive({
      walletAddress: props.address,
      chainType: props.type,
    });

    const submit = () => {
      emit('confirm', state.walletAddress, state.chainType);
    };

    const close = () => {
      emit('close');
    };
    return {
      submit,
      close,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-input {
  height: 32px;
  border: 1px solid #f2f2f2 !important;
  font-size: 12px;
  background-color: #fff !important;
}

.go-back {
  width: 18px;
  height: 18px;
}
</style>
