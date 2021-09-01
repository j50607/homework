<template>
  <div
    class="date"
    ref="selectDateRef"
  >
    <d-dialog
      v-model:visible="isModalShow"
      :title="$t('components_dSelectDateModal_title')"
      :footer="null"
      :get-container="() => selectDateRef"
      @cancel="hideModal"
    >
      <template #body>
        <ul class="date-list">
          <li
            v-for="(item, idx) in state.listArr"
            :key="idx"
            class="date-item is-btn"
            :class="{'date-item-active': selectedDateType === item.value}"
            @click="chooseDateRange(item.value)"
          >
            <template v-if="item.value === 'custom'">
              <a-range-picker
                :get-calendar-container="() => selectDateRef"
                v-model:value="customDateValue"
                :disabled-date="disabledDate"
                @change="onCustomDateChange"
              >
                <span
                  class="date-item is-btn"
                  :class="{'date-item-active': selectedDateType === item.value}"
                >
                  {{ item.text }}
                </span>
              </a-range-picker>
            </template>

            <template v-else>
              {{ item.text }}
            </template>
          </li>
        </ul>
      </template>
      <template #footer>
        <d-button
          block
          type="primary"
          @click="confirmDate"
        >
          {{ $t('views_bankcard_nextStep2') }}
        </d-button>
      </template>
    </d-dialog>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
// import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import DDialog from '@/components/DDialog';

export default {
  components: {
    DDialog,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    currentDateType: {
      type: String,
      default: '',
    },
  },
  emits: ['update:value', 'cancel', 'confirm'],
  setup(props, context) {
    // const formatTime = (time) => dayjs(time).format('YYYY/MM/DD');

    // use
    // const store = useStore();
    const { t } = useI18n();

    // ref
    const selectedDateType = ref('today');
    const selectDateRef = ref(null);

    const customDateValue = ref();

    // reactive
    const state = reactive({
      listArr: [
        { text: t('components_dSelectDateModal_today'), value: 'today', index: 0 },
        { text: t('components_dSelectDateModal_yesterday'), value: 'yesterday', index: 1 },
        { text: t('components_dSelectDateModal_sevenDays'), value: 'sevenDays', index: 2 },
        { text: t('components_dSelectDateModal_custom'), value: 'custom', index: 3 },
      ],
      dateData: {
        startDate: '',
        endDate: '',
        realEndDate: '',
      },
    });

    // computed
    const isModalShow = computed({
      get: () => props.isShow,
      set: (val) => context.emit('update:value', val),
    });

    // methods
    const init = () => {
      selectedDateType.value = props.currentDateType;
    };

    const hideModal = () => {
      context.emit('cancel', false);
    };

    const disabledDate = (current) => current < dayjs().subtract(6, 'day').startOf('day') || current > dayjs().endOf('day');

    const onCustomDateChange = (val) => {
      customDateValue.value = val;

      [state.dateData.startDate, state.dateData.endDate] = customDateValue.value;
      state.dateData.startDate = dayjs(state.dateData.startDate);
      state.dateData.endDate = dayjs(state.dateData.endDate);
      state.dateData.realEndDate = dayjs(state.dateData.endDate).add(1, 'day').endOf('day');
    };

    const chooseDateRange = (val) => {
      selectedDateType.value = val;

      switch (val) {
        case 'today':
          state.dateData.startDate = dayjs().startOf('day');
          state.dateData.endDate = dayjs().endOf('day');
          state.dateData.realEndDate = dayjs().add(1, 'day').endOf('day');
          break;
        case 'yesterday':
          state.dateData.startDate = dayjs().subtract(1, 'day').startOf('day');
          state.dateData.endDate = dayjs().subtract(1, 'day').endOf('day');
          state.dateData.realEndDate = dayjs().endOf('day');
          break;
        case 'sevenDays':
          state.dateData.startDate = dayjs().subtract(6, 'day').startOf('day');
          state.dateData.endDate = dayjs().subtract(6, 'day').endOf('day');
          state.dateData.realEndDate = dayjs().add(1, 'day').endOf('day');
          break;
        default:
          break;
      }
    };

    const confirmDate = () => {
      const result = {
        type: selectedDateType.value,
        ...state.dateData,
      };
      context.emit('confirm', result);
      hideModal();
    };

    init();

    return {
      state,
      selectDateRef,
      isModalShow,
      selectedDateType,
      chooseDateRange,
      confirmDate,
      hideModal,
      customDateValue,
      disabledDate,
      onCustomDateChange,
    };
  },
};
</script>

<style lang="scss" scoped>
$item-space: 7.5px;

.date {
  &-list {
    margin: 0 auto;
  }

  &-item {
    padding: 7.5px 0;
    font-size: 12px;
    text-align: center;
  }

  &-item-active {
    color: #096fc9;
    font-weight: 600;
  }
}

.d-btn {
  height: 32px;
}

::v-deep(.d-dialog-body) {
  margin: 0 auto 30px - $item-space;
}

::v-deep(.ant-modal-header) {
  padding: 15px 1.5rem;
}

::v-deep(.ant-modal) .ant-modal-body {
  padding: 0 26px 20px;
}

::v-deep(.ant-modal-close-x) {
  width: 3.25rem;
  height: 3.25rem;
  line-height: 3.25rem;

  svg {
    fill: #b3b3b3;
  }
}

::v-deep(.ant-calendar-range-right) {
  display: none;
}

::v-deep(.ant-calendar-range-part) {
  width: 100%;
}

::v-deep(.ant-calendar-range) {
  width: 100%;
}

::v-deep(.ant-calendar-picker-container) {
  left: 50% !important;
  transform: translateX(-50%);
}

::v-deep(.ant-calendar-input-wrap) {
  display: none;
}
</style>
