<template>
  <component
    :is="currentVipStyle"
    :profit-enable="profitEnable"
    :return-profit="returnProfit"
  />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
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
    CurrentVipStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/vip/CurrentVip/CurrentVip1')),
    CurrentVipStyle2: defineAsyncComponent(() => import('@/components/_pages/profile/vip/CurrentVip/CurrentVip2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const currentVipStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `CurrentVipStyle${siteStyle.value}`;
      }
    });

    return {
      currentVipStyle,
    };
  },
};
</script>
