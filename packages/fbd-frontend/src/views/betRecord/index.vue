<template>
  <header class="fixed top-0 h-h-h w-full bg-white">
    header
  </header>

  <div class="betrecord">
    <div class="range">
      <ul class="range-list">
        <li
          v-for="(item, idx) in state.rangeArr"
          :key="`rangeArr[${idx}]`"
          class="range-item is-btn"
          :class="{ 'range-item-active': item.value === state.currentRange }"
          v-text="item.text"
          @click="changeRange(item.value)"
        />
        <li
          class="range-item range-item-filter is-btn"
          @click="toggleFilterPopup(true)"
        >
          <img :src="$requireSafe(`icon/style${siteStyle}/filter.svg`)">
        </li>
      </ul>
    </div>

    <div class="betrecord-container">
      <d-scroll
        v-if="state.betRecordData?.length"
        ref="scroll"
        :pull-up="true"
        :pull-down="true"
        :scroll-y="true"
        :on-scroll="true"
        @pullingUp="loadMoreRecord()"
        @pullingDown="pullingDown()"
      >
        <ul class="betrecord-list">
          <li
            v-for="(item, idx) in state.betRecordData"
            :key="`betRecordData[${idx}]`"
            class="betrecord-item"
          >
            <div class="betrecord-item-piece">
              <div class="betrecord-text betrecord-text">
                {{ item.createdAt }}
              </div>
            </div>

            <div class="betrecord-item-piece betrecord-item-piece-multi">
              <div class="betrecord-text betrecord-text-lg">
                {{ item.name }}
              </div>
              <div class="betrecord-text betrecord-text-sm">
                {{ $t('views_betRecord_item_label5') }}
              </div>

              <div class="betrecord-text betrecord-text-lg">
                {{ item.time }}
              </div>
              <div
                class="betrecord-text betrecord-text-sm"
                :class="renderNumberStyle(item.status)"
              >
                {{ renderNumber(item.status) }}
              </div>

              <div class="betrecord-text betrecord-text-xl betrecord-text-em">
                {{ item.name2 }}
              </div>
            </div>

            <div
              v-show="item.isShowDetails"
              class="betrecord-item-piece betrecord-item-piece-multi"
            >
              <div class="betrecord-text betrecord-text-sm">
                {{ $t('views_betRecord_item_label1') }}
              </div>
              <div class="betrecord-text betrecord-text-lg">
                {{ item.amount }}
              </div>

              <div class="betrecord-text betrecord-text-sm">
                {{ $t('views_betRecord_item_label2') }}
              </div>
              <div class="betrecord-text betrecord-text-lg betrecord-item-option">
                <span>
                  {{ item.option1 }}
                </span>
                <span class="betrecord-item-option-em">
                  {{ item.option2 }}
                </span>
              </div>

              <div class="betrecord-text betrecord-text-sm">
                {{ $t('views_betRecord_item_label3') }}
              </div>
              <div class="betrecord-text betrecord-text-lg">
                {{ item.charge }}
              </div>

              <div class="betrecord-text betrecord-text-sm">
                {{ $t('views_betRecord_item_label4') }}
              </div>
              <div
                class="betrecord-text betrecord-text-lg"
                :class="renderNumberStyle(item.status)"
              >
                {{ renderNumber(item.estimateProfit) }}
              </div>
            </div>

            <div
              class="betrecord-expand-btn is-btn"
              @click="item.isShowDetails = !item.isShowDetails"
            >
              <span>{{ renderExpandStatus(item.isShowDetails) }}</span>
              <CaretUpOutlined v-show="item.isShowDetails" />
              <CaretDownOutlined v-show="!item.isShowDetails" />
            </div>
          </li>
        </ul>
      </d-scroll>
    </div>
    <div class="betrecord-item-piece-multi betrecord-sum">
      <div class="betrecord-text betrecord-text-em betrecord-text-xl">
        <span>
          {{ $t('views_betRecord_sum_label1') }}
        </span>
        <span>
          {{ state.sumData.amount }}
        </span>
      </div>

      <div class="betrecord-text betrecord-text-md">
        <span>
          {{ $t('views_betRecord_sum_label2') }}
        </span>
        <span>
          {{ state.sumData.endGame }}
        </span>
      </div>

      <div class="betrecord-text betrecord-text-md">
        <span>
          {{ $t('views_betRecord_sum_label4') }}
        </span>
        <span>
          {{ state.sumData.realProfit }}
        </span>
      </div>

      <div class="betrecord-text betrecord-text-md">
        <span>
          {{ $t('views_betRecord_sum_label3') }}
        </span>
        <span>
          {{ state.sumData.onGoingGame }}
        </span>
      </div>

      <div class="betrecord-text betrecord-text-md">
        <span>
          {{ $t('views_betRecord_sum_label5') }}
        </span>
        <span>
          {{ state.sumData.estimateProfit }}
        </span>
      </div>
    </div>
  </div>

  <d-popup
    v-model:value="state.isFilterPopupShow"
    position="bottom"
    :round="true"
    :title="$t('views_betRecord_filterPopup_title')"
    class="popup"
  >
    <div class="popup-label">
      {{ $t('views_betRecord_filterPopup_label1') }}
    </div>
    <ul class="popup-list">
      <li class="popup-item is-btn">
        {{ $t('views_betRecord_filterPopup_status1') }}
      </li>
      <li class="popup-item is-btn">
        {{ $t('views_betRecord_filterPopup_status2') }}
      </li>
    </ul>

    <div class="popup-label">
      {{ $t('views_betRecord_filterPopup_label2') }}
    </div>
    <ul class="popup-list">
      <li
        v-for="(item, idx) in 20"
        :key="`filterItem[${idx}]`"
        class="popup-item is-btn"
      >
        {{ `选项名称${item}` }}
      </li>
    </ul>
  </d-popup>

  <footer class="fixed bottom-0 h-f-h w-full  bg-white">
    footer
  </footer>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import * as R from 'ramda';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import DScroll from '@/components/DScroll';

