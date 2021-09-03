<template>
  <div class="match">
    <div class="mt-0.5">
      {{ '2021-08-21 18:30(CST)' }}
    </div>
    <div class="flex items-center pt-2 pb-2">
      <div class="flex flex-col flex-1">
        <div class="mb-2 text-primary text-sm">
          俄罗斯乙级联赛
        </div>
        <div class="team-info">
          <img
            :src="require('@/assets/img/locale/zh_cn.svg')"
            alt=""
          >
          <div>FC奥伦堡II</div>
        </div>
        <div class="ml-8">
          vs
        </div>
        <div class="team-info">
          <img
            :src="require('@/assets/img/locale/zh_cn.svg')"
            alt=""
          >
          <div>图伊马济斯巴达</div>
        </div>
      </div>
      <div class="flex-1 justify-center">
        <div class="circle ml-auto">
          <div class="circle-inner flex flex-col justify-center rounded-full h-11 w-11 bg-white z-10 text-center text-sm">
            总销量
            <div class="font-bold italic">
              16M
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-px w-full bg-border" />
    <div class="flex items-center justify-between h-full">
      <div>
        下单截止
        <span>06:05:31</span>
      </div>
      <img
        class="w-2 h-2"
        :src="require('@/assets/img/home/icon-arrow-right.svg')"
        alt=""
      >
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {

    };
  },
};
</script>

<style lang="postcss" scoped>
.match {
  @apply text-xs relative flex flex-col;

  height: 150px;
  padding: 0 15px;
  border-radius: 0 10px 10px;
  color: #4d5772;
  background: url('~@/assets/img/home/bg-hot-match.png') no-repeat;
  background-size: cover;
  box-shadow: -1px 2px 4px #4d57721a;
}

.team-info {
  @apply flex items-center;

  img {
    @apply w-3.5 h-3.5 mr-1;
  }
}

.circle {
  @apply relative flex items-center justify-center rounded-full;

  width: 86px;
  height: 86px;
  background: #e8e8e8;
  box-shadow: inset 0 3px 6px #00000029;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    width: 86px;
    height: 43px;
    border-radius: 50px 50px 0 0;
    background: #f3ac0a;
    content: '';
    transform-origin: 43px 43px;
    box-shadow: inset 0 3px 6px #00000029;
  }

  &::before {
    z-index: 1;
    transform: rotate(90deg);
  }

  &::after {
    z-index: 2;
    transform: rotate(135deg);
  }
}

.circle-inner {
  box-shadow: 0 3px 6px #00000029;
}

</style>
