<template>
  <div class="title">
    <img :src="require('@/assets/img/home/icon-promotion.svg')">
    <div>{{ $t('components_pages_home_profitList_title') }}</div>
  </div>
  <swiper
    class="profit-list"
    :autoplay="{delay:2000, disableOnInteraction: false}"
    :slides-per-view="2"
    :direction="'vertical'"
    :catchtouchmove="true"
  >
    <swiper-slide
      v-if="true"
      class="profit-item"
    >
      <div class="combination">
        <span>FC澳倫堡II</span> V.S. <span>圖伊瑪季斯巴達</span>
      </div>
      <div class="account">
        <span>user001</span>
        <span>999,999.99</span>
      </div>
    </swiper-slide>
    <swiper-slide
      v-if="true"
      class="profit-item"
    >
      <div class="combination">
        <span>FC澳倫堡II</span> V.S. <span>圖伊瑪季斯巴達</span>
      </div>
      <div class="account">
        <span>user001</span>
        <span>999,999.99</span>
      </div>
    </swiper-slide>
    <swiper-slide
      v-if="true"
      class="profit-item"
    >
      <div class="combination">
        <span>FC澳倫堡II</span> V.S. <span>圖伊瑪季斯巴達</span>
      </div>
      <div class="account">
        <span>user001</span>
        <span>999,999.99</span>
      </div>
    </swiper-slide>
    <swiper-slide
      v-if="true"
      class="profit-item"
    >
      <div class="combination">
        <span>FC澳倫堡II</span> V.S. <span>圖伊瑪季斯巴達</span>
      </div>
      <div class="account">
        <span>user001</span>
        <span>999,999.99</span>
      </div>
    </swiper-slide>
    <swiper-slide
      v-if="true"
      class="profit-item"
    >
      <div class="combination">
        <span>FC澳倫堡II</span> V.S. <span>圖伊瑪季斯巴達</span>
      </div>
      <div class="account">
        <span>user001</span>
        <span>999,999.99</span>
      </div>
    </swiper-slide>

    <!-- 獲利榜無資料 -->
    <swiper-slide
      class="no-item"
      v-else
    >
      <img :src="require('@/assets/img/home/noitem-profit-list.svg')">
      <div>{{ $t('components_pages_home_profitList_noItem') }}</div>
    </swiper-slide>
  </swiper>
</template>

<script>
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Autoplay]);

export default ({
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {

  },
});
</script>

<style lang="postcss" scoped>

.profit-list {
  height: 150px;
  color: #4d5772;
  font-size: 12px;
  text-align: center;
  background-image: url('~@/assets/img/home/left-profit-list.png'), url('~@/assets/img/home/bg-profit-list.png'), url('~@/assets/img/home/right-profit-list.png');
  background-repeat: no-repeat;
  background-position: left, 50%, right;
  background-size: 15%, 40%, 15%;

  .no-item {
    height: 100% !important;

    img {
      height: 65px;
      margin: 20px auto 5px;
    }

    > div {
      color: #4d5772;
      font-size: 14px;
    }
  }

  .profit-item {
    .combination {
      margin-bottom: 5px;
    }

    .account {
      font-weight: bold;
    }

    .account > span:nth-child(2) {
      margin-left: 20px;
      color: #7a5605;
      font-weight: bold;
    }
  }
}

.title {
  @apply flex items-center font-bold text-sm;

  margin: 12px 0;

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
}
</style>
