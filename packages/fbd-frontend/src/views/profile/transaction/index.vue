<template>
  <div class="transaction">
    <d-header-row
      :title="$t('components_pages_profile_transaction')"
      :right-components="'Service'"
    />
    <!-- 切換Tab -->
    <div class="tab">
      <div
        class="tab-item is-btn"
        :class="tabType === 'deposit' ? 'active' : ''"
        @click="changeTab('deposit')"
      >
        {{ $t('views_profile_transaction_deposit') }}
        <div
          class="line"
          :class="tabType === 'deposit' ? 'active' : ''"
        />
      </div>
      <div
        class="tab-item is-btn"
        :class="tabType === 'withdraw' ? 'active' : ''"
        @click="changeTab('withdraw')"
      >
        {{ $t('views_profile_transaction_withdraw') }}
        <div
          class="line"
          :class="tabType === 'withdraw' ? 'active' : ''"
        />
      </div>
      <div
        class="filter is-btn"
        @click="handleFilterDialog(true)"
      >
        <img :src="$requireSafe(`profile/transaction/filter.svg`)">
      </div>
      <div
        class="calendar is-btn"
        @click="handleCalendarDialog(true)"
      >
        <img :src="$requireSafe(`profile/transaction/calendar.svg`)">
      </div>
    </div>
    <!-- 充提紀錄內容 -->
    <d-scroll
      v-if="queryContent?.length"
      ref="scroll"
      :pull-up="true"
      :pull-down="true"
      :scroll-y="true"
      :on-scroll="true"
      @pullingDown="pullingDown()"
      @pullingUp="loadMoreRecord()"
    >
      <div class="card-container">
        <div
          class="card is-btn"
          v-for="(item, index) in queryContent"
          :key="index"
          @click="goDetail(item)"
        >
          <div class="row">
            <div class="amount">
              {{ item?.amount }} USDT
            </div>
            <div :class="`status status${item?.status?.id}`">
              {{ formatStatus(item.status.id) }}
            </div>
            <img
              class="arrow"
              :src="$requireSafe(`profile/transaction/arrow-grey.svg`)"
            >
          </div>
          <div class="row">
            <div class="row-title">
              {{ $t('views_profile_transaction_orderNumber') }}
            </div>
            <div class="row-content">
              {{ item.orderNumber }}
            </div>
          </div>
          <div class="row">
            <div class="row-title">
              {{ $t('views_profile_transaction_depositTime') }}
            </div>
            <div class="row-content">
              {{ formatDate(item?.logAt) }}
            </div>
          </div>
          <div class="row">
            <div class="row-title">
              {{ $t('views_profile_transaction_balance') }}
            </div>
            <div class="row-content">
              {{ item.balance }}
            </div>
          </div>
        </div>
      </div>
    </d-scroll>
    <div
      v-else
      class="empty"
    >
      <img
        class="empty-icon"
        :src="$requireSafe(`profile/transaction/empty.svg`)"
      >
      <div class="empty-text">
        {{ $t('views_profile_transaction_empty') }}
      </div>
    </div>
  </div>

  <date-picker-popup
    v-model:visible="showCalendar"
    :use-select="true"
    @confirm="selectDate"
  />

  <d-popup
    v-model:value="showFilter"
    position="bottom"
    :round="true"
    :title="$t('views_betRecord_filterPopup_title')"
    class="popup"
  >
    <div class="popup-label">
      {{ $t('views_finance_popup_label1') }}
    </div>
    <div class="popup-list">
      <div class="popup-item is-btn">
        <a-radio
          class="popup-font-12 popup-reverse popup-mr-0"
          v-model:checked="allCheck"
          @change="changeAll"
        >
          {{ $t('views_finance_popup_all') }}
        </a-radio>
      </div>
    </div>

    <div class="popup-list">
      <a-checkbox-group
        class="popup-checkbox"
        v-model:value="checkResult"
        @change="changeCheckbox"
      >
        <a-checkbox
          class="popup-item is-btn popup-reverse"
          v-for="(item, index) in typeList"
          :key="`typeList[${index}]`"
          :value="item.value"
        >
          {{ item.label }}
        </a-checkbox>
      </a-checkbox-group>
    </div>

    <div class="popup-btn is-btn">
      <a-button
        v-text="$t('common_confirm')"
        @click="confirmFilter()"
      />
    </div>
  </d-popup>
