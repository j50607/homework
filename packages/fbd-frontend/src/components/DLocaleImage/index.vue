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
      default: () => ({
        zh_cn: 'locale/zh_cn.svg',
        zh_tw: 'locale/zh_tw.svg',
        th_th: 'locale/th_th.svg',
        vi_vn: 'locale/vi_vn.svg',
        ja_jp: 'locale/ja_jp.svg',
        en_us: 'locale/en_us.svg',
        es_mx: 'locale/es_mx.svg',
        hi_in: 'locale/hi_in.svg',
        ko_kr: 'locale/ko_kr.svg',
        pt_pt: 'locale/pt_pt.svg',
      }),
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