export default {
  components: {
    CaretUpOutlined,
    CaretDownOutlined,
    DScroll,
  },
  setup() {
    const Ramda = () => {
      // 將多個函數合並成一個函數，並從左到右執行

      // 流水線：第一個的函數的返回值交給第二個，第二個的交給第三個，依次類推

      const negative = (x) => -1 * x;

      const increaseOne = (x) => x + 1;

      /* eslint-disable-next-line */
      const f = R.pipe(Math.pow, negative, increaseOne);

      // 第一個求3的4次方，返回值給後邊方法，以此類推

      console.log('R.pipe:', f(3, 4));
      return (f(3, 4));
    };

    // use
    const store = useStore();
    const { t } = useI18n();

    // ref
    const scroll = ref(null);

    // reactive
    const state = reactive({
      rangeArr: [
        { text: t('components_dSelectDateModal_today'), value: 'today', index: 0 },
        { text: t('components_dSelectDateModal_yesterday'), value: 'yesterday', index: 1 },
        { text: t('components_dSelectDateModal_sevenDays2'), value: 'sevenDays', index: 2 },
        { text: t('components_dSelectDateModal_custom2'), value: 'custom', index: 3 },
      ],
      currentRange: 'today',
      currentExpandIdx: undefined,
      isFilterPopupShow: false,
      betRecordData: [
        {
          createdAt: '2021/08/08 06:06:06',
          name: '俄罗斯乙级联赛',
          time: '2021/08/08 06:06(CST)',
          name2: 'FC奥伦堡II V.S. 图伊马济斯巴达',
          status: 12.12,
          amount: 1000,
          option1: '半场 0 : 0',
          option2: '@2.56%',
          charge: '0.56%',
          estimateProfit: 2.56,
        },
        {
          createdAt: '2021/08/08 06:06:06',
          name: '俄罗斯乙级联赛',
          time: '2021/08/08 06:06(CST)',
          name2: 'FC奥伦堡II V.S. 图伊马济斯巴达',
          status: -12.12,
          amount: 1000,
          option1: '半场 0 : 0',
          option2: '@2.56%',
          charge: '0.56%',
          estimateProfit: -2.56,
        },
        {
          createdAt: '2021/08/08 06:06:06',
          name: '俄罗斯乙级联赛',
          time: '2021/08/08 06:06(CST)',
          name2: 'FC奥伦堡II V.S. 图伊马济斯巴达',
          status: 12.12,
          amount: 1000,
          option1: '半场 0 : 0',
          option2: '@2.56%',
          charge: '0.56%',
          estimateProfit: 2.56,
        },
        {
          createdAt: '2021/08/08 06:06:06',
          name: '俄罗斯乙级联赛',
          time: '2021/08/08 06:06(CST)',
          name2: 'FC奥伦堡II V.S. 图伊马济斯巴达',
          status: 12.12,
          amount: 1000,
          option1: '半场 0 : 0',
          option2: '@2.56%',
          charge: '0.56%',
          estimateProfit: 2.56,
        },
        {
          createdAt: '2021/08/08 06:06:06',
          name: '俄罗斯乙级联赛',
          time: '2021/08/08 06:06(CST)',
          name2: 'FC奥伦堡II V.S. 图伊马济斯巴达',
          status: 12.12,
          amount: 1000,
          option1: '半场 0 : 0',
          option2: '@2.56%',
          charge: '0.56%',
          estimateProfit: 2.56,
        },
        {
          createdAt: '2021/08/08 06:06:06',
          name: '俄罗斯乙级联赛',
          time: '2021/08/08 06:06(CST)',
          name2: 'FC奥伦堡II V.S. 图伊马济斯巴达',
          status: 12.12,
          amount: 1000,
          option1: '半场 0 : 0',
          option2: '@2.56%',
          charge: '0.56%',
          estimateProfit: 2.56,
        },
        {
          createdAt: '2021/08/08 06:06:06',
          name: '俄罗斯乙级联赛',
          time: '2021/08/08 06:06(CST)',
          name2: 'FC奥伦堡II V.S. 图伊马济斯巴达',
          status: 12.12,
          amount: 1000,
          option1: '半场 0 : 0',
          option2: '@2.56%',
          charge: '0.56%',
          estimateProfit: 2.56,
        },
      ],
      sumData: {
        amount: 123.248,
        endGame: 21,
        onGoingGame: 7,
        realProfit: 217664.97,
        estimateProfit: 1084265.9,
      },
    });

    // computed
    const siteStyle = computed(() => store.state.info.siteStyle);

    // methods
    const changeRange = (range) => {
      state.currentRange = range;
    };

    const renderNumber = (val) => {
      const num = Number(val) || 0;
      if (num > 0) return `+${num}`;
      return num;
    };

    const renderNumberStyle = (val) => {
      const num = Number(val) || 0;
      if (num > 0) return 'text-positive';
      if (num < 0) return 'text-negative';
      return '';
    };

    const renderExpandStatus = (val) => (val ? t('views_betRecord_item_action2') : t('views_betRecord_item_action1'));

    const toggleFilterPopup = (isShow) => {
      state.isFilterPopupShow = isShow;
    };

    const getRecord = async () => {
      const data = R.clone(state.betRecordData);
      const result = data.map((item) => ({ ...item, isShowDetails: false }));
      return result;
    };

    const loadMoreRecord = () => {
      // state.pageData.pageIndex += 1;
      getRecord();
    };

    const pullingDown = () => {
      // state.pageData.pageIndex += 1;
      getRecord();
    };

    const init = async () => {
      state.betRecordData = await getRecord();
    };

    init();

    return {
      state,
      scroll,
      siteStyle,
      changeRange,
      renderNumber,
      renderNumberStyle,
      renderExpandStatus,
      toggleFilterPopup,
      loadMoreRecord,
      pullingDown,
      Ramda,
    };
  },
};
</script>

