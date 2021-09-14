<template>
  <div
    class="progressbar px-progressbar"
    :class="{'run-progress' : running}"
    :style="`transform: scale(${scale}); animation-duration:${time}s;`"
    @click="handleReset"
  >
    <div
      v-if="showTiming"
      class="time"
      :style="`font-size: ${timeSize}px; color: ${timeColor};`"
    >
      {{ now }}
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue';

export default {
  emits: ['finish', 'seconds'],
  props: {
    /**
     * 預設為True，若給False的話，倒數動畫暫停。
     */
    running: {
      type: Boolean,
      default: true,
    },
    /**
     * 預設為1，放大縮小比例。
     */
    scale: {
      type: Number,
      default: 1,
    },
    /**
     * 預設為False，若給True的話，倒數時間顯示。
     */
    showTiming: {
      type: Boolean,
      default: true,
    },
    /**
     * 預設為空字串，若有賦值，則會在動畫下方出現。
     */
    time: {
      type: Number,
      default: 5,
    },
    /**
     * 預設為12(px)，控制倒數時間字體大小。
     */
    timeSize: {
      type: Number,
      default: 12,
    },
    /**
     * 預設為css variable(文字顏色)，控制倒數時間字體顏色。
     */
    timeColor: {
      type: String,
      default: 'var(--font-color)',
    },
    /**
     * 是否支援點擊重置(點擊該元件後，now 會歸 0 並 emit finish)
     */
    hasClickRefresh: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // ref
    const now = ref(0);
    const timer = ref(0);

    const counting = () => {
      if (props.running) {
        now.value -= 1;
        emit('seconds', now.value);
      } else {
        clearInterval(timer.value);
      }
    };

    const handleReset = () => {
      now.value = 0;
    };

    // watch
    watch(now, (val) => {
      if (val === 0) {
        emit('finish');
        // now.value = props.time;
      }
    });

    watch(() => props.time, (val) => {
      clearInterval(timer.value);
      now.value = val;
      timer.value = setInterval(() => {
        counting();
      }, 1000);
    }, { immediate: true });

    watch(() => props.running, (val) => {
      clearInterval(timer.value);
      if (val) {
        now.value = props.time;
        timer.value = setInterval(() => {
          counting();
        }, 1000);
      } else {
        now.value = 0;
        clearInterval(timer.value);
      }
    });

    // hooks
    onUnmounted(() => {
      clearInterval(timer.value);
    });

    return {
      now,
      handleReset,
    };
  },
};
</script>

<style lang="scss" scoped>
.progressbar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('~@/assets/img/progressbar/progressbar.png');
}

.px-progressbar {
  width: 36px;
  height: 36px;
}

.run-progress {
  animation-name: sprite;
  animation-timing-function: steps(11);
  animation-iteration-count: infinite;
}

@keyframes sprite {
  from { background-position: 0; }
  to { background-position: -396px; }
}
</style>
