<template>
  <d-popup
    :title="$t('components_datepicker_chooseDate')"
    v-model:value="show"
    round
    position="bottom"
    duration="0.4"
    @close="close"
  >
    <div
      v-if="useSelect"
      class="flex justify-center mt-2 mb-4 text-xs"
    >
      <div
        class="btn"
        v-for="(item, index) in quickList"
        :key="index"
        :class="{'on': selectIndex === index}"
        @click="changeDate(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div
      v-if="useSelect"
      class="flex items-center justify-between"
    >
      <div
        class="date-box"
        :class="{'on': dateType === 'start'}"
        @click="selectDate('start')"
      >
        {{ dayjs(startDate).format(`YYYY${format}MM${format}DD`) }}
      </div>
      <span class="text-gray-400">一</span>
      <div
        class="date-box"
        :class="{'on': dateType === 'end'}"
        @click="selectDate('end')"
      >
        {{ dayjs(endDate).format(`YYYY${format}MM${format}DD`) }}
      </div>
    </div>
    <transition name="fade">
      <d-date-picker
        v-if="show"
        class="date-picker mt-5"
        v-model:value="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        :format="format"
        :not-show-today="notShowToday"
        @change="change"
      />
    </transition>
    <d-button
      type="primary"
      block
      class="mt-7 mb-10"
      @click="confirm"
    >
      {{ $t('common_confirm') }}
    </d-button>
  </d-popup>
</template>

<script>
import {
  computed, nextTick, reactive, toRefs, watch,
} from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    format: {
      type: String,
      default: '/',
    },
    /**
     * 是否使用北京时间
     */
    convertCst: {
      type: Boolean,
      default: true,
    },
    maxDate: {
      type: [String, Number],
      default: new Date().getFullYear(),
    },
    minDate: {
      type: [String, Number],
      default: new Date().getFullYear() - 10,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    useSelect: {
      type: Boolean,
      default: false,
    },
    notShowToday: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['confirm', 'update:visible'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const format = `YYYY${props.format}MM${props.format}DD HH:mm:ss`;

    const initialState = () => ({
      currentDate: dayjs().format(format),
      selectIndex: 0,
      quickList: [
        {
          name: t('components_dSelectDateModal_today'),
          value: 'today',
        },
        {
          name: t('components_dSelectDateModal_yesterday'),
          value: 'yesterday',
        },
        {
          name: t('components_dSelectDateModal_sevenDays3'),
          value: 'week',
        },
      ],
      startDate: dayjs().format(format),
      endDate: dayjs().format(format),
      dateType: 'start',
      tempStartDate: '',
      tempEndDate: '',
    });

    const state = reactive(initialState());

    const resetState = () => {
      setTimeout(() => {
        Object.assign(state, initialState());
      }, 400);
    };

    const show = computed({
      get: () => props.visible,
      set: (val) => emit('update:visible', val),
    });

    const changeDate = (item, index) => {
      state.dateType = 'start';
      state.selectIndex = index;

      const dateMap = {
        today: dayjs().format(format),
        yesterday: dayjs().subtract(1, 'day').format(format),
        week: dayjs().subtract(6, 'day').format(format),
      };

      state.currentDate = dateMap[item.value] || dayjs().format(format);

      nextTick(() => {
        state.startDate = state.currentDate;
        state.endDate = item.value === 'yesterday' ? dayjs().subtract(1, 'day').endOf('day').format(format) : dayjs().endOf().format(format);
      });
    };

    const selectDate = (type) => {
      state.dateType = type;

      if (type === 'start') {
        state.currentDate = dayjs(state.startDate).format(format);
      } else if (type === 'end') {
        state.currentDate = dayjs(state.endDate).format(format);
      }
    };

    /**
     * 判断选中日期并给予或移除按钮颜色
     */
    const selectedDays = () => {
      const start = dayjs(state.startDate).startOf('day').format(format);
      const end = dayjs(state.endDate).startOf('day').format(format);

      const today = dayjs().startOf('day').format(format);
      const yesterday = dayjs().startOf('day').subtract(1, 'day').format(format);
      const week = dayjs().startOf('day').subtract(6, 'days').format(format);

      if (start === today && end === today) {
        state.selectIndex = 0;
      } else if (start === yesterday && end === yesterday) {
        state.selectIndex = 1;
      } else if (start === week && end === today) {
        state.selectIndex = 2;
      } else {
        state.selectIndex = -1;
      }
    };

    const change = (val) => {
      if (state.dateType === 'start') {
        state.startDate = val;
      } else {
        state.endDate = val;
      }

      selectedDays();
    };

    const validateDate = () => {
      if (dayjs(state.startDate) > dayjs(state.endDate)) {
        window.$vue.$message.info(t('components_datepicker_dateRange'));
        return true;
      }
      return false;
    };

    const confirm = () => {
      if (validateDate()) return;

      state.tempStartDate = state.startDate;
      state.tempEndDate = state.endDate;
      const time = dayjs().format('HH:mm:ss');
      emit('confirm', {
        startDate: dayjs(`${dayjs(state.startDate).format(`YYYY${props.format}MM${props.format}DD`)} ${time}`).format(format),
        endDate: dayjs(state.endDate).format(format),
      });

      show.value = false;
    };

    const close = () => {
      show.value = false;
    };

    watch(() => props.visible, (val) => {
      if (!val && !state.tempStartDate) {
        resetState();
      }

      if (val && state.tempStartDate) {
        state.startDate = state.tempStartDate;
        state.endDate = state.tempEndDate;
        selectDate('start');
      }
    });

    return {
      changeDate,
      selectDate,
      change,
      confirm,
      close,
      show,
      ...toRefs(state),
      dayjs,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  height: 26px;
  margin-right: 10px;
  padding: 0 5px;
  border: 1px solid #bdbdbd;
  border-radius: 20px;
  color: var(--font-color);
  cursor: pointer;

  &.on {
    border: none;
    color: #fff;
    background: var(--btn-primary-bg);
  }
}

.date-picker {
  padding: 0 50px;
}

.date-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 32px;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  color: var(--font-color);
  font-size: 14px;

  &.on {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
}

.d-btn {
  font-size: 12px !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
