<template>
  <img
    :src="$requireSafe(`${path}`)"
  >
</template>

<script>
import {
  ref, computed, watch,
} from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    localeImageMapping: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore();
    // ref
    const path = ref('');

    // computed
    const storeLanguage = computed(() => store.state.info.language);

    // watch
    watch(() => storeLanguage.value, (val) => {
      if (val) {
        path.value = props.localeImageMapping[val];
      }
    }, { immediate: true });

    return {
      path,
    };
  },
};
</script>
