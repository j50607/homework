<template>
  <div class="bet-detail">
    <van-pull-refresh
      v-if="state.currentBetList?.length > 0"
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
        @load="loadMoreBetDetail"
      >
        <ul
          class="betrecord-list"
          v-if="state.currentBetList?.length > 0"
        >
          <li
            class="betrecord-item"
            v-for="(item, index) in state.currentBetList"
            :key="index"
          >
            <div class="betrecord-basic">
              <div class="game-title">
                <span>{{
                  item.gameInfo[langHandle()].homeTeamName
                }}</span>
                <span> V.S.</span>
                <span>
                  {{ item.gameInfo[langHandle()].awayTeamName }}</span>
              </div>
              <div class="betrecord-flex">
                <div class="betrecord-line">
                  <div>
                    <div>{{ $t("components_pages_profile_team_user") }}</div>
                    <div>{{ item.account }}</div>
                  </div>
                  <div>
                    <div>{{ $t("components_pages_profile_team_status") }}</div>
                    <div :class="renderStatus(item).style">
                      {{ renderStatus(item).status }}
                    </div>
                  </div>
                </div>
                <div class="betrecord-line">
                  <div>
                    <div>{{ $t("components_pages_profile_team_time") }}</div>
                    <div>{{ formatTime(item).createdAt }}</div>
                  </div>
                  <div>
                    <div>{{ $t("components_pages_profile_team_amount") }}</div>
                    <div>{{ formatAmount(item.realAmount) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="betrecord-expand-btn is-btn"
              id="btn0"
              :class="{ 'show-details': item.isShowDetails }"
              @click="showDetailsHandle(item)"
            >
              <span>{{
                item.isShowDetails
                  ? $t("components_pages_profile_team_action2")
                  : $t("components_pages_profile_team_action1")
              }}</span>
              <CaretUpOutlined v-show="item.isShowDetails" />
              <CaretDownOutlined v-show="!item.isShowDetails" />
            </div>
            <div
              class="betrecord-panel"
              v-show="item.isShowDetails"
            >
              <div class="betrecord-flex">
                <div class="betrecord-line">
                  <div>
                    <div>{{ $t("components_pages_profile_team_item") }}</div>
                    <div>
                      {{ item.gameInfo[langHandle()].playTypeMName }}
                    </div>
                  </div>
                  <div>
                    <div>{{ $t("components_pages_profile_team_betOption") }}</div>
                    <div class="option-desc">
                      {{
                        item.gameInfo[langHandle()].playTypeSName
                      }}&nbsp;
                      {{ item.gameInfo[langHandle()].optionName }}&nbsp;
                      @{{ fmtPayRate(item.payRate) }}
                    </div>
                  </div>
                </div>
                <div class="betrecord-line">
                  <div>
                    <div>{{ $t("components_pages_profile_team_betNo") }}</div>
                    <div class="flex">
                      <div>{{ item.betNo }}</div>
                      <img
                        :src="require('@/assets/img/icon/copy-btn.svg')"
                        alt="copy"
                        class="copy is-btn"
                        @click="copyByText(item.betNo)"
                      >
                    </div>
                  </div>
                  <div>
                    <div>{{ $t("components_pages_profile_team_gameTime") }}</div>
                    <div>{{ formatTime(item).gameInfo }}({{ timeZoneUnitTxt }})</div>
                  </div>
                </div>
              </div>
              <div
                v-show="showOpenGameDetail(item.status)"
                class="betrecord-row"
              >
                <div
                  class="betrecord-text-game-details"
                  v-text="$t('components_pages_profile_team_gameDetail')"
                  @click="openGameDetails(item)"
                />
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>

    <div
      v-else
      class="empty"
    >
      <img
        class="empty-icon"
        :src="$requireSafe(`icon/no-data.svg`)"
      >
      <div class="empty-text">
        {{ $t("components_pages_profile_team_emptyMessage") }}
      </div>
    </div>
  </div>
  <!-- 賽事結果彈窗 -->
  <game-details-modal
    v-model:isShow="state.showGameDetail"
    :selected-game-detail="state.selectedGameDetail"
    @cancel="toggleGamesDetailModal(false)"
  />
</template>

<script>
import {
  reactive, watch, computed, onMounted,
} from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import Cookie from 'js-cookie';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import GameDetailsModal from '@/components/_pages/profile/Team/Detail/GameDetailsModal/index.vue';
import { copyByText, fmtPayRate, timeZoneUnit2 } from '@/assets/js/utils/utils';
import SportApi from '@/assets/js/api/sportApi';
import VanList from '@/components/vantLib/list';
import VanPullRefresh from '@/components/vantLib/pull-refresh';

export default {
  components: {
    CaretUpOutlined,
    CaretDownOutlined,
    GameDetailsModal,
    VanList,
    VanPullRefresh,
  },

  props: {
    betList: {
      type: Object,
      default: () => {},
    },
    searchKey: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    detailType: {
      type: Array,
      default: () => [],
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    scrollFinish: {
      type: Boolean,
      default: false,
    },
    scrollLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['detailPull', 'detailLoadMore'],
  setup(props, { emit }) {
    // i18n
    const { t } = useI18n();

    // reactive
    const state = reactive({
      // currentBet: props.betList,
      currentBetList: props.betList,
      selectedGameDetail: undefined,
      lang: Cookie.get('language'),
      showGameDetail: false,
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
    const timeZoneUnitTxt = computed(() => timeZoneUnit2());

    // watch
    watch(
      () => props.betList, () => {
        // state.currentBet = props.betList;
        state.currentBetList = props.betList;
        console.log(props.betList);
      },
    );

    watch(() => props.scroll, () => {
      // state.isListLoading = props.scroll;
      state.isListRefreshing = props.scroll;
      state.isListFinished = props.scrollFinish;
      console.log('hi');
    });

    watch(() => props.scrollFinish, () => {
      state.isListFinished = props.scrollFinish;
      console.log('finish');
    });

    watch(() => props.scrollLoading, () => {
      state.isListLoading = props.scrollLoading;
      console.log('loading');
    });

    // method

    // const refreshData = () => {
    //   state.pageData.pageIndex = 1;
    //   state.pageData.isLastPage = false;
    //   state.pageData.isFirstPage = true;
    //   state.currentBetList = [];
    //   state.gameSummaryParams.pageIndex = 1;
    //   state.historyGameSummaryParams.pageIndex = 1;
    // };
    // const getSubBetOrderStatistic = async () => {
    //   const params = {
    //     start: dayjs(props.startDate).format('YYYY/MM/DD HH:mm:ss'),
    //     end: dayjs(props.endDate).format('YYYY/MM/DD HH:mm:ss'),
    //     account: '',
    //     status: props.detailType,
    //   };
    //   const { code, data } = await SportApi.getSubBetOrderStatistic(params);
    //   if (code === 200) {
    //     const newData = data?.content?.map((item) => ({ ...item, isShowDetails: false }));
    //     data.content = props.searchKeyword
    //       ? newData.filter((e) => e.account === props.searchKeyword)
    //       : newData;
    //     // state.currentBetList = data.content;
    //     console.log(data);
    //   }
    //   return data;
    // };

    const renderStatus = (item) => {
      switch (item.status) {
        case 1:
          return { status: t('components_pages_profile_team_filterPopup_status1'), style: '' };
        case 2:
          if (item.winning) {
            return { status: `+${item.estimateProfit}`, style: 'win' };
          }
          return { status: `-${item.realAmount}`, style: 'lose' };

        case 5:
          return {
            status: t('components_pages_profile_team_filterPopup_status3'),
            style: 'cancel',
          };
        case 6:
          return { status: t('components_pages_profile_team_filterPopup_status4'), style: '' };

        default:
          return '';
      }
    };

    const langHandle = () => {
      if (state.lang !== 'zh_cn') return 'en_us';
      return 'zh_cn';
    };
    const formatAmount = (amount) => {
      const rule = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
      return Math.abs(amount)
        .toString()
        .replace(rule, ',');
    };
    const formatTime = (item) => ({
      createdAt: dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss'),
      gameInfo: dayjs(+item.gameInfo[langHandle()].matchTime).format('YYYY/MM/DD HH:mm'),
    });

    const showDetailsHandle = (item) => {
      item.isShowDetails = !item.isShowDetails;
    };

    const toggleGamesDetailModal = (isModalShow = false) => {
      state.showGameDetail = isModalShow;
    };

    const showOpenGameDetail = (status) => {
      if (status === 2) {
        return true;
      }
      return false;
    };

    const openGameDetails = async (item) => {
      const { code, data } = await SportApi.getGameDetail({
        issueNo: item.issueNo,
      });
      if (code === 200) {
        const detail = {};

        const {
          leagueName,
          homeTeamName,
          awayTeamName,
          matchTime,
          homeTeamScore,
          awayTeamScore,
          homeTeamHalfScore,
          awayTeamHalfScore,
          homeTeamLogo,
          awayTeamLogo,
        } = data;

        if (data) {
          detail.leagueName = leagueName;
          detail.homeTeamName = homeTeamName;
          detail.awayTeamName = awayTeamName;
          detail.matchTime = matchTime;
          detail.homeTeamScore = homeTeamScore;
          detail.awayTeamScore = awayTeamScore;
          detail.homeTeamHalfScore = homeTeamHalfScore;
          detail.awayTeamHalfScore = awayTeamHalfScore;
          detail.homeTeamLogo = homeTeamLogo;
          detail.awayTeamLogo = awayTeamLogo;
        }
        state.selectedGameDetail = detail;
        toggleGamesDetailModal(true);
      }
    };

    // const getGameSummary = async (params, isStartFromStartOfDay = true) => {
    //   state.isLoading = true;
    //   const res = await SportApi.getGameSummary(params, isStartFromStartOfDay);
    //   if (res.code === 200) {
    //     if (isArray(res.data.content)) {
    //       if (res.data.first) {
    //         state.gameSummaryList = res.data.content;
    //       } else {
    //         state.gameSummaryList = [...state.gameSummaryList, ...res.data.content];
    //       }

    //       // isLastPage.value = res.data.last;
    //       state.pageData.isLastPage = res.data.last;
    //       state.pageData.isFirstPage = res.data.first;
    //     }
    //   }
    //   setTimeout(() => {
    //     state.isLoading = false;
    //   }, 500);
    // };

    // const getGameSummaryRecord = async (params) => {
    //   state.isLoading = true;
    //   const res = await SportApi.getGameSummaryRecord(params);
    //   if (res.code === 200) {
    //     if (isArray(res.data.content)) {
    //       if (res.data.first) {
    //         state.gameSummaryList = res.data.content;
    //       } else {
    //         state.gameSummaryList = [...state.gameSummaryList, ...res.data.content];
    //       }

    //       state.pageData.isLastPage = res.data.last;
    //       state.pageData.isFirstPage = res.data.first;
    //     }
    //   }
    //   setTimeout(() => {
    //     state.isLoading = false;
    //   }, 500);
    // };
    const loadMoreBetDetail = () => {
      emit('detailLoadMore');
    };

    // const loadMoreBetDetail = async (isLoadMore = true) => {
    //   // jsutChangeTabShow.value = false;
    //   if (props.timeFilter !== 'history') {
    //     if (isLoadMore) {
    //       state.gameSummaryParams.pageIndex += 1;
    //       state.pageData.pageIndex += 1;
    //     }

    //     if (state.isListRefreshing) {
    //       state.gameSummaryList = [];
    //       state.isListRefreshing = false;
    //     }

    //     if (props.timeFilter === 'all' || props.timeFilter === 'today') {
    //       await getGameSummary(state.gameSummaryParams, false);
    //     } else {
    //       await getGameSummary(state.gameSummaryParams);
    //     }

    //     state.isListLoading = false;

    //     if (state.pageData.isLastPage) {
    //       state.isListFinished = true;
    //     }
    //   } else {
    //     if (isLoadMore) {
    //       state.historyGameSummaryParams.pageIndex += 1;
    //       state.pageData.pageIndex += 1;
    //     }

    //     if (state.isListRefreshing) {
    //       state.gameSummaryList = [];
    //       state.isListRefreshing = false;
    //     }
    //     await getGameSummaryRecord(state.historyGameSummaryParams);

    //     state.isListLoading = false;

    //     if (state.pageData.isLastPage) {
    //       state.isListFinished = true;
    //     }
    //   }
    // };
    const pullingDown = async () => {
      // refreshData();
      // 清空列表数据
      // state.isListFinished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // state.isListLoading = true;
      // await loadMoreBetDetail(false);
      emit('detailPull');
    };
    onMounted(() => {
      console.log(props.beList);
    });

    return {
      state,
      timeZoneUnitTxt,
      renderStatus,
      showDetailsHandle,
      formatAmount,
      formatTime,
      copyByText,
      fmtPayRate,
      showOpenGameDetail,
      openGameDetails,
      toggleGamesDetailModal,
      langHandle,
      pullingDown,
      loadMoreBetDetail,
      // getSubBetOrderStatistic,
    };
  },
};
</script>

<style lang="scss" scoped>
.bet-detail {
  height: calc(100% - 87px);

  .betrecord {
    &-item {
      position: relative;
      margin: 15px auto 45px;
      font-size: 12px;
    }

    &-basic,
    &-panel {
      margin: auto 15px;
      padding: 15px;
      background-color: #fff;
      box-shadow: 0 2px 4px #4d57721a;

      .game-title {
        margin-bottom: 10px;
        color: #7a5605;
      }
    }

    &-flex {
      display: flex;
      align-items: center;
      width: 100%;
      white-space: nowrap;

      > div:first-child {
        width: 50%;
      }

      .betrecord-line {
        > div:last-child {
          margin-top: 10px;
        }

        .cancel {
          color: #bdbdbd;
        }

        .win {
          color: #38c522;
        }

        .lose {
          color: #f00;
        }
      }
    }

    &-basic {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &-panel {
      border-top: 1px solid #4d57721a;

      .betrecord-flex {
        .option-desc {
          color: #7a5605;
        }

        .copy {
          width: 16px;
          height: 16px;
          margin-left: 10px;
        }
      }
    }

    &-text-game-details {
      margin-top: 10px;
      color: #0e88f5;
      text-decoration: underline;
      cursor: pointer;
    }

    &-expand-btn {
      position: absolute;
      right: 0;
      bottom: -30px;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      margin: auto 15px;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
      background-color: #ecf2f8;
      box-shadow: 0 2px 4px #4d57721a;

      span {
        padding-right: 5px;
      }
    }
  }

  .empty {
    margin-top: 60px;

    &-icon {
      width: 60px;
      margin: 10px auto;
    }

    &-text {
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
