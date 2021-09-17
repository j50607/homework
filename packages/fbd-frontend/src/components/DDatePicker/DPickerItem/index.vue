<template>
  <div
    class="picker-item"
    @touchstart="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <ul
      class="picker-li"
      :style="transformStyle"
    >
      <li
        v-for="(item, childIndex) in data"
        v-text="item"
        :key="childIndex"
        :class="{'on': selectIndex === childIndex}"
      />
    </ul>
  </div>
</template>

<script>
import {
  computed, reactive, toRefs, watch,
} from 'vue';
import dayjs from 'dayjs';

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    height: {
      type: [String, Number],
      default: 300,
    },
    visibleCount: {
      type: [String, Number],
      default: 6,
    },
    change: {
      type: Function,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
    /**
     * 選中的值
     */
    value: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const state = reactive({
      // touch时鼠标所有位置
      startY: 0,
      // touch前已移动的距离
      startOffset: 0,
      // 当前移动的距离
      offset: 0,
      selectIndex: 0,
    });

    const getTouch = (event) => event.changedTouches[0] || event.touches[0];

    // 取显示条数的一半，因为选中的在中间，显示条数为奇数
    const getVisibleCount = () => Math.floor(props.visibleCount / 2);

    const pickerMask = computed(() => ({
      backgroundSize: `100% ${getVisibleCount() * props.height}px`,
    }));

    const transformStyle = computed(() => ({
      transition: 'all 100ms ease',
      transform: `translate3d(0, ${state.offset}px, 0)`,
    }));
    const setIndex = (index) => {
      // 按显示5条计算，选择第3条时，偏移为0，选择第1条时，偏移为li的高*2
      // 即偏移距离为(5/2取整－index)*liHeight
      // 如果当前选中的为disabled状态，则往下选择，仅在滑动选择时判断，默认填值时不作判断
      // 存在数据加载问题，有可能初始时数据是空的
      if (index > props.data.length - 1) {
        index = props.data.length - 1;
      }

      if (props.data.length > 0) {
        state.offset = (getVisibleCount() - index) * props.height;

        const value = props.data[index].value || props.data[index];
        state.selectIndex = index;

        emit('change', value, props.index);
      }
    };

    const moveTo = () => {
      let index = 0;
      for (let i = 0; i < props.data.length; i++) {
        const v = props.data[i].value || props.data[i];
        if (+props.value === +v) {
          index = i;
          break;
        }
      }

      setIndex(index, false);
    };

    watch([() => props.height, () => props.value], () => {
      moveTo();
    });

    const onTouchStart = (event) => {
      const touch = getTouch(event);
      state.startOffset = state.offset;
      state.startY = touch.clientY;
    };

    const onTouchMove = (event) => {
      const touch = getTouch(event);
      const currentY = touch.clientY;
      const distance = currentY - state.startY;
      state.offset = state.startOffset + distance;
    };

    const onTouchEnd = () => {
      let index = Math.round(state.offset / props.height);
      const vc = getVisibleCount();
      // index的有效范围
      const indexMax = vc - props.data.length;

      if (index >= vc) {
        index = 0; // 选择第一个
      } else if (index < indexMax) {
        // 选择最后一个
        index = props.data.length - 1; // 最后一个
      } else {
        index = vc - index;
      }

      setIndex(index, true);
    };

    return {
      dayjs,
      getTouch,
      getVisibleCount,
      onTouchMove,
      onTouchStart,
      onTouchEnd,
      moveTo,
      pickerMask,
      transformStyle,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.picker-item {
  position: relative;
  width: 100%;
  overflow: hidden;

  li {
    height: 35px;
    overflow: hidden;
    color: #4d5771;
    font-size: 16px;
    line-height: 35px;
    text-align: center;

    &.on {
      color: var(--primary-color);
    }
  }
}
</style>
