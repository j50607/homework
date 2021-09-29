<template>
  <div
    class="logo"
    :style="`justify-content:${leftPos || middlePos || rightPos}`"
  >
    <img
      class="is-btn"
      @click="clickInfo()"
      :src="$requireSafe('header/info.svg')"
    >
  </div>
</template>

<script>
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
    const clickInfo = () => {
      emit('openInfo');
    };

    return {
      clickInfo,
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
