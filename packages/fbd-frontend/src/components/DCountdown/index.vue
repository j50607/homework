<template>
  <div class="d-countdown">
    <div v-text="countdownNumber" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  props: {
    /**
     * 是否頁面重整後重新計算 => 預設false
     */
    isSecRefresh: {
      type: Boolean,
      default: false,
    },
    /**
     * 輸入秒數
     */
    sec: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    // ref
    const countdownNumber = ref(props.sec);
    const timeout = ref(undefined);
    const nowTime = ref(new Date().getTime());
    const resultTime = ref(0);

    // methods
    const setLocalStorage = (key) => window.localStorage.setItem('coundownEndTime', key);

    const getLocalStorage = () => window.localStorage.getItem('coundownEndTime');

    const removeLocaleStorage = () => window.localStorage.removeItem('coundownEndTime');

    const noRefreshCountdown = () => {
      if (Number(getLocalStorage('coundownEndTime'))) {
        resultTime.value = Number(getLocalStorage('coundownEndTime'));
      } else {
        const endTime = nowTime.value + (countdownNumber.value * 1000);

        resultTime.value = endTime - nowTime.value;

        setLocalStorage(resultTime.value);
      }
    };

    const countdownFunc = () => {
      if (props.isSecRefresh) {
        countdownNumber.value -= 1;
      } else {
        resultTime.value -= 1000;

        setLocalStorage(resultTime.value);

        countdownNumber.value = (resultTime.value / 1000);
      }

      if (countdownNumber.value <= 0) {
        clearInterval(timeout.value);
        removeLocaleStorage();
      } else {
        timeout.value = setTimeout(countdownFunc, 1000);
      }
    };

    onMounted(() => {
      clearTimeout(timeout.value);
      noRefreshCountdown();
      countdownFunc();
    });

    return {
      countdownNumber,
      countdownFunc,
      nowTime,
      noRefreshCountdown,
      resultTime,
      setLocalStorage,
      getLocalStorage,
      removeLocaleStorage,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
