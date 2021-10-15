<template>
  <div
    class="detail"
    ref="selectedGameDetailRef"
  >
    <d-dialog
      v-model:visible="isModalShow"
      :footer="null"
      :title="$t('components_pages_profile_team_gameResult')"
      :width="'90%'"
      @cancel="hideModal"
    >
      <template #body>
        <div class="text-center text-xs text-normal detail-container pb-2">
          <p class="mb-1 text-primary">
            {{ selectedGameDetail?.leagueName }}
          </p>
          <p class="mb-1">
            {{ formatTime(selectedGameDetail?.matchTime) }}({{ timeZoneUnitTxt }})
          </p>
          <p class="mb-1">
            <img
              class="logo"
              v-if="selectedGameDetail?.homeTeamLogo"
              :src="`${s3Base}/${selectedGameDetail?.homeTeamLogo}`"
            >
            &nbsp;{{ selectedGameDetail?.homeTeamName }} &nbsp;&nbsp;vs&nbsp;&nbsp;
            <img
              class="logo"
              v-if="selectedGameDetail?.awayTeamLogo"
              :src="`${s3Base}/${selectedGameDetail?.awayTeamLogo}`"
            >
            &nbsp;{{ selectedGameDetail?.awayTeamName }}
          </p>
        </div>

        <div class="flex result-container">
          <div>
            <span class="betting-type">{{ $t('components_pages_profile_team_bettingType1') }}</span> <span class="text-primary">{{ selectedGameDetail?.awayTeamScore }}:{{ selectedGameDetail?.awayTeamScore }}</span>
          </div>
          <div>
            <span class="betting-type">{{ $t('components_pages_profile_team_bettingType2') }}</span> <span class="text-primary">{{ selectedGameDetail?.homeTeamHalfScore }}:{{ selectedGameDetail?.awayTeamHalfScore }}</span>
          </div>
        </div>
      </template>
    </d-dialog>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import { timeZoneUnit2 } from '@/assets/js/utils/utils';

export default {
  props: {
    selectedGameDetail: {
      type: Object,
      default: () => {},
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'cancel'],
  setup(props, context) {
    const selectedGameDetailRef = ref(null);
    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);

    const formatTime = (time) => dayjs(time).format('YYYY/MM/DD HH:mm:ss');

    const timeZoneUnitTxt = computed(() => timeZoneUnit2());

    const isModalShow = computed({
      get: () => props.isShow,
      set: (val) => context.emit('update:value', val),
    });

    const hideModal = () => {
      context.emit('cancel', false);
    };

    return {
      timeZoneUnitTxt,
      selectedGameDetailRef,
      formatTime,
      isModalShow,
      hideModal,
      s3Base,
    };
  },
};
</script>

<style lang="scss" scoped>

.d-dialog {
  .detail-container {
    border-bottom: 1px solid #4d57721a;

    .logo {
      display: inline;
      width: 14px;
      height: 14px;
      margin-bottom: 2px;
      vertical-align: middle;
    }
  }

  .result-container {
    justify-content: space-between;
    width: 50%;
    margin: 15px auto 0;
    font-size: 12px;
    text-align: center;

    .betting-type {
      display: inline-block;
      width: 35px;
      height: 22px;
      margin-right: 5px;
      color: white;
      line-height: 22px;
      background-color: #4d5772;
    }

    div:last-of-type {
      .betting-type {
        background-color: #bcc0cb;
      }
    }
  }
}
</style>
