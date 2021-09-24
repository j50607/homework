<template>
  <component :is="leagueListStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    LeagueListStyle1: defineAsyncComponent(() => import('@/components/_pages/match/leagueList/leagueListStyle1')),
    LeagueListStyle2: defineAsyncComponent(() => import('@/components/_pages/match/leagueList/leagueListStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const leagueListStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `LeagueListStyle${siteStyle.value}`;
      }
    });

    return {
      leagueListStyle,
    };
  },
};
</script>
