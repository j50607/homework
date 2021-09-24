<template>
  <component :is="userinfoStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    UserinfoStyle1: defineAsyncComponent(() => import('@/views/profile/userinfo/userinfoStyle1')),
    UserinfoStyle2: defineAsyncComponent(() => import('@/views/profile/userinfo/userinfoStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const userinfoStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `UserinfoStyle${siteStyle.value}`;
      }
    });

    return {
      userinfoStyle,
    };
  },
};
</script>
