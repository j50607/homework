<template>
  <component
    :is="envelopRecordStyle"
    :current-page="currentPage"
  />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    currentPage: {
      type: String,
      default: '',
    },
  },
  components: {
    EnvelopRecordStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/vip/EnvelopRecord/EnvelopRecord1')),
    EnvelopRecordStyle2: defineAsyncComponent(() => import('@/components/_pages/profile/vip/EnvelopRecord/EnvelopRecord2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const envelopRecordStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `EnvelopRecordStyle${siteStyle.value}`;
      }
    });

    return {
      envelopRecordStyle,
    };
  },
};
</script>
