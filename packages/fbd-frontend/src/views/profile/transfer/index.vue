<template>
  <component :is="transferStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    TransferStyle1: defineAsyncComponent(() => import('@/views/profile/transfer/transferStyle1')),
    TransferStyle2: defineAsyncComponent(() => import('@/views/profile/transfer/transferStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const transferStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `TransferStyle${siteStyle.value}`;
      }
    });

    return {
      transferStyle,
    };
  },
};
</script>
