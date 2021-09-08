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
            <img :src="$requireSafe('icon/desc.svg')">
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
            <img :src="$requireSafe('icon/desc.svg')">
          </div>
          <div class="betting-team-score betting-info-text betting-info-text-em">
            {{ 0 }}
          </div>
        </div>

        <div class="betting-countdown" />
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
          >
            <div class="betting-digit">
              <div class="betting-text-sm betting-score">
                {{ getSportScore(item?.option, 'renderData') }}
              </div>
              <div class="betting-text-sm betting-percent">
                {{ item?.payRate }}
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

  <d-popup
    v-model:value="state.isBettingPopupShow"
    position="bottom"
    :round="true"
    :title="$t('views_betting_statistic_popup_title')"
    class="popup"
  >
    popup
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
import {
  timeZoneUnit, numWithCommas, getSportScore, convertToCst,
} from '@/assets/js/utils/utils';
import SportApi from '@/assets/js/api/sportApi';

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
      gameSum: {
        sum: 1321231132,
      },
      betOptionData: [], // 所有投注選項資料
      betOptionList: [
        {
          option: '0:0',
          payRate: '17.59%',
          limitAmount: 88.909,
        },
      ],
      isSumPopupShow: false,
      isBettingPopupShow: false,
    });

    // computed
    const siteStyle = computed(() => store.state.info.siteStyle);
    const timeZone = computed(() => timeZoneUnit());

    // methods
    const toggleSumPopup = (isShow = true) => {
      state.isSumPopupShow = isShow;
    };

    const toggleBettingPopup = (isShow = true) => {
      state.isBettingPopupShow = isShow;
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

    const getBetOption = async () => {
      const params = {
        issueNo: '255673972',
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

    // const getData = async () => {
    //   state.betOptionData = await getBetOption();
    //   state.caculateLogData = await getCaculateLog();
    // };

    const init = async () => {
      // await getData();
      state.betOptionData = await getBetOption();
      changePlayTypeS(state.betOptionData[0]);
      state.caculateLogData = await getCaculateLog();
    };

    // hooks
    onBeforeMount(async () => {
      await init();
      console.log(dayjs(), convertToCst(dayjs()));
    });

    return {
      state,
      siteStyle,
      timeZone,
      numWithCommas,
      getSportScore,
      convertToCst,
      toggleSumPopup,
      toggleBettingPopup,
      changePlayTypeS,
      renderDate,
      renderTime,
      renderMaintainText,
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
    @apply mt-2 mb-4 mx-auto w-8;

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
</style>
