<template>
  <div
    class="marquee"
    @click="handleClick()"
  >
    <div class="marquee-box">
      <div class="marquee-horn">
        <img :src="$requireSafe('icon/icon-marquee.svg')">
      </div>
      <div
        ref="marqueeWrap"
        class="marquee-list"
      >
        <div
          ref="marquee"
          class="marquee-list-message"
          :style="{'transform': contentOffset ? `translateX(${contentOffset}px)` : '', transitionDuration: `${duration}s`}"
        >
          <p
            v-for="(item, index) in marqueeMessage"
            :key="index"
            class="marquee-text text-xs"
            v-html="item.replace(/<br \/>/gi, '')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, watch, nextTick, onBeforeUnmount,
} from 'vue';

export default {
  props: {
    marqueeMessage: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    let wrapWidth = 0;
    let contentWidth = 0;

    // ref
    const marquee = ref(null);
    const marqueeWrap = ref(null);
    const duration = ref(0);
    const contentOffset = ref(0);

    const reset = () => {
      const durationTmp = duration.value;
      const contentOffsetTmp = contentOffset.value;
      duration.value = 0;
      contentOffset.value = wrapWidth;
      setTimeout(() => {
        duration.value = durationTmp;
        contentOffset.value = contentOffsetTmp;
      }, 0);
    };

    // watch
    watch(() => props.marqueeMessage, () => {
      nextTick(() => {
        wrapWidth = marqueeWrap.value?.offsetWidth;
        contentWidth = marquee.value?.offsetWidth;
        duration.value = (contentWidth + wrapWidth) / 50;
        contentOffset.value = -contentWidth;
        marquee.value.addEventListener('transitionend', reset);
      });
    }, { immediate: true });

    // methods
    const handleClick = () => {
      emit('click');
    };

    // hooks
    onBeforeUnmount(() => {
      marquee.value.removeEventListener('transitionend', reset);
    });

    return {
      duration,
      contentOffset,
      handleClick,
      marquee,
      marqueeWrap,
    };
  },
};
</script>

<style lang="scss" scoped>
.marquee {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-right: 10px;
  padding: 0 15px;
  cursor: pointer;

  .marquee-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: 20px;

    .marquee-horn {
      img {
        width: 20px;
        margin: auto;
      }
    }

    .marquee-list {
      position: relative;
      display: flex;
      align-items: center;
      width: 90%;
      height: 24px;
      overflow: hidden;

      @apply flex items-center;

      .marquee-list-message {
        position: absolute;
        display: flex;
        min-width: 100%;
        transition-timing-function: linear;
      }

      @keyframes scroll {
        from {
          transform: translate3d(0, 0, 0);
        }

        to {
          transform: translate3d(-100%, 0, 0);
        }
      }
    }

    .marquee-text {
      display: inline-flex;
      flex-flow: nowrap;
      padding: 0 100px 0 40px;
      white-space: nowrap;

      + .marquee-text {
        padding: 0 100px;
      }
    }
  }
}
</style>
