<template>
  <d-header-row
    :title="state.currentGameData?.leagueName || ''"
    right-components="service"
  />

  <div class="betting">
    <d-loading :loading="state.isLoading" />
    <div class="betting-info">
      <div class="betting-info-bg">
        <img
          :src="$requireSafe(`betting/style${siteStyle}/bg.png`)"
        >
      </div>
      <div class="betting-info-container">
        <div class="betting-team">
          <div class="betting-team-name betting-info-text betting-info-text-em">
            {{ state.currentGameData?.homeTeamName || '' }}{{ state.currentGameData?.homeTeamName && `(${$t('views_betting_host')})` }}
          </div>
          <div class="betting-team-logo betting-info-text">
            <img :src="$requireSafe('icon/default-team.svg')">
          </div>
          <div class="betting-team-score betting-info-text betting-info-text-em">
            {{ 0 }}
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
        </div>
        <div class="betting-team">
          <div class="betting-team-name betting-info-text betting-info-text-em">
            {{ state.currentGameData?.awayTeamName || '' }}
          </div>
          <div class="betting-team-logo betting-info-text">
            <img :src="$requireSafe('icon/default-team.svg')">
          </div>
          <div class="betting-team-score betting-info-text betting-info-text-em">
            {{ 0 }}
          </div>
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
          @click="changePlayTypeS(item, true)"
        >
          <span class="betting-tab-text">{{ item?.playTypeSName }}</span>
        </div>
      </div>

      <div class="betting-main-container">
        <template v-if="!state.isGameClosed">
          <div class="betting-sum">
            <div
              class="betting-sum-text is-btn"
              @click="toggleSumPopup(true)"
            >
              <div
                class="betting-text betting-text-wrap"
              >
                <span class="betting-text-sm">{{ $t('views_betting_statistic_popup_sum') }}</span>
                <img
                  class="betting-text-img"
                  :src="$requireSafe(`betting/style${siteStyle}/sum.svg`)"
                >
              </div>
              <div
                class="betting-text betting-text-left"
                :class="{ 'text-win': state.gameSum.sum > 0 }"
              >
                {{ numWithCommas(state.gameSum?.sum || 0) }}
              </div>
            </div>
            <div class="betting-sum-countdown">
              <d-progress-bar
                :time="15"
                :running="state.isHandlePolling"
                @seconds="receivedProgressTimer"
                @finish="handleProgressEnded"
              />
            </div>
          </div>

          <ul class="betting-list">
            <li
              v-for="(item, idx) in state.currentGameData?.betOptionList"
              :key="`availableAmount[${idx}]`"
              class="betting-item"
              :class="{ 'is-btn': !item?.isFulled && item?.payRate }"
              @click="isBettingNotAllowed(item) ? null : toggleBettingPopup(true, item)"
            >
              <div class="betting-digit">
                <div class="betting-text-sm betting-score">
                  <div class="betting-goal">
                    <img
                      :src="$requireSafe(`betting/style${siteStyle}/goal.svg`)"
                      alt=""
                    >
                  </div>
                  <span class="relative">{{ getSportScore(item?.option, 'renderData') }}</span>
                </div>
                <div class="betting-text-sm betting-percent">
                  {{ renderPayRate(item?.payRate) }}
                </div>
              </div>
              <div class="betting-amount">
                <div class="betting-text-sm">
                  {{ $t('views_betting_main_availableAmount') }}
                </div>
                <div class="betting-text-sm">
                  {{ item?.limitAmount }}
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
                  {{ getSportScore(item?.option, 'renderData') }}
                </div>
                <div class="betting-text-sm betting-overlay-text">
                  {{ renderMaintainText(item) }}
                </div>
              </div>
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
              :style="`width: ${item?.percentage}%`"
            />
            <div class="popup-digit">
              {{ numWithCommas(item?.amount || 0) }}
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
        {{ state.currentGameData?.playTypeMName }} {{ state.currentGameData?.playTypeSName }} {{ getSportScore(state.currentBetItem?.option, 'renderData') }}
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
          v-first-not-zero
          v-positive-places
          :placeholder="$t('views_betting_main_popup_betAmountPlaceholder')"
          class="popup-input"
          :class="{'popup-input-error': showInputNotify}"
          @change="state.startNotify = true"
        />
        <em
          v-show="showInputNotify"
          v-text="$t('views_profile_balanceNotEnough')"
          class="popup-input-notify"
        />
      </div>
    </div>

    <div class="popup-piece popup-grid">
      <div
        v-for="(item, idx) in state.amountList"
        :key="`amountList${idx}`"
        class="popup-amount is-btn"
        :class="{ 'popup-amount-active': state.currentQuickAmount === item.val }"
        v-text="item.txt"
        @click="quickSelect(item.val)"
      />
    </div>

    <div class="popup-piece popup-preview">
      <div class="popup-item-prefix" />
      <div class="popup-text popup-text-profit popup-preview-item">
        {{ $t('views_betting_main_popup_profit') }}
      </div>
      <div class="popup-item-prefix" />
      <div class="popup-text popup-preview-item">
        {{ $t('views_betting_main_popup_charge') }}
      </div>
      <div class="popup-item-prefix" />
      <div class="popup-text popup-text-expect popup-preview-item">
        {{ $t('views_betting_main_popup_expectedProfit') }}
      </div>
      <div class="popup-text popup-item-prefix">
        X
      </div>
      <div class="popup-text popup-preview-item">
        {{ renderPayRate(state.currentBetItem?.payRate) }}
      </div>
      <div class="popup-text popup-item-prefix">
        -
      </div>
      <div class="popup-text popup-preview-item">
        {{ convertRate(state.bettingConfig?.bettingFee) }}
      </div>
      <div class="popup-text popup-item-prefix">
        =
      </div>
      <div class="popup-text popup-text-expect popup-preview-item">
        {{ numWithCommas(renderExpectProfit(state.currentBetItem?.payRate)) }}{{ $t('views_betting_main_popup_dollars') }}
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

  <d-footer-row />
