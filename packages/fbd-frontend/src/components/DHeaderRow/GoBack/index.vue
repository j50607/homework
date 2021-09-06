<template>
  <div
    class="go-back"
    :style="`justify-content:${leftPos || middlePos || rightPos}`"
  >
    <img
      :src="$requireSafe(`header/icon-left-${iconColor}.svg`)"
      class="is-btn"
      @click="goBack"
    >
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
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
    toFirstStep: {
      type: Boolean,
      default: false,
    },
    iconColor: {
      type: String,
      default: 'white',
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    // computed
    const prevPage = computed(() => store.state.sessionStorageInfo.prevPage);
    // methods

    const goBack = () => {
      if (props.toFirstStep) {
        router.push({
          name: 'profile-deposit',
        });
      } else {
        router.back();
      }
    };

    return {
      goBack,
      prevPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.go-back {
  display: flex;
  align-items: center;
  height: 100%;

  img {
    width: 16px;
    height: 16px;
  }
}
</style>
