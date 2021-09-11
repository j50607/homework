<template>
  <div class="h-full">
    <d-header-row
      :title="$t('views_profile_walletManagement')"
      right-components="Service"
    />
    <div class="h-full pt-h-h pl-3 pr-3 text-sm">
      <div>{{ $t('views_profile_wallet_walletAddress') }}</div>
    </div>
  </div>
  <withdraw-code
    v-if="showWithdraw"
    mode="SET"
    @confirm="confirm"
    @close="close"
  />
</template>

<script>
import { reactive, toRefs } from 'vue';
import MemberApi from '@/assets/js/api/memberApi';
import WithdrawCode from '@/components/_pages/profile/WithdrawCode';

export default {
  components: {
    WithdrawCode,
  },
  setup() {
    const state = reactive({
      walletList: [],
      showWithdraw: false,
      info: {},
    });
    const getBankcard = async () => {
      const { code, data } = await MemberApi.getBankcard({
        unit: 'USDT',
        receivePaymentSetting: 'VIRTUAL_WALLET',
      });
      if (code === 200) {
        state.walletList = data.bankcards;
        state.info = data.info;
        return data;
      }
      return [];
    };

    const addWallet = () => {

    };

    const confirm = () => {

    };

    const close = () => {

    };

    getBankcard();
    return {
      addWallet,
      confirm,
      close,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.no-data {
  margin-top: 30%;

  p {
    color: #bdbdbd;
  }
}

.d-btn {
  width: 170px;
  font-size: 12px;
}
</style>