<style lang="postcss" scoped>
.betrecord {
  @apply relative h-full text-xs;

  /* height: calc(100% - var(--header-height) - var(--footer-height)); */
  height: calc(100% - 40px);
  padding: var(--header-height) 0 var(--footer-height);

  &-container {
    @apply h-full px-3 pt-4;
  }

  &-item {
    @apply p-2 pb-7 bg-primary-content rounded-5 relative;

    box-shadow: 0 2px 4px #4d57721a;

    & + & {
      @apply mt-3;
    }
  }

  &-item-piece {
    @apply mb-3;
  }

  &-item-piece-multi {
    @apply grid grid-cols-6 gap-1 mb-4;
  }

  &-item-option {
    @apply flex items-center;
  }

  &-item-option-em {
    @apply ml-1 text-primary;
  }

  &-text {
    @apply text-xs;
  }

  &-text-xl {
    @apply col-span-6;
  }

  &-text-lg {
    @apply col-span-4;
  }

  &-text-md {
    @apply col-span-3;
  }

  &-text-sm {
    @apply col-span-2;
  }

  &-text-em {
    @apply text-primary;
  }

  &-expand-btn {
    @apply absolute bottom-0 left-0 flex items-center justify-center w-full pt-1 bg-secondary-content text-center;

    padding-bottom: 8px;
  }

  &-expand-btn .anticon {
    @apply ml-1;
  }

  &-sum {
    @apply absolute bottom-0 left-0 w-full mb-0 p-3 bg-secondary-content;
  }
}

.range {
  @apply px-3;

  &-list {
    @apply flex items-center h-8 text-sm;
  }

  &-item {
    @apply w-1/4 py-2 text-center relative;
  }

  &-item-active {
    @apply font-bold;

    &::after {
      @apply absolute bottom-0 left-1/2 w-1/3 bg-primary transform-gpu -translate-x-1/2;

      height: 3px;
      content: '';
    }
  }

  &-item-filter {
    width: 16px;
  }

  &-item-filter img {
    margin: 0 auto;
  }
}

.popup {
  &-label {
    @apply mb-2 text-xs;
  }

  &-list {
    @apply flex flex-wrap gap-x-1 gap-y-2 mb-4 text-xs;
  }

  &-item {
    @apply px-2 py-1 border border-solid border-border rounded-20 text-xs;

    &:hover,
    &-active {
      @apply text-white;

      background: var(--btn-primary-bg);
    }
  }
}
</style>
