<template>
  <div
    class="logo"
    :style="`justify-content:${leftPos || middlePos || rightPos}`"
  >
    <img
      class="is-btn"
      @click="clickInfo()"
      :src="$requireSafe(`header/info-${infoImg}.svg`)"
    >
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    leftPos: {
      type: String,
      default: '',
    },
    middlePos: {
      type: String,
      default: '',
    },
    rightPos: {
      type: String,
      default: '',
    },
  },
  emits: ['openInfo'],
  setup(props, { emit }) {
    const store = useStore();
    const siteStyle = computed(() => store.getters.siteStyle);

    const infoImg = computed(() => {
      switch (siteStyle.value) {
        case 1:
          return 'black';
        case 2:
          return 'white';
        default:
          return 'black';
      }
    });

    const clickInfo = () => {
      emit('openInfo');
    };

    return {
      clickInfo,
      siteStyle,
      infoImg,
    };
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 100%;

  img {
    width: auto;
    height: 20px;
  }
}
</style>