</template>

<script>
import {
  reactive, computed, watch, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import NP from 'number-precision';
import {
  timeZoneUnit, numWithCommas, getSportScore, convertToCst, isNumber, floorToDigit, renderPayRate,
} from '@/assets/js/utils/utils';
import SportApi from '@/assets/js/api/sportApi';

dayjs.extend(duration);

export default {
  setup() {
    // use
    const store = useStore();
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();

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
        sum: 132132.12, // 總成交量
        optionList: [], // 交易量明细
      },
      betOptionData: [], // 所有投注選項資料
      currentBetItem: {}, // 當前投注項目(betting popup 開啟的項目)
      isSumPopupShow: false,
      isBettingPopupShow: false,
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
      bettingConfig: {}, // 投注設定
      isLoading: false,
      startNotify: false,
    });

    // computed
    const siteStyle = computed(() => store.state.info.siteStyle);
    const timeZone = computed(() => timeZoneUnit());
    // 用户余额
    const balance = computed(() => store.state.user.balance || 0);
    const deadlineStyleList = computed(() => {
      const base = 10 * 60 * 1000;
      if (state.bettingDeadline - dayjs() > base) return {};
      return {
        color: 'var(--negative-color)',
      };
    });

    const isBalanceNotEnough = computed(() => state.betAmount > balance.value);

    const showInputNotify = computed(() => state.startNotify && isBalanceNotEnough.value);
    const lockBettingBtn = computed(() => !state.betAmount || state.isBettingProcessing || isBalanceNotEnough.value);

    // methods
    const toggleSumPopup = (isShow = true) => {
      state.isSumPopupShow = isShow;
    };

    const toggleBettingPopup = (isShow = true, data = {}, currentQuickAmount) => {
      state.isBettingPopupShow = isShow;

      state.currentBetItem = data;
      state.currentQuickAmount = currentQuickAmount;
      state.betAmount = 1;
    };

    const handleBettingDeadline = () => {
      const matchTime = dayjs(state.currentGameData?.matchTIme);
      const currentTime = dayjs();
      const diffMs = matchTime.diff(currentTime);
      state.bettingDeadline = dayjs() + diffMs;
      state.isGameClosed = diffMs <= 0;
    };

    const changePlayTypeS = (item, isHandleBettingDeadline = false) => {
      state.currentPlayTypeS = item?.playTypeS;
      state.currentPlayTypeSName = item?.playTypeSName;
      state.currentGameData = { ...item };
      if (isHandleBettingDeadline) {
        handleBettingDeadline();
      }
    };

    const renderDate = (date) => dayjs(date).format('MM-DD');

    const renderTime = (date) => dayjs(date).format('HH:mm');

    const renderMaintainText = (item) => {
      if (!item?.payRate) return t('views_betting_main_closed');
      return t('views_betting_main_fulled');
    };

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
      const result = val === 'all' ? balance.value : val;
      state.betAmount = result;
      state.currentQuickAmount = val;
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
      if (!state.currentGameData?.betOptionList?.length) return;
      state.currentGameData.betOptionList.forEach((betItem) => {
        const currentItem = state.caculateLogData?.find((logItem) => logItem.option === betItem.option) || {};
        if (currentItem) {
          betItem.isFulled = currentItem.amount >= betItem.limitAmount;
          currentItem.limitAmount = betItem.limitAmount;
        } else {
          betItem.isFulled = false;
        }
      });
    };

    const handleGameSum = () => {
      const total = state.caculateLogData.reduce((acc, item) => acc + (item?.amount || 0), 0);
      state.gameSum.sum = total;

      state.gameSum.optionList = JSON.parse(JSON.stringify(state.caculateLogData));

      state.gameSum.optionList.forEach((item) => {
        item.percentage = NP.divide((item.amount || 0), (item.limitAmount || 1));
      });
    };

    const handleDataMapping = () => {
      handleBetItemIsFulled();
      handleGameSum();
    };

    const asyncGameData = () => {
      state.currentGameData = state?.betOptionData?.find((item) => item.playTypeS === state.currentPlayTypeS);
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

      handleDataMapping();
      asyncGameData();
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

    const handleProgressEnded = async () => {
      state.isHandlePolling = false;
      await getData();
      if (!state.isBettingPopupShow) {
        state.isHandlePolling = true;
      }
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

    const goPage = (name, params = {}, query = {}) => {
      router.push({
        name,
        params,
        query,
      });
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
      siteStyle,
      timeZone,
      balance,
      isBalanceNotEnough,
      showInputNotify,
      deadlineStyleList,
      lockBettingBtn,
      numWithCommas,
      getSportScore,
      convertToCst,
      floorToDigit,
      renderPayRate,
      isNumber,
      toggleSumPopup,
      toggleBettingPopup,
      changePlayTypeS,
      renderDate,
      renderTime,
      renderMaintainText,
      convertRate,
      handleBettingCountdownEnded,
      handleBetting,
      quickSelect,
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
    @apply absolute top-0 grid grid-cols-5 w-full pt-6;
  }

  &-info-text {
    @apply text-center;

    &-em {
      @apply font-bold text-primary text-sm;
    }

    img {
      @apply mx-auto;
    }
  }

  &-team {
    @apply col-span-2 justify-self-center;
  }

  &-team-logo {
    @apply mt-1 mb-2 mx-auto w-8;

    img {
      @apply w-full;
    }
  }

  &-time {
    @apply col-span-1 justify-self-center;
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
    @apply col-span-5 justify-self-center;
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
    @apply grid grid-cols-3 gap-x-2 gap-y-4 mt-3;
  }

  &-item {
    @apply relative rounded-3;

    box-shadow: 0 2px 4px #4d57721a;
  }

  &-digit {
    background: linear-gradient(180deg, #ecf2f8, #fff);
  }

  &-score {
    @apply relative text-base;

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
    @apply grid grid-cols-4;

    gap: 8px;
  }

  &-amount {
    @apply border border-solid border-border rounded-3 text-border text-center text-xs;

    padding: 8px 0;

    &-active,
    &:hover,
    &:focus {
      @apply text-normal bg-secondary-content;
    }
  }

  &-preview {
    @apply grid grid-cols-12 gap-y-1 mr-8 mb-4;
  }

  &-preview-item {
    @apply col-span-3 text-center;
  }

  &-preview-prefix {
    @apply col-span-1 text-left;
  }

  &-subtitle {
    @apply w-full px-3 bg-secondary-content;

    padding-top: 7px;
    padding-bottom: 6px;
  }

  &-statistic {
    padding: 16px 17px 45px;
  }

  &-data {
    @apply flex items-center;

    & + & {
      margin-top: 16px;
    }
  }

  &-bar {
    @apply relative flex items-center justify-end flex-1 ml-2 rounded-8;

    height: 16px;
    background: #e5e5e5;
  }

  &-progress {
    @apply absolute top-0 left-0 h-full rounded-8;

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
</style>
