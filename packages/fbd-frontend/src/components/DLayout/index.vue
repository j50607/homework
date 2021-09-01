<template>
  <div
    class="d-layout"
    :class="{'has-header': hasHeader, 'has-footer': hasFooter}"
  >
    <div
      :class="{'main-gap': mainGap}"
      class="d-layout-inner"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    /**
     * 上內距往內推 Header 的高度，並不會引入 Header 組件
     */
    hasHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * 往下內推 Header 的高度，並不會引入 Footer 組件
     */
    hasFooter: {
      type: Boolean,
      default: true,
    },
    /**
     * 左右 gap
     */
    mainGap: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.d-layout {
  height: 100%;
}

.d-layout-inner {
  height: 100%;
  overflow-y: scroll;
}

.main-gap {
  padding: 0 $mainGap;
}

.has-header {
  padding-top: $header-height;
}

.has-footer {
  padding-bottom: $footer-height;
}
</style>
