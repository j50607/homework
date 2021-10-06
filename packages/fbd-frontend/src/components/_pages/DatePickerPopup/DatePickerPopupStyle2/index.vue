<template>
  <div>
    <d-popup
      :title="$t('components_datepicker_chooseDate')"
      v-model:value="show"
      class="date-popup"
      position="bottom"
      duration="0.4"
      @close="close"
    >
      <div
        v-if="useSelect"
        class="flex items-center justify-between p-4 pb-0"
      >
        <div
          class="date-box"
          :class="{'on': dateType === 'start'}"
          @click="selectDate('start')"
        >
          <img
            :src="require('@/assets/img/icon/icon-calendar-white.svg')"
            alt=""
          >
          {{ dayjs(startDate).format('YYYY-MM-DD') }}
        </div>
        <span class="dash">一</span>
        <div
          class="date-box"
          :class="{'on': dateType === 'end'}"
          @click="selectDate('end')"
        >
          <img
            :src="require('@/assets/img/icon/icon-calendar-white.svg')"
            alt=""
          >
          {{ dayjs(endDate).format('YYYY-MM-DD') }}
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
          mask
          @change="change"
        />
      </transition>
      <div class="pl-4 pr-4">
        <d-button
          type="primary"
          block
          round
          class="mt-3 mb-4"
          @click="confirm"
        >
          {{ $t('common_confirm') }}
        </d-button>
      </div>
    </d-popup>
  </div>
</template>

<script>
import {
  computed, reactive, toRefs,
} from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    format: {
      type: String,
      default: '-',
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
    });

    const state = reactive(initialState());

    const resetState = () => {
      Object.assign(state, initialState());
    };

    const show = computed({
      get: () => {
        if (!props.visible) {
          resetState();
        }
        return props.visible;
      },
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

      state.startDate = state.currentDate;
      state.endDate = item.value === 'yesterday' ? dayjs().subtract(1, 'day').endOf('day').format(format) : dayjs().endOf().format(format);
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
      const start = dayjs(state.startDate).format(format);
      const end = dayjs(state.endDate).format(format);

      const today = dayjs().format(format);
      const yesterday = dayjs().subtract(1, 'day').format(format);
      const week = dayjs().subtract(7, 'day').format(format);

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

      const time = dayjs().format('HH:mm:ss');
      emit('confirm', {
        startDate: dayjs(`${state.startDate} ${time}`).format('YYYY/MM/DD HH:mm:ss'),
        endDate: dayjs(state.endDate).format('YYYY/MM/DD HH:mm:ss'),
      });

      show.value = false;
    };

    const close = () => {
      show.value = false;
    };

    return {
      changeDate,
      selectDate,
      change,
      confirm,
      close,
      show,
      dayjs,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>

.date-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 32px;
  border: 1px solid #6c82ac;
  border-radius: 20px;
  color: var(--font-color);
  font-size: 14px;
  cursor: pointer;

  &.on {
    background: #374e7b;
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
}

.date-picker {
  ::v-deep(.picker-item) {
    li {
      color: #6c82ac;
    }

    .on {
      color: #fff;
    }
  }
}

::v-deep(.date-popup) {
  .d-popup-content {
    padding: 0;
  }
}

.dash {
  color: #374e7b;
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
