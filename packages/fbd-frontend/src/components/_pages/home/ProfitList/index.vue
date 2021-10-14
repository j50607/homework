<template>
  <component :is="profitListStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    ProfitListStyle1: defineAsyncComponent(() => import('@/components/_pages/home/ProfitList/ProfitListStyle1')),
    ProfitListStyle2: defineAsyncComponent(() => import('@/components/_pages/home/ProfitList/ProfitListStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const profitListStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `ProfitListStyle${siteStyle.value}`;
      }
    });

    return {
      profitListStyle,
    };
  },
};
</script>
