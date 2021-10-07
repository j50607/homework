<template>
  <component :is="vipStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    VipStyle1: defineAsyncComponent(() => import('@/views/profile/vip/vipStyle1')),
    VipStyle2: defineAsyncComponent(() => import('@/views/profile/vip/vipStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const vipStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `VipStyle${siteStyle.value}`;
      }
    });

    return {
      vipStyle,
    };
  },
};
</script>
