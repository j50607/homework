<template>
  <component :is="marqueeStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    MarqueeStyle1: defineAsyncComponent(() => import('@/components/_pages/home/Marquee/MarqueeStyle1')),
    MarqueeStyle2: defineAsyncComponent(() => import('@/components/_pages/home/Marquee/MarqueeStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const marqueeStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `MarqueeStyle${siteStyle.value}`;
      }
    });

    return {
      marqueeStyle,
    };
  },
};
</script>
