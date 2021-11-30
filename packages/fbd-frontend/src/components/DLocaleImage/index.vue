<template>
  <div
    class="locale-container"
  >
    <img
      :src="$requireSafe(`${path}`)"
      class="locale-img"
    >
    <span class="locale-text">{{ $t('common_language') }}</span>
  </div>
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
        // zh_tw: 'locale/zh_tw.svg',
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
<style lang="postcss" scoped>
.locale {
  &-container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    height: 21px;
    padding: 5px;
    border-radius: 10px;
    background: #f2f2f2;
  }

  &-img {
    width: 12px;
    height: 12px;
    margin-right: 5px;
  }

  &-text {
    overflow: hidden;
    color: #4d5772;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
