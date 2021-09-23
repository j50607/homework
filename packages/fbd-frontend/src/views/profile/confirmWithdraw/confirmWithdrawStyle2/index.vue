<template>
  <d-loading :loading="state.loading" />
  <div class="h-full">
    <d-header-row
      :title="$t('views_profile_withdraw')"
      right-components="service"
    />
    <div class="h-full pt-h-h pl-3 pr-3">
      <div class="confirm-wrapper">
        <div class="pt-4 pb-1 font-bold text-center title">
          {{ $t('views_profile_confirmOrder') }}
        </div>
        <div class="pb-4 text-xs text-center  title">
          {{ $t('views_profile_orderNotice') }}
        </div>
        <template
          v-for="(item, index) in list"
          :key="index"
        >
          <div
            class="row flex justify-between pt-1 pb-1 "
          >
            <div class="flex-1 break-all whitespace-nowrap">
              {{ item.name }}
            </div>
            <div class="flex-1 break-all text-right">
              {{ state[item.value] }}
            </div>
          </div>
          <img
            v-if="index === 4"
            class="w-full"
            :src="$requireSafe(`icon/style2/divide.svg`)"
            alt=""
          >
        </template>
      </div>
      <d-button
        class="is-btn"
        type="primary"
        block
        @click="submit"
      >
        {{ $t('common_confirm') }}
      </d-button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import FinanceApi from '@/assets/js/api/financeApi';

export default {
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();

    const list = [
      {
        name: t('views_profile_charge'), value: 'charge',
      },
      {
        name: t('views_profile_forceCharge'), value: 'forceCharge',
      },
      {
        name: t('views_profile_withdrawAmount'), value: 'amount',
      },
      {
        name: t('views_profile_totalAmount'), value: 'totalAmount',
      },
      {
        name: t('views_profile_realAmount'), value: 'withdrawBalance',
      },
      {
        name: t('views_profile_chainType'), value: 'accountName',
      },
      {
        name: t('views_profile_walletAddress'), value: 'accountId',
      },
    ];

    const state = reactive({
      // 一般提现手续费
      charge: '',
      // 强制提现手续费
      forceCharge: '',
      // 提现金额
      amount: '',
      // 总金额
      totalAmount: '',
      // 提现后用户余额
      withdrawBalance: '',
      // 主网类型
      accountName: '',
      // 钱包地址
      accountId: '',
      // 錢包ID
      bankcardId: '',
      withdrawCode: '',
      loading: false,
    });

    const applyWithdrawal = async () => {
      state.loading = true;

      const { code, data } = await FinanceApi.applyWithdrawal({
        bankName: state.bankName,
        amount: +state.amount,
        accountName: state.accountName,
        bankcardId: state.bankcardId,
        accountId: state.accountId,
        force: true,
        withdrawalCode: state.withdrawCode,
      });

      state.loading = false;

      if (code === 200) {
        const params = {
          accountId: data.accountId,
          accountName: data.accountName,
          orderNumber: data.orderNumber,
          processAt: dayjs(data.processAt).format('YYYY-MM-DD HH:mm:ss'),
          amount: state.amount,
        };
        router.push({
          path: '/profile/orderDetail',
          query: {
            type: 'withdraw',
            withdraw: JSON.stringify(params),
          },
        });
      }
    };

    const initData = () => {
      Object.entries(route.query).forEach(([key, value]) => {
        state[key] = value;
      });
    };

    const submit = () => {
      applyWithdrawal();
    };

    initData();

    return {
      list,
      submit,
      state,
    };
  },
};
</script>

<style lang="postcss" scoped>
.confirm-wrapper {
  margin: 20px 0;
  border-radius: 5px;
  overflow: hidden;
  font-size: 14px;
  box-shadow: 0 2px 4px #4d57721a;

  .title {
    background: #21304e;
  }

  .row {
    background: #21304e;

    @apply px-3;

    &:last-child {
      @apply pb-4;
    }
  }
}

</style>
