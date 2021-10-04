<template>
  <d-loading :loading="loading" />
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
              :src="require('@/assets/img/icon/icon-no-wallet.svg')"
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
          {{ $t('views_profile_balance') }}：{{ balance }}
        </span>
      </div>
      <a-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
      >
        <a-form-item
          class="mb-2"
          name="amount"
        >
          <a-input
            v-positive-places
            v-model:value="form.amount"
            :placeholder="$t('views_profile_withdrawAmountPlaceholder')"
            class="text-xs"
            autocomplete="off"
          />
        </a-form-item>
      </a-form>
      <div
        v-if="withdrawSettings?.openFreeWithdrawals"
        class="mb-2"
      >
        {{ $t('views_profile_withdrawFreeCount') }}：{{ freeWithdrawCount }} {{ $t('common_count') }} / {{ intervalMap[withdrawSettings?.withdrawCaculateInterval] }}
      </div>
      <div
        v-if="withdrawSettings?.openFreeWithdrawals"
        class="mb-2"
      >
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
    :header-title="$t('views_profile_walletManagement')"
    @confirm="confirm"
    @close="close"
  />
  <d-dialog
    v-model:visible="showNotice"
    :footer="null"
    :title="$t('views_profile_balanceNotEnough')"
    width="90%"
    @cancel="showNotice = false;"
  >
    <template #body>
      <div class="row">
        <div>{{ $t('views_profile_balance') }}</div>
        <div>{{ balance }}</div>
      </div>
      <div class="row">
        <div>{{ $t('views_profile_charge') }}</div>
        <div>{{ getMinusPrefix(charge) }}</div>
      </div>
      <div class="row">
        <div>{{ $t('views_profile_forceCharge') }}</div>
        <div>{{ getMinusPrefix(forceCharge) }}</div>
      </div>
      <div class="row">
        <div>{{ $t('views_profile_amount') }}</div>
        <div class="font-bold">
          {{ form.amount }}
        </div>
      </div>
      <div class="row">
        <div>{{ $t('views_profile_realAmount') }}</div>
        <div>{{ withdrawBalance }}</div>
      </div>
    </template>
  </d-dialog>
</template>

