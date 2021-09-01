<template>
  <div
    class="num-container"
    :style="`width: ${width}px; height: ${height}px;`"
  >
    <div
      class="num-box"
      :style="`top:${-1 * singleNum * height}px;transition: top ${transition}s;`"
    >
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        0
      </div>
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        1
      </div>
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        2
      </div>
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        3
      </div>
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        4
      </div>
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        5
      </div>
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        6
      </div>
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        7
      </div>
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        8
      </div>
      <div
        class="single-num"
        :style="`width: ${width}px; height: ${height}px; line-height: ${height}px; font-size: ${width}px; color: ${color};`"
      >
        9
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    singleNum: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
    color: {
      type: String,
      default: '#000',
    },
    transition: {
      type: Number,
      default: 0.6,
    },
  },
};
</script>
<style lang="scss">
  .num-container {
    position: relative;
    display: inline-block;
    overflow: hidden;

    .num-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      transition: top 0.8s;
      transform-origin: 0 0;
    }

    .single-num {
      color: #4898f1;
      font-weight: 500;
      text-align: center;
    }
  }
</style>
