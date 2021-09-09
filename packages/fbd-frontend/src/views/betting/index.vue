<template>
  <d-header-row
    :title="state.currentGameData?.leagueName || ''"
    right-components="service"
  />

  <div class="betting">
    <div class="betting-info">
      <div class="betting-info-bg">
        <img
          :src="$requireSafe(`betting/style${siteStyle}/bg.png`)"
        >
      </div>
      <div class="betting-info-container">
        <div class="betting-team">
          <div class="betting-team-name betting-info-text betting-info-text-em">
            {{ state.currentGameData?.homeTeamName || '' }}({{ $t('views_betting_host') }})
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
            {{ renderDate(state.betOptionData[0]?.matchTIme) }}
          </div>
          <div class="betting-time-item betting-time-item-em betting-info-text">
            {{ renderTime(state.betOptionData[0]?.matchTIme) }}
          </div>
          <div class="betting-time-item betting-info-text">
            ({{ timeZone }})
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
            {{ $t('views_betting_info_deadline') }}
          </div>
          <a-statistic-countdown
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
          @click="changePlayTypeS(item)"
        >
          <span class="betting-tab-text">{{ item?.playTypeSName }}</span>
        </div>
      </div>

      <div class="betting-main-container">
        <div class="betting-sum">
          <div class="betting-sum-text">
            <div
              class="betting-text betting-text-wrap"
              @click="toggleSumPopup(true)"
            >
              <span class="betting-text-sm">{{ $t('views_betting_statistic_popup_sum') }}</span>
              <img
                class="betting-text-img"
                :src="$requireSafe(`betting/style${siteStyle}/sum.svg`)"
              >
            </div>
            <div
              class="betting-text"
              :class="{ 'text-win': state.gameSum.sum > 0 }"
            >
              {{ numWithCommas(state.gameSum.sum) }}
            </div>
          </div>
          <div class="betting-sum-countdown">
            <img
              src=""
              alt=""
            >
          </div>
        </div>

        <ul class="betting-list">
          <li
            v-for="(item, idx) in state.betOptionData[0]?.betOptionList"
            :key="`availableAmount[${idx}]`"
            class="betting-item"
            :class="{ 'is-btn': !item?.isFulled && item?.payRate }"
            @click="toggleBettingPopup(true, item)"
          >
            <div class="betting-digit">
              <div class="betting-text-sm betting-score">
                {{ getSportScore(item?.option, 'renderData') }}
              </div>
              <div class="betting-text-sm betting-percent">
                {{ convertRate(item?.payRate) }}
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
              v-show="item?.isFulled || !item?.payRate"
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
        {{ $t('views_betting_statistic_popup_sum') }}
      </span>
    </div>

    <div class="popup-statistic">
      <div
        v-for="(item, idx) in state.betSumData"
        :key="`betSumData[${idx}]`"
        class="popup-data"
      >
        <div class="popup-text">
          {{ getSportScore(item?.option) }}
        </div>
        <div class="popup-bar">
          <div
            class="popup-progress"
            :style="`width: ${item?.percentage || 20}%`"
          />
          <div class="popup-digit">
            {{ item?.amount || 0 }}
          </div>
        </div>
      </div>
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
          {{ $t('views_betting_main_popup_balance') }} {{ balance }}
        </div>
      </div>
      <div class="popup-row">
        <a-input-number
          v-model:value="state.betAmount"
          v-positive-places
          type="number"
          :placeholder="$t('views_betting_main_popup_betAmountPlaceholder')"
          class="popup-input"
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
        {{ state.currentBetItem?.payRate }}
      </div>
      <div class="popup-text popup-item-prefix">
        -
      </div>
      <div class="popup-text popup-preview-item">
        {{ state.currentBetItem?.payRate }}
      </div>
      <div class="popup-text popup-item-prefix">
        =
      </div>
      <div class="popup-text popup-text-expect popup-preview-item">
        {{ renderExpectProfit(state.currentBetItem?.payRate) }}{{ $t('views_betting_main_popup_dollars') }}
      </div>
    </div>

    <div class="popup-piece">
      <d-button
        type="primary"
        :block="true"
        :disabled="!state.betAmount"
        @click="handleBetting"
      >
        {{ $t('views_betting_main_popup_btnAction') }}
      </d-button>
    </div>
  </d-popup>

  <d-footer-row />
</template>

