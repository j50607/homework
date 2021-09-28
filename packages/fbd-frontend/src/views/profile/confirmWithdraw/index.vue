<template>
  <component :is="confirmWithdrawStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    ConfirmWithdrawStyle1: defineAsyncComponent(() => import('@/views/profile/confirmWithdraw/confirmWithdrawStyle1')),
    ConfirmWithdrawStyle2: defineAsyncComponent(() => import('@/views/profile/confirmWithdraw/confirmWithdrawStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const confirmWithdrawStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `ConfirmWithdrawStyle${siteStyle.value}`;
      }
    });

    return {
      confirmWithdrawStyle,
    };
  },
};
</script>
