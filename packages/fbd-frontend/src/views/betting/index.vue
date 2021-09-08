<template>
  <d-header-row
    :title="state.gameName"
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
            {{ state.gameInfo.team1 }}
          </div>
          <div class="betting-team-logo betting-info-text">
            <img :src="$requireSafe('icon/desc.svg')">
          </div>
          <div class="betting-team-score betting-info-text betting-info-text-em">
            {{ state.gameInfo.score1 }}
          </div>
        </div>
        <div class="betting-time">
          <div class="betting-time-item betting-info-text">
            {{ correctionTime(state.betOptionData[0]?.matchTIme) }}
            <!-- {{ correctionTime(1630857540000) }} -->
          </div>
          <div class="betting-time-item betting-time-item-em betting-info-text">
            {{ state.gameInfo.time2 }}
          </div>
          <div class="betting-time-item betting-info-text">
            ({{ timeZoneUnitTxt }})
          </div>
        </div>
        <div class="betting-team">
          <div class="betting-team-name betting-info-text betting-info-text-em">
            {{ state.gameInfo.team2 }}
          </div>
          <div class="betting-team-logo betting-info-text">
            <img :src="$requireSafe('icon/desc.svg')">
          </div>
          <div class="betting-team-score betting-info-text betting-info-text-em">
            {{ state.gameInfo.score2 }}
          </div>
        </div>

        <div class="betting-countdown" />
      </div>
    </div>

    <div class="betting-main">
      <div class="betting-tab">
        <div
          v-for="(item, idx) in state.betOptionData"
          :key="`playTypeS[${idx}]`"
          class="betting-tab-item"
          :class="{ 'betting-tab-item-active': state.currentPlayTypeS === 'full' }"
          @click="changeType('full')"
        >
          <span class="betting-tab-text">{{ item?.playTypeSName }}</span>
        </div>
        <!-- <div
          class="betting-tab-item"
          :class="{ 'betting-tab-item-active': state.currentPlayTypeS === 'half' }"
          @click="changeType('half')"
        >
          <span class="betting-tab-text">{{ $t('views_betting_main_type2') }}</span>
        </div> -->
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
            class="betting-item is-btn"
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
          </li>
        </ul>
      </div>
    </div>
  </div>
  <d-footer-row />
</template>

<script>
import {
  inject, reactive, computed, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
// import { useI18n } from 'vue-i18n';
import {
  timeZoneUnit, numWithCommas, getSportScore, correctionTime,
} from '@/assets/js/utils/utils';
import SportApi from '@/assets/js/api/sportApi';

export default {
  setup() {
    // use
    const store = useStore();
    // const { t } = useI18n();

    // inject
    const validator = inject('$validator');

    // reactive
    const state = reactive({
      currentPlayTypeS: 1, // 當前次玩法(全場/半場)
      currentPlayTypeSName: '', // 當前次玩法名稱(全場/半場)
      gameName: '俄罗斯乙级联赛',
      gameInfo: {
        team1: 'DV奥兹宝',
        team2: '图伊马济斯巴达',
        score1: 1,
        score2: 0,
        logo1: '',
        logo2: '',
        time1: '08/30',
        time2: '18:30',
        time3: 'CST',
      },
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
    });

    // computed
    const siteStyle = computed(() => store.state.info.siteStyle);
    const timeZone = computed(() => timeZoneUnit());
    const timeZoneUnitTxt = computed(() => validator.value?.timeZoneUnit);

    // methods
    const toggleSumPopup = (isShow = true) => {
      state.isSumPopupShow = isShow;
    };

    const changeType = (type) => {
      state.currentPlayTypeS = type;
    };

    const getBetOption = async () => {
      const params = {
        issueNo: '255673972',
      };

      const { code, data } = await SportApi.getBetOption(params) || {};
      if (code !== 200) return {};
      return data;
    };

    // const getBetOption2 = async () => {
    //   const params = {
    //     issueNo: '255673972',
    //   };

    //   const { code, data } = await SportApi.getBetOption2(params) || {};
    //   // if (code !== 200) return {};
    //   // return data;
    //   console.log(code, data);
    // };

    const getData = async () => {
      state.betOptionData = await getBetOption();
      // getBetOption2();
    };

    const handleBetOption = () => {
      state.currentPlayTypeS = state.betOptionData[0]?.playTypeS;
      state.currentPlayTypeSName = state.betOptionData[0]?.playTypeSName;
    };

    const init = async () => {
      await getData();
      handleBetOption();
    };

    // hooks
    onBeforeMount(async () => {
      await init();
    });

    // window.$vue.$message.success(t('common_comingSoon'));

    return {
      state,
      siteStyle,
      timeZone,
      timeZoneUnitTxt,
      numWithCommas,
      getSportScore,
      correctionTime,
      toggleSumPopup,
      changeType,
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
      @apply rounded-20;

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
