<template>
  <d-loading
    :loading="isLoading"
    v-if="jsutChangeTabShow"
  />
  <!-- <div class="all-match mt-2 absolute"> -->
  <div class="all-match mt-2">
    <van-pull-refresh
      v-if="state.gameSummaryList?.length"
      v-model="state.isListRefreshing"
      :use-custom-class="true"
      :loading-text="$t('components_scroll_loadingText')"
      :pulling-text="$t('components_scroll_pullingText')"
      :loosing-text="$t('components_scroll_loosingText')"
      @refresh="pullingDown"
    >
      <van-list
        v-model:loading="state.isListLoading"
        :finished="state.isListFinished"
        :loading-text="$t('components_scroll_loadingText')"
        :finished-text="$t('components_scroll_allLoaded')"
        :offset="300"
        @load="loadMoreGameSummary"
      >
        <div
          class="league-list mx-3  my-2 p-3  rounded flex justify-between content-center is-btn"
          v-for="(item, index) in state.gameSummaryList"
          :key="index"
          @click="clickHandler(item)"
        >
          <div class="content-left">
            <div class="match-title mb-2 text-primary text-sm">
              {{ item.leagueName }}
            </div>
            <div class="game-compet text-xs text-normal">
              <div class="team1 flex mb-1 items-center">
                <img
                  :src="item.homeTeamLogo? `${s3Base}/${item.homeTeamLogo}`: $requireSafe('icon/default-team.svg')"
                  alt=""
                  class="mr-1 w-3.5 h-3.5"
                >
                {{ item.homeTeamName }}
              </div>
              <div class="vs mb-1">
                vs
              </div>
              <div class="team2 flex">
                <img
                  :src="item.awayTeamLogo? `${s3Base}/${item.awayTeamLogo}`: $requireSafe('icon/default-team.svg')"
                  alt=""
                  class="mr-1 w-3.5 h-3.5"
                >
                {{ item.awayTeamName }}
              </div>
            </div>
          </div>

          <div class="content-right text-xs flex flex-col text-right text-normal flex-1">
            <div class="game-time mb-1">
              {{ formatTime(item.matchTime) }}({{ timeZoneUnitTxt }})
            </div>
            <div
              class="bet-time flex items-center justify-end"
              v-if="timeFilter !== 'history' && item.showCountDown !== false"
            >
              {{ $t('views_market_allLeague_deadLine') }}
              <a-statistic-countdown
                title=""
                :value="deadLine(item, index)"
                value-style="color: #4d5772; font-size: 12px; margin-left:10px;"
                @finish="onFinish(item, index)"
              />
            </div>
            <div
              class="bet-time flex items-center justify-end text-primary"
              v-if="timeFilter === 'history'"
            >
              {{ $t('components_pages_match_record_full_and_half') }}
              <div class="result ml-3">
                {{ item.homeTeamScore }}:{{ item.awayTeamScore }} / {{ item.homeTeamHalfScore }}:{{ item.awayTeamHalfScore }}
              </div>
            </div>

            <div class="to-bet mt-auto ml-auto cursor-pointer">
              <img
                :src="$requireSafe('icon/icon-market-right.svg')"
                alt=""
                v-if="item.showCountDown !== false"
              >
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <div
      class="no-data text-center my-10"
      v-else
    >
      <img
        :src="$requireSafe('icon/no-data.svg')"
        alt=""
        class="m-auto"
      >
      <p class="text-sm text-normal">
        {{ $t('components_pages_match_noData') }}
      </p>
    </div>
    <!-- 賽事結果彈窗 -->
    <game-details-modal
      v-model:isShow="showGameDetail"
      :selected-game-detail="selectedGameDetail"
      @cancel="toggleGamesDetailModal(false)"
    />
  </div>
</template>
<script>
import {
  ref, reactive, onMounted, nextTick, computed, watch,
} from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SportApi from '@/assets/js/api/sportApi.js';
import { isArray, timeZoneUnit2 } from '@/assets/js/utils/utils';
import GameDetailsModal from '@/components/_pages/match/leagueList/GameDetailsModal/GameDetailsModalStyle1/index.vue';
import VanList from '@/components/vantLib/list';
import VanPullRefresh from '@/components/vantLib/pull-refresh';

