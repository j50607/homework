<template>
  <div
    class="d-tabs"
    :class="`style${siteStyle}`"
    @touchstart.enter="getFirstTouch"
    @touchend.enter="getSecondTouch"
  >
    <div
      class="d-tabs-mobile"
    >
      <div
        class="d-tabs-mobile-area"
        ref="tabsItemRef"
      >
        <!--左滑提示-->
        <div
          v-if="state.slideHint"
          class="slide-hint"
        >
          <div class="hint-text">
            <div class="slide-left">
              <img
                :src="$requireSafe('icon/detail-open.svg')"
              >
            </div>
          </div>
        </div>
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
            <div class="d-tabs-mobile-title-text text-sm">
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
  computed, ref, onMounted, reactive, nextTick,
} from 'vue';
import { useStore } from 'vuex';

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
    // use
    const store = useStore();

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

    // reactive
    const state = reactive({
      // 左滑提示
      slideHint: false,
      firstTouch: 0,
      totalTabLength: 0,
    });

    // computed
    const currentKey = computed({
      get: () => props.activeKey || tabIndex.value,
      set: (val) => emit('update:activeKey', val),
    });

    const tabsItemWidth = computed(() => Math.ceil(document.querySelectorAll('.d-tabs-mobile-title')[newNumber.value].offsetWidth || 0));

    const tabsItemOffsetLeft = computed(() => Math.ceil(document.getElementsByClassName('d-tabs-mobile-title')[newNumber.value].offsetLeft));

    const lastItemOffsetLeft = computed(() => Math.ceil(document.getElementsByClassName('d-tabs-mobile-title')[props.tabList.length - 1].offsetLeft));

    const lookWidth = computed(() => Math.ceil(tabsItemRef.value.clientWidth));

    const siteStyle = computed(() => store.getters.siteStyle);

    // methods
    const isMobile = () => {
      const mobile = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];

      const result = mobile.some((e) => navigator.userAgent.match(e));

      return result;
    };

    const right = () => {
      if (oldNumber.value === newNumber.value) return;

      if (lastItemOffsetLeft.value <= lookWidth.value) {
        if (!isMobile() && document.body.clientWidth <= 432) {
          current.value = tabsItemOffsetLeft.value - (boxRef.value.offsetWidth - tabsItemWidth.value) / 2;
          boxRef.value.scrollLeft = current.value;
        } else {
          return;
        }
      }

      if (lastItemOffsetLeft.value > lookWidth.value && newNumber.value > 1) {
        current.value = tabsItemOffsetLeft.value - (boxRef.value.offsetWidth - tabsItemWidth.value) / 2;

        boxRef.value.scrollLeft = current.value;
      }
    };

    const left = () => {
      if (oldNumber.value === newNumber.value) return;

      if (oldNumber.value > newNumber.value) {
        const to = tabsItemOffsetLeft.value - (boxRef.value.offsetWidth - tabsItemWidth.value) / 2;

        current.value = to - boxRef.value.scrollLeft;

        boxRef.value.scrollLeft += current.value;
        if (boxRef.value.scrollLeft === 0) {
          state.slideHint = false;
        } else {
          state.slideHint = true;
        }
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

    // 左滑提示隐藏
    const getFirstTouch = () => {
      const tab = document.querySelector('.d-tabs-mobile-box');
      state.firstTouch = tab.scrollLeft;
    };
    const getSecondTouch = () => {
      const tab = document.querySelector('.d-tabs-mobile-box');
      const secondTouch = tab.scrollLeft;
      // const scroll = secondTouch - state.firstTouch;
      if (secondTouch >= (state.totalTabLength - lookWidth.value)) {
        state.slideHint = false;
      } else {
        state.slideHint = true;
      }
    };

    onMounted(() => {
      checkDefaultKey();
      nextTick(() => {
        let totalTabLength = 0; // tab总长度
        for (let i = 0; i < props.tabList.length; i++) {
          totalTabLength += document.getElementsByClassName('d-tabs-mobile-title')[i].offsetWidth;
        }
        state.totalTabLength = totalTabLength;
        if (totalTabLength <= lookWidth.value) {
          state.slideHint = false;
        }
        if (totalTabLength > lookWidth.value) {
          state.slideHint = true;
        }
      });
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
      siteStyle,
      getFirstTouch,
      getSecondTouch,
      state,
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
    position: relative;
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

.style2 {
  .d-tabs-mobile {
    color: #fff;

    .d-tabs-mobile-area {
      .d-tabs-mobile-title {
        &.active-text {
          color: #fff;
        }

        .d-tabs-mobile-active-line {
          &.active-bg {
            background: #ffb83d;
          }
        }
      }
    }
  }
}

.slide-hint {
  position: absolute;
  background: transparent linear-gradient(90deg, #f9fcff00 0%, #d7dcec 100%) 0% 0% no-repeat padding-box;
  width: 80px;
  height: 100%;
  margin: auto;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  right: 0;
  z-index: 9;

  .hint-text {
    position: relative;
  }

  .slide-left {
    width: 10px;
    height: 10px;
    transform: rotate(-90deg);

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
