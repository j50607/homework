<template>
  <div class="finance-details">
    <div class="range flex justify-between">
      <d-tabs
        v-model:activeKey="state.currentKey"
        :default-key="state.tabIndex"
        :tab-list="state.rangeArr"
        @change="changeTab"
        class="time-tab"
      />
      <div
        class="range-item range-item-filter is-btn"
        @click="toggleFilterPopup(true)"
      >
        <img :src="$requireSafe(`icon/style${siteStyle}/filter.svg`)">
      </div>
    </div>

    <div class="finance-details-container">
      <d-scroll
        v-if="state.financeRecordData?.length"
        ref="scroll"
        :pull-up="true"
        :pull-down="true"
        :scroll-y="true"
        :on-scroll="true"
        @pullingUp="loadMoreRecord()"
        @pullingDown="pullingDown()"
      >
        <ul class="finance-details-list">
          <li
            v-for="(item, idx) in state.financeRecordData"
            :key="`financeRecordData[${idx}]`"
            class="finance-details-item"
          >
            <div class="finance-details-item-piece">
              <div class="finance-details-text finance-details-text-lg">
                {{ item.type.id !== 7 ? item.type.text : $t('views_finance_popup_profit') }}
              </div>

              <div
                class="finance-details-text finance-details-text-lg finance-details-text-em"
              >
                {{ renderNumber(item.amount) }}
              </div>
            </div>
            <div class="finance-details-item-piece">
              <div class="finance-details-text finance-details-text">
                {{ timeConversion(item.logAt) }}
              </div>

              <div
                class="finance-details-text finance-details-text-sm"
              >
                {{ $t('views_finance_balance') }}: {{ item.balance }}
              </div>
            </div>
          </li>
        </ul>
      </d-scroll>

      <template v-else>
        <figure class="finance-empty-icon">
          <img
            class="w-20 mx-auto mb-2 mt-10"
            :src="$requireSafe(`betting/style${siteStyle}/no-data.svg`)"
          >
          <figcaption class="finance-empty-info">
            <div class="text-base text-center mb-2">
              {{ $t('common_noData') }}
            </div>
          </figcaption>
        </figure>
      </template>
    </div>
  </div>

  <div class="finance-details-item-piece finance-details-sum">
    <div class="finance-details-text finance-details-text-md finance-details-text-em finance-details-text-xl">
      <span>
        {{ $t('views_finance_sum_label1') }}&nbsp;:
      </span>
      <span>
        {{ state.totalDepositAmount }}
      </span>
    </div>

    <div class="finance-details-text finance-details-text-md finance-details-text-em finance-details-text-xl">
      <span>
        {{ $t('views_finance_sum_label2') }}&nbsp;:
      </span>
      <span>
        {{ state.totalWithdrawAmount }}
      </span>
    </div>
  </div>

  <d-popup
    v-model:value="state.isFilterPopupShow"
    position="bottom"
    :round="true"
    :title="$t('views_betRecord_filterPopup_title')"
    :has-header-divider="true"
    header-divider-color="#374E7B"
    :closeable="false"
    class="popup"
  >
    <div class="popup-subtitle">
      <div class="popup-label">
        {{ $t('views_finance_popup_label1') }}
      </div>

      <div class="popup-item popup-item-no-space is-btn">
        <a-radio
          class="popup-font-12 popup-reverse popup-mr-0"
          v-model:checked="state.allCheck"
          @change="changeAll"
        >
          {{ $t('views_finance_popup_all') }}
        </a-radio>
      </div>
    </div>

    <div class="popup-list">
      <a-checkbox-group
        class="popup-checkbox"
        v-model:value="state.checkResult"
        @change="changeCheckbox"
      >
        <a-checkbox
          class="popup-item is-btn"
          v-for="(item, index) in state.typeList"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </a-checkbox>
      </a-checkbox-group>
    </div>

    <div class="popup-btn is-btn">
      <d-button
        type="primary"
        :block="true"
        round
        @click="confirm"
      >
        {{ $t('common_confirm') }}
      </d-button>
    </div>
  </d-popup>

  <date-picker-popup
    v-model:visible="state.showDateModalBool"
    :use-select="true"
    @confirm="datePickerConfirm"
  />
</template>

