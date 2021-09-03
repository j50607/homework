<template>
  <div>
    <a-modal
      v-model:visible="show"
      class="d-dialog"
      width="220px"
      :closable="true"
      :centered="true"
      :ok-text="$t('components_common_dialog_confirm')"
      :cancel-text="$t('components_common_dialog_cancel')"
      @ok="$emit('ok')"
      @cancel="$emit('cancel')"
      v-bind="$attrs"
    >
      <template #closeIcon>
        <img
          class="close"
          :src="require('@/assets/img/icon/icon-close.svg')"
          alt=""
        >
      </template>
      <div class="d-dialog-header">
        <!-- <span v-text="title" /> -->
      </div>

      <div class="d-dialog-body">
        <slot name="body" />
      </div>
      <div class="d-dialog-footer">
        <slot name="footer" />
      </div>
    </a-modal>
  </div>
</template>
<script>
import {
  computed,
} from 'vue';

export default {
  name: 'DDialog',
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'cancel', 'ok'],
  setup(props, context) {
    const show = computed({
      get: () => props.visible,
      set: (val) => context.emit('update:value', val),
    });

    return {
      show,
    };
  },
};
</script>
<style lang="scss" scoped>

.d-dialog-body,  .d-dialog-footer {
  color: #080d20;
}

.close {
  width: 16px;
  height: 16px;
}
</style>
