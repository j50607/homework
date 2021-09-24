<template>
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

<script>
import { computed, inject } from 'vue';
import dayjs from 'dayjs';

export default {
  props: {
    selectedGameDetail: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const validator = inject('$validator');

    const timeZoneUnitTxt = computed(() => validator.value?.timeZoneUnit);

    const formatTime = (time) => dayjs(time).format('YYYY/MM/DD HH:mm:ss');

    return {
      formatTime,
      timeZoneUnitTxt,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
