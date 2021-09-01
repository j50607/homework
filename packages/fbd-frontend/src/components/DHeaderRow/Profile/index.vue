<template>
  <div
    class="logo"
    :style="`justify-content:${leftPos || middlePos || rightPos}`"
  >
    <img
      class="is-btn"
      :src="$requireSafe('header/profile.svg')"
      @click="goProfile"
    >
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

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
    const router = useRouter();

    // methods
    const goProfile = () => {
      router.push('/profile');
    };

    return {
      goProfile,
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
    height: 24px;
  }
}
</style>
