<template>
  <component :is="withdrawCodeStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    WithdrawCodeStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/WithdrawCode/WithdrawCodeStyle1')),
    WithdrawCodeStyle2: defineAsyncComponent(() => import('@/components/_pages/profile/WithdrawCode/WithdrawCodeStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const withdrawCodeStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `WithdrawCodeStyle${siteStyle.value}`;
      }
    });

    return {
      withdrawCodeStyle,
    };
  },
};
</script>
