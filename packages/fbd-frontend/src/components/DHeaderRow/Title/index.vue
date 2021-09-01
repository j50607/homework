<template>
  <div
    class="title"
    :style="`justify-content:${leftPos || middlePos || rightPos}`"
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
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: #333;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
}
</style>
