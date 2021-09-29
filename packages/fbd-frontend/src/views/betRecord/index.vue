<template>
  <component :is="renderStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    BetRecordStyle1: defineAsyncComponent(() => import('@/components/_pages/betRecord/betRecordStyle1')),
    BetRecordStyle2: defineAsyncComponent(() => import('@/components/_pages/betRecord/betRecordStyle2')),

  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const renderStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `BetRecordStyle${siteStyle.value}`;
      }
    });

    return {
      renderStyle,
    };
  },
};
</script>
