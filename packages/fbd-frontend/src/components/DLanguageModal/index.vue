<template>
  <component :is="languageModalStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    DLanguageModalStyle1: defineAsyncComponent(() => import('@/components/DLanguageModal/DLanguageModalStyle1')),
    DLanguageModalStyle2: defineAsyncComponent(() => import('@/components/DLanguageModal/DLanguageModalStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const languageModalStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `DLanguageModalStyle${siteStyle.value}`;
      }
    });

    return {
      languageModalStyle,
    };
  },
};
</script>
