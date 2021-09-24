<template>
  <component :is="dFooterRowStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    DFooterRowStyle1: defineAsyncComponent(() => import('@/components/DFooterRow/DFooterRowStyle1')),
    DFooterRowStyle2: defineAsyncComponent(() => import('@/components/DFooterRow/DFooterRowStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const dFooterRowStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `DFooterRowStyle${siteStyle.value}`;
      }
    });

    return {
      dFooterRowStyle,
    };
  },
};
</script>
