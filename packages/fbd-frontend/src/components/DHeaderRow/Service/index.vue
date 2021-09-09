<template>
  <div
    class="logo"
    :style="`justify-content:${leftPos || middlePos || rightPos}`"
  >
    <img
      class="is-btn"
      @click="goService"
      :src="$requireSafe('header/icon-service-white.svg')"
    >
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
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
  setup() {
    // use
    const store = useStore();

    // computed
    const serviceUrl = computed(() => store.state.info.serviceUrl);

    // methods
    const goService = () => {
      window.open(serviceUrl.value);
    };

    return {
      goService,
      serviceUrl,
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
