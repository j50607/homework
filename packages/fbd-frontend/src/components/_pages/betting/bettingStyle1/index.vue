<template>
  <div class="h-full">
    <d-header-row
      right-components="service"
    >
      <template #middle>
        <div
          class="title-container"
          @click="openLeagueDetail"
        >
          <span class="title-text">{{ state.currentGameData?.leagueName || '' }}</span>
          <div class="title-icon">
            <img
              class="arrow"
              :src="$requireSafe(`icon/triangle-bottom-white.svg`)"
            >
          </div>
        </div>
      </template>
    </d-header-row>

    <div class="betting">
      <d-loading :loading="state.isLoading" />
      <div class="betting-info">
        <div class="betting-info-bg">
          <img
            :src="$requireSafe(`betting/style${siteStyle}/bg.png`)"
          >
        </div>

        <div class="betting-info-container">
          <!-- logo -->
          <div class="betting-team-row mb-0.5">
            <!-- H -->
            <div class="betting-team-container px-betting-team-container">
              <div class="betting-team-logo betting-info-text">
                <img
                  v-if="state.currentGameData?.homeTeamLogo"
                  :src="`${s3Base}/${state.currentGameData?.homeTeamLogo}`"
                >
                <img
                  v-else
                  :src="$requireSafe('icon/default-team.svg')"
                >
              </div>
            </div>
            <!-- A -->
            <div class="betting-team-container px-betting-team-container">
              <div class="betting-team-logo betting-info-text">
                <img
                  v-if="state.currentGameData?.awayTeamLogo"
                  :src="`${s3Base}/${state.currentGameData?.awayTeamLogo}`"
                >
                <img
                  v-else
                  :src="$requireSafe('icon/default-team.svg')"
                >
              </div>
            </div>
          </div>

          <!-- name -->
          <div class="betting-team-row mb-1">
            <!-- H -->
            <div class="betting-team-container px-betting-team-container betting-team-text-container ml-2 mr-8">
              <div
                class="betting-team-name betting-info-text betting-info-text-em"
                :class="{ 'betting-info-text-em-xs': !isChinese }"
              >
                {{ state.currentGameData?.homeTeamName || '' }}{{ state.currentGameData?.homeTeamName && `(${renderHostText})` }}
              </div>
            </div>
            <!-- A -->
            <div class="betting-team-container px-betting-team-container betting-team-text-container mr-2 ml-8">
              <div
                class="betting-team-name betting-info-text betting-info-text-em"
                :class="{ 'betting-info-text-em-xs': !isChinese }"
              >
                {{ state.currentGameData?.awayTeamName || '' }}
              </div>
            </div>
          </div>

          <!-- score -->
          <div class="betting-team-row">
            <!-- H -->
            <div class="betting-team-container px-betting-team-container">
              <div class="betting-team-score betting-info-text betting-info-text-em">
                {{ 0 }}
              </div>
            </div>
            <!-- A -->
            <div class="betting-team-container px-betting-team-container">
              <div class="betting-team-score betting-info-text betting-info-text-em">
                {{ 0 }}
              </div>
            </div>
          </div>
        </div>

        <div class="betting-time">
          <div class="betting-time-item betting-info-text">
            {{ renderDate(state.currentGameData?.matchTIme) }}
          </div>
          <div class="betting-time-item betting-time-item-em betting-info-text">
            {{ renderTime(state.currentGameData?.matchTIme) }}
          </div>
          <div class="betting-time-item betting-info-text">
            {{ state.currentGameData?.matchTIme && `(${timeZone})` }}
          </div>

          <div class="betting-deadline">
            <div class="betting-text betting-text-sm betting-deadline-text">
              {{ !state.isGameClosed ? $t('views_betting_info_deadline') : $t('views_betting_info_deadlineClosed') }}
            </div>
            <a-statistic-countdown
              v-if="!state.isGameClosed"
              :style="deadlineStyleList"
              :value="state.bettingDeadline"
              @finish="handleBettingCountdownEnded"
            />
          </div>
        </div>
      </div>

      <div class="betting-main">
        <div class="betting-tab is-btn">
          <div
            v-for="(item, idx) in state.betOptionData"
            :key="`playTypeS[${idx}]`"
            class="betting-tab-item"
            :class="{ 'betting-tab-item-active': state.currentPlayTypeS === item.playTypeS }"
            @click="!state.isBetItemSkeletonShow ? changePlayTypeS(item, true, true) : null"
          >
            <span class="betting-tab-text">{{ item?.playTypeSName }}</span>
          </div>
        </div>

        <div class="betting-main-container">
          <template v-if="!state.isGameClosed">
            <div class="betting-sum">
              <div
                class="betting-sum-text flex-1 mr-6"
                :class="{ 'is-btn': !state.isBetItemSkeletonShow }"
                @click="state.isBetItemSkeletonShow ? null : toggleSumPopup(true)"
              >
                <div
                  class="betting-text betting-text-wrap"
                >
                  <a-skeleton
                    :loading="state.isBetItemSkeletonShow"
                    :active="true"
                    :paragraph="{ 'rows': 1 }"
                    :title="false"
                  >
                    <span class="betting-text-sm">{{ $t('views_betting_statistic_popup_sum') }}</span>
                    <img
                      class="betting-text-img"
                      :src="$requireSafe(`betting/style${siteStyle}/sum.svg`)"
                    >
                  </a-skeleton>
                </div>
                <div
                  class="betting-text betting-text-left mt-1"
                  :class="{ 'text-win': state.gameSum?.sum > 0 }"
                >
                  <a-skeleton
                    :loading="state.isBetItemSkeletonShow"
                    :active="true"
                    :paragraph="{ 'rows': 1 }"
                    :title="false"
                  >
                    {{ numWithCommas(state.gameSum?.sum || 0) }}
                  </a-skeleton>
                </div>
              </div>
              <div
                class="betting-sum-countdown"
                :class="{ 'is-btn': !state.isBetItemSkeletonShow }"
              >
                <a-skeleton
                  :loading="state.isBetItemSkeletonShow"
                  :active="true"
                  :paragraph="false"
                  :title="false"
                  :avatar="{ shape: 'circle', size: 36 }"
                >
                  <d-progress-bar
                    v-if="!state.isBetItemSkeletonShow"
                    :time="15"
                    :running="state.isHandlePolling"
                    :has-click-refresh="true"
                    @seconds="receivedProgressTimer"
                    @finish="handleProgressEnded"
                  />
                </a-skeleton>
              </div>
            </div>

            <ul class="betting-list">
              <li
                v-for="(item, idx) in state.currentGameData?.betOptionList"
                :key="`availableAmount[${idx}]`"
                class="betting-item"
                :class="{ 'is-btn': !item?.isFulled && item?.payRate && !state.isBetItemSkeletonShow, 'betting-item-loading': state.isBetItemSkeletonShow }"
                @click="isBettingNotAllowed(item) || state.isBetItemSkeletonShow ? null : toggleBettingPopup(true, item, true)"
              >
                <a-skeleton
                  :loading="state.isBetItemSkeletonShow"
                  :active="true"
                  :paragraph="false"
                  :title="false"
                  :avatar="{ shape: 'square', size: 102 }"
                >
                  <div class="betting-digit">
                    <div class="betting-text-sm betting-score">
                      <div class="betting-goal">
                        <img
                          :src="$requireSafe(`betting/style${siteStyle}/goal.svg`)"
                          alt=""
                        >
                      </div>
                      <span class="relative">{{ getSportScore(item?.option) }}</span>
                    </div>
                    <div class="betting-text-sm betting-percent">
                      {{ fmtPayRate(item?.payRate ?? 0) }}
                    </div>
                  </div>
                  <div class="betting-amount">
                    <div class="betting-text-sm">
                      {{ $t('views_betting_main_availableAmount') }}
                    </div>
                    <div class="betting-text-sm">
                      {{ item?.leftAmount ?? 0 }}
                    </div>
                  </div>
                  <div
                    v-show="isBettingNotAllowed(item)"
                    class="betting-overlay"
                  >
                    <div
                      v-show="item?.isFulled"
                      class="betting-text-sm betting-score betting-overlay-text"
                    >
                      {{ getSportScore(item?.option) }}
                    </div>
                    <div class="betting-text-sm betting-overlay-text">
                      {{ renderMaintainText(item) }}
                    </div>
                  </div>
                </a-skeleton>
              </li>
            </ul>
          </template>

          <template v-else>
            <div class="betting-empty pt-10">
              <figure class="betting-empty-icon">
                <img
                  class="transform rotate-180 w-20 mx-auto mb-4"
                  :src="$requireSafe(`betting/style${siteStyle}/desc.svg`)"
                >
                <figcaption class="betting-empty-info">
                  <div class="betting-text betting-empty-text mb-2">
                    {{ $t('views_betting_main_empty') }}
                  </div>
                  <div
                    class="betting-text is-btn betting-empty-link text-xs text-link"
                    @click="goPage('match')"
                  >
                    {{ $t('views_betting_main_back') }}
                  </div>
                </figcaption>
              </figure>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 交易量明細 -->
    <d-popup
      v-model:value="state.isSumPopupShow"
      position="bottom"
      :round="true"
      :title="$t('views_betting_statistic_popup_title')"
      class="popup"
      custom-content-padding="0"
    >
      <div class="popup-subtitle">
        <span class="popup-text">
          {{ $t('views_betting_statistic_popup_sum') }}
        </span>
        <span class="popup-text text-positive ml-2">
          {{ numWithCommas(state.gameSum?.sum || 0) }}
        </span>
      </div>

      <div class="popup-statistic">
        <template v-if="state.gameSum?.optionList?.length">
          <div
            v-for="(item, idx) in state.gameSum?.optionList"
            :key="`optionList[${idx}]`"
            class="popup-data"
          >
            <div class="popup-text">
              {{ getSportScore(item?.option) }}
            </div>
            <div class="popup-bar">
              <div
                class="popup-progress"
                :style="`width: ${renderProgress(item?.percentage || 0)}%`"
              />
              <div class="popup-digit">
                {{ numWithCommas(item?.totalBetAmount) }}
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <figure class="betting-empty-icon">
            <img
              class="w-20 mx-auto mb-2"
              :src="$requireSafe(`betting/style${siteStyle}/no-data.svg`)"
            >
            <figcaption class="betting-empty-info">
              <div class="betting-text betting-empty-text mb-2">
                {{ $t('common_noData') }}
              </div>
            </figcaption>
          </figure>
        </template>
      </div>
    </d-popup>
    <!-- 投注 -->
    <d-popup
      v-model:value="state.isBettingPopupShow"
      position="bottom"
      :round="true"
      :title="$t('views_betting_main_popup_title')"
      :duration="state.popupDuration"
    >
      <div class="popup-piece">
        <div class="popup-text popup-row">
          {{ state.currentGameData?.leagueName }}
        </div>
        <div class="popup-text popup-row">
          {{ dayjs(state.currentGameData?.matchTIme).format('YYYY-MM-DD HH:mm') }}({{ timeZone }})
        </div>
        <div class="popup-text popup-text-em popup-row">
          {{ state.currentGameData?.homeTeamName }} V.S. {{ state.currentGameData?.awayTeamName }}
        </div>
      </div>

      <div class="popup-piece">
        <div class="popup-text popup-row">
          {{ $t('views_betting_main_popup_option') }}
        </div>
        <div class="popup-text popup-row">
          {{ state.currentGameData?.playTypeMName }} {{ state.currentGameData?.playTypeSName }} {{ getSportScore(state.currentBetItem?.option) }}
        </div>
      </div>

      <div class="popup-piece">
        <div class="popup-row popup-expand">
          <div class="popup-text">
            {{ $t('views_betting_main_popup_betAmount') }}
          </div>
          <div class="popup-text">
            {{ $t('views_betting_main_popup_balance') }} {{ numWithCommas(balance) }}
          </div>
        </div>
        <div class="popup-row">
          <a-input-number
            v-model:value="state.betAmount"
            v-positive-places
            :placeholder="$t('views_betting_main_popup_betAmountPlaceholder')"
            class="popup-input"
            :class="{'popup-input-error': showInputNotify}"
            @change="state.startNotify = true"
          />
          <em
            v-show="showInputNotify"
            v-text="renderBetAmountNotify"
            class="popup-input-notify"
          />
        </div>
      </div>

      <div class="popup-piece popup-grid">
        <div
          v-for="(item, idx) in state.amountList"
          :key="`amountList${idx}`"
          class="popup-amount is-btn"
          :class="{ 'popup-amount-active': handlePopupActive(item.val) }"
          v-text="item.txt"
          @click="quickSelect(item.val)"
        />
      </div>

      <div class="popup-piece popup-preview">
        <div class="popup-preview-prefix" />
        <div class="popup-text popup-text-profit popup-preview-item">
          {{ $t('views_betting_main_popup_profit') }}
        </div>
        <div class="popup-preview-prefix" />
        <div class="popup-text popup-preview-item">
          {{ $t('views_betting_main_popup_charge') }}
        </div>
        <div class="popup-preview-prefix" />
        <div class="popup-text popup-text-expect popup-preview-item">
          {{ $t('views_betting_main_popup_expectedProfit') }}
        </div>
        <div class="popup-text popup-preview-prefix">
          X
        </div>
        <div class="popup-text popup-preview-item">
          {{ fmtPayRate(state.currentBetItem?.payRate ?? 0) }}
        </div>
        <div class="popup-text popup-preview-prefix">
          -
        </div>
        <div class="popup-text popup-preview-item">
          {{ convertRate(state.bettingConfig?.bettingFee) }}
        </div>
        <div class="popup-text popup-preview-prefix">
          =
        </div>
        <div class="popup-text popup-text-expect popup-preview-item">
          <d-locale
            class="popup-text popup-text-expect popup-preview-item"
            v-slot="{ locale }"
          >
            {{ numWithCommas(renderExpectProfit(state.currentBetItem?.payRate)) }}
            <span v-if="locale === 'zh_cn'">{{ $t('views_betting_main_popup_dollars') }}</span>
          </d-locale>
        </div>
      </div>

      <div class="popup-piece">
        <d-button
          v-show="state.isHandlePolling"
          type="primary"
          :block="true"
          :disabled="lockBettingBtn"
          @click="handleBetting"
        >
          {{ $t('views_betting_main_popup_btnAction') }}({{ state.pollingTimer }})
        </d-button>
        <d-button
          v-show="!state.isHandlePolling"
          type="primary"
          :block="true"
          :disabled="false"
          @click="refreshData"
        >
          {{ $t('views_betting_main_popup_btnAction2') }}
        </d-button>
      </div>
    </d-popup>

    <!-- 所属联赛赛事弹窗 -->
    <d-popup
      v-model:value="state.isLeaguePopupShow"
      position="bottom"
      :round="true"
      :title="state.currentGameData?.leagueName || ''"
      class="popup league-detail"
      style="max-height: 90%;"
      custom-content-padding="0"
    >
      <d-loading
        :loading="isleagueLoading"
      />
      <div class="all-match">
        <van-pull-refresh
          v-if="!isListEmpty"
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
            @load="loadMoreGameSummary"
          >
            <div
              class="league-list mx-3  my-2 p-3  rounded flex justify-between content-center is-btn"
              v-for="(item, index) in state.gameSummaryList"
              :key="index"
              @click="clickHandler(item)"
            >
              <div class="content-left">
                <div class="game-compet text-xs text-normal flex items-center">
                  <div class="team1 flex items-center column">
                    <img
                      :src="item.homeTeamLogo? `${s3Base}/${item.homeTeamLogo}`: $requireSafe('icon/default-team.svg')"
                      class="logo mb-2"
                    >
                    {{ item.homeTeamName }}
                  </div>
                  <div class="vs mb-1">
                    vs
                  </div>
                  <div class="team2 flex items-center column">
                    <img
                      :src="item.awayTeamLogo? `${s3Base}/${item.awayTeamLogo}`: $requireSafe('icon/default-team.svg')"
                      class="logo mb-2"
                    >
                    {{ item.awayTeamName }}
                  </div>
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
            class="m-auto"
          >
          <p class="text-sm text-normal">
            {{ $t('components_pages_match_noData') }}
          </p>
        </div>
      </div>
    </d-popup>

    <d-footer-row />
  </div>
