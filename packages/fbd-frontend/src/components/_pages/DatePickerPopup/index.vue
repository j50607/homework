<template>
  <component
    :is="DatePickerPopup"
    v-bind="$attrs"
  />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    DatePickerPopupStyle1: defineAsyncComponent(() => import('@/components/_pages/DatePickerPopup/DatePickerPopupStyle1')),
    DatePickerPopupStyle2: defineAsyncComponent(() => import('@/components/_pages/DatePickerPopup/DatePickerPopupStyle2')),

  },
  setup() {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const DatePickerPopup = computed(() => {
      switch (siteStyle.value) {
        default:
          return `DatePickerPopupStyle${siteStyle.value}`;
      }
    });

    return {
      DatePickerPopup,
    };
  },
};
</script>
