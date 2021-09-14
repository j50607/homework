<template>
  <div class="transaction-detail">
    <d-header-row
      :title="$t('components_pages_profile_transaction')"
      :right-components="'Service'"
    />
    <div class="detail">
      <div class="detail-title">
        {{ $t('views_profile_transaction_transactionDetail_orderDetail') }}
      </div>
      <!-- 訂單內容 -->
      <div
        class="row"
        v-for="(item, index) in info"
        :key="`info${index}`"
      >
        <div class="row-title">
          {{ item?.title }}
        </div>
        <div :class="['row-content', item?.index === 'status' ? `status${item?.value?.id}` : '']">
          {{ renderContent(item) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import NP from 'number-precision';

export default {
  setup() {
    // use
    const { t } = useI18n();
    const route = useRoute();

    // reactive
    const state = reactive({
      allDetail: {},
      info: [
        { title: t('views_profile_transaction_status'), value: undefined, index: 'status' },
        { title: t('views_profile_transaction_orderNumber'), value: undefined, index: 'orderNumber' },
        { title: t('views_profile_transaction_depositTime'), value: undefined, index: 'logAt' },
        { title: t('views_profile_transaction_finishTime'), value: undefined, index: 'processAt' },
        { title: t('views_profile_transaction_primaryNet'), value: undefined, index: 'accountName' },
        { title: t('views_profile_transaction_walletAddress'), value: undefined, index: 'accountId' },
        { title: t('views_profile_transaction_depositAmount'), value: undefined, index: 'amount' },
        { title: t('views_profile_transaction_promotionAmount'), value: undefined, index: 'bonus' },
        { title: t('views_profile_transaction_handlingFee'), value: undefined, index: 'charge' },
        { title: t('views_profile_transaction_realAmount'), value: undefined, index: 'realAmount' },
      ],
    });

    // methods
    const formatDate = (time) => dayjs(time).format('YYYY-MM-DD HH:mm');

    const getRealAmount = (data) => NP.minus(NP.plus(data?.amount, data?.bonus), data?.charge);

    const formatStatus = (id) => {
      switch (id) {
        case 0:
        case 6:
        case 7:
          return t('views_profile_transaction_auditing');
        case 1:
          return t('views_profile_transaction_success');
        case 2:
          return t('views_profile_transaction_cancel');
        case 3:
          return t('views_profile_transaction_fail');
        case 4:
          return t('views_profile_transaction_cancelAuditing');
        case 5:
          return t('views_profile_transaction_cancelSuccess');
        default:
          return '';
      }
    };

    // watch
    watch(route, (val) => {
      if (val?.params?.info) {
        state.allDetail = JSON.parse(val?.params?.info);
        state.info.forEach((e) => {
          e.value = state?.allDetail?.[e?.index];
        });
      }
    }, { immediate: true });

    const renderContent = (item) => {
      switch (item?.index) {
        case 'status':
          return formatStatus(item?.value?.id);
        case 'logAt':
          return formatDate(item?.value);
        case 'processAt':
          return formatDate(item?.value);
        case 'realAmount':
          return getRealAmount(state?.allDetail);
        default:
          return item?.value;
      }
    };

    return {
      ...toRefs(state),
      renderContent,
    };
  },
};
</script>

<style lang="postcss" scoped>
.transaction-detail {
  @apply pt-h-h text-normal;

  .detail {
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px #4d57721a;

    @apply m-3 px-2 py-3;

    &-title {
      font-size: 14px;

      @apply mb-4 text-center;
    }

    .row {
      font-size: 12px;

      @apply flex items-center;

      .arrow {
        @apply w-2 h-2 mr-0 ml-1;
      }

      &-title {
        @apply font-normal;
      }

      +.row {
        @apply mt-2;
      }

      &-content {
        @apply mr-0 ml-auto;

        &.status0,&.status4,&.status5,&.status6,&.status7 {
          color: #8e8e8e;
        }

        &.status1 {
          color: #38c522;
        }

        &.status2,&.status3 {
          color: #f00;
        }
      }
    }
  }
}
</style>