<script>
import {
  computed, reactive, ref, toRefs,
} from 'vue';
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

    const ruleForm = ref(null);

    const state = reactive({
      form: {
        amount: '',
      },
      walletList: [],
      selectedItem: {},
      info: {},
      // 显示输入提现密码页面
      showWithdraw: false,
      withdrawCode: '',
      // 显示余额不足弹窗
      showNotice: false,
      balance: 0,
      isWaterEnough: false,
      loading: false,
    });

    const withdrawSettings = computed(() => store.state.info.withdrawSettings);
    const amountValidator = async (rule, value = '') => {
      if (value < withdrawSettings.value.minWithdrawalThreshold || value > withdrawSettings.value.maxWithdrawalThreshold) {
        state.withdrawThreshold = false;
        return Promise.reject(new Error(`${t('common_limit')} ${withdrawSettings.value.minWithdrawalThreshold} ~ ${withdrawSettings.value.maxWithdrawalThreshold}`));
      }

      state.withdrawThreshold = true;
      return Promise.resolve();
    };

    const rules = computed(() => ({
      amount: [{ required: true, validator: amountValidator, trigger: 'change' }],
    }));

    // 免费提现次数
    const freeWithdrawCount = computed(() => {
      if (!isNumber(state.info?.freeWithdrawals) || !isNumber(state.info?.withdrawalCount)) return 0;
      if (state.info?.freeWithdrawals <= state.info?.withdrawalCount) return 0;
      return NP.minus(state.info?.freeWithdrawals, state.info?.withdrawalCount);
    });

    // 手续费 withdarwAdministrativeFeeRateSwitch 为true时收取百分比
    const charge = computed(() => {
      if (!state.info.chargeFees || freeWithdrawCount.value) return 0;

      if (withdrawSettings.value.withdarwAdministrativeFeeRateSwitch) {
        return NP.times(NP.divide(withdrawSettings.value.withdarwAdministrativeFeeRate, 100), +state.form.amount);
      }
      return withdrawSettings.value.withdarwAdministrativeFee;
    });

    const withdarwHandlingFee = computed(() => store.state.info.withdrawSettings.withdarwHandlingFee);
    // 强制提现手续费
    const forceCharge = computed(() => {
      if (!state.info.chargeFees || freeWithdrawCount.value || state.isWaterEnough) return 0;

      return Math.floor((NP.times(NP.divide(withdarwHandlingFee.value, 100), +state.form.amount)) * 100) / 100;
    });

    // 实际到账 提现金额 - 一般手续费 - 强制手续费
    const realAmount = computed(() => {
      if (!isNumber(+state.form.amount)) return 0;

      if (!state.isWaterEnough) {
        return NP.minus(NP.minus(+state.form.amount, charge.value), forceCharge.value);
      }
      return NP.minus(+state.form.amount, charge.value);
    });

    // 总金额 提现金额 + 一般手续费 + 强制手续费
    const totalAmount = computed(() => {
      if (!isNumber(+state.form.amount)) return 0;
      if (!state.isWaterEnough) {
        return NP.plus(NP.plus(+state.form.amount, charge.value), forceCharge.value);
      }
      return NP.plus(+state.form.amount, charge.value);
    });

    // 提现后余额
    const withdrawBalance = computed(() => NP.minus(state.balance, totalAmount.value));

    const btnDisabled = computed(() => !+state.form.amount || realAmount.value < 0 || !state.selectedItem.accountId || !state.withdrawThreshold);

    // methods
    const getBankcard = async () => {
      state.loading = true;

      const { code, data } = await MemberApi.getBankcard({
        unit: 'USDT',
        receivePaymentSetting: 'VIRTUAL_WALLET',
      });

      state.loading = false;

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
      state.loading = true;

      const { code } = await FinanceApi.getWithdrawalCode(state.withdrawCode);

      state.loading = false;

      if (code === 200) {
        state.showWithdraw = false;
        router.push({
          name: 'profile-confirm-withdraw',
          query: {
            charge: charge.value,
            forceCharge: forceCharge.value,
            amount: state.form.amount,
            withdrawBalance: withdrawBalance.value,
            bankName: state.selectedItem.bankName,
            accountName: state.selectedItem.accountName,
            accountId: state.selectedItem.accountId,
            bankcardId: state.selectedItem.bankId,
            totalAmount: totalAmount.value,
            withdrawCode: state.withdrawCode,
            withdrawFreeCount: `${freeWithdrawCount.value} ${t('common_count')} / ${intervalMap[withdrawSettings.value.withdrawCaculateInterval]}`,
            openFreeWithdrawals: withdrawSettings.value.openFreeWithdrawals,
          },
        });
      }
    };

    const getUserPartialInfo = async () => {
      const { code, data } = await MemberApi.getUserPartialInfo({
        requestInfo: [
          'balance',
        ],
      });
      if (code === 200) {
        state.balance = data.balance;
        store.commit('SET_USER_INFO', {
          balance: state.balance,
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
      if (realAmount.value < 0 || withdrawBalance.value < 0) {
        state.showNotice = true;
        return;
      }

      state.showWithdraw = true;
    };

    const close = () => {
      state.showWithdraw = false;
    };

    const getMinusPrefix = (num) => (+num !== 0 ? `-${num}` : num);

    getBankcard();
    getWaterCaculate();
    getUserPartialInfo();
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
      withdrawSettings,
      withdrawBalance,
      btnDisabled,
      ruleForm,
      rules,
      getMinusPrefix,
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

::v-deep(.ant-form-item-explain) {
  display: flex;
  align-items: center;
  font-size: 12px;
}
</style>