</template>

<script>
import {
  ref, reactive, toRefs, onBeforeMount, nextTick,
} from 'vue';
import * as R from 'ramda';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import FinanceApi from '@/assets/js/api/financeApi';
import DatePickerPopup from '@/components/_pages/DatePickerPopup';

export default {
  components: {
    DatePickerPopup,
  },
  setup() {
    // use
    const { t } = useI18n();
    const router = useRouter();

    // ref
    const scroll = ref(null);
    const showFilter = ref(false);
    const showCalendar = ref(false);

    const searchType = {
      deposit: [0, 2, 4, 37, 38, 45],
      withdraw: [1],
    };

    const filterList = {
      deposit: [
        { label: window.$vue.$t('views_profile_transaction_success'), value: [1] },
        { label: window.$vue.$t('views_profile_transaction_fail'), value: [2, 3, 5] },
        { label: window.$vue.$t('views_profile_transaction_auditing'), value: [0, 4, 6, 7] },
      ],
      withdraw: [
        { label: window.$vue.$t('views_profile_transaction_success'), value: [1] },
        { label: window.$vue.$t('views_profile_transaction_fail'), value: [2, 3, 5] },
        { label: window.$vue.$t('views_profile_transaction_auditing'), value: [0] },
        { label: window.$vue.$t('views_profile_transaction_refused'), value: [4] },
      ],
    };

    // reactive
    const state = reactive({
      tabType: 'deposit',
      queryContent: [],
      allCheck: true,
      checkResult: [],
      typeResult: [],
      typeList: [
        { label: window.$vue.$t('views_profile_transaction_success'), value: [1] },
        { label: window.$vue.$t('views_profile_transaction_fail'), value: [2, 3, 5] },
        { label: window.$vue.$t('views_profile_transaction_auditing'), value: [0, 4, 6, 7] },
      ],
    });

    const params = reactive({
      type: searchType[state.tabType],
      start: dayjs().startOf('day').format('YYYY/MM/DD HH:mm:ss'),
      end: dayjs().endOf('day').format('YYYY/MM/DD HH:mm:ss'),
      pageIndex: 1,
      isLastPage: false,
      status: state.typeResult,
    });

    // methods
    const handleRefValue = R.curry((target, value) => {
      target.value = value;
    });

    const handleFilterDialog = handleRefValue(showFilter);
    const handleCalendarDialog = handleRefValue(showCalendar);

    const changeAll = (e) => {
      state.typeResult = e.target.checked ? [] : state.checkResult;

      if (!e.target.checked) {
        state.allCheck = true;
      }

      if (e.target.checked) {
        state.checkResult = [];
      }
    };

    const changeCheckbox = (list) => {
      if (list.length === state.typeList.length) {
        state.checkResult = [];
        state.allCheck = true;
      } else {
        state.typeResult = state.checkResult.reduce((acc, val) => acc.concat(val), []);

        state.allCheck = false;
      }
    };

    const initFilter = () => {
      state.typeList = JSON.parse(JSON.stringify(filterList[state.tabType]));
      state.checkResult = [];
      state.typeResult = [];
      state.allCheck = true;
    };

    const getTellerLog = async () => {
      const {
        code, data, message,
      } = await FinanceApi.getTellerLog(params);
      if (code === 200) {
        if (data?.page?.first) {
          state.queryContent = data?.page?.content;
        } else {
          state.queryContent = [...state.queryContent, ...data?.page?.content];
        }

        params.isLastPage = data?.page?.last;
        nextTick(() => {
          if (scroll.value) {
            scroll.value.lastPageCheck(params.isLastPage);
            scroll.value.refresh();
          }
        });
      } else {
        window.$vue.$message.error(message);
      }
    };

    const formatDate = (time) => dayjs(time).format('YYYY-MM-DD HH:mm');

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

    const loadMoreRecord = async () => {
      params.pageIndex += 1;
      await getTellerLog();
    };

    const pullingDown = async () => {
      state.queryContent = [];
      params.pageIndex = 1;
      await getTellerLog();
      scroll.value.finishPullDown();
      scroll.value.refresh();
    };

    const changeTab = (val) => {
      if (val !== state.tabType) {
        state.queryContent = [];
        state.tabType = val;
        params.pageIndex = 1;
        params.isLastPage = false;
        params.type = searchType[state.tabType];
        initFilter();
        getTellerLog();
      }
    };

    const selectDate = async (data) => {
      params.start = data?.startDate ?? '';
      params.end = data?.endDate ?? '';
      params.pageIndex = 1;

      await getTellerLog();
    };

    const goDetail = (info) => {
      router.push({ name: 'transactionDetail', params: { info: JSON.stringify(info) } });
    };

    const confirmFilter = async () => {
      params.pageIndex = 1;

      await getTellerLog();
      handleFilterDialog(false);
    };

    onBeforeMount(() => {
      getTellerLog();
    });

    return {
      scroll,
      showCalendar,
      showFilter,
      ...toRefs(state),
      changeTab,
      handleFilterDialog,
      handleCalendarDialog,
      formatDate,
      formatStatus,
      loadMoreRecord,
      pullingDown,
      selectDate,
      goDetail,
      changeAll,
      changeCheckbox,
      confirmFilter,
    };
  },
};
</script>

