<template>
  <component :is="BettingStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    BettingStyle1: defineAsyncComponent(() => import('@/components/_pages/betting/bettingStyle1')),
    BettingStyle2: defineAsyncComponent(() => import('@/components/_pages/betting/bettingStyle2')),

  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const BettingStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `BettingStyle${siteStyle.value}`;
      }
    });

    return {
      BettingStyle,
    };
  },
};
</script>
