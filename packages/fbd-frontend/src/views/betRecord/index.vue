<template>
  <d-header-row
    :title="$t('views_betRecord_item_title')"
  >
    <template #left>
      <img
        class="avatar w-4 h-4 rounded-full is-btn"
        :src="$requireSafe(`avatar/${avatar && avatar.system ? avatar.system : 0 }.png`)"
        alt=""
        @click="goPage('/profile/userInfo')"
      >
    </template>
  </d-header-row>

  <div class="betrecord">
    <d-loading :loading="state.isLoading" />
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

    <div
      class="betrecord-container"
      :style="`height: calc(100% - var(--range-list-height) - ${sumPanelHeight}px);`"
    >
      <d-scroll
        v-if="state.betRecordData?.length"
        ref="scroll"
        :pull-up="true"
        :pull-down="true"
        :scroll-y="true"
        :on-scroll="true"
        @pullingUp="loadMoreRecord()"
        @pullingDown="pullingDown()"
      >
        <ul class="betrecord-list">
          <li
            v-for="(item, idx) in state.betRecordData"
            :key="`betRecordData[${idx}]`"
            class="betrecord-item"
          >
            <div class="betrecord-item-piece">
              <div class="betrecord-row">
                <div class="betrecord-text betrecord-text">
                  {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
              </div>
            </div>

            <div class="betrecord-item-piece betrecord-item-piece-multi">
              <div class="betrecord-row betrecord-bottom-gap">
                <div class="betrecord-text betrecord-text-lg">
                  {{ $t('views_betRecord_item_label6') }}
                </div>
                <div class="betrecord-text betrecord-text-sm">
                  {{ $t('views_betRecord_item_label5') }}
                </div>
              </div>

              <div class="betrecord-row betrecord-bottom-gap">
                <div class="betrecord-text betrecord-text-lg">
                  {{ Number(renderGameInfo(item, 'matchTime')) && dayjs(Number(renderGameInfo(item, 'matchTime'))).format('YYYY-MM-DD HH:mm:ss') }}{{ Number(renderGameInfo(item, 'matchTime')) && `(${timeZone})` }}
                </div>
                <div
                  class="betrecord-text betrecord-text-sm"
                  :class="renderIsWinningStyle(item)"
                >
                  {{ renderStatus(item) }}
                </div>
              </div>

              <div class="betrecord-row">
                <div class="betrecord-text betrecord-text-xl betrecord-text-em">
                  {{ `${renderGameInfo(item, 'homeTeamName')} V.S. ${renderGameInfo(item, 'awayTeamName')}` }}
                </div>
              </div>
            </div>

            <div
              v-show="item.isShowDetails"
              class="betrecord-item-piece betrecord-item-piece-multi"
            >
              <div class="betrecord-row betrecord-bottom-gap">
                <div class="betrecord-text betrecord-text-sm">
                  {{ $t('views_betRecord_item_label1') }}
                </div>
                <div class="betrecord-text betrecord-text-lg">
                  {{ numWithCommas(item?.realAmount) }}
                </div>
              </div>

              <div class="betrecord-row betrecord-bottom-gap">
                <div class="betrecord-text betrecord-text-sm">
                  {{ $t('views_betRecord_item_label7') }}
                </div>
                <div class="betrecord-text betrecord-text-lg">
                  {{ renderGameInfo(item, 'playTypeMName') }}
                </div>
              </div>

              <div class="betrecord-row betrecord-bottom-gap">
                <div class="betrecord-text betrecord-text-sm">
                  {{ $t('views_betRecord_item_label2') }}
                </div>
                <div class="betrecord-text betrecord-text-lg betrecord-item-option text-primary">
                  <span>
                    {{ renderGameInfo(item, 'playTypeSName') }}
                  </span>
                  <span>
                    {{ renderGameInfo(item, 'optionName') }}
                  </span>
                  <span class="betrecord-item-option-em">
                    {{ `@${fmtPayRate(item?.payRate)}` }}
                  </span>
                </div>
              </div>

              <div class="betrecord-row betrecord-bottom-gap">
                <div class="betrecord-text betrecord-text-sm">
                  {{ $t('views_betRecord_item_label3') }}
                </div>
                <div class="betrecord-text betrecord-text-lg">
                  {{ renderChargeFee(item?.fee) }}
                </div>
              </div>

              <div class="betrecord-row">
                <div class="betrecord-text betrecord-text-sm">
                  {{ $t('views_betRecord_item_label4') }}
                </div>
                <div
                  class="betrecord-text betrecord-text-lg"
                  :class="renderNumberStyle(item.status)"
                >
                  {{ renderNumber(item?.estimateProfit) }}
                </div>
              </div>
            </div>

            <div
              class="betrecord-expand-btn is-btn"
              @click="handleShowDetails(item)"
            >
              <span>{{ renderExpandStatus(item.isShowDetails) }}</span>
              <CaretUpOutlined v-show="item.isShowDetails" />
              <CaretDownOutlined v-show="!item.isShowDetails" />
            </div>
          </li>
        </ul>
      </d-scroll>

      <template v-else>
        <figure class="betrecord-empty-icon">
          <img
            class="w-20 mx-auto mb-2 mt-10"
            :src="$requireSafe(`betting/style${siteStyle}/no-data.svg`)"
          >
          <figcaption class="betrecord-empty-info">
            <div class="text-base text-center mb-2">
              {{ $t('common_noData') }}
            </div>
          </figcaption>
        </figure>
      </template>
    </div>
    <div
      class="betrecord-item-piece-multi betrecord-sum cursor-pointer"
      @click="toggleSumPanel"
    >
      <div
        class="betrecord-row justify-between"
        :class="{ 'betrecord-bottom-gap-lg': state.isShowSum }"
      >
        <div class="betrecord-text betrecord-text-em betrecord-text-xl">
          <span>
            {{ $t('views_betRecord_sum_label1') }}
          </span>
          <span>
            {{ numWithCommas(state.sumData.totalBetAmount) }}
          </span>
        </div>

        <CaretUpOutlined v-show="!state.isShowSum" />
        <CaretDownOutlined v-show="state.isShowSum" />
      </div>

      <div
        v-show="state.isShowSum"
        class="betrecord-panel"
        :class="{ 'betrecord-panel-active': state.isShowSum }"
      >
        <div class="betrecord-row">
          <div class="betrecord-text betrecord-text-md">
            {{ $t('views_betRecord_sum_label2') }}
          </div>

          <div class="betrecord-text betrecord-text-md">
            {{ $t('views_betRecord_sum_label4') }}
          </div>
        </div>

        <div class="betrecord-row betrecord-bottom-gap">
          <div class="betrecord-text betrecord-text-md">
            {{ state.sumData.countSettled }}
          </div>
          <div class="betrecord-text betrecord-text-md">
            {{ numWithCommas(state.sumData.totalProfit) }}
          </div>
        </div>

        <div class="betrecord-row">
          <div class="betrecord-text betrecord-text-md">
            {{ $t('views_betRecord_sum_label3') }}
          </div>

          <div class="betrecord-text betrecord-text-md">
            {{ $t('views_betRecord_sum_label5') }}
          </div>
        </div>

        <div class="betrecord-row betrecord-bottom-gap">
          <div class="betrecord-text betrecord-text-md">
            {{ state.sumData.countUnsettled }}
          </div>
          <div class="betrecord-text betrecord-text-md">
            {{ numWithCommas(state.sumData.totalEstimateProfit) }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <d-popup
    v-model:value="state.isFilterPopupShow"
    position="bottom"
    :round="true"
    :title="$t('views_betRecord_filterPopup_title')"
    class="popup"
  >
    <div class="popup-label">
      {{ $t('views_betRecord_filterPopup_label1') }}
    </div>

    <div class="popup-list">
      <a-radio-group v-model:value="state.tempSelectedStatus">
        <a-radio
          v-for="(item, idx) in state.statusList"
          :key="`statusList[${idx}]`"
          :value="item.value"
        >
          {{ item.text }}
        </a-radio>
      </a-radio-group>
    </div>

    <div class="popup-piece">
      <d-button
        type="primary"
        :block="true"
        @click="changeStatus"
      >
        {{ $t('common_confirm') }}
      </d-button>
    </div>
  </d-popup>

  <date-picker-popup
    v-model:visible="state.isDatePickerPopupShow"
    :use-select="true"
    @confirm="selectDate"
  />

  <d-footer-row />
</template>

<script>
import {
  ref, reactive, computed, nextTick, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import NP from 'number-precision';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import {
  timeZoneUnit, isNumber, fmtPayRate, numWithCommas,
} from '@/assets/js/utils/utils';
import SportApi from '@/assets/js/api/sportApi';
import DScroll from '@/components/DScroll';
import DatePickerPopup from '@/components/_pages/DatePickerPopup';

export default {
  components: {
    CaretUpOutlined,
    CaretDownOutlined,
    DScroll,
    DatePickerPopup,
  },
  setup() {
    // use
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();

    // ref
    const scroll = ref(null);

    // reactive
    const state = reactive({
      rangeArr: [
        { label: t('components_dSelectDateModal_today'), value: 'today', index: 0 },
        { label: t('components_dSelectDateModal_yesterday'), value: 'yesterday', index: 1 },
        { label: t('components_dSelectDateModal_sevenDays2'), value: 'sevenDays', index: 2 },
        { label: t('components_dSelectDateModal_custom2'), value: 'custom', index: 3 },
      ],
      currentKey: 0,
      tabIndex: 0,
      currentRangeObj: {
        start: dayjs().startOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss'),
        end: dayjs().endOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss'),
      },
      currentExpandIdx: undefined,
      isFilterPopupShow: false,
      isDatePickerPopupShow: false,
      betRecordData: [],
      sumData: {
        totalBetAmount: 123.248,
        countSettled: 21,
        countUnsettled: 7,
        totalProfit: 217664.97,
        totalEstimateProfit: 1084265.9,
      },
      statusList: [
        { text: t('common_all'), value: 'all', index: 0 },
        { text: t('views_betRecord_filterPopup_status2'), value: 2, index: 1 },
        { text: t('views_betRecord_filterPopup_status1'), value: 1, index: 2 },
      ],
      tempSelectedStatus: 'all',
      currentStatus: 'all',
      pageData: {
        pageIndex: 1,
        isLastPage: false,
      },
      isLoading: false,
      isShowSum: false,
    });

    // computed
    const timeZone = computed(() => timeZoneUnit());
    const siteStyle = computed(() => store.getters.siteStyle);
    const language = computed(() => store.state.info.language);
    const avatar = computed(() => store.state.user.avatar);
    const sumPanelHeight = computed(() => (state.isShowSum ? 118 : 36));

    // methods
    const renderNumber = (val) => {
      const num = Number(val) || 0;
      if (num > 0) return `+${num}`;
      return num;
    };

    const renderNumberStyle = (val) => {
      const num = Number(val) || 0;
      if (num > 0) return 'text-positive';
      if (num < 0) return 'text-negative';
      return '';
    };

    const renderIsWinningStyle = (item) => {
      if (item.status !== 2) return '';
      if (item.isWinning && item.estimateProfit) return 'text-positive';
      if (!item.isWinning && item.realAmount) return 'text-negative';
      return '';
    };

    const renderExpandStatus = (val) => (val ? t('views_betRecord_item_action2') : t('views_betRecord_item_action1'));

    const renderGameInfo = (item, type = 'payRateInfo') => {
      let lang = window._jsvar.siteLocale;
      switch (language.value) {
        case 'zh_cn':
        case 'zh_tw':
          lang = 'zh_cn';
          break;
        default:
          lang = 'en_us';
          break;
      }

      return item?.gameInfo[lang] && item?.gameInfo[lang][type];
    };

    const renderStatus = (item) => {
      switch (item?.status) {
        case 1:
          return t('views_betRecord_item_pending');
        case 5:
          return t('views_betRecord_filterPopup_status3');
        case 6:
          return t('views_betRecord_filterPopup_status4');
        case 2:
          if (item.winning) return `+${item?.estimateProfit}`;
          return `-${item?.realAmount}`;
        default:
          return '';
      }
    };

    const renderChargeFee = (fee) => {
      if (!isNumber(fee)) return '0%';
      return `${NP.times(fee, 100)}%`;
    };

    const toggleSumPanel = () => {
      state.isShowSum = !state.isShowSum;

      nextTick(() => {
        if (scroll.value) {
          scroll.value.refresh();
        }
      });
    };

    const toggleFilterPopup = (isShow, isInitTempStatus = true) => {
      state.isFilterPopupShow = isShow;

      if (isInitTempStatus) {
        state.tempSelectedStatus = state.currentStatus;
      }
    };

    const toggleDatePickerPopup = (isShow = false) => {
      state.isDatePickerPopupShow = isShow;
    };

    const refreshData = () => {
      state.pageData.pageIndex = 1;
      state.pageData.isLastPage = false;
      state.betRecordData = [];
      state.sumData = {};
    };

    const getBetOrderPage = async () => {
      const params = {
        start: state.currentRangeObj.start,
        end: state.currentRangeObj.end,
        status: state.currentStatus === 'all' ? [1, 2, 5] : [state.currentStatus],
        pageIndex: state.pageData.pageIndex,
      };
      const { code, data } = await SportApi.getBetOrderPage(params) || {};
      if (code !== 200) return {};
      return data;
    };

    const getBetOrderStatistic = async () => {
      const params = {
        start: state.currentRangeObj.start,
        end: state.currentRangeObj.end,
      };
      const { code, data } = await SportApi.getBetOrderStatistic(params) || {};
      if (code !== 200) return {};
      return data;
    };

    const getData = async () => {
      state.isLoading = true;
      const data = await getBetOrderPage();
      const { content, last, first } = data || {};
      const newData = content?.map((item) => ({ ...item, isShowDetails: false }));
      const result = first ? newData : [...state.betRecordData, ...newData];

      state.betRecordData = result;
      state.pageData.isLastPage = last;
      state.sumData = await getBetOrderStatistic();
      state.isLoading = false;

      nextTick(() => {
        if (scroll.value) {
          scroll.value.lastPageCheck(state.pageData.isLastPage);
          scroll.value.refresh();
        }
      });
    };

    const goPage = (url) => {
      router.push(url);
    };

    const loadMoreRecord = () => {
      state.pageData.pageIndex += 1;
      getData();
    };

    const pullingDown = () => {
      refreshData();
      getData();
    };

    const handleShowDetails = (item) => {
      item.isShowDetails = !item.isShowDetails;

      nextTick(() => {
        if (scroll.value) {
          scroll.value.refresh();
        }
      });
    };

    const changeStatus = async () => {
      refreshData();
      state.currentStatus = state.tempSelectedStatus;
      await getData();
      toggleFilterPopup(false, false);
    };

    const changeTab = async (index) => {
      // 自訂
      if (index === 3) {
        toggleDatePickerPopup(true);
        return;
      }
      refreshData();
      switch (index) {
        case 0:
          state.currentRangeObj.start = dayjs().startOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss');
          state.currentRangeObj.end = dayjs().endOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss');
          break;
        case 1:
          state.currentRangeObj.start = dayjs().subtract(1, 'day').startOf('day').tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm:ss');
          state.currentRangeObj.end = dayjs().subtract(1, 'day').endOf('day').tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm:ss');
          break;
        case 2:
          state.currentRangeObj.start = dayjs().subtract(6, 'day').startOf('day').tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm:ss');
          state.currentRangeObj.end = dayjs().endOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss');
          break;
        default:
          break;
      }
      await getData();
    };

    const selectDate = async (data) => {
      refreshData();
      state.currentRangeObj.start = data?.startDate ?? '';
      state.currentRangeObj.end = data?.endDate ?? '';

      await getData();
    };

    const init = async () => {
      await getData();
    };

    // hooks
    onBeforeMount(async () => {
      await init();
    });

    return {
      state,
      scroll,
      siteStyle,
      sumPanelHeight,
      renderNumber,
      renderNumberStyle,
      renderExpandStatus,
      renderGameInfo,
      renderIsWinningStyle,
      renderStatus,
      renderChargeFee,
      toggleSumPanel,
      toggleFilterPopup,
      refreshData,
      loadMoreRecord,
      pullingDown,
      changeStatus,
      handleShowDetails,
      selectDate,
      timeZone,
      fmtPayRate,
      numWithCommas,
      dayjs,
      avatar,
      goPage,
      changeTab,
    };
  },
};
</script>

<style lang="postcss" scoped>
.betrecord {
  --range-list-height: 40px;

  @apply relative h-full text-xs;

  padding: var(--header-height) 0 var(--footer-height);

  &-container {
    @apply px-3 pt-4;
  }

  &-row {
    @apply flex items-center justify-between;
  }

  &-item {
    @apply p-2 pb-7 bg-primary-content rounded-5 relative;

    box-shadow: 0 2px 4px #4d57721a;

    & + & {
      @apply mt-3;
    }
  }

  &-item-piece {
    @apply mb-3;
  }

  &-item-piece-multi {
    @apply mb-4;
  }

  &-item-option {
    @apply flex items-center;

    span + span {
      @apply ml-2;
    }
  }

  &-text {
    @apply text-xs;
  }

  &-text-xl {
    flex: 1 0 0;
  }

  &-text-lg {
    flex: calc(65% - 10px / 2) 0 0;
  }

  &-text-md {
    flex: calc(50% - 10px / 2) 0 0;
  }

  &-text-sm {
    flex: calc(35% - 10px / 2) 0 0;
  }

  &-text-em {
    @apply text-primary;
  }

  &-expand-btn {
    @apply absolute bottom-0 left-0 flex items-center justify-center w-full pt-1 bg-secondary-content text-center;

    padding-bottom: 8px;
  }

  &-expand-btn .anticon {
    @apply ml-1;
  }

  &-sum {
    @apply absolute left-0 w-full mb-0 py-2 px-5 bg-secondary-content;

    bottom: var(--footer-height);
  }

  &-bottom-gap {
    @apply mb-1;
  }

  &-bottom-gap-lg {
    margin-bottom: 8px;
  }
}

.range {
  @apply px-3;

  &-item {
    @apply w-1/4 py-2 text-center;
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
    width: 16px;
    margin: 0 auto;
  }
}

.popup {
  &-label {
    @apply mb-2 text-xs font-bold;
  }

  &-list {
    @apply flex flex-wrap gap-x-1 gap-y-2 mb-4 text-xs;
  }

  &-item {
    @apply px-2 py-1 border border-solid border-border rounded-20 text-xs;

    &:hover,
    &-active {
      @apply text-white;

      background: var(--btn-primary-bg);
    }
  }

  &-piece {
    @apply mb-4;
  }

  &-piece .d-btn {
    @apply text-xs;
  }

  &-panel {
    height: 0;
  }

  &-panel-active {
    height: auto;
    transition: height 0.5s ease;
  }
}

::v-deep(.ant-radio-wrapper) {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-top: 1px solid #f2f2f2;
  font-size: 12px;

  &:last-of-type {
    border-bottom: 1px solid #f2f2f2;
  }
}

::v-deep(.ant-radio-group) {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
}

::v-deep(.ant-radio-inner) {
  &::after {
    background-color: #fff;
  }
}

::v-deep(.ant-radio-checked) .ant-radio-inner {
  border-color: var(--link-color);
  background-color: var(--link-color);
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
</style>
