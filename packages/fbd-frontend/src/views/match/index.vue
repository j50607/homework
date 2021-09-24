<template>
  <component :is="matchStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    MatchStyle1: defineAsyncComponent(() => import('@/views/match/matchStyle1')),
    MatchStyle2: defineAsyncComponent(() => import('@/views/match/matchStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const matchStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `MatchStyle${siteStyle.value}`;
      }
    });

    return {
      matchStyle,
    };
  },
};
</script>
