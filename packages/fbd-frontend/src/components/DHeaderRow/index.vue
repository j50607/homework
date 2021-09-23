<template>
  <div
    class="header"
    :style="{background: bgColor, color: textColor}"
  >
    <div
      v-if="hasLeftSlot"
      class="left"
    >
      <slot name="left" />
    </div>
    <component
      v-else
      class="left"
      :is="leftComponents"
      :title="title"
      :left-pos="leftPos"
      :to-first-step="toFirstStep"
      :icon-color="iconColor"
    />
    <div
      v-if="hasMiddleSlot"
      class="middle h-full flex justify-center"
    >
      <slot name="middle" />
    </div>
    <component
      v-else
      class="middle h-full flex justify-center"
      :is="middleComponents"
      :title="title"
      :text-color="textColor"
      :middle-pos="middlePos"
    />
    <div
      v-if="hasRightSlot"
      class="right"
    >
      <slot name="right" />
    </div>
    <component
      v-else
      class="right"
      :is="rightComponents"
      :title="title"
      :right-pos="rightPos"
      :show-sidebar="useSidebar"
      @showSidebar="showSidebar = true"
    />
  </div>
  <sidebar
    v-if="useSidebar"
    v-model:value="showSidebar"
  />
</template>

<script>
import { computed, defineAsyncComponent, ref } from 'vue';

export default {
  // 動態加載組件
  components: {
    None: defineAsyncComponent(() => import('@/components/DHeaderRow/None' /* webpackChunkName: "None" */)),
    GoBack: defineAsyncComponent(() => import('@/components/DHeaderRow/GoBack' /* webpackChunkName: "Goback" */)),
    Title: defineAsyncComponent(() => import('@/components/DHeaderRow/Title' /* webpackChunkName: "Title" */)),
    Service: defineAsyncComponent(() => import('@/components/DHeaderRow/Service' /* webpackChunkName: "Service" */)),
    Profile: defineAsyncComponent(() => import('@/components/DHeaderRow/Profile' /* webpackChunkName: "Profile" */)),
    Register: defineAsyncComponent(() => import('@/components/DHeaderRow/Register' /* webpackChunkName: "Register" */)),
    UserAvatar: defineAsyncComponent(() => import('@/components/DHeaderRow/UserAvatar' /* webpackChunkName: "UserAvatar" */)),
    Sidebar: defineAsyncComponent(() => import('@/components/Sidebar' /* webpackChunkName: "Sidebar" */)),
  },
  props: {
    leftComponents: {
      type: String,
      default: 'GoBack',
    },
    middleComponents: {
      type: String,
      default: 'Title',
    },
    rightComponents: {
      type: String,
      default: 'None',
    },
    /**
     * 預設為空字串，如果有使用Title的components的話，會以此字串當標題。
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * 預設為flex-start，為Header左方區塊的內容要排列的位置配置設定。
     * 語法與justify-content相同。
     */
    leftPos: {
      type: String,
      default: 'flex-start',
    },
    /**
     * 預設為center，為Header左方區塊的內容要排列的位置配置設定。
     * 語法與justify-content相同。
     */
    middlePos: {
      type: String,
      default: 'center',
    },
    /**
     * 預設為flex-end，為Header左方區塊的內容要排列的位置配置設定。
     * 語法與justify-content相同。
     */
    rightPos: {
      type: String,
      default: 'flex-end',
    },
    toFirstStep: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: 'var(--header-primary-bg)',
    },
    textColor: {
      type: String,
      default: '#fff',
    },
    /**
     * icon顏色，預設為white
     */
    iconColor: {
      type: String,
      default: 'white',
    },
    useSidebar: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    // ref
    const showSidebar = ref(false);
    // computed
    const hasLeftSlot = computed(() => {
      if (slots.left) {
        return true;
      }
      return false;
    });
    const hasMiddleSlot = computed(() => {
      if (slots.middle) {
        return true;
      }
      return false;
    });
    const hasRightSlot = computed(() => {
      if (slots.right) {
        return true;
      }
      return false;
    });

    // methods
    return {
      hasLeftSlot,
      hasMiddleSlot,
      hasRightSlot,
      showSidebar,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $z-header-index;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: $header-height;
  padding: 12px 15px;
  line-height: 1.2rem;

  .left {
    flex: 1 0 0;
    text-align: left;
  }

  .middle {
    flex: 2 0 0;
    text-align: center;
  }

  .right {
    flex: 1 0 0;
    text-align: right;
  }
}
</style>
