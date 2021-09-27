<template>
  <transition name="fade">
    <div
      v-show="overlay && show"
      class="overlay"
      @click="closeOverlay"
    />
  </transition>
  <transition :name="transition || name">
    <div
      v-show="show"
      :style="{ animationDuration: `${duration}s` }"
      class="d-popup"
      :class="[
        `d-popup-${position}`,
        {'d-popup-round': round}
      ]"
      @click="click"
      v-bind="$attrs"
    >
      <div
        v-if="title"
        class="d-popup-header"
      >
        <span class="title">{{ title }}</span>

        <CloseOutlined
          v-if="closeable"
          :style="{ color: closeIconColor }"
          @click="close"
        />
      </div>
      <div
        class="d-popup-content"
        :style="{ padding: customContentPadding }"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>

import { computed } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';

export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    /**
     * 彈出位置，可選值為 top | bottom | right | left | center
     */
    position: {
      type: String,
      default: 'center',
    },
    /**
     * 動畫名稱
     */
    transition: {
      type: String,
      default: '',
    },
    /**
     * 是否顯示標題
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * 是否顯示圓角
     */
    round: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否顯示關閉ICON
     */
    closeable: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否點擊遮罩後關閉
     */
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    /**
     * 關閉按鈕顏色
     */
    closeIconColor: {
      type: String,
      default: 'var(--font-color)',
    },
    /**
     * 是否顯示遮罩
     */
    overlay: {
      type: Boolean,
      default: true,
    },
    /**
     * 動畫持續時間
     */
    duration: {
      type: [String, Number],
      default: 0.5,
    },
    /**
     * 自定义 d-popup-content 的 padding
     */
    customContentPadding: {
      type: String,
      default: '5px 15px;',
    },
  },
  components: {
    CloseOutlined,
  },
  emits: [
    'open',
    'close',
    'click',
    'update:value',
    'click-overlay',
  ],
  setup(props, { emit }) {
    const name = computed(() => (props.position === 'center' ? 'fade' : `slide-${props.position}`));
    const show = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val),
    });

    const closeOverlay = () => {
      show.value = false;
      emit('click-overlay');
    };

    const close = (event) => {
      show.value = false;
      emit('close', event);
    };

    const click = (event) => {
      emit('click', event);
    };

    return {
      name,
      show,
      close,
      click,
      closeOverlay,
    };
  },
};
</script>

<style lang="scss" scoped>
$border-radius: 8px;

.d-popup {
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: var(--dialog-color);

  &-center {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    &.d-popup-round {
      border-radius: $border-radius;
    }
  }

  &-top {
    top: 0;
    left: 0;
    width: 100%;

    &.d-popup-round {
      border-radius: 0 0 $border-radius $border-radius;
    }
  }

  &-right {
    top: 0;
    right: 0;

    &.d-popup-round {
      border-radius: $border-radius 0 0 $border-radius;
    }
  }

  &-bottom {
    bottom: 0;
    left: 0;
    width: 100%;

    &.d-popup-round {
      border-radius: $border-radius $border-radius 0 0;
    }
  }

  &-left {
    top: 0;
    left: 0;

    &.d-popup-round {
      border-radius: 0 $border-radius $border-radius 0;
    }
  }
}

.d-popup-header {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  font-weight: bold;

  .title {
    color: var(--font-color);
    font-weight: 700;
    font-size: 14px;
  }
}

.d-popup-content {
  padding: 5px 15px;
  overflow-y: auto;
  background: var(--dialog-color);
}

.anticon-close {
  position: absolute;
  top: 50%;
  right: 15px;
  color: #afafaf;
  font-size: 20px;
  transform: translateY(-50%);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  transition: transform 0.3s;
  cursor: pointer;
}
</style>