<style lang="postcss" scoped>
.transaction {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  @apply pt-h-h text-normal absolute;

  .tab {
    font-size: 14px;

    @apply flex items-center;

    &-item {
      width: 80px;
      height: 40px;

      @apply flex flex-col items-center justify-center;

      &.active {
        color: #1f2022;

        @apply font-bold;
      }

      .line {
        height: 3px;
        border-radius: 3px;

        @apply w-4 mt-1;

        &.active {
          background-color: var(--primary-color);
        }
      }
    }

    .filter {
      height: 40px;
      padding: 0 7.5px;

      img {
        width: 16px;
        height: 16px;
      }

      @apply flex items-center justify-center ml-auto;
    }

    .calendar {
      height: 40px;
      padding: 0 15px 0 7.5px;

      img {
        width: 16px;
        height: 16px;
      }

      @apply flex items-center justify-center;
    }
  }

  .card-container {
    font-size: 12px;

    @apply px-3 py-6;

    .card {
      border-radius: 5px;
      background: #fff;
      box-shadow: 0 2px 4px #4d57721a;

      @apply py-3 px-2;

      .row {
        @apply flex items-center;

        .amount {
          color: var(--primary-color);
        }

        .status {
          @apply ml-auto;

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
        }
      }

      +.card {
        @apply mt-2;
      }
    }
  }

  .empty {
    margin-top: 60px;

    @apply flex flex-col items-center justify-center;

    &-icon {
      width: 80px;
      height: 80px;

      @apply mb-2;
    }

    &-text {
      font-size: 14px;

      @apply font-normal;
    }
  }
}

.popup {
  &-label {
    @apply mb-2 text-xs font-bold;
  }

  &-list {
    @apply mt-2 mb-2 text-xs border-t border-solid border-input-border;
  }

  &-item {
    @apply mt-2 mb-2 text-xs ml-0;
  }

  &-checkbox {
    @apply flex flex-col;
  }

  &-reverse {
    @apply flex flex-row-reverse justify-between;
  }

  &-btn {
    @apply mt-4 mb-4 text-xs;

    .ant-btn {
      width: 100%;
      height: 36px;
      border-radius: 3px;
      color: #fff;
      font-size: 12px;
      background: linear-gradient(#f3ac0a 0%, #b58007 100%);
    }
  }

  &-font-12 {
    @apply text-xs;
  }

  &-mr-0 {
    @apply mr-0;
  }
}
</style>
