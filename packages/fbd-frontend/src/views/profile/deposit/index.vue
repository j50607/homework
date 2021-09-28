<template>
  <component :is="depositStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    DepositStyle1: defineAsyncComponent(() => import('@/views/profile/deposit/depositStyle1')),
    DepositStyle2: defineAsyncComponent(() => import('@/views/profile/deposit/depositStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const depositStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `DepositStyle${siteStyle.value}`;
      }
    });

    return {
      depositStyle,
    };
  },
};
</script>
