<template>
  <d-loading
    :loading="isLoading"
    v-if="jsutChangeTabShow"
  />
  <div class="all-match mt-2 absolute p-3">
    <d-scroll
      ref="scroll"
      :pull-up="true"
      :pull-down="true"
      :scroll-y="true"
      :on-scroll="true"
      @pullingDown="pullingDown()"
      @pullingUp="loadMoreGameSummary()"
      v-if="state.gameSummaryList.length > 0"
    >
      <div
        class="card is-btn"
        v-for="(item, index) in state.gameSummaryList"
        :key="index"
        @click="clickHandler(item)"
      >
        <div class="league">
          {{ item.leagueName }}
        </div>
        <div class="card-row">
          <div class="date">
            {{ formatTime(item.matchTime) }}({{ timeZoneUnitTxt }})
          </div>
          <a-statistic-countdown
            v-if="timeFilter !== 'history' && item.showCountDown !== false"
            title=""
            :value="deadLine(item, index)"
            value-style="color: #4d5772; font-size: 12px; margin-left:10px;"
            @finish="onFinish(item, index)"
          />
        </div>
        <div class="team">
          <!-- 主隊 -->
          <div class="team-info">
            <img
              class="w-4 h-4 mb-1"
              :class="{ 'rounded-full': item?.homeTeamLogo }"
              :src="item.homeTeamLogo? `${s3Base}/${item.homeTeamLogo}`: $requireSafe('icon/default-team.svg')"
              alt=""
            >
            <div class="club">
              {{ item.homeTeamName }}
            </div>
          </div>
          <div class="vs">
            VS
          </div>
          <!-- 客隊 -->
          <div class="team-info">
            <img
              class="w-4 h-4 mb-1"
              :class="{ 'rounded-full': item?.awayTeamLogo }"
              :src="item.awayTeamLogo? `${s3Base}/${item.awayTeamLogo}`: $requireSafe('icon/default-team.svg')"
              alt=""
            >
            <div class="club">
              {{ item.awayTeamName }}
            </div>
          </div>
        </div>
      </div>
    </d-scroll>

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
    <d-dialog
      v-model:visible="showGameDetail"
      :footer="null"
      :title="$t('components_pages_match_record_dialog_title')"
      :width="'90%'"
      v-if="showGameDetail"
    >
      <template #body>
        <game-detail :selected-game-detail="selectedGameDetail" />
      </template>
    </d-dialog>
  </div>
</template>
<script>
import {
  ref, reactive, onMounted, nextTick, inject, computed, watch,
} from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SportApi from '@/assets/js/api/sportApi.js';
import { isArray } from '@/assets/js/utils/utils';
import GameDetail from '@/components/_pages/match/leagueList/GameDetail';

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
    GameDetail,
  },
  setup(props) {
    // inject
    const validator = inject('$validator');

    // use
    const router = useRouter();
    const { t } = useI18n();

    // ref
    const scroll = ref(null);
    const isLastPage = ref(false);
    const isLoading = ref(true);
    const showGameDetail = ref(false);
    const selectedGameDetail = ref(undefined);
    const jsutChangeTabShow = ref(true);

    // reactive
    const state = reactive({
      gameSummaryList: [],
      gameSummaryParams: {
        timeType: 'matchTime',
        startTime: dayjs().startOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss'),
        endTime: dayjs().add(6, 'day').endOf('day').tz('Asia/Shanghai')
          .format('YYYY/MM/DD HH:mm:ss'),
        pageIndex: 1,
        gameStatus: [0, -5],
        leagueId: props.searchLeagueList,
        direction: 1,
      },
      historyGameSummaryParams: {
        timeType: 'matchTime',
        startTime: dayjs().subtract(6, 'day').startOf('day').tz('Asia/Shanghai')
          .format('YYYY/MM/DD HH:mm:ss'),
        endTime: dayjs().endOf('day').tz('Asia/Shanghai')
          .format('YYYY/MM/DD HH:mm:ss'),
        pageIndex: 1,
        leagueId: props.searchLeagueList,
      },
    });

    // computed
    const timeZoneUnitTxt = computed(() => validator.value?.timeZoneUnit);
    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);

    // methods
    const getGameSummary = async (params) => {
      isLoading.value = true;
      const res = await SportApi.getGameSummary(params);
      if (res.code === 200) {
        if (isArray(res.data.content)) {
          if (res.data.first) {
            state.gameSummaryList = res.data.content;
          } else {
            state.gameSummaryList = [...state.gameSummaryList, ...res.data.content];
          }

          isLastPage.value = res.data.last;
          nextTick(() => {
            if (scroll.value) {
              scroll.value.lastPageCheck(isLastPage.value);
              scroll.value.refresh();
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

          isLastPage.value = res.data.last;
          nextTick(() => {
            if (scroll.value) {
              scroll.value.lastPageCheck(isLastPage.value);
              scroll.value.refresh();
            }
          });
        }
      }
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };

    const pullingDown = async () => {
      if (props.timeFilter !== 'history') {
        state.gameSummaryParams.pageIndex = 1;
        await getGameSummary(state.gameSummaryParams);
      } else {
        state.historyGameSummaryParams.pageIndex = 1;
        await getGameSummaryRecord(state.historyGameSummaryParams);
      }

      scroll.value.finishPullDown();
      scroll.value.refresh();
    };

    const loadMoreGameSummary = async () => {
      jsutChangeTabShow.value = false;
      if (props.timeFilter !== 'history') {
        state.gameSummaryParams.pageIndex += 1;
        await getGameSummary(state.gameSummaryParams);
      } else {
        state.historyGameSummaryParams.pageIndex += 1;
        await getGameSummaryRecord(state.historyGameSummaryParams);
      }
    };

    const clickHandler = (selectedItem) => {
      if (props.timeFilter === 'history') {
        showGameDetail.value = true;
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
          await getGameSummary(state.gameSummaryParams);
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
        await getGameSummary(state.gameSummaryParams);
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
    };
  },
};
</script>

<style lang="postcss" scoped>
.all-match {
  top: 90px;
  right: 0;
  bottom: 60px;
  left: 0;

  ::v-deep(.scroll-content) {
    transform: translateX(0) translateY(-10px) translateZ(1px);
  }
}

.league-list {
  border: 0.3px solid #fffbf2;
  background: #21304e;
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

.card {
  border-radius: 5px;
  font-size: 12px;
  background: #142340;

  @apply w-full overflow-hidden mb-3;

  .league {
    color: #ffb83d;

    @apply mb-1 mx-2 my-1;
  }

  .date {
    @apply my-1;
  }

  &-row {
    @apply flex justify-between items-center my-1 px-2;

    ::v-deep(.ant-statistic-content-value) {
      color: #ff5a5a;
    }
  }

  .positive {
    color: #4aee91;
  }

  .team {
    background: #21304e;

    @apply flex px-10 py-2 w-full justify-between;

    &-info {
      flex: 0 0 30%;

      @apply flex flex-col items-center justify-between;

      .club {
        text-align: center;

        @apply h-full flex items-center;
      }
    }

    .vs {
      @apply flex items-center;
    }
  }
}
</style>
