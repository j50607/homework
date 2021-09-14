<template>
  <div class="d-tabs">
    <div
      class="d-tabs-mobile"
    >
      <div
        class="d-tabs-mobile-area"
        ref="tabsItemRef"
      >
        <div
          ref="boxRef"
          class="d-tabs-mobile-box"
          :class="[tabPosition]"
        >
          <div
            class="d-tabs-mobile-title is-btn"
            :class="[
              {'active-text': currentKey === index},
              checkSize()
            ]"
            v-for="(item, index) in tabList"
            :key="index"
            @click="tabCallback(index)"
          >
            <div class="d-tabs-mobile-title-text">
              {{ item.label }}
            </div>

            <div
              class="d-tabs-mobile-active-line"
              :class="[
                {'active-bg': currentKey === index}
              ]"
            />
          </div>
        </div>
      </div>

      <template v-if="slotContentBool">
        <div
          class="d-tabs-mobile-content"
          v-for="(item, index) in tabList"
          :key="index"
        >
          <slot
            v-if="currentKey === index"
            :name="`content${index}`"
          />
        </div>
      </template>

      <div
        v-else
        class="d-tabs-mobile-content"
      >
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed, ref, onMounted,
} from 'vue';

export default {
  emits: ['change', 'buttonCallback', 'update:activeKey'],
  props: {
    activeKey: {
      type: Number,
      default: undefined,
    },
    /**
     * 传入阵列资料
     */
    tabList: {
      type: Array,
      default: () => [],
    },
    /**
     * tab 位置 ['center' || 'left' || 'right']
     */
    tabPosition: {
      type: String,
      default: 'left',
    },
    /**
     * tab大小 ['none' || 'small' || 'default ' || 'large ']
     */
    size: {
      type: String,
      default: 'default',
    },
    /**
     * tab类型: ['' || 'card'] 目前本封裝暫不支援 編輯模式 editable-card
     */
    tabsType: {
      type: String,
      default: 'line',
    },
    /**
     * 预设显示位置
     */
    defaultKey: {
      type: Number,
      default: 1,
    },
    /**
     * 誕生slot多個新内容
     */
    slotContentBool: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // ref
    const tabIndex = ref(0);
    const oldNumber = ref(0);
    const newNumber = ref(0);
    const lastNum = ref(0);
    const bool = ref(false);
    const tabsItemRef = ref();
    const boxRef = ref();
    const current = ref(0);
    const touchLock = ref(false);

    // computed
    const currentKey = computed({
      get: () => props.activeKey || tabIndex.value,
      set: (val) => emit('update:activeKey', val),
    });

    const tabsItemWidth = computed(() => Math.ceil(document.querySelectorAll('.d-tabs-mobile-title')[newNumber.value].offsetWidth || 0));

    const tabsItemOffsetLeft = computed(() => Math.ceil(document.getElementsByClassName('d-tabs-mobile-title')[newNumber.value].offsetLeft));

    const lastItemOffsetLeft = computed(() => Math.ceil(document.getElementsByClassName('d-tabs-mobile-title')[props.tabList.length - 1].offsetLeft));

    const lookWidth = computed(() => Math.ceil(tabsItemRef.value.clientWidth));

    // methods
    const isMobile = () => {
      const mobile = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];

      const result = mobile.some((e) => navigator.userAgent.match(e));

      return result;
    };

    const right = () => {
      if (oldNumber.value === newNumber.value) return;

      if (lastItemOffsetLeft.value <= lookWidth.value) return;

      if (lastItemOffsetLeft.value > lookWidth.value && newNumber.value > 1) {
        current.value = tabsItemOffsetLeft.value - (boxRef.value.offsetWidth - tabsItemWidth.value) / 2;

        boxRef.value.scrollLeft = current.value;
      }
    };

    const left = () => {
      if (oldNumber.value === newNumber.value) return;

      if (newNumber.value !== 0 && (newNumber.value > 1 || oldNumber.value > newNumber.value)) {
        const to = tabsItemOffsetLeft.value - (boxRef.value.offsetWidth - tabsItemWidth.value) / 2;

        current.value = to - boxRef.value.scrollLeft;

        boxRef.value.scrollLeft += current.value;
      }
    };

    const calculation = (val) => {
      newNumber.value = val;

      if (oldNumber.value <= newNumber.value) {
        right();
      } else {
        left();
      }

      oldNumber.value = newNumber.value;
    };

    // 回调 emit
    const tabCallback = (val) => {
      currentKey.value = val;
      tabIndex.value = val;

      if (props.tabPosition === 'left') {
        touchLock.value = true;
        calculation(val);
      }

      emit('change', val);
    };

    // 按钮回调 emit
    const buttonCallback = (val) => {
      emit('buttonCallback', val);
    };

    // 预设key
    const checkDefaultKey = () => {
      if (currentKey.value) {
        currentKey.value = props.defaultKey;
      } else {
        tabIndex.value = props.defaultKey;
      }
    };

    const checkSize = () => {
      let result = '';

      if (!isMobile() && document.body.clientWidth <= 432 && props.size !== 'none') {
        result = 'pc-large';
      } else if (!isMobile() && props.size !== 'none') {
        result = 'pc-default';
      } else {
        result = props.size;
      }

      return result;
    };

    onMounted(() => {
      checkDefaultKey();
    });

    return {
      currentKey,
      tabCallback,
      buttonCallback,
      isMobile,
      checkDefaultKey,
      calculation,
      oldNumber,
      newNumber,
      tabsItemRef,
      lastNum,
      right,
      left,
      bool,
      current,
      tabsItemWidth,
      lastItemOffsetLeft,
      lookWidth,
      checkSize,
      boxRef,
      tabsItemOffsetLeft,
    };
  },
};
</script>

<style lang="scss" scoped>
.tabs-area {
  ::v-deep(.ant-tabs-nav) {
    color: #4d5772;

    .ant-tabs-tab-active {
      color: #1f2022;
      font-weight: bold;
    }

    .ant-tabs-ink-bar {
      left: 0.9rem !important;
      width: 33px !important;
    }
  }
}

.d-tabs-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #4d5772;

  .d-tabs-mobile-area {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;

    .d-tabs-mobile-box {
      display: flex;
      align-items: center;
      width: 100%;
      overflow-x: auto;
      scroll-behavior: smooth;

      &.center {
        justify-content: center;
      }

      &.left {
        justify-content: flex-start;
      }

      &.right {
        justify-content: flex-end;
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .d-tabs-mobile-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8.5px 15px;

      &:last-child {
        margin-right: 0 !important;
      }

      &.none {
        margin-right: 0;
        padding: 8.5px 10px;
      }

      &.small {
        margin-right: 0.5rem;
      }

      &.default {
        margin-right: 1rem;
      }

      &.large {
        margin-right: 1.5rem;
      }

      &.pc-default {
        margin-right: 1.2rem;
      }

      &.pc-large {
        margin-right: 2.2rem;
      }

      &.active-text {
        color: #1f2022;
        font-weight: bold;
      }

      .d-tabs-mobile-title-text {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .d-tabs-mobile-active-line {
        position: absolute;
        bottom: 0;
        display: block;
        width: 20px;
        height: 2px;
        transition: all ease-in-out 0.2s;

        &.active-bg {
          background: #7a5605;
        }
      }
    }
  }

  .d-tabs-mobile-content {
    width: 100%;
  }
}
</style>
