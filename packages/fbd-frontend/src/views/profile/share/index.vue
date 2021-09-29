<template>
  <component :is="shareStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    ShareStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/Share/ShareStyle1')),
    ShareStyle2: defineAsyncComponent(() => import('@/components/_pages/profile/Share/ShareStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const shareStyle = computed(() => {
      switch (siteStyle.value) {
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
