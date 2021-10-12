<template>
  <component :is="teamStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    teamStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/Team/TeamStyle1')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const teamStyle = computed(() => {
      switch (siteStyle.value) {
        case 1:
        case 2:
          return 'teamStyle1';
        default:
          return `teamStyle${siteStyle.value}`;
      }
    });

    return {
      teamStyle,
    };
  },
};
</script>
