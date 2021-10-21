<template>
  <locale
    class="match"
    v-slot="{locale}"
  >
    <div class="label-wrapper">
      <div class="label px-3 py-1">
        <span>{{ dayjs(data.matchTime).format('YYYY-MM-DD HH:mm') }}{{ `(${timeZoneUnitTxt})` }}</span>
      </div>
      <div v-if="data?.option !== null">
        <img :src="require('@/assets/img/icon/hot.png')">
        <div>{{ getSportScore(data?.option).replace(/\s/g, '') }}</div>
        <div>{{ fmtPayRate(data?.payRate ?? 0) }}</div>
      </div>
    </div>
    <div
      class="content flex-1 flex flex-col px-3 py-1"
    >
      <div class="match-content flex items-center pt-2 pb-2">
        <div class="match-info flex flex-col">
          <div class="mb-2 text-primary text-sm">
            {{ data.leagueName }}
          </div>
          <div class="team-info mb-1">
            <img
              :src="data.homeTeamLogo? `${s3Base}/${data.homeTeamLogo}`: $requireSafe('icon/default-team.svg')"
              alt=""
            >
            <div>{{ data.homeTeamName }}</div>
          </div>
          <div>
            vs
          </div>
          <div class="team-info mt-1">
            <img
              :src="data.awayTeamLogo? `${s3Base}/${data.awayTeamLogo}`: $requireSafe('icon/default-team.svg')"
              alt=""
            >
            <div>{{ data.awayTeamName }}</div>
          </div>
        </div>
        <div class="flex-1 justify-center">
          <div
            class="circle ml-auto"
            :class="locale"
          >
            <div
              class="circle-inner flex flex-col justify-center rounded-full bg-white z-10 text-center text-sm"
            >
              {{ $t('components_match_betAmount') }}
              <div class="font-bold italic">
                {{ amoutnFormat(data.totalBetAmount + data.totalVirtualBet || 0) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-px w-full bg-border" />
      <div class="flex items-center justify-between h-full">
        <div v-if="isEnded">
          {{ $t('views_betting_info_deadlineClosed') }}
        </div>
        <div
          v-else
          class="flex items-center"
        >
          <span class="mr-1">
            {{ $t('views_betting_info_deadline') }}
          </span>
          <a-statistic-countdown
            :value-style="{fontSize: '0.75rem'}"
            :value="data.matchTime"
            @finish="finish"
          />
        </div>
        <img
          class="w-2 h-2"
          :src="require('@/assets/img/home/icon-arrow-right.svg')"
          alt=""
        >
      </div>
    </div>
  </locale>
</template>

<script>
import dayjs from 'dayjs';
import { inject, computed } from 'vue';
import Locale from '@/components/Locale';
import { getSportScore, fmtPayRate, timeZoneUnit2 } from '@/assets/js/utils/utils';

export default {
  components: {
    Locale,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    // inject
    const validator = inject('$validator');
    // computed
    const timeZoneUnitTxt = computed(() => timeZoneUnit2());
    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);
    // 下注是否截止
    const isEnded = computed(() => dayjs().valueOf() > props.data.matchTime);

    // methods
    const amoutnFormat = (num) => {
      let result = (num || 0).toString();
      result = result.length > 6 ? `${result.substring(0, result.length - 6)}M` : result;
      return result;
    };

    const finish = () => {
      isEnded.value = true;
    };

    return {
      dayjs,
      validator,
      amoutnFormat,
      timeZoneUnitTxt,
      finish,
      isEnded,
      s3Base,
      getSportScore,
      fmtPayRate,
    };
  },
};
</script>

<style lang="postcss" scoped>
.match {
  @apply text-xs relative flex flex-col;

  height: 200px;
  color: #4d5772;

  .label-wrapper {
    display: flex;
    justify-content: space-between;

    .label {
      background: url('~@/assets/img/home/bg-hot-match-label.svg') no-repeat;
    }

    :last-child {
      display: flex;
      align-items: center;

      img {
        width: 18px;
      }

      div {
        margin-left: 5px;

        &:first-of-type {
          font-weight: bold;
        }

        &:last-of-type {
          color: #7a5605;
        }
      }
    }
  }

  .content {
    border-radius: 0 5px 5px;
    background: url('~@/assets/img/home/bg-hot-match.png') no-repeat center / cover;
    box-shadow: 0 2px 4px #4d57721a;

    .match-content {
      flex: 1 0 80%;

      .match-info {
        flex: 1 0 70%;
      }
    }
  }
}

.team-info {
  @apply flex items-center;

  img {
    @apply w-3.5 h-3.5 mr-1;
  }
}

.circle {
  @apply relative flex items-center justify-center rounded-full;

  width: 72px;
  height: 72px;
  background: conic-gradient(from 90deg at 50% 50%, #f3ac0a, #b58007);

  &.vi_vn {
    width: 92px;
    height: 92px;

    .circle-inner {
      width: 84px;
      height: 84px;
    }
  }
}

.circle-inner {
  width: 64px;
  height: 64px;
  box-shadow: inset 0 3px 6px #00000029;
}

.ant-statistic {
  .ant-statistic-content {
    font-size: 12px;
  }
}
</style>
