<template>
  <component :is="shareStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    ShareStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/Share/ShareStyle1')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const shareStyle = computed(() => {
      switch (siteStyle.value) {
        case 1:
        case 2:
          return 'ShareStyle1';
        default:
          return `ShareStyle${siteStyle.value}`;
      }
    });

    return {
      shareStyle,
    };
  },
};
</script>
