<template>
  <component :is="matchNewsStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    MatchNewsStyle1: defineAsyncComponent(() => import('@/components/_pages/home/MatchNews/MatchNewsStyle1')),
    MatchNewsStyle2: defineAsyncComponent(() => import('@/components/_pages/home/MatchNews/MatchNewsStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const matchNewsStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `MatchNewsStyle${siteStyle.value}`;
      }
    });

    return {
      matchNewsStyle,
    };
  },
};
</script>
