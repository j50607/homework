<template>
  <component :is="renderStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    FinanceDetailsStyle1: defineAsyncComponent(() => import('@/components/_pages/FinanceDetails/FinanceDetailsStyle1')),
    FinanceDetailsStyle2: defineAsyncComponent(() => import('@/components/_pages/FinanceDetails/FinanceDetailsStyle2')),

  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const renderStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `FinanceDetailsStyle${siteStyle.value}`;
      }
    });

    return {
      renderStyle,
    };
  },
};
</script>
