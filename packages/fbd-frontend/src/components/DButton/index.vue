<template>
  <button
    class="d-btn"
    :class="[
      `d-btn-${type}`,
      {'disabled': disabled},
      {'loading': loading},
      {'block': block}
    ]"
    :style="{'--custom-bg': color, '--custom-color': textColor}"
    @click="click"
  >
    <LoadingOutlined v-if="loading" />
    <span>
      <slot />
    </span>
  </button>
</template>

<script>
import { LoadingOutlined } from '@ant-design/icons-vue';
// import { reactive } from 'vue';

export default {

  emits: [
    'click',
  ],
  components: {
    LoadingOutlined,
  },
  props: {
    /**
     * 设置按钮类型，可选值为 **primary** / **cancel** / **inactive** / **default**
     */
    type: {
      type: String,
      default: 'default',
    },
    /**
     * 将按钮宽度调整为其父宽度的选项
     */
    block: {
      type: Boolean,
      default: false,
    },
    /**
     * 设置按钮载入状态
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * 按钮失效状态
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 自定义按钮颜色
     */
    color: {
      type: String,
      default: '',
    },
    /**
     * 自定义文字颜色
     */
    textColor: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const click = () => {
      if (props.disabled || props.loading) {
        return;
      }
      emit('click');
    };
    return {
      click,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/components/DButton/mixin.scss';

.d-btn {
  @include button-bg;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 15px;
  border-radius: 5px;
  color: #333;
  font-size: 14px;
  background: #fff;
  transition: all 0.3s ease;
  outline: 0;
  cursor: pointer;

  > .anticon + span {
    margin-left: 8px;
  }

  &.loading {
    cursor: auto;
  }

  &.block {
    width: 100%;
  }
}
</style>