export default {
  props: {
    searchLeagueList: {
      type: Array,
      default: () => [],
    },
    leagueListParams: {
      type: Object,
      default: () => {},
    },
    timeFilter: {
      type: String,
      default: '',
    },
  },
  components: {
    GameDetailsModal,
    VanList,
    VanPullRefresh,
  },
  setup(props) {
    // inject
    // const validator = inject('$validator');

    // use
    const router = useRouter();
    const { t } = useI18n();

    // ref
    const scroll = ref(null);
    // const isLastPage = ref(false);
    const isLoading = ref(true);
    const showGameDetail = ref(false);
    const selectedGameDetail = ref(undefined);
    const jsutChangeTabShow = ref(true);

    // reactive
    const state = reactive({
      gameSummaryList: [],
      gameSummaryParams: {
        timeType: 'matchTime',
        startTime: dayjs().format('YYYY/MM/DD HH:mm:ss'),
        endTime: dayjs().add(6, 'day').format('YYYY/MM/DD HH:mm:ss'),
        pageIndex: 1,
        gameStatus: [0, -5],
        leagueId: props.searchLeagueList.length ? props.searchLeagueList : undefined,
        direction: 1,
      },
      historyGameSummaryParams: {
        timeType: 'matchTime',
        startTime: dayjs().subtract(6, 'day').format('YYYY/MM/DD HH:mm:ss'),
        endTime: dayjs().format('YYYY/MM/DD HH:mm:ss'),
        pageIndex: 1,
        leagueId: props.searchLeagueList.length ? props.searchLeagueList : undefined,
      },
      pageData: {
        pageIndex: 1,
        isLastPage: false,
        isFirstPage: true,
      },
      isListLoading: false,
      isListRefreshing: false,
      isListFinished: false,
    });

    // computed
    // const timeZoneUnitTxt = computed(() => validator.value?.timeZoneUnit);
    const timeZoneUnitTxt = computed(() => timeZoneUnit2());
    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);

    // methods
    const refreshData = () => {
      state.pageData.pageIndex = 1;
      state.pageData.isLastPage = false;
      state.pageData.isFirstPage = true;
      state.gameSummaryList = [];
      state.gameSummaryParams.pageIndex = 1;
      state.historyGameSummaryParams.pageIndex = 1;
    };

    const getGameSummary = async (params, isStartFromStartOfDay = true) => {
      isLoading.value = true;
      const res = await SportApi.getGameSummary(params, isStartFromStartOfDay);
      if (res.code === 200) {
        if (isArray(res.data.content)) {
          if (res.data.first) {
            state.gameSummaryList = res.data.content;
          } else {
            state.gameSummaryList = [...state.gameSummaryList, ...res.data.content];
          }

          // isLastPage.value = res.data.last;
          state.pageData.isLastPage = res.data.last;
          state.pageData.isFirstPage = res.data.first;
          nextTick(() => {
            if (scroll.value) {
              // scroll.value.lastPageCheck(isLastPage.value);
              // scroll.value.refresh();
            }
          });
        }
      }
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };

    const getGameSummaryRecord = async (params) => {
      isLoading.value = true;
      const res = await SportApi.getGameSummaryRecord(params);
      if (res.code === 200) {
        if (isArray(res.data.content)) {
          if (res.data.first) {
            state.gameSummaryList = res.data.content;
          } else {
            state.gameSummaryList = [...state.gameSummaryList, ...res.data.content];
          }

          // isLastPage.value = res.data.last;
          state.pageData.isLastPage = res.data.last;
          state.pageData.isFirstPage = res.data.first;
          nextTick(() => {
            if (scroll.value) {
              // scroll.value.lastPageCheck(isLastPage.value);
              // scroll.value.refresh();
            }
          });
        }
      }
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };

    // const pullingDown = async () => {
    //   if (props.timeFilter !== 'history') {
    //     state.gameSummaryParams.pageIndex = 1;
    //     if (props.timeFilter === 'all' || props.timeFilter === 'today') {
    //       await getGameSummary(state.gameSummaryParams, false);
    //     } else {
    //       await getGameSummary(state.gameSummaryParams);
    //     }
    //   } else {
    //     state.historyGameSummaryParams.pageIndex = 1;
    //     await getGameSummaryRecord(state.historyGameSummaryParams);
    //   }

    //   // scroll.value.finishPullDown();
    //   // scroll.value.refresh();
    // };

    // const loadMoreGameSummary = async () => {
    //   jsutChangeTabShow.value = false;
    //   if (props.timeFilter !== 'history') {
    //     state.gameSummaryParams.pageIndex += 1;
    //     if (props.timeFilter === 'all' || props.timeFilter === 'today') {
    //       await getGameSummary(state.gameSummaryParams, false);
    //     } else {
    //       await getGameSummary(state.gameSummaryParams);
    //     }
    //   } else {
    //     state.historyGameSummaryParams.pageIndex += 1;
    //     await getGameSummaryRecord(state.historyGameSummaryParams);
    //   }
    // };

    const loadMoreGameSummary = async (isLoadMore = true) => {
      jsutChangeTabShow.value = false;
      if (props.timeFilter !== 'history') {
        if (isLoadMore) {
          state.gameSummaryParams.pageIndex += 1;
          state.pageData.pageIndex += 1;
        }

        if (state.isListRefreshing) {
          state.gameSummaryList = [];
          state.isListRefreshing = false;
        }

        if (props.timeFilter === 'all' || props.timeFilter === 'today') {
          await getGameSummary(state.gameSummaryParams, false);
        } else {
          await getGameSummary(state.gameSummaryParams);
        }

        state.isListLoading = false;

        if (state.pageData.isLastPage) {
          state.isListFinished = true;
        }
      } else {
        if (isLoadMore) {
          state.historyGameSummaryParams.pageIndex += 1;
          state.pageData.pageIndex += 1;
        }

        if (state.isListRefreshing) {
          state.gameSummaryList = [];
          state.isListRefreshing = false;
        }
        await getGameSummaryRecord(state.historyGameSummaryParams);

        state.isListLoading = false;

        if (state.pageData.isLastPage) {
          state.isListFinished = true;
        }
      }
    };

    const pullingDown = async () => {
      refreshData();
      // 清空列表数据
      state.isListFinished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.isListLoading = true;
      state.isLoading = true;

      // if (props.timeFilter !== 'history') {
      //   state.gameSummaryParams.pageIndex = 1;
      //   if (props.timeFilter === 'all' || props.timeFilter === 'today') {
      //     await getGameSummary(state.gameSummaryParams, false);
      //   } else {
      //     await getGameSummary(state.gameSummaryParams);
      //   }
      // } else {
      //   state.historyGameSummaryParams.pageIndex = 1;
      //   await getGameSummaryRecord(state.historyGameSummaryParams);
      // }
      await loadMoreGameSummary(false);
      state.isLoading = false;
    };

    const toggleGamesDetailModal = (isModalShow = false) => {
      showGameDetail.value = isModalShow;
    };

    const clickHandler = (selectedItem) => {
      if (props.timeFilter === 'history') {
        toggleGamesDetailModal(true);
        selectedGameDetail.value = selectedItem;
      } else {
        if (selectedItem.showCountDown === false) {
          window.$vue.$message.info(t('views_betting_info_deadlineClosed'));
          return;
        }
        router.push({
          name: 'betting',
          query: {
            issueNo: selectedItem.issueNo,
          },
        });
      }
    };
    const formatTime = (time) => dayjs(time).format('YYYY/MM/DD HH:mm:ss');
    const deadLine = (item, index) => {
      const matchTimeDiffNow = dayjs(item.matchTime).diff(dayjs());
      // 表定開賽時間小於現在，但比賽狀態依舊是未開賽
      if (matchTimeDiffNow < 0) {
        state.gameSummaryList[index].showCountDown = false;
        return 0;
      }
      return dayjs() + matchTimeDiffNow;
    };

    const onFinish = (item, index) => {
      state.gameSummaryList[index].showCountDown = false;
    };

    // watch
    watch(
      () => props.timeFilter,
      async (newVal) => {
        state.gameSummaryParams.leagueId = [];
        state.historyGameSummaryParams.leagueId = [];
        state.gameSummaryParams.pageIndex = 1;
        state.historyGameSummaryParams.pageIndex = 1;
        if (newVal !== 'history') {
          state.gameSummaryParams.startTime = props.leagueListParams.startTime;
          state.gameSummaryParams.endTime = props.leagueListParams.endTime;
          if (newVal === 'all' || newVal === 'today') {
            await getGameSummary(state.gameSummaryParams, false);
          } else {
            await getGameSummary(state.gameSummaryParams);
          }
        } else {
          state.historyGameSummaryParams.startTime = props.leagueListParams.startTime;
          state.historyGameSummaryParams.endTime = props.leagueListParams.endTime;
          await getGameSummaryRecord(state.historyGameSummaryParams);
        }
      },
    );

    // hooks
    onMounted(async () => {
      if (props.timeFilter !== 'history') {
        state.gameSummaryParams.startTime = props.leagueListParams.startTime;
        state.gameSummaryParams.endTime = props.leagueListParams.endTime;
        if (props.timeFilter === 'all' || props.timeFilter === 'today') {
          await getGameSummary(state.gameSummaryParams, false);
        } else {
          await getGameSummary(state.gameSummaryParams);
        }
      } else {
        state.historyGameSummaryParams.startTime = props.leagueListParams.startTime;
        state.historyGameSummaryParams.endTime = props.leagueListParams.endTime;
        await getGameSummaryRecord(state.historyGameSummaryParams);
      }
    });
    return {
      state,
      scroll,
      pullingDown,
      loadMoreGameSummary,
      isLoading,
      timeZoneUnitTxt,
      formatTime,
      showGameDetail,
      selectedGameDetail,
      clickHandler,
      onFinish,
      deadLine,
      jsutChangeTabShow,
      s3Base,
      toggleGamesDetailModal,
    };
  },
};
</script>

<style lang="postcss" scoped>
.all-match {
  /* top: 90px;
  right: 0;
  bottom: 60px;
  left: 0;

  ::v-deep(.scroll-content) {
    transform: translateX(0) translateY(-10px) translateZ(1px);
  } */
  height: 100%;
}

.league-list {
  border: 0.3px solid #fffbf2;
  background-image: url('~@/assets/img/profile/match/league-bg.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  box-shadow: 0 2px 4px #4d57721a;
}

.to-bet {
  width: 12px;
}

.content-left {
  width: 45%;
}

.no-data {
  img {
    width: 80px;
  }
}
</style>
