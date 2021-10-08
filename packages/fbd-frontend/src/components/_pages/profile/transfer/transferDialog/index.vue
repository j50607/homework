<template>
  <component
    :is="transferDialogStyle"
    v-bind="$attrs"
  />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    TransferDialogStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/transfer/transferDialog/transferDialogStyle1')),
    TransferDialogStyle2: defineAsyncComponent(() => import('@/components/_pages/profile/transfer/transferDialog/transferDialogStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const transferDialogStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `TransferDialogStyle${siteStyle.value}`;
      }
    });

    return {
      transferDialogStyle,
    };
  },
};
</script>
