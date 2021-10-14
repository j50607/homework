<template>
  <component :is="reportStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    ReportStyle1: defineAsyncComponent(() => import('@/views/profile/report/ReportStyle1')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const reportStyle = computed(() => {
      switch (siteStyle.value) {
        case 1:
        case 2:
          return 'ReportStyle1';
        default:
          return `ShareStyle${siteStyle.value}`;
      }
    });

    return {
      reportStyle,
    };
  },
};
</script>
