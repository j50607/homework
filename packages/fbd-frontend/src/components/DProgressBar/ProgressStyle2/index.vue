<template>
  <div
    class="relative"
    :style="{'--stroke-color': strokeColor}"
    @click="refresh"
  >
    <svg
      :style="{width: `${width}px`, height: `${height}px`}"
    >
      <circle
        :r="r"
        :cx="cx"
        :cy="cy"
        fill="transparent"
        class="bg"
      />
      <circle
        :r="r"
        :cx="cx"
        :cy="cy"
        fill="transparent"
        class="inner"
        :stroke-dasharray="dashArray"
        :transform="`rotate(-90) translate(-${width})`"
        :stroke-dashoffset="progress"
      />
    </svg>
    <span
      v-if="showTiming"
      class="text"
    >{{ countdown }}</span>
  </div>
</template>

<script>
import {
  ref, onUnmounted, computed, watch,
} from 'vue';

export default {
  emits: ['finish', 'seconds'],
  props: {
    time: {
      type: [String, Number],
      default: 15,
    },
    /**
     * 圓形半徑
     */
    r: {
      type: [String, Number],
      default: 12,
    },
    /**
     * 圓心x軸位置
     */
    cx: {
      type: [String, Number],
      default: 13,
    },
    /**
     * 圓心y軸位置
     */
    cy: {
      type: [String, Number],
      default: 13,
    },
    height: {
      type: [String, Number],
      default: 26,
    },
    width: {
      type: [String, Number],
      default: 26,
    },
    /**
     * 預設為True，若給False的話，倒數動畫暫停。
     */
    running: {
      type: Boolean,
      default: true,
    },
    /**
     * 預設為False，若給True的話，倒數時間顯示。
     */
    showTiming: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    // ref
    const countdown = ref(props.time);
    const strokeColor = ref('#4aee91');
    let timer = null;
    let timer2 = null;

    const dashArray = computed(() => props.r * 3.14 * 2);
    const progress = ref(dashArray.value);
    const countTime = computed(() => 1000 / (dashArray.value / props.time));

    const init = () => {
      timer2 = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value -= 1;
          emit('seconds', countdown.value);
        } else {
          countdown.value = props.time;
          emit('finish');
          progress.value = dashArray.value;
        }
      }, 1000);

      timer = setInterval(() => {
        progress.value -= 1;

        if (progress.value / dashArray.value <= 0.5) {
          strokeColor.value = '#ff5a5a';
        } else {
          strokeColor.value = '#4aee91';
        }
      }, countTime.value);
    };

    const refresh = () => {
      clearInterval(timer);
      clearInterval(timer2);
      countdown.value = props.time;
      progress.value = dashArray.value;
      init();
      emit('finish');
    };

    watch(() => props.running, (val) => {
      if (val) {
        clearInterval(timer);
        clearInterval(timer2);
        countdown.value = props.time;
        progress.value = dashArray.value;
        init();
      } else {
        countdown.value = 0;
        clearInterval(timer);
        clearInterval(timer2);
      }
    });

    const calcProgress = () => {
      if (document.visibilityState === 'visible') {
        const current = (countdown.value - 1) / props.time;
        progress.value = dashArray.value * current;
      }
    };

    window.addEventListener('visibilitychange', calcProgress);
    init();

    onUnmounted(() => {
      clearInterval(timer);
      clearInterval(timer2);

      window.removeEventListener('visibilitychange', calcProgress);
    });

    return {
      progress,
      dashArray,
      countTime,
      init,
      refresh,
      countdown,
      strokeColor,
    };
  },
};
</script>

<style lang="scss" scoped>

.bg {
  stroke: #fff;
  stroke-width: 2px;
}

.inner {
  transition: all 0.3s ease-in-out;
  stroke: var(--stroke-color);
  stroke-width: 2px;
}

.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>
