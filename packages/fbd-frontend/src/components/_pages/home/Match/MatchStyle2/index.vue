<template>
  <locale class="match">
    <div class="card is-btn">
      <div class="league">
        {{ data.leagueName }}
      </div>
      <div class="date">
        {{ dayjs(data.matchTime).format('YYYY-MM-DD HH:mm') }}{{ `(${timeZoneUnitTxt})` }}
      </div>
      <div class="card-row">
        <div class="sale">
          <span class="mr-2">
            {{ $t('components_match_saleAmount') }}
          </span>
          <span class="positive">
            {{ amoutnFormat(data.totalBetAmount) }}
          </span>
        </div>
        <div class="countdown ml-auto">
          <a-statistic-countdown
            :value-style="{fontSize: '0.75rem'}"
            :value="data.matchTime"
            @finish="finish"
          />
        </div>
        <img
          class="w-2 h-2 mr-2 ml-1"
          :src="require('@/assets/img/icon/style2/arrow.svg')"
          alt=""
        >
      </div>
      <div class="team">
        <!-- 主隊 -->
        <div class="team-info">
          <img
            class="w-4 h-4 mb-1"
            :class="{ 'rounded-full': data?.homeTeamLogo }"
            :src="data.homeTeamLogo? `${s3Base}/${data.homeTeamLogo}`: $requireSafe('icon/default-team.svg')"
            alt=""
          >
          <div class="club">
            {{ data.homeTeamName }}
          </div>
        </div>
        <div class="vs">
          VS
        </div>
        <!-- 客隊 -->
        <div class="team-info">
          <img
            class="w-4 h-4 mb-1"
            :class="{ 'rounded-full': data?.awayTeamLogo }"
            :src="data.awayTeamLogo ? `${s3Base}/${data.awayTeamLogo}`: $requireSafe('icon/default-team.svg')"
            alt=""
          >
          <div class="club">
            {{ data.awayTeamName }}
          </div>
        </div>
      </div>
    </div>
  </locale>
</template>

<script>
import dayjs from 'dayjs';
import { inject, computed } from 'vue';
import Locale from '@/components/Locale';
import { timeZoneUnit2 } from '@/assets/js/utils/utils';

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
    };
  },
};
</script>

<style lang="postcss" scoped>
.match {
  @apply text-xs relative flex flex-col;

  .card {
    border-radius: 5px;
    background: #142340;

    @apply w-full overflow-hidden;

    .league {
      color: #ffb83d;

      @apply mb-1 mx-2 my-1;
    }

    .date {
      color: #fff4d9;

      @apply my-1 px-2;
    }

    &-row {
      @apply flex items-center my-1 px-2;
    }

    .positive {
      color: #4aee91;
    }

    .countdown {
      ::v-deep(.ant-statistic-content-value) {
        color: #ff5a5a;
      }
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
}
</style>
