<template>
  <d-loading :loading="isLoading" />
  <div class="all-match mt-2 absolute">
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
        class="league-list mx-3  my-2 p-3  rounded flex justify-between content-center"
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
                :src="$requireSafe('icon/icon-vn.svg')"
                alt=""
                class="mr-1 w-3.5 h-3.5"
              >
              {{ item.homeTeamName }}
            </div>
            <div class="vs mb-1 pl-8">
              vs
            </div>
            <div class="team2 flex">
              <img
                :src="$requireSafe('icon/icon-th.svg')"
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
            <!-- :value="deadLine" -->
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
        <div class="text-center text-xs text-normal">
          <p class="mb-1">
            {{ selectedGameDetail.leagueName }}
          </p>
          <p class="mb-1">
            {{ selectedGameDetail.homeTeamName }} &nbsp;&nbsp;vs&nbsp;&nbsp; {{ selectedGameDetail.awayTeamName }}
          </p>
          <p class="mb-4">
            {{ formatTime(selectedGameDetail.matchTime) }}({{ timeZoneUnitTxt }})
          </p>
          <p class="text-primary">
            {{ $t('components_pages_match_record_full_and_half') }} &nbsp;&nbsp;&nbsp; {{ selectedGameDetail.homeTeamScore }}:{{ selectedGameDetail.awayTeamScore }} / {{ selectedGameDetail.homeTeamHalfScore }}:{{ selectedGameDetail.awayTeamHalfScore }}
          </p>
        </div>
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
import SportApi from '@/assets/js/api/sportApi.js';
import { isArray } from '@/assets/js/utils/utils';

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
  setup(props) {
    // inject
    const validator = inject('$validator');

    // use
    const router = useRouter();

    // ref
    const scroll = ref(null);
    const isLastPage = ref(false);
    const isLoading = ref(false);
    const showGameDetail = ref(false);
    const selectedGameDetail = ref(undefined);
    // const deadLine = Date.now() + 1000 * 60 * 60 * 0.01;

    // reactive
    const state = reactive({
      gameSummaryList: [],
      gameSummaryParams: {
        timeType: 'matchTime',
        startTime: dayjs().startOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss'),
        endTime: dayjs().add(6, 'day').endOf('day').tz('Asia/Shanghai')
          .format('YYYY/MM/DD HH:mm:ss'),
        pageIndex: 1,
        gameStatus: [0],
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
    };
  },
};
</script>

<style lang="postcss" scoped>
.all-match {
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
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
