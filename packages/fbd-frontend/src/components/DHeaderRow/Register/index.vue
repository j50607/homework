<template>
  <div
    class="register"
    :style="`justify-content:${leftPos || middlePos || rightPos}`"
  >
    <d-button
      type="primary"
      class="btn"
      @click="goRegister"
    >
      {{ $t('components_dHeaderRow_register') }}
    </d-button>
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
    const router = useRouter();

    // methods
    const goRegister = () => {
      router.push({
        name: 'loginAndRegister',
        params: {
          type: 'register',
        },
      });
    };

    return {
      goRegister,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  align-items: center;
  height: 100%;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 24px;
    padding: 0;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    background: #ffb41d;
  }
}
</style>
