<template>
  <component :is="reviewVipStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  emits: ['checkRecord', 'getRebateTotal'],
  props: {
    profitEnable: {
      type: Object,
      default: () => {},
    },
    returnProfit: {
      type: [Number, String],
      default: 0.00,
    },
  },
  components: {
    ReviewVipStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/vip/ReviewVip/ReviewVip1')),
    ReviewVipStyle2: defineAsyncComponent(() => import('@/components/_pages/profile/vip/ReviewVip/ReviewVip2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const reviewVipStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `ReviewVipStyle${siteStyle.value}`;
      }
    });

    return {
      reviewVipStyle,
    };
  },
};
</script>