<script>
import {
  ref, reactive, nextTick, computed,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import * as R from 'ramda';
import { onMounted } from '@vue/runtime-core';
import DScroll from '@/components/DScroll';
import DatePickerPopup from '@/components/_pages/DatePickerPopup';
import financeApi from '@/assets/js/api/financeApi';

export default {
  components: {
    DScroll,
    DatePickerPopup,
  },
  setup() {
    // ref
    const scroll = ref(null);

    const Ramda = () => {
      // 將多個函數合並成一個函數，並從左到右執行

      // 流水線：第一個的函數的返回值交給第二個，第二個的交給第三個，依次類推

      const negative = (x) => -1 * x;

      const increaseOne = (x) => x + 1;

      /* eslint-disable-next-line */
      const f = R.pipe(Math.pow, negative, increaseOne);

      // 第一個求3的4次方，返回值給後邊方法，以此類推

      return (f(3, 4));
    };

    // use
    const store = useStore();
    const { t } = useI18n();

    // reactive
    const state = reactive({
      rangeArr: [
        { label: t('components_dSelectDateModal_today'), value: 'today', index: 0 },
        { label: t('components_dSelectDateModal_yesterday'), value: 'yesterday', index: 1 },
        { label: t('components_dSelectDateModal_sevenDays2'), value: 'sevenDays', index: 2 },
        { label: t('components_dSelectDateModal_custom2'), value: 'custom', index: 3 },
      ],
      currentRange: 'today',
      currentKey: 0,
      tabIndex: 0,
      currentExpandIdx: undefined,
      isFilterPopupShow: false,
      financeRecordData: [],
      financeRecordPageIndex: 1,
      totalDepositAmount: 0,
      totalWithdrawAmount: 0,
      sumData: {
        depositAmount: 123.248,
        withdrawAmount: 1600,
      },
      typeList: [
        { label: window.$vue.$t('views_finance_popup_user_deposit'), value: [0, 2, 4, 37, 38, 45] },
        { label: window.$vue.$t('views_finance_popup_user_withdraw'), value: [1, 3, 23, 24] },
        { label: window.$vue.$t('views_finance_popup_event_gift'), value: [5, 18, 19, 21, 22, 25, 48] },
        { label: window.$vue.$t('views_finance_popup_return_water_record'), value: [9, 17, 35] },
        { label: window.$vue.$t('views_finance_popup_rebate_record'), value: [33] },
        { label: window.$vue.$t('views_finance_popup_poundage'), value: [32, 36] },
        { label: window.$vue.$t('views_finance_popup_wallet_account_change'), value: [12, 13, 31, 51, 52] },
        { label: window.$vue.$t('views_finance_popup_transfer_record'), value: [46, 47, 49, 50] },
        { label: window.$vue.$t('views_finance_popup_profit'), value: [7] },
        { label: window.$vue.$t('views_finance_popup_order'), value: [6] },
        { label: window.$vue.$t('views_finance_popup_other'), value: [53, 54, 55] },
      ],
      checkResult: [],
      typeResult: [],
      allCheck: true,
      showDateModalBool: false,
      isLastPage: false,
      customStartDay: '',
      customEndDay: '',
    });

    // computed
    const siteStyle = computed(() => store.getters.siteStyle);
    const account = computed(() => store.state.user.account);

    // methods
    const renderNumber = (val) => {
      const num = Number(val) || 0;
      if (num > 0) return `+${num}`;
      return num;
    };

    const timeConversion = (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss');
    const timeJudgment = () => {
      let start;
      let end;
      if (state.currentRange === 'today') {
        start = dayjs().format('YYYY/MM/DD HH:mm:ss');
        end = dayjs().format('YYYY/MM/DD HH:mm:ss');
      } else if (state.currentRange === 'yesterday') {
        start = dayjs().add(-1, 'days').format('YYYY/MM/DD HH:mm:ss');
        end = dayjs().add(-1, 'days').endOf('day').format('YYYY/MM/DD HH:mm:ss');
        console.log(start);
        console.log(end);
      } else if (state.currentRange === 'sevenDays') {
        start = dayjs().add(-6, 'days').format('YYYY/MM/DD HH:mm:ss');
        end = dayjs().format('YYYY/MM/DD HH:mm:ss');
      } else if (state.currentRange === 'custom') {
        start = dayjs().format('YYYY/MM/DD HH:mm:ss');
        end = dayjs().format('YYYY/MM/DD HH:mm:ss');
      }

      return [start, end];
    };

    const queryLog = async (startDate, endDate) => {
      const start = startDate || timeJudgment()[0];
      console.log(start);
      const end = endDate || timeJudgment()[1];
      console.log(end);

      const info = {
        type: state.typeResult,
        account: account.value,
        start,
        end,
        filterType: [39, 40],
        review: undefined,
        showSub: false,
        pageIndex: state.financeRecordPageIndex,
      };

      const { code, data } = await financeApi.getFrontendQueryLog(info);

      if (code === 200) {
        if (data.page.first) {
          state.financeRecordData = data.page.content || [];
        } else {
          state.financeRecordData = [...state.financeRecordData, ...data.page.content] || [];
        }
        state.totalDepositAmount = data.totalDepositAmount || 0;
        state.totalWithdrawAmount = data.totalWithdrawAmount || 0;

        state.isLastPage = data.page.last;

        nextTick(() => {
          if (scroll.value) {
            scroll.value.lastPageCheck(state.isLastPage);
            scroll.value.refresh();
          }
        });
      }
    };

    const getRecord = async () => {
      const data = R.clone(state.financeRecordData);
      const result = data.map((item) => ({ ...item, isShowDetails: false }));
      return result;
    };

    const changeTab = (index) => {
      switch (index) {
        case 0:
          state.currentRange = 'today';
          break;
        case 1:
          state.currentRange = 'yesterday';
          break;
        case 2:
          state.currentRange = 'sevenDays';
          break;
        case 3:
          state.currentRange = 'custom';
          break;
        default:
          break;
      }
      if (index === 3) {
        state.showDateModalBool = true;
      } else {
        state.financeRecordPageIndex = 1;
        queryLog();
      }
    };

    const datePickerConfirm = ({ startDate, endDate }) => {
      state.financeRecordPageIndex = 1;
      state.customStartDay = startDate;
      state.customEndDay = endDate;
      queryLog(startDate, endDate);
    };

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

    const loadMoreRecord = () => {
      state.financeRecordPageIndex += 1;
      queryLog();
      getRecord();
    };

    const pullingDown = () => {
      state.financeRecordPageIndex = 1;
      queryLog();
      getRecord();

      scroll.value.finishPullDown();
      scroll.value.refresh();
    };

    const toggleFilterPopup = (isShow) => {
      state.isFilterPopupShow = isShow;
    };

    const init = async () => {
      state.financeRecordData = await getRecord();
    };

    const confirm = () => {
      queryLog(state.customStartDay, state.customEndDay);
      init();

      state.isFilterPopupShow = false;
    };

    onMounted(() => {
      queryLog();
      init();
    });

    return {
      Ramda,
      scroll,
      loadMoreRecord,
      pullingDown,
      state,
      siteStyle,
      toggleFilterPopup,
      renderNumber,
      queryLog,
      timeConversion,
      changeAll,
      changeCheckbox,
      confirm,
      datePickerConfirm,
      changeTab,
    };
  },
};
</script>

<style lang="postcss" scoped>
.finance-details {
  @apply relative h-full text-xs;

  /* height: calc(100% - var(--header-height) - var(--footer-height)); */
  height: calc(100% - 100px);
  padding: var(--header-height) 0 var(--footer-height);

  &-container {
    @apply h-full px-3 pt-4;
  }

  &-item {
    @apply p-2 bg-primary-content rounded-5 relative;

    box-shadow: 0 2px 4px #4d57721a;

    & + & {
      @apply mt-3;
    }
  }

  &-item-piece {
    @apply flex justify-between;

    & + & {
      @apply mt-1;
    }
  }

  &-item-option {
    @apply flex items-center;
  }

  &-item-option-em {
    @apply ml-1;

    color: var(--btn-primary-bg);
  }

  &-text {
    @apply text-xs;

    flex: 1 0 0;
  }

  &-text-lg {
    @apply text-sm col-span-4;
  }

  &-text-md {
    @apply col-span-3;
  }

  &-text-sm {
    @apply col-span-2;
  }

  &-text-em {
    color: var(--btn-primary-bg);
  }

  &-expand-btn {
    @apply absolute bottom-0 left-0 flex items-center justify-center w-full pt-1 bg-secondary-content text-center;

    padding-bottom: 8px;
  }

  &-expand-btn .anticon {
    @apply ml-1;
  }

  &-sum {
    @apply absolute bottom-10 left-0 w-full mb-0 py-3 px-5;

    height: 91px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: #081024;
  }
}

.range {
  @apply px-3;

  &-list {
    @apply flex items-center h-8 text-sm;
  }

  &-item {
    @apply w-1/4 py-2 text-center relative;
  }

  &-item-active {
    @apply font-bold;

    &::after {
      @apply absolute bottom-0 left-1/2 w-1/3 bg-primary transform-gpu -translate-x-1/2;

      height: 3px;
      content: '';
    }
  }

  &-item-filter {
    width: 16px;
  }

  &-item-filter img {
    margin: 0 auto;
  }
}

.popup {
  &-subtitle {
    @apply flex items-center justify-between mt-1 mb-2;

    border-color: #374e7b;
  }

  &-label {
    @apply text-xs font-bold;
  }

  &-list {
    @apply mb-2 pt-1 text-xs border-t border-solid;

    border-color: #374e7b;
  }

  &-item {
    @apply mt-2 mb-2 text-xs ml-0 text-normal;
  }

  &-item-no-space {
    @apply m-0;
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

.time-tab {
  flex: 1 0 308px;
  width: 308px;
  margin-right: 20px;

  ::v-deep(.d-tabs-mobile-box) {
    .d-tabs-mobile-title {
      margin-right: 8px !important;
    }
  }
}

/* /deep/ .ant-radio-inner::after {
  top: 50%;
  left: 50%;
  width: 0.35714rem;
  border: 0.125rem solid var(--checkbox-active-bg);
  border-top: 0;
  border-left: 0;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  content: '';
  transform: rotate(45deg) scale(1) translate(-50%, -50%);
} */
</style>
