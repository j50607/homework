<template>
  <component :is="returnPorfitRecordStyle" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    ReturnProfitRecordStyle1: defineAsyncComponent(() => import('@/components/_pages/profile/vip/ReturnProfitRecord/ReturnProfitRecordStyle1')),
    ReturnProfitRecordStyle2: defineAsyncComponent(() => import('@/components/_pages/profile/vip/ReturnProfitRecord/ReturnProfitRecordStyle2')),
  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const returnPorfitRecordStyle = computed(() => {
      switch (siteStyle.value) {
        default:
          return `ReturnProfitRecordStyle${siteStyle.value}`;
      }
    });

    return {
      returnPorfitRecordStyle,
    };
  },
};
</script>
