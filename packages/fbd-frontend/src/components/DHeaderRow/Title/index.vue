<template>
  <div
    class="title"
    :style="`justify-content:${leftPos || middlePos || rightPos}; color: ${textColor};`"
  >
    {{ title }}
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    leftPos: {
      type: String,
      default: '',
    },
    middlePos: {
      type: String,
      default: '',
    },
    rightPos: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '#fff',
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
}
</style>
