<template>
  <component
    :is="ProgressStyle"
    v-bind="$attrs"
  />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    ProgressStyle1: defineAsyncComponent(() => import('@/components/DProgressBar/ProgressStyle1')),
    ProgressStyle2: defineAsyncComponent(() => import('@/components/DProgressBar/ProgressStyle2')),

  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const ProgressStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `ProgressStyle${siteStyle.value}`;
      }
    });

    return {
      ProgressStyle,
    };
  },
};
</script>
