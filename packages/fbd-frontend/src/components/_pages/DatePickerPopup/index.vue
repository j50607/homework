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
        {{ startDate }}
      </div>
      <span class="text-gray-400">一</span>
      <div
        class="date-box"
        :class="{'on': dateType === 'end'}"
        @click="selectDate('end')"
      >
        {{ endDate }}
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
import { convertToCst } from '@/assets/js/utils/utils';

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

    const format = `YYYY${props.format}MM${props.format}DD`;

    const state = reactive({
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

    const show = computed({
      get: () => props.visible,
      set: (val) => emit('update:visible', val),
    });

    watch(() => show.value, () => {
      setTimeout(() => {
        state.selectIndex = 0;
      }, 800);
    });

    const changeDate = (item, index) => {
      state.selectIndex = index;

      const dateMap = {
        today: dayjs().format(format),
        yesterday: dayjs().subtract(1, 'day').format(format),
        week: dayjs().subtract(7, 'day').format(format),
      };

      state.currentDate = dateMap[item.value] || dayjs().format(format);
      nextTick(() => {
        state.startDate = state.currentDate;
        state.endDate = item.value === 'yesterday' ? dayjs().subtract(1, 'day').endOf('day').format(format) : dayjs().endOf().format(format);
      });
    };

    const selectDate = (type) => {
      state.dateType = type;
    };

    const change = (val) => {
      if (state.dateType === 'start') {
        state.startDate = val;
      } else {
        state.endDate = val;
      }
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

      emit('confirm', {
        startDate: convertToCst(`${state.startDate} 00:00:00`),
        endDate: convertToCst(`${state.endDate} 23:59:59`),
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
      ...toRefs(state),
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
