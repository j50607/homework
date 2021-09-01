<template>
  <div class="scroll-wrapper">
    <div class="scroll-content">
      <div class="scroll-inner">
        <slot />
      </div>
      <div
        v-if="pullUp"
        class="pull-up-wrap"
      >
        <div v-if="!isPullUp">
          {{ lastPage ? pullUpText : continuePullUpText }}
        </div>
        <div
          class="d-flex"
          v-else
        >
          <LoadingOutlined />
          {{ pullUpLoadingText }}
        </div>
      </div>
    </div>
    <div
      v-if="pullDown"
      :style="pullDownStyle"
      class="pull-down-wrap"
    >
      <div v-if="!isPullDown">
        {{ pullDownText }}
      </div>
      <div
        class="d-flex"
        v-else
      >
        <LoadingOutlined />
        {{ pullDownLoadingText }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  onMounted, reactive, nextTick, toRefs,
} from 'vue';
import Bscroll from 'better-scroll';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    LoadingOutlined,
  },
  props: {
    /**
     * 是否开启上拉加载
     */
    pullUp: {
      type: Boolean,
      deafult: false,
    },
    /**
     * 是否开启下拉刷新
     */
    pullDown: {
      type: Boolean,
      default: false,
    },
    /**
     * 可自订加载完成后文字
     */
    pullUpText: {
      type: String,
      default() {
        return window.$vue.$t('components_scroll_allLoaded');
      },
    },
    /**
     * 可自订正在加载文字
     */
    pullUpLoadingText: {
      type: String,
      default() {
        return window.$vue.$t('components_scroll_pullUpLoading');
      },
    },
    /**
     * 可自订下拉正在刷新文字
     */
    pullDownLoadingText: {
      type: String,
      default() {
        return window.$vue.$t('components_scroll_pullDownLoading');
      },
    },
    /**
     * 可自订还有更多资料时加载文字
     */
    continuePullUpText: {
      type: String,
      default() {
        return window.$vue.$t('components_scroll_continuePullUp');
      },
    },
    /**
     * 当设置为 true 的时候，可以开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false,
    },
    /**
     * 当设置为 true 的时候，可以开启纵向滚动
     */
    scrollY: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否阻止事件冒泡。多用在嵌套 scroll 的场景
     */
    stopPropagation: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否监听滚动事件
     */
    onScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否监听滚动到底部
     */
    scrollBottom: {
      type: Boolean,
      default: false,
    },
    /**
     * 滚动结束
     */
    scrollEnd: {
      type: Boolean,
      default: false,
    },
    /**
     * 决定是否派发 scroll 事件
     */
    probeType: {
      type: Number,
      default: 0,
    },
    /**
     * 保留原生的滚动
     */
    eventPassthrough: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否阻止浏览器默认行为
     */
    preventDefault: {
      type: Boolean,
      default: true,
    },
    /**
     * 当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画
     */
    bounce: {
      type: [Boolean, Object],
      default: true,
    },
  },
  emits: [
    'scroll',
    'pullingDown',
    'pullingUp',
    'scrollEnd',
  ],
  setup(props, { emit }) {
    const { t } = useI18n();

    const state = reactive({
      scroll: undefined,
      pullDownStyle: {},
      isPullDown: false,
      isPullUp: false,
      pullUpStats: props.pullUp,
      pullDownText: t('components_scroll_pullDownRefresh'),
      lastPage: true,
    });

    const onPullingDown = () => {
      // 刷新结束需調用finishPullDown和refresh方法
      state.scroll.on('pullingDown', () => {
        state.isPullDown = true;
        setTimeout(() => {
          emit('pullingDown');
        }, 500);
      });
    };

    const onPullingUp = () => {
      // 加載结束有资料(api response)需調用finishPullUp和refresh方法, 調用前用nextTick包起來確保資料已經更新, refresh才不會出錯
      // 懒人包: 有更多資料的話 調用finishPullUp, 沒資料調用closePullUp, 兩著調用结束都需調用refresh
      state.scroll.on('pullingUp', () => {
        state.isPullUp = true;
        nextTick(() => {
          emit('pullingUp');
        });
      });
    };

    const finishPullDown = () => {
      state.pullDownText = t('components_scroll_refresh');
      state.isPullDown = false;

      setTimeout(() => {
        state.pullDownText = t('components_scroll_pullDownRefresh');
      }, 1000);

      state.scroll && state.scroll.finishPullDown();
    };

    const finishPullUp = () => {
      state.isPullUp = false;
      state.scroll && state.scroll.finishPullUp();
    };

    const openPullUp = () => {
      if (!state.pullUpStatus) {
        state.scroll && state.scroll.openPullUp();
        state.pullUpStatus = true;
      }
    };

    const closePullUp = () => {
      state.isPullUp = false;
      state.pullUpStatus = false;
      state.scroll && state.scroll.closePullUp();
    };

    const lastPageCheck = (value = true) => {
      // 判断是否为api response为最后一页资料
      // value为true时就调用closePullUp()关闭上拉加载，false则调用finishPullUp()

      state.lastPage = value;
      nextTick(() => {
        state.scroll && state.lastPage ? closePullUp() : finishPullUp();
      });
    };

    const scrollTo = (x, y, time, easing) => {
      state.scroll && state.scroll.scrollTo(x, y, time, easing);
    };

    const scrollToElement = (selector, animating, offsetY) => {
      const duration = animating ? 500 : 0;
      state.scroll.scrollToElement(typeof selector === 'string' ? document.querySelector(selector) : selector, duration, false, offsetY);
    };

    const refresh = () => {
      state.scroll && state.scroll.refresh();
    };

    const initScroll = () => {
      state.scroll = new Bscroll((document.querySelector('.scroll-wrapper')), {
        preventDefault: props.preventDefault,
        probeType: props.probeType,
        click: true,
        pullUpLoad: props.pullUp,
        pullDownRefresh: props.pullDown,
        scrollX: props.scrolX,
        scrollY: props.scrollY,
        stopPropagation: props.stopPropagation,
        eventPassthrough: props.eventPassthrough,
        bounce: props.bounce,
        mouseWheel: {
          speed: 50,
          invert: false,
          easeTime: 100,
        },
      });

      if (props.onScroll || props.scrollBottom) {
        state.scroll.on('scroll', (pos) => {
          const position = (pos.y - 50 >= 20 && 20) || pos.y - 50;
          state.pullDownStyle.top = `${position}px`;

          emit('scroll', pos);
        });
      }

      if (props.scrollEnd || props.scrollBottom) {
        state.scroll.on('scrollEnd', (pos) => {
          emit('scrollEnd', pos);
        });
      }

      // 代理pullingUp事件,在一次上拉加载的动作后
      if (props.pullUp) {
        onPullingUp();
      }

      // 代理pullingDown事件,在一次下拉刷新的动作后
      if (props.pullDown) {
        onPullingDown();
      }
    };

    onMounted(() => {
      nextTick(() => {
        initScroll();
      });
    });
    return {
      refresh,
      finishPullDown,
      finishPullUp,
      onPullingDown,
      openPullUp,
      closePullUp,
      lastPageCheck,
      scrollTo,
      scrollToElement,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  position: relative;
  flex: 1 0 0%;
  height: 100%;
  overflow: hidden;
}

.pull-up-wrap {
  color: #000;
  font-size: 0.75rem;
  line-height: 2.5rem;
}

.pull-down-wrap {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
}

.pull-up-wrap,
.pull-down-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.anticon {
  margin-right: 5px;
}

.d-flex {
  display: flex;
  align-items: center;
}
</style>
