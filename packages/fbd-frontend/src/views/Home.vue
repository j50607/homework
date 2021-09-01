<template>
  <div class="home">
    <div class="father">
      <div class="child">
        {{ Ramda() }}
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda';

export default {
  setup() {
    const Ramda = () => {
      // 將多個函數合並成一個函數，並從左到右執行

      // 流水線：第一個的函數的返回值交給第二個，第二個的交給第三個，依次類推

      const negative = (x) => -1 * x;

      const increaseOne = (x) => x + 1;

      /* eslint-disable-next-line */
      const f = R.pipe(Math.pow, negative, increaseOne);

      // 第一個求3的4次方，返回值給後邊方法，以此類推

      console.log('R.pipe:', f(3, 4));
      return (f(3, 4));
    };

    return {
      Ramda,
    };
  },
};
</script>

<style lang="postcss" scoped>
.father {
  @apply py-5 px-2 text-center w-auto flex flex-col items-center;

  .child {
    @apply my-5 text-center;

    color: var(--primary-color);
  }
}
</style>
