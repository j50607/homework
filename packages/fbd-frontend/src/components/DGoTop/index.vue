<template>
  <!-- 回到最顶 -->
  <div
    ref="scrollToTopBtn"
    class="go-top is-btn"
    :class="{'hide-go-top' : !showScrollTopBtn}"
    @click="scrollToTop"
  />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // ref
    const showScrollTopBtn = ref(false);

    // methods
    const scrollTop = () => {
      const docScrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      if (docScrollTop > 100) {
        showScrollTopBtn.value = true;
      } else {
        showScrollTopBtn.value = false;
      }
    };

    // events
    window.addEventListener('scroll', scrollTop, true);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return {
      scrollToTop,
      showScrollTopBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
  .go-top {
    position: fixed;
    right: 50px;
    bottom: 60px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 68px;
    background-image: url('~@/assets/img/icon/go-top.svg');
    background-repeat: no-repeat;
    background-size: cover;
    transition: 0.7s;
    opacity: 1;

    @include mediaquery_phone {
      right: 20px;
      bottom: 50px;
      width: 45px;
      height: 45px;
    }

    &.hide-go-top {
      z-index: -1;
      transition: 0.7s;
      opacity: 0;
    }
  }
</style>
