<template>
  <div
    ref="groupRef"
    class="picker-group"
    :style="{height: `${visibleCount * liHeight}px`}"
  >
    <d-picker-item
      v-for="(item, index) in data"
      :key="index"
      :index="index"
      :data="item.value"
      :height="liHeight"
      :visible-count="visibleCount"
      :value="valueArr[index] ? valueArr[index] : ''"
      @change="change"
    />
  </div>
</template>

<script>
import {
  reactive, toRefs, ref, onMounted, computed, nextTick, watch,
} from 'vue';
import dayjs from 'dayjs';
import * as moment from 'moment';
import DPickerItem from './DPickerItem';

export default {
  components: {
    DPickerItem,
  },
  props: {
    maxDate: {
      type: [String, Number],
      default: new Date().getFullYear(),
    },
    minDate: {
      type: [String, Number],
      default: new Date().getFullYear() - 10,
    },
    /**
     *  显示的个数
     */
    visibleCount: {
      type: [String, Number],
      default: 5,
    },
    value: {
      type: String,
      default: '',
    },
    /**
     * 時間格式
     */
    format: {
      type: String,
      default: '/',
    },
    notShowToday: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const groupRef = ref(null);

    const state = reactive({
      liHeight: '',
      valueArr: [],
      data: [],
    });

    const currentDate = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val),
    });

    watch(() => props.value, (val) => {
      state.valueArr = val.split(props.format);
    }, { immediate: true });

    const getDisplayHeight = () => {
      const li = groupRef.value.querySelector('li');
      if (li) {
        state.liHeight = li.offsetHeight;
      }
    };

    const generateMonth = () => {
      const dateArr = [];
      if (+state.valueArr[0] === +moment(new Date()).format('YYYY')) {
        for (let i = 1; i <= +moment(new Date()).format('MM'); i++) {
          dateArr.push(i);
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          dateArr.push(i);
        }
      }
      return dateArr;
    };

    const generateYear = () => {
      const count = props.maxDate - props.minDate;
      const dateArr = [];
      for (let i = 0; i <= count; i++) {
        dateArr.push(+props.minDate + i);
      }
      return dateArr;
    };

    const generateDay = () => {
      const dateArr = [];
      const count = dayjs(`${state.valueArr[0]}/${state.valueArr[1]}`).daysInMonth();
      if (+state.valueArr[1] === +moment(new Date()).format('MM')) {
        for (let i = 1; i <= (props.notShowToday ? (+moment(new Date()).format('DD') - 1) : (+moment(new Date()).format('DD'))); i++) {
          dateArr.push(i);
        }
      } else {
        for (let i = 1; i <= count; i++) {
          dateArr.push(i);
        }
      }

      return dateArr;
    };

    const initData = () => {
      const year = generateYear();
      const month = generateMonth();
      const day = generateDay();

      return [
        {
          value: year,
        },
        {
          value: month,
        },
        {
          value: day,
        },
      ];
    };

    const change = (val, index) => {
      state.valueArr[index] = val;
      currentDate.value = state.valueArr.join(props.format);

      if (index === 1) {
        state.data[2].value = generateDay();
        state.data[1].value = generateMonth();
      }
      emit('change', currentDate.value);
    };

    onMounted(() => {
      state.data = initData();
      nextTick(() => {
        getDisplayHeight();
      });
    });
    return {
      groupRef,
      currentDate,
      change,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.picker-group {
  position: relative;
  display: flex;
  overflow: hidden;
}
</style>
