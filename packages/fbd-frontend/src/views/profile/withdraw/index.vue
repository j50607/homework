<template>
  <div class="h-full">
    <d-header-row
      :title="$t('views_profile_withdraw')"
      right-components="service"
    />
    <div class="h-full pt-h-h pl-3 pr-3 text-xs">
      <div class="title">
        {{ $t('views_profile_withdrawWallet') }}
      </div>
      <d-select
        v-model:value="selectedItem"
        :data="walletList"
        :placeholder="$t('views_profile_chooseWallet')"
      >
        <template #dropdown="{option}">
          <div class="flex">
            <div>{{ option.accountName }}</div>
            <div class="ml-2 break-all">
              {{ option.accountId }}
            </div>
          </div>
        </template>
        <template #empty>
          <div
            class="flex flex-col items-center"
            @click="goBind"
          >
            <img
              class="h-10 w-10"
              :src="require('@/assets/img/icon/bank-no-data-dark.svg')"
              alt=""
            >
            <div class="mt-1 text-gray-400">
              {{ $t('views_profile_noWallet') }}
            </div>
            <div class="text-link mb-1">
              {{ $t('views_profile_goBind') }}>
            </div>
          </div>
        </template>
      </d-select>
      <div class="title">
        <span>
          {{ $t('views_profile_withdrawAmountTitle') }}
        </span>
        <span>
          {{ $t('views_profile_balance') }}：{{ }}
        </span>
      </div>
      <a-input
        v-six-decimal-places
        v-model:value.number="amount"
        :placeholder="$t('views_profile_withdrawAmountPlaceholder')"
        class="text-xs"
      />
      <div class="mb-2">
        {{ $t('views_profile_withdrawFreeCount') }}：{{ freeWithdrawCount }} 次 / {{ intervalMap[info.caculateInterval] }}
      </div>
      <div class="mb-2">
        {{ $t('views_profile_charge') }}：{{ charge }}
      </div>
      <d-button
        class="mt-2"
        type="primary"
        block
        :disabled="btnDisabled"
        @click="submit"
      >
        {{ $t('views_profile_withdraw') }}
      </d-button>
    </div>
  </div>
  <withdraw-code
    v-if="showWithdraw"
    mode="VERIFY"
    @confirm="confirm"
    @close="close"
  />
  <d-dialog
    v-model:visible="showNotice"
    :footer="null"
    :title="$t('views_profile_balanceNotEnough')"
    width="95%"
    @cancel="showNotice = false;"
  >
    <template #body>
      <div class="row">
        <div>{{ $t('views_profile_balance') }}</div>
        <div>{{ balance }}</div>
      </div>
      <div class="row">
        <div>{{ $t('views_profile_charge') }}</div>
        <div>{{ charge }}</div>
      </div>
      <div class="row">
        <div>{{ $t('views_profile_forceCharge') }}</div>
        <div>{{ forceCharge }}</div>
      </div>
      <div class="row">
        <div>{{ $t('views_profile_amount') }}</div>
        <div class="font-bold">
          {{ amount }}
        </div>
      </div>
      <div class="row">
        <div>{{ $t('views_profile_realAmount') }}</div>
        <div>{{ realAmount }}</div>
      </div>
    </template>
  </d-dialog>
</template>

<script>
import { computed, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import NP from 'number-precision';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import MemberApi from '@/assets/js/api/memberApi';
import FinanceApi from '@/assets/js/api/financeApi';
import WithdrawCode from '@/components/_pages/profile/WithdrawCode';
import { isNumber } from '@/assets/js/utils/utils';

export default {
  components: {
    WithdrawCode,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();

    const intervalMap = {
      DAY: t('common_day'),
      WEEK: t('common_week'),
      MONTH: t('common_month'),
    };

    const state = reactive({
      amount: '',
      walletList: [],
      selectedItem: {},
      info: {},
      showWithdraw: false,
      withdrawCode: '',
      showNotice: false,
      balance: 0,
      isWaterEnough: false,
    });

    // 免费提现次数
    const freeWithdrawCount = computed(() => {
      if (!isNumber(state.info?.freeWithdrawals) || !isNumber(state.info?.withdrawalCount)) return 0;
      if (state.info?.freeWithdrawals <= state.info?.withdrawalCount) return 0;
      return NP.minus(state.info?.freeWithdrawals, state.info?.withdrawalCount);
    });

    // 手续费
    const charge = computed(() => {
      if (freeWithdrawCount.value) return 0;
      switch (state.info?.chargeType) {
        case 'FIXED_AMOUNT':
          return state.info?.charge;
        case 'RATIO_BILLING':
          return NP.times(NP.divide(state.info?.charge, 100), state.amount);
        default:
          return 0;
      }
    });

    const withdarwHandlingFee = computed(() => store.state.info.withdrawSettings.withdarwHandlingFee);
    // 强制提现手续费
    const forceCharge = computed(() => NP.minus(state.amount, NP.divide(withdarwHandlingFee.value, 100)));

    // 实际到账
    const realAmount = computed(() => {
      if (!isNumber(state.amount)) return 0;
      if (!state.isWaterEnough) {
        return NP.minus(NP.minus(state.amount, charge.value), forceCharge.value);
      }
      return NP.minus(state.amount, charge.value);
    });

    const btnDisabled = computed(() => !state.amount || realAmount.value < 0 || !state.selectedItem.accountId);

    // methods
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

    // 取得个人流水，判断是否收取强制手续费
    const getWaterCaculate = async () => {
      const { code, data } = await FinanceApi.getWaterCaculate();
      if (code === 200) {
        state.isWaterEnough = data.isWaterEnough;
      }
    };

    // 检查提现密码
    const checkWithdraw = async () => {
      const { code } = await FinanceApi.getWithdrawalCode(state.withdrawCode);
      if (code === 200) {
        state.showWithdraw = false;
        router.push({
          name: 'profile-confirm-withdraw',
          query: {
            charge: charge.value,
            forceCharge: forceCharge.value,
            amount: state.amount,
            balance: 0,
            accountName: state.selectedItem.accountName,
            accountId: state.selectedItem.accountId,
          },
        });
      }
    };

    const goBind = () => {
      router.push('/profile/wallet');
    };

    const confirm = (val) => {
      state.withdrawCode = val;
      checkWithdraw();
    };

    const submit = () => {
      if (realAmount.value < 0) {
        state.showNotice = true;
        return;
      }

      state.showWithdraw = true;
    };

    const close = () => {
      state.showWithdraw = false;
    };

    getBankcard();
    getWaterCaculate();

    return {
      confirm,
      close,
      submit,
      intervalMap,
      charge,
      forceCharge,
      realAmount,
      freeWithdrawCount,
      goBind,
      btnDisabled,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="postcss" scoped>
.title {
  @apply flex justify-between mt-4 mb-2 text-sm;
}

.ant-input {
  height: 32px;
  margin-bottom: 10px;
  border-color: #f2f2f2 !important;
  background-color: #fff !important;
}

.row {
  @apply flex justify-between pb-3 text-normal;

  &:nth-child(5) {
    padding: 10px 0 0;
    border-top: 1px solid #f2f2f2;
  }
}
</style>
