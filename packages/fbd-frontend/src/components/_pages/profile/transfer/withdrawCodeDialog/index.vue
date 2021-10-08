<template>
  <component
    :is="withdrawCodeDialogStyle"
    v-bind="$attrs"
  />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    WithdrawCodeDialogStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/transfer/withdrawCodeDialog/withdrawCodeDialogStyle1')),
    WithdrawCodeDialogStyle2: defineAsyncComponent(() => import('@/components/_pages/profile/transfer/withdrawCodeDialog/withdrawCodeDialogStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const withdrawCodeDialogStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `WithdrawCodeDialogStyle${siteStyle.value}`;
      }
    });

    return {
      withdrawCodeDialogStyle,
    };
  },
};
</script>