<script>
import {
  // inject, reactive, computed, onBeforeMount,
  reactive, computed, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import NP from 'number-precision';
import {
  timeZoneUnit, numWithCommas, getSportScore, convertToCst, isNumber, floorToDigit,
} from '@/assets/js/utils/utils';
import SportApi from '@/assets/js/api/sportApi';

dayjs.extend(duration);

export default {
  setup() {
    // use
    const store = useStore();
    const { t } = useI18n();

    // inject
    // const validator = inject('$validator');

    // reactive
    const state = reactive({
      currentPlayTypeS: 1, // 當前次玩法(全場/半場)
      currentPlayTypeSName: '', // 當前次玩法名稱(全場/半場)
      currentGameData: {},
      currentQuickAmount: undefined, // 當前投注 popup 快选金额
      bettingDeadline: '', // 當前賽事下單截止時間
      mainCountdown: 15, // 倒數15秒，時間到重取資料
      gameSum: {
        sum: 1321231132,
      },
      betOptionData: [], // 所有投注選項資料
      currentBetItem: {}, // 當前投注項目(betting popup 開啟的項目)
      isSumPopupShow: false,
      isBettingPopupShow: false,
      betAmount: 1, // 投注金额 input
      amountList: [
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
      isGameClosed: false,
      betSumData: [ // 交易量明细
        {
          option: 100000,
          amount: 100000,
        },
        {
          option: 100000,
          amount: 100000,
        },
        {
          option: 100000,
          amount: 100000,
        },
      ],
    });

    // computed
    const siteStyle = computed(() => store.state.info.siteStyle);
    const timeZone = computed(() => timeZoneUnit());
    // 用户余额
    const balance = computed(() => store.state.user.balance || 0);
    // 全站手续费
    const chargeFee = computed(() => store.state.info.chargeFee || 0);
    const deadlineStyleList = computed(() => {
      const base = 10 * 60 * 1000;
      if (state.bettingDeadline - dayjs() > base) return {};
      return {
        color: 'var(--negative-color)',
      };
    });

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

    const changePlayTypeS = (item) => {
      state.currentPlayTypeS = item.playTypeS;
      state.currentPlayTypeSName = item.playTypeSName;
      state.currentGameData = { ...item };
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
        // issueNo: 255673972,
        issueNo: 255674423,
      };

      const { code, data } = await SportApi.getBetOption(params) || {};
      if (code !== 200) return {};
      return data;
    };

    const getCaculateLog = async () => {
      const params = {
        // gameCode: state.currentGameData.gameCode,
        issueNo: state.currentGameData.issueNo,
        playTypeM: state.currentGameData.playTypeM,
        playTypeS: state.currentGameData.playTypeS,
      };

      const { code, data } = await SportApi.getCaculateLog(params) || {};
      if (code !== 200) return {};
      return data;
    };

    const getGame = async () => {
      const params = {
        timeType: 'matchTime',
        startTime: dayjs().startOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss'),
        endTime: dayjs().add(7, 'day').endOf('day').tz('Asia/Shanghai')
          .format('YYYY/MM/DD HH:mm:ss'),
        pageIndex: 1,
        gameStatus: [0],
        // leagueId: props.searchLeagueList,
        direction: 1,
      };

      const { code, data } = await SportApi.getGame(params) || {};
      if (code !== 200) return {};
      console.log(data);
      return data;
    };

    // const getData = async () => {
    //   state.betOptionData = await getBetOption();
    //   state.caculateLogData = await getCaculateLog();
    // };

    const handleBettingDeadline = () => {
      const matchTime = dayjs(state.currentGameData.matchTIme);
      // console.log(matchTime.format('YYYY/MM/DD HH:mm:ss'));
      const currentTime = dayjs();
      const diffMs = matchTime.diff(currentTime);
      // console.log(dayjs.duration(matchTime.diff(currentTime)).format('HH:mm:ss'));
      state.bettingDeadline = dayjs() + diffMs;
    };

    const handleBettingCountdownEnded = () => {
      console.log('closed');
      state.isGameClosed = true;
    };

    // 預期獲利=(投注金額*賠率)-{(投注金額*賠率)*手續費}，結果無條件捨去至小數點後2位
    const renderExpectProfit = (payRate = 0) => {
      // 投注金額*賠率
      const betAmountResult = NP.times(state.betAmount, payRate);
      const result = NP.times(NP.minus(1, chargeFee.value), betAmountResult);
      return result;
    };

    const quickSelect = (val) => {
      const result = val === 'all' ? balance.value : val;
      state.betAmount = result;
      state.currentQuickAmount = val;
    };

    const handleBetting = async () => {
      const params = {
        gameCode: state.currentGameData.gameCode,
        issueNo: state.currentGameData.issueNo,
        betMainInfo: [{
          playTypeM: state.currentGameData?.playTypeM,
          playTypeS: state.currentGameData?.playTypeS,
          option: state.currentBetItem?.option,
          quantity: 1,
          payRate: state.currentBetItem?.payRate,
          unitPrice: state.betAmount,
        }],
      };

      const { code, data } = await SportApi.handleBetting(params) || {};
      console.log(code, data);
    };

    const init = async () => {
      // await getData();
      state.betOptionData = await getBetOption();
      changePlayTypeS(state.betOptionData[0]);
      state.caculateLogData = await getCaculateLog();
      handleBettingDeadline();
    };

    // hooks
    onBeforeMount(async () => {
      await init();
      getGame();
      console.log(dayjs().startOf('day').format('YYYY/MM/DD HH:mm:ss'));
    });

    return {
      dayjs,
      state,
      siteStyle,
      timeZone,
      balance,
      chargeFee,
      deadlineStyleList,
      numWithCommas,
      getSportScore,
      convertToCst,
      floorToDigit,
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
    @apply text-base;

    padding: 8px 0 4px;
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
    @apply text-right;

    transform: scale(0.625);
  }
}
</style>
