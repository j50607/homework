<template>
  <header>header</header>
  <ul class="range-list">
    <li
      v-for="(item, idx) in state.rangeArr"
      :key="`rangeArr[${idx}]`"
      class="range-item is-btn"
      :class="{ 'range-item-active': item.value === state.currentRange }"
      v-text="item.text"
      @click="changeRange(item.value)"
    />
  </ul>
  <div class="betrecord">
    <ul class="betrecord-list">
      <li
        v-for="(item, idx) in state.betRecordData"
        :key="`betRecordData[${idx}]`"
        class="betrecord-item"
      >
        <div class="betrecord-item-piece">
          <div class="betrecord-text betrecord-text-light">
            {{ item.createdAt }}
          </div>
        </div>

        <div class="betrecord-item-piece betrecord-item-piece-multi">
          <div class="betrecord-item-piece-row">
            <div class="betrecord-text betrecord-text-light">
              {{ item.createdAt }}
            </div>
          </div>
        </div>
        <div class="betrecord-expand-btn">
          {{ $t('') }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import * as R from 'ramda';

export default {
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
    const { t } = useI18n();

    // reactive
    const state = reactive({
      rangeArr: [
        { text: t('components_dSelectDateModal_today'), value: 'today', index: 0 },
        { text: t('components_dSelectDateModal_yesterday'), value: 'yesterday', index: 1 },
        { text: t('components_dSelectDateModal_sevenDays'), value: 'sevenDays', index: 2 },
        { text: t('components_dSelectDateModal_custom'), value: 'custom', index: 3 },
      ],
      currentRange: 'today',
      betRecordData: [
        {
          createdAt: '2021/08/08 06:06:06',
          name: '俄罗斯乙级联赛',
          time: '2021/08/08 06:06(CST)',
          name2: 'QWE V.S. ABC',
        },
      ],
    });

    // methods
    const changeRange = (range) => {
      state.currentRange = range;
    };

    return {
      state,
      changeRange,
      Ramda,
    };
  },
};
</script>

<style lang="postcss" scoped>
.betrecord {
  @apply p-3;

  &-item {
    @apply p-2;

    & + & {
      @apply mt-3;
    }
  }

  &-item-piece {
    @apply mb-6;
  }

  &-item-piece-multi {
    @apply mb-6;
  }

  &-text {
    @apply font-bold text-xs;
  }

  &-text-light {
    @apply font-normal;
  }
}

.range {
  &-list {
    @apply flex items-center;
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
}
</style>
