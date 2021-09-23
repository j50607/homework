<template>
  <component :is="homePageStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    HomePageStyle1: defineAsyncComponent(() => import('@/components/_pages/home/HomePage/HomePageStyle1')),
    HomePageStyle2: defineAsyncComponent(() => import('@/components/_pages/home/HomePage/HomePageStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const homePageStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `HomePageStyle${siteStyle.value}`;
      }
    });

    return {
      homePageStyle,
    };
  },
};
</script>
