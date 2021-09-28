<template>
  <component :is="withdrawStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    WithdrawStyle1: defineAsyncComponent(() => import('@/views/profile/withdraw/withdrawStyle1')),
    WithdrawStyle2: defineAsyncComponent(() => import('@/views/profile/withdraw/withdrawStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const withdrawStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `WithdrawStyle${siteStyle.value}`;
      }
    });

    return {
      withdrawStyle,
    };
  },
};
</script>