</template>

<script>
import {
  ref, reactive, computed, watch, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import NP from 'number-precision';
import Cookie from 'js-cookie';
import {
  timeZoneUnit2, numWithCommas, getSportScore, convertToCst, isNumber, isArray, floorToDigit, fmtPayRate,
} from '@/assets/js/utils/utils';
import SportApi from '@/assets/js/api/sportApi';
import MemberApi from '@/assets/js/api/memberApi';
import VanList from '@/components/vantLib/list';
import VanPullRefresh from '@/components/vantLib/pull-refresh';

dayjs.extend(duration);

export default {
  components: {
    VanList,
    VanPullRefresh,
  },
  setup() {
    // use
    const store = useStore();
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();

    // ref
    const isleagueLoading = ref(false);
    // reactive
    const state = reactive({
      issueNo: '',
      currentPlayTypeS: 1, // 當前次玩法(全場/半場)
      currentPlayTypeSName: '', // 當前次玩法名稱(全場/半場)
      currentGameData: {},
      currentQuickAmount: undefined, // 當前投注 popup 快选金额
      bettingDeadline: '', // 當前賽事下單截止時間
      mainCountdown: 15, // 倒數15秒，時間到重取資料
      gameSum: {
        sum: 0, // 總成交量
        optionList: [], // 交易量明细
      },
      betOptionData: [], // 所有投注選項資料
      caculateLogData: [],
      currentBetItem: {}, // 當前投注項目(betting popup 開啟的項目)
      isSumPopupShow: false,
      isBettingPopupShow: false,
      isLeaguePopupShow: false,
      betAmount: 1, // 投注金额 input
      amountList: [ // 快選金額，先寫死
        {
          txt: 100,
          val: 100,
        },
        {
          txt: 200,
          val: 200,
        },
        {
          txt: 300,
          val: 300,
        },
        {
          txt: 500,
          val: 500,
        },
        {
          txt: 1000,
          val: 1000,
        },
        {
          txt: 5000,
          val: 5000,
        },
        {
          txt: 10000,
          val: 10000,
        },
        {
          txt: t('views_betting_statistic_popup_all'),
          val: 'all',
        },
      ],
      isGameClosed: false, // 該賽事是否關閉
      pollingTimer: 0, // 投注頁的倒數15秒計時
      isHandlePolling: false, // 是否啟用投注頁的倒數
      isBettingProcessing: false, // 按下下單按鈕，call betting api 是否還在處理中
      bettingConfig: {
        bettingFee: 0.02,
        gameCode: '',
        maxBet: 100000,
        minBet: 10,
      }, // 投注設定
      isLoading: false,
      startNotify: false,
      isBetItemSkeletonShow: false, // 是否顯示投注項目 Skeleton
      popupDuration: 0.5,
      gameSummaryList: [],
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
    const siteStyle = computed(() => store.getters.siteStyle);
    const timeZone = computed(() => timeZoneUnit2());
    const language = computed(() => store.state.info.language);
    const isChinese = computed(() => language.value === 'zh_cn' || language.value === 'zh_tw');
    const isListEmpty = computed(() => !state.gameSummaryList?.length && !state.isListLoading && !isleagueLoading.value);
    // 用户余额
    const balance = computed(() => store.state.user.balance || 0);
    const isLogin = computed(() => Cookie.get('_tianyin_token') && store.state.user?.isLogin);
    const deadlineStyleList = computed(() => {
      const base = 10 * 60 * 1000;
      if (state.bettingDeadline - dayjs() > base) return {};
      return {
        color: 'var(--negative-color)',
      };
    });

    const isBalanceNotEnough = computed(() => state.betAmount > balance.value);
    // 超過限額
    const greaterThanLimit = computed(() => {
      if (!isNumber(state.betAmount)) {
        return false;
      }
      return state.betAmount > (Number(state.bettingConfig?.maxBet) ?? 0);
    });

    // 少於限額
    const lessThanLimit = computed(() => {
      if (!isNumber(state.betAmount)) {
        return false;
      }
      return state.betAmount < (Number(state.bettingConfig?.minBet) ?? 0);
    });

    const renderBetAmountNotify = computed(() => {
      if (isBalanceNotEnough.value) return t('views_profile_balanceNotEnough');

      if (lessThanLimit.value || greaterThanLimit.value) {
        return t('views_betting_main_popup_notify1', { minBet: state.bettingConfig?.minBet ?? 0, maxBet: state.bettingConfig?.maxBet ?? 0 });
      }

      return '';
    });

    const showInputNotify = computed(() => isBalanceNotEnough.value || greaterThanLimit.value || lessThanLimit.value);
    const lockBettingBtn = computed(() => !state.betAmount || state.isBettingProcessing || isBalanceNotEnough.value || showInputNotify.value);

    const renderHostText = computed(() => (isChinese.value ? t('views_betting_host') : 'H'));

    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);

    // methods
    const goPage = (name, params = {}, query = {}) => {
      router.push({
        name,
        params,
        query,
      });
    };

    const refreshLeagueData = () => {
      state.pageData.pageIndex = 1;
      state.pageData.isLastPage = false;
      state.pageData.isFirstPage = true;
      state.gameSummaryList = [];
    };

    const getGameSummary = async (params, isStartFromStartOfDay = true) => {
      isleagueLoading.value = true;
      const res = await SportApi.getGameSummary(params, isStartFromStartOfDay);
      if (res.code === 200) {
        if (isArray(res.data.content)) {
          if (res.data.first) {
            state.gameSummaryList = res.data.content;
          } else {
            state.gameSummaryList = [...state.gameSummaryList, ...res.data.content];
          }

          state.pageData.isLastPage = res.data.last;
          state.pageData.isFirstPage = res.data.first;
        }
      }
      setTimeout(() => {
        isleagueLoading.value = false;
      }, 500);
    };

    const loadMoreGameSummary = async (isLoadMore = true) => {
      if (isLoadMore) {
        state.pageData.pageIndex += 1;
      }

      if (state.isListRefreshing) {
        state.gameSummaryList = [];
        state.isListRefreshing = false;
      }
      await getGameSummary({
        timeType: 'matchTime',
        gameStatus: [0, -5],
        leagueId: [Number(state.currentGameData.leagueId)],
        pageIndex: state.pageData.pageIndex,
        startTime: dayjs().format('YYYY/MM/DD HH:mm:ss'),
        endTime: dayjs().add(6, 'day').format('YYYY/MM/DD HH:mm:ss'),
        direction: 1,
      }, false);
      state.isListLoading = false;

      if (state.pageData.isLastPage) {
        state.isListFinished = true;
      }
    };

    const pullingDown = async () => {
      refreshLeagueData();
      // 清空列表数据
      state.isListFinished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.isListLoading = true;

      await loadMoreGameSummary(false);
    };

    // 遊客轉導至登入頁
    const handleLoginFirst = () => {
      window.$vue.$message.info(window.$vue.$t('common_loginFirst'));
      goPage('loginAndRegister');
    };

    const toggleSumPopup = (isShow = true) => {
      state.isSumPopupShow = isShow;
    };
    // 开启
    const openLeagueDetail = async () => {
      state.isLeaguePopupShow = true;
      await getGameSummary({
        timeType: 'matchTime',
        gameStatus: [0, -5],
        leagueId: [Number(state.currentGameData.leagueId)],
        pageIndex: 1,
        startTime: dayjs().format('YYYY/MM/DD HH:mm:ss'),
        endTime: dayjs().add(6, 'day').format('YYYY/MM/DD HH:mm:ss'),
        direction: 1,
      }, false);
    };

    const getBalance = async () => {
      state.isLoading = true;
      const params = {
        requestInfo: ['balance'],
      };
      const { code, data } = await MemberApi.getUserPartialInfo(params) || {};
      state.isLoading = false;
      if (code !== 200) return undefined;
      return data?.balance;
    };

    const toggleBettingPopup = async (isShow = true, data = {}, hasGetBalance = false, currentQuickAmount) => {
      if (!isLogin.value) {
        handleLoginFirst();
        return;
      }

      if (hasGetBalance) {
        const balanceAmount = await getBalance();
        if (balanceAmount === 0 || balanceAmount) {
          store.commit('SET_USER_BALANCE', balanceAmount);
        }
      }

      state.isBettingPopupShow = isShow;

      // 等 popup 動畫結束再重置 popup 內容
      const delay = state.popupDuration * 1000 + 50;
      setTimeout(() => {
        state.currentBetItem = data;
        state.currentQuickAmount = currentQuickAmount;
        state.betAmount = 1;
      }, delay);
    };

    const handleBettingDeadline = () => {
      const matchTime = dayjs(state.currentGameData?.matchTIme);
      const currentTime = dayjs();
      const diffMs = matchTime.diff(currentTime);
      state.bettingDeadline = dayjs() + diffMs;
      state.isGameClosed = diffMs <= 0;
    };

    const renderDate = (date) => dayjs(date).format('MM-DD');

    const renderTime = (date) => dayjs(date).format('HH:mm');

    const renderMaintainText = (item) => {
      if (!item?.payRate || !item?.enabled) return t('views_betting_main_closed');
      return t('views_betting_main_fulled');
    };

    // 投注量明細 progress bar 最小值 render 5%
    const renderProgress = (percentage) => (percentage < 5 ? 5 : percentage);

    const convertRate = (num) => {
      if (!isNumber(num)) return '0%';
      return `${NP.times(num, 100)}%`;
    };

    const getBetOption = async () => {
      const params = {
        issueNo: state.issueNo,
      };

      const { code, data } = await SportApi.getBetOption(params) || {};
      if (code !== 200) return {};
      return data;
    };

    const getCaculateLog = async () => {
      const params = {
        gameCode: state.currentGameData.gameCode,
        issueNo: state.currentGameData.issueNo,
        playTypeM: state.currentGameData.playTypeM,
        playTypeS: state.currentGameData.playTypeS,
      };

      const { code, data } = await SportApi.getCaculateLog(params) || {};
      if (code !== 200) return {};
      return data;
    };

    const getBettingConfig = async () => {
      if (!isLogin.value) return {};
      const params = {
        gameCode: state.currentGameData.gameCode,
      };

      const { code, data, message } = await SportApi.getBettingConfig(params) || {};
      if (code !== 200) {
        window.$vue.$message.error(message || '');
        return {};
      }
      return data;
    };

    const handleBettingCountdownEnded = () => {
      state.isGameClosed = true;
      toggleSumPopup(false);
      toggleBettingPopup(false);
    };

    const isBettingNotAllowed = (item) => item?.isFulled || !item?.payRate || !item?.enabled;

    // 預期獲利=(投注金額*賠率)-{(投注金額*賠率)*手續費}，結果無條件捨去至小數點後2位
    const renderExpectProfit = (payRate = 0) => {
      // 投注金額*賠率
      const betAmountResult = NP.times(Number(state.betAmount) || 0, NP.minus(payRate, 1));
      const rowResult = NP.times(NP.minus(1, state.bettingConfig?.bettingFee || 0), betAmountResult);
      const result = rowResult ? floorToDigit(rowResult, 2) : 0;
      return result;
    };

    const quickSelect = (val) => {
      const result = val === 'all' ? Math.floor(balance.value) : val;
      state.betAmount = result;
      state.currentQuickAmount = val;
    };

    const handlePopupActive = (val) => {
      if (state.currentQuickAmount === val) {
        return true;
      } if (state.betAmount === val || state.currentQuickAmount) {
        state.currentQuickAmount = undefined;
        return true;
      }
      return false;
    };

    const handleBetting = async () => {
      state.isLoading = true;
      state.isBettingProcessing = true;
      const params = {
        gameCode: state.currentGameData.gameCode,
        issueNo: state.currentGameData.issueNo,
        betMainInfo: [{
          playTypeM: state.currentGameData?.playTypeM,
          playTypeS: state.currentGameData?.playTypeS,
          option: state.currentBetItem?.option,
          quantity: 1,
          payRate: state.currentBetItem?.payRate,
          unitPrice: Number(state.betAmount) || 0,
        }],
      };

      const { code, message } = await SportApi.handleBetting(params) || {};
      const defaultMsg = code === 200 ? t('views_betting_main_handleBettingText') : t('common_betFailMsg');
      const msgType = code === 200 ? 'info' : 'error';
      const toastText = message || defaultMsg;

      window.$vue.$message[msgType](toastText);
      state.isBettingProcessing = false;
      state.isLoading = false;
      toggleBettingPopup(false);
    };

    const handleBetItemIsFulled = () => {
      if (!state.betOptionData?.length) return;
      const betOptionList = state.betOptionData?.find((item) => item.playTypeS === state.currentPlayTypeS)?.betOptionList;
      if (!betOptionList?.length) return;
      betOptionList.forEach((betItem) => {
        if (!isArray(state.caculateLogData)) {
          betItem.isFulled = false;
          return;
        }
        const currentItem = state.caculateLogData?.find((logItem) => logItem.option === betItem.option);
        if (currentItem) {
          betItem.isFulled = currentItem.amount >= betItem.limitAmount;

          currentItem.limitAmount = betItem.limitAmount;
        } else {
          betItem.isFulled = false;
        }

        betItem.amount = currentItem?.amount || 0;
        betItem.leftAmount = betItem.limitAmount - (currentItem?.amount || 0);
      });
    };

    const handleGameSum = () => {
      const total = isArray(state.caculateLogData) ? state.caculateLogData.reduce((acc, item) => acc + (item?.amount || 0), 0) : 0;
      const virtualTotal = isArray(state.currentGameData.betOptionList) ? state.currentGameData.betOptionList.reduce((acc, item) => acc + (item?.virtualBet || 0), 0) : 0;

      state.gameSum.sum = (total + virtualTotal) ?? 0;
      state.gameSum.optionList = JSON.parse(JSON.stringify(state.caculateLogData));
      const hasVirtualAmoutBetOption = state.currentGameData.betOptionList.filter((item) => item.virtualBet);

      if (!state.gameSum.optionList.length) {
        state.gameSum.optionList = hasVirtualAmoutBetOption;
      } else {
        state.gameSum.optionList.forEach((item, index, arr) => {
          hasVirtualAmoutBetOption.forEach((virtualItem) => {
            if (item.option === virtualItem.option) {
              item.virtualBet = virtualItem.virtualBet;
            } else if (!arr.find((items) => items.option === virtualItem.option)) {
              arr.push(virtualItem);
            }
          });
        });
      }

      state.gameSum.optionList.forEach((item) => {
        // 總投注量 = 實際投注量+虛擬投注量
        const totalBetAmount = NP.plus(item.amount || 0, item.virtualBet || 0);
        // 總可投注量 = 可交易量 + 虛擬投注量
        const totalLimitAmount = NP.plus(item.limitAmount, item.virtualBet || 0);
        item.percentage = item.limitAmount ? NP.times(NP.divide(totalBetAmount, totalLimitAmount), 100) : 0;
        item.totalBetAmount = totalBetAmount;
      });
    };

    const handleDataMapping = () => {
      handleBetItemIsFulled();
      handleGameSum();
    };

    const asyncGameData = () => {
      state.currentGameData = state.betOptionData?.find((item) => item.playTypeS === state.currentPlayTypeS);
    };

    // 将 currentBetItem、currentBetItem 与重整后的 betOptionData 资料同步
    const asyncBettingItem = () => {
      asyncGameData();

      const currentOption = state.currentBetItem?.option;
      state.currentBetItem = state.currentGameData?.betOptionList?.find((item) => item.option === currentOption);
    };

    const getData = async () => {
      state.isLoading = true;
      state.betOptionData = await getBetOption();
      [state.caculateLogData, state.bettingConfig] = await Promise.all([getCaculateLog(), getBettingConfig()]);

      asyncGameData();
      handleDataMapping();
      state.isLoading = false;
    };

    const receivedProgressTimer = (val) => {
      state.pollingTimer = val;
    };

    const refreshData = async () => {
      await getData();
      asyncBettingItem(); // 重新获取最新资料投注弹窗不关闭，须同步投注弹窗内容与投注页资料
      state.isHandlePolling = true;
    };

    const clickHandler = async (selectedItem) => {
      state.issueNo = selectedItem.issueNo;
      await getData();
      state.isLeaguePopupShow = false;
    };

    const handleProgressEnded = async () => {
      state.isHandlePolling = false;
      if (!state.isBettingPopupShow) {
        await getData();
        state.isHandlePolling = true;
      }
    };

    const changePlayTypeS = async (item, isHandleBettingDeadline = false, isRefreshData = false) => {
      state.isBetItemSkeletonShow = true;
      state.currentPlayTypeS = item?.playTypeS;
      state.currentPlayTypeSName = item?.playTypeSName;
      state.currentGameData = { ...item };

      if (isRefreshData) {
        await refreshData();
      }

      if (isHandleBettingDeadline) {
        handleBettingDeadline();
      }
      setTimeout(() => {
        state.isBetItemSkeletonShow = false;
      }, 300);
    };

    const handleInit = async () => {
      state.isLoading = true;
      state.betOptionData = await getBetOption();
      changePlayTypeS(state.betOptionData[0], true);

      [state.caculateLogData, state.bettingConfig] = await Promise.all([getCaculateLog(), getBettingConfig()]);

      handleDataMapping();

      state.isLoading = false;
      state.isHandlePolling = true;
    };

    watch(() => state.pollingTimer, async (val) => {
      if (val !== 0) return;

      if (state.isBettingPopupShow) {
        state.isHandlePolling = false;
      }
    });

    watch(() => state.isBettingPopupShow, (val) => {
      if (!val) {
        state.isHandlePolling = true;
      }
    });

    // hooks
    onBeforeMount(async () => {
      if (!route.query?.issueNo) {
        state.isGameClosed = true;
        return;
      }
      state.issueNo = route.query?.issueNo;
      await handleInit();
    });

    return {
      dayjs,
      state,
      isListEmpty,
      pullingDown,
      loadMoreGameSummary,
      clickHandler,
      isleagueLoading,
      siteStyle,
      timeZone,
      isChinese,
      balance,
      isBalanceNotEnough,
      renderBetAmountNotify,
      showInputNotify,
      deadlineStyleList,
      lockBettingBtn,
      renderHostText,
      s3Base,
      numWithCommas,
      getSportScore,
      convertToCst,
      floorToDigit,
      isNumber,
      fmtPayRate,
      toggleSumPopup,
      toggleBettingPopup,
      openLeagueDetail,
      changePlayTypeS,
      renderDate,
      renderTime,
      renderMaintainText,
      renderProgress,
      convertRate,
      handleBettingCountdownEnded,
      handleBetting,
      quickSelect,
      handlePopupActive,
      renderExpectProfit,
      isBettingNotAllowed,
      refreshData,
      getData,
      receivedProgressTimer,
      handleProgressEnded,
      goPage,
    };
  },
};
</script>

<style lang="postcss" scoped>

.title {
  &-container {
    display: flex;
    align-items: center;
  }

  &-text {
    font-size: 14px;
  }

  &-icon {
    width: 12px;
    height: 12px;
    margin-left: 0.2rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.betting {
  @apply flex flex-col h-full text-xs overflow-y-scroll;

  padding: var(--header-height) 0 var(--footer-height);

  &-info {
    @apply relative;
  }

  &-info-bg {
    @apply relative w-full;
  }

  &-info-container {
    @apply absolute top-0 w-full pt-4;
  }

  &-info-text {
    @apply text-center;

    &-em {
      @apply font-bold text-primary text-sm;
    }

    &-em-xs {
      @apply text-xs font-normal;
    }

    img {
      @apply mx-auto;
    }
  }

  /* &-team {
    @apply col-span-2 justify-self-center;

    max-width: calc(100% - 30px);
  } */

  &-team-row {
    @apply flex items-center justify-between;
  }

  &-team-container {
    /* @apply mx-6; */

    width: 148px;
    max-width: 148px;
  }

  &-team-text-container {
    @apply flex flex-col justify-center;

    height: 60px;
  }

  &-team-name {
    @apply mx-auto text-center;

    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &-team-logo {
    @apply mt-1 mb-2 mx-auto;

    width: 32px;
    height: 32px;

    img {
      @apply w-full h-full object-contain object-center;
    }
  }

  &-team-score {
    font-size: 18px;
  }

  &-time {
    @apply absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2  -translate-y-1/2 flex flex-col items-center;

    /* 用 flex column 排版避免有背景色的該行被下方 deadline 撐開寬度(多國語系) */
  }

  &-time-item {
    @apply px-2;

    & + & {
      @apply mt-1;
    }

    &-em {
      @apply py-px rounded-20;

      color: var(--primary-btn-color);
      background: var(--btn-primary-bg);
    }
  }

  &-deadline {
    @apply mt-1;
  }

  &-deadline-text {
    @apply mb-1;
  }

  ::v-deep(.ant-statistic-content) {
    font-size: 12px;
    text-align: center;
  }

  &-sum {
    @apply flex items-center justify-between;
  }

  &-text {
    @apply text-sm text-center;
  }

  &-text-left {
    @apply text-left;
  }

  &-text-sm {
    @apply text-xs text-center;
  }

  &-text-img {
    @apply ml-2;

    width: 16px;
    height: 16px;
  }

  &-text-wrap {
    @apply flex items-center;
  }

  &-main {
    @apply relative flex-1 p-3 bg-primary-content rounded-t-10;

    box-shadow: 0 -2px 6px #0000001a;
  }

  &-list {
    @apply flex flex-wrap mt-3;
  }

  &-item {
    @apply relative rounded-3;

    flex: calc(33.33% - 10px * (3 - 1) / 3) 0 0;
    margin-bottom: 23px;
    box-shadow: 0 2px 4px #4d57721a;

    &:not(:nth-child(3n)) {
      margin-right: 10px;
    }
  }

  &-item-loading {
    @apply shadow-none;
  }

  &-digit {
    background: linear-gradient(180deg, #ecf2f8, #fff);
  }

  &-score {
    @apply relative text-base font-bold;

    padding: 8px 0 4px;
  }

  &-goal {
    @apply absolute bottom-0 left-1/2 z-0 w-7 transform-gpu -translate-x-1/2;
  }

  &-percent {
    @apply text-primary;

    padding: 0 0 4px;
  }

  &-amount {
    @apply bg-secondary-content;

    padding: 4px 0;
  }

  &-overlay {
    @apply absolute top-0 left-0 flex flex-col justify-end w-full h-full py-5 rounded-3 bg-maintain;

    .betting-score {
      @apply pt-0 pb-1;
    }
  }

  &-overlay-text {
    @apply text-white;
  }

  &-tab {
    @apply absolute -top-8 left-0 flex w-full px-3;
  }

  &-tab-item {
    @apply flex-1 py-2 text-center;
  }

  &-tab-item-active {
    @apply font-bold text-active;

    .betting-tab-text::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background: var(--primary-color);
      content: '';
      transform: translate3d(-50%, 0, 0);
    }
  }

  &-tab-text {
    @apply relative py-2 text-sm;
  }
}

.popup {
  &-text {
    @apply text-xs;
  }

  &-text-em {
    @apply text-primary;
  }

  &-text-amount {
    @apply text-border;
  }

  &-text-profit {
    color: #f3ac0a;
  }

  &-text-expect {
    @apply text-positive;
  }

  &-piece {
    @apply mb-3;
  }

  &-row {
    & + & {
      @apply mt-1;
    }
  }

  &-expand {
    @apply flex justify-between;
  }

  &-grid {
    @apply flex flex-wrap justify-between mb-0;
  }

  &-amount {
    @apply border border-solid border-border rounded-3 text-border text-center text-xs;

    flex: calc(25% - 8px * (4 - 1) / 4) 0 0;
    margin-bottom: 8px;
    padding: 8px 0;

    &-active,
    &:hover,
    &:focus {
      @apply text-normal bg-secondary-content;
    }
  }

  &-preview {
    @apply flex flex-wrap mr-8 mb-3;
  }

  &-preview-item {
    @apply text-center mb-1;

    flex: 25% 0 0;
  }

  &-preview-prefix {
    @apply text-left mb-1;

    flex: 8.33% 0 0;
  }

  &-subtitle {
    @apply w-full px-3 bg-secondary-content;

    padding-top: 7px;
    padding-bottom: 6px;
  }

  &-statistic {
    max-height: 350px;
    padding: 16px 17px 45px;
    overflow: hidden scroll;
  }

  &-data {
    @apply flex items-center;

    & + & {
      margin-top: 16px;
    }

    .popup-text {
      width: 50px;
    }
  }

  &-bar {
    @apply relative flex items-center justify-end flex-1 ml-2 rounded-8;

    height: 16px;
    background: #e5e5e5;
  }

  &-progress {
    @apply absolute top-0 left-0 max-w-full h-full rounded-8;

    background: linear-gradient(270deg, #f3ac0a 0%, #b58007 100%);
  }

  &-digit {
    @apply text-right origin-right;

    margin-right: 9px;
    transform: scale(0.625);
  }

  &-input-error {
    @apply border-negative shadow-none;
  }

  &-input-notify {
    @apply block mt-1 text-negative text-xs;
  }
}

::v-deep(.ant-skeleton.ant-skeleton-active .ant-skeleton-avatar) {
  border-radius: 3px;
}

::v-deep(.ant-skeleton.ant-skeleton-active .ant-skeleton-avatar-circle) {
  border-radius: 50%;
}

::v-deep(.ant-skeleton-header) {
  padding-right: 0;
}

::v-deep(.ant-skeleton-avatar-square) {
  width: 100% !important;
}

::v-deep(.header) {
  .middle {
    flex: 3 0 0;
  }
}

.league-list {
  border: 0.3px solid #fffbf2;
  background-image: url('~@/assets/img/betting/style1/league-bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 2px 4px #4d57721a;
}

.column {
  flex-direction: column;
  justify-content: center;
}

.logo {
  width: 32px;
  height: 32px;
}

.vs {
  font-size: 14px;
}

.team1,.team2 {
  width: 45%;
  color: var(--primary-color);
  text-align: center;
}

.content-left {
  width: 100%;
}

.game-compet {
  align-items: center;
  justify-content: center;
  width: 100%;
}

::v-deep(.d-popup-header) {
  .title {
    width: 70%;
    text-align: center;
  }
}

.all-match {
  top: 90px;
  right: 0;
  bottom: 60px;
  left: 0;

  ::v-deep(.scroll-content) {
    transform: translateX(0) translateY(-10px) translateZ(1px);
  }
}

.no-data {
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
