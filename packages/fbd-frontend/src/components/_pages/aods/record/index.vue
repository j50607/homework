<template>
  <div class="record px-3">
    <van-pull-refresh
      v-if="!isListEmpty"
      ref="scroll"
      v-model="state.isListRefreshing"
      :use-custom-class="true"
      refresh-duration="500"
      :loading-text="$t('components_scroll_pullDownLoading')"
      :pulling-text="$t('components_scroll_pullDownRefresh')"
      :loosing-text="$t('components_scroll_pullDownRefresh')"
      @refresh="pullingDown"
    >
      <van-list
        v-model:loading="state.isListLoading"
        :finished="state.isListFinished"
        :loading-text="$t('components_scroll_pullUpLoading')"
        :finished-text="$t('components_scroll_allLoaded')"
        :offset="300"
        @load="loadMoreRecord"
      >
        <div
          v-for="(item, idx) in state.betRecordList"
          :key="`betRecordData[${idx}]`"
          class="betrecord-item mb-2 text-xs bg-white p-2 rounded-5"
        >
          <div class="betrecord-text flex mb-3">
            <img
              :src="$requireSafe('aods/record-robot.svg')"
              alt=""
              class="mr-1 w-3"
            >
            {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </div>

          <div class="flex mb-1">
            <div class="content w-3/5">
              <p class="gray mb-1">
                {{ $t('components_pages_profile_report_time_betRecord_content') }}
              </p>
              <p>
                {{ Number(renderGameInfo(item, 'matchTime')) && timeZoneUnit2() === '(NST)' ? dayjs(Number(renderGameInfo(item, 'matchTime'))).subtract(1,'hour').format('YYYY-MM-DD HH:mm:ss') : dayjs(Number(renderGameInfo(item, 'matchTime'))).format('YYYY-MM-DD HH:mm:ss') }}{{ Number(renderGameInfo(item, 'matchTime')) && timeZoneUnit2() }}
              </p>
            </div>
            <div
              class="status"
            >
              <p class="gray mb-1">
                {{ $t('components_pages_profile_team_status') }}
              </p>
              <p :class="renderIsWinningStyle(item)">
                {{ renderStatus(item) }}
              </p>
            </div>
          </div>
          <div class="betrecord-row mb-4">
            <div>
              {{ `${renderGameInfo(item, 'homeTeamName')} V.S. ${renderGameInfo(item, 'awayTeamName')}` }}
            </div>
          </div>

          <div
            v-show="item.isShowDetails"
            class="flex"
          >
            <div class="w-2/5">
              <p class="mb-1 gray">
                {{ $t('views_betRecord_betNo') }}
              </p>
              <p class="mb-1 gray">
                {{ $t('views_betRecord_item_label7') }}
              </p>
              <p class="mb-1 gray">
                {{ $t('views_betRecord_item_label2') }}
              </p>
              <p class="mb-1 gray">
                {{ $t('views_betRecord_item_label1') }}
              </p>
              <p class="mb-1 gray">
                {{ $t('views_betRecord_item_label3') }}
              </p>
              <p class="gray">
                {{ $t('views_betRecord_item_label4') }}
              </p>
            </div>
            <div>
              <p class="flex items-center mb-1">
                {{ item.betNo }}
                <img
                  :src="$requireSafe('aods/copy.svg')"
                  alt="copy"
                  class="copy w-3 ml-2"
                  @click="copyByText(item?.betNo)"
                >
              </p>
              <p class="mb-1">
                {{ renderGameInfo(item, 'playTypeMName') }}
              </p>
              <p class="mb-1">
                <span class="mr-1">
                  {{ renderGameInfo(item, 'playTypeSName') }}
                </span>
                <span class="mr-1">
                  {{ renderGameInfo(item, 'optionName') }}
                </span>
                <span class="gray">
                  {{ `@${fmtPayRate(item?.payRate)}` }}
                </span>
              </p>
              <p class="mb-1">
                {{ numWithCommas(item?.realAmount) }}
              </p>
              <p class="mb-1">
                {{ renderChargeFee(item?.fee) }}
              </p>
              <p :class="renderNumberStyle(item.status)">
                {{ renderNumber(item?.estimateProfit) }}
              </p>
            </div>
          </div>

          <div
            class="betrecord-expand-btn justify-center flex items-center mt-5"
            @click="handleShowDetails(item)"
          >
            <span class="mr-1 gray">{{ renderExpandStatus(item.isShowDetails) }}</span>
            <img
              :src="$requireSafe('aods/expand.svg')"
              alt=""
              class="expand-img w-2"
              :class="{'showing' : item.isShowDetails}"
            >
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
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
</template>
<script>
import { reactive, onBeforeMount, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import NP from 'number-precision';
import SportApi from '@/assets/js/api/sportApi';
import {
  isArray, copyByText, timeZoneUnit2, isNumber, fmtPayRate, numWithCommas,
} from '@/assets/js/utils/utils';
import VanList from '@/components/vantLib/list';
import VanPullRefresh from '@/components/vantLib/pull-refresh';

export default {
  components: {
    VanList,
    VanPullRefresh,
  },
  setup() {
    // use
    const store = useStore();
    const { t } = useI18n();
    // reactive
    const state = reactive({
      pageData: {
        pageIndex: 1,
        isLastPage: false,
        isFirstPage: true,
      },
      betRecordList: [],
      isListLoading: false,
      isListRefreshing: false,
      isListFinished: false,
    });

    // computed
    const siteStyle = computed(() => store.getters.siteStyle);
    const language = computed(() => store.state.info.language);
    const isListEmpty = computed(() => !state.betRecordList?.length && !state.isListLoading);

    // methods
    const getBetOrderPage = async () => {
      state.isListLoading = true;
      const res = await SportApi.getBetOrderPage({
        start: dayjs().format('YYYY/MM/DD HH:mm:ss'),
        end: dayjs().format('YYYY/MM/DD HH:mm:ss'),
        pageIndex: state.pageData.pageIndex,
        isRobot: true,
      });
      if (res.code === 200) {
        if (isArray(res.data.content)) {
          if (res.data.first) {
            state.betRecordList = res.data.content;
          } else {
            state.betRecordList = [...state.betRecordList, ...res.data.content];
          }
          state.pageData.isLastPage = res.data.last;
          state.pageData.isFirstPage = res.data.first;
        }
      }
      state.isListLoading = false;
    };
    const checkIsLastPage = () => {
      if (state.pageData.isLastPage) {
        state.isListFinished = true;
        return true;
      }
      return false;
    };
    const loadMoreRecord = async (isLoadMore = true) => {
      if (checkIsLastPage() && isLoadMore) return;

      if (isLoadMore) {
        state.pageData.pageIndex += 1;
      }

      if (state.isListRefreshing) {
        state.betRecordData = [];
        state.isListRefreshing = false;
      }

      await getBetOrderPage();
      checkIsLastPage();
    };

    const refreshData = () => {
      state.pageData.pageIndex = 1;
      state.pageData.isLastPage = false;
      state.pageData.isFirstPage = true;
      state.betRecordList = [];
    };
    const pullingDown = async () => {
      refreshData();
      // 清空列表数据
      state.isListFinished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.isListLoading = true;
      await loadMoreRecord(false);
    };

    const renderChargeFee = (fee) => {
      if (!isNumber(fee)) return '0%';
      return `${NP.times(fee, 100)}%`;
    };

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
    const renderIsWinningStyle = (item) => {
      if (item.status !== 2) return '';
      if (item.isWinning && item.estimateProfit) return 'text-positive';
      if (!item.isWinning && item.realAmount) return 'text-negative';
      return '';
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
    const renderNumberStyle = (val) => {
      const num = Number(val) || 0;
      if (num > 0) return 'text-positive';
      if (num < 0) return 'text-negative';
      return '';
    };
    const renderNumber = (val) => {
      const num = Number(val) || 0;
      if (num > 0) return `+${num}`;
      return num;
    };
    const renderExpandStatus = (val) => (val ? t('views_betRecord_item_action2') : t('views_betRecord_item_action1'));
    const handleShowDetails = (item) => {
      item.isShowDetails = !item.isShowDetails;
    };

    // hooks
    onBeforeMount(() => {
      getBetOrderPage();
    });
    return {
      state,
      copyByText,
      isListEmpty,
      siteStyle,
      pullingDown,
      loadMoreRecord,
      dayjs,
      renderGameInfo,
      renderIsWinningStyle,
      renderStatus,
      fmtPayRate,
      timeZoneUnit2,
      renderChargeFee,
      numWithCommas,
      renderNumberStyle,
      renderNumber,
      renderExpandStatus,
      handleShowDetails,
    };
  },
};
</script>
<style lang="postcss" scoped>
.betrecord-item {
  color:#1E1F2B;
}
.betrecord-text {
  color: #29C9B3;
}

.gray {
  color:#747792;
}
.expand-img {
  transition: all 0.2s linear;
}
.showing {
  transform: rotate(180deg);
}
</style>
