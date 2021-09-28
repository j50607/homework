<template>
  <component :is="orderDetailStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    OrderDetailStyle1: defineAsyncComponent(() => import('@/views/profile/orderDetail/orderDetailStyle1')),
    OrderDetailStyle2: defineAsyncComponent(() => import('@/views/profile/orderDetail/orderDetailStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const orderDetailStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `OrderDetailStyle${siteStyle.value}`;
      }
    });

    return {
      orderDetailStyle,
    };
  },
};
</script>
