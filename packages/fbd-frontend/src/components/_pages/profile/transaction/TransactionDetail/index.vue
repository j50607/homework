<template>
  <div class="transaction-detail absolute top-0 right-0 bottom-0 left-0 bg-layout z-10">
    <d-header-row
      :title="$t('components_pages_profile_transaction')"
      :right-components="'Service'"
    >
      <template #left>
        <div
          class="go-back"
        >
          <img
            :src="$requireSafe(`header/icon-left-white.svg`)"
            class="is-btn"
            @click="goBack"
          >
        </div>
      </template>
    </d-header-row>
    <div class="detail">
      <div class="detail-title">
        {{ $t('views_profile_transaction_transactionDetail_orderDetail') }}
      </div>
      <!-- 訂單內容 -->
      <template v-if="type === 'deposit'">
        <template
          v-for="(item, index) in info?.deposit"
          :key="`info${index}`"
        >
          <div
            v-if="item?.value"
            class="row"
          >
            <div class="row-title">
              {{ item?.title }}
            </div>
            <div :class="['row-content', item?.index === 'status' ? `status${item?.value?.id}` : '']">
              {{ renderContent(item) }}
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <template
          v-for="(item, index) in info?.withdraw"
          :key="`info${index}`"
        >
          <div
            v-if="item?.value"
            class="row"
          >
            <div class="row-title">
              {{ item?.title }}
            </div>
            <div :class="['row-content', item?.index === 'status' ? `status${item?.value?.id}` : '']">
              {{ renderContent(item) }}
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
// import { useRoute, useRouter } from 'vue-router';
import NP from 'number-precision';

export default {
  props: {
    infoOut: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    // use
    const { t } = useI18n();
    // const route = useRoute();
    // const router = useRouter();

    // reactive
    const state = reactive({
      type: 'deposit',
      allDetail: {},
      info: {
        deposit: [
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
        withdraw: [
          { title: t('views_profile_transaction_status'), value: undefined, index: 'status' },
          { title: t('views_profile_transaction_orderNumber'), value: undefined, index: 'orderNumber' },
          { title: t('views_profile_transaction_withdrawTime'), value: undefined, index: 'logAt' },
          { title: t('views_profile_transaction_finishTime'), value: undefined, index: 'processAt' },
          { title: t('views_profile_transaction_primaryNet'), value: undefined, index: 'accountName' },
          { title: t('views_profile_transaction_walletAddress'), value: undefined, index: 'accountId' },
          { title: t('views_profile_transaction_withdrawAmount'), value: undefined, index: 'amount' },
          { title: t('views_profile_transaction_generalHandlingFee'), value: undefined, index: 'administrativeFee' },
          { title: t('views_profile_transaction_forceHandlingFee'), value: undefined, index: 'charge' },
        ],
      },
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
    watch(() => props.infoOut, (val) => {
      if (val) {
        state.allDetail = JSON.parse(val);
      }
    }, { immediate: true });

    watch(() => props.type, (val) => {
      if (val) {
        state.type = val;
        if (state.type === 'deposit') {
          state.info.deposit.forEach((e) => {
            e.value = state?.allDetail?.[e?.index];
          });
        } else {
          state.info.withdraw.forEach((e) => {
            e.value = state?.allDetail?.[e?.index];
          });
        }
      }
    }, { immediate: true });

    // watch(() => route, (val) => {
    //   console.log('val.params.deepCheck :>> ', val.params.deepCheck);
    //   if (val?.params?.info) {
    //     state.type = val?.params?.type;
    //     state.allDetail = JSON.parse(val?.params?.info);
    //     if (state.type === 'deposit') {
    //       state.info.deposit.forEach((e) => {
    //         e.value = state?.allDetail?.[e?.index];
    //       });
    //     } else {
    //       state.info.withdraw.forEach((e) => {
    //         e.value = state?.allDetail?.[e?.index];
    //       });
    //     }
    //   }

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
        case 'amount':
          return Math.abs(item?.value);
        default:
          return item?.value;
      }
    };

    const goBack = () => {
      emit('close');
    };

    return {
      ...toRefs(state),
      goBack,
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

.go-back {
  display: flex;
  align-items: center;
  height: 100%;

  img {
    width: 18px;
    height: 18px;
  }
}
</style>
