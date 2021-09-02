<template>
  <swiper
    ref="vSwiper"
    class="swiper"
    :loop="true"
    :style="{'--change': animationReset, '--delay': `${delay}ms`}"
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="slideChange"
  >
    <swiper-slide
      v-for="item in imgList"
      :key="item.img"
      @click="goLink(item.link)"
    >
      <img
        v-if="localImg"
        class="swipe-img"
        :src="$requireSafe(`slide/${item.img}`)"
      >
      <img
        v-else
        :src="item.img"
        alt=""
      >
    </swiper-slide>
    <div
      v-if="desc && desc.title"
      class="swiper-desc"
      :class="{'reverse': mode === 'left'}"
    >
      <div class="swiper-title">
        {{ desc.title }}
      </div>
      <div class="swiper-content">
        {{ desc.content }}
      </div>
    </div>
  </swiper>
</template>

<script>
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import {
  ref, onMounted, onBeforeUnmount, computed, inject,
} from 'vue';

SwiperCore.use([Navigation, Pagination]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    imgList: {
      type: Array,
      default: () => [],
    },
    desc: {
      type: Object,
      default: () => {},
    },
    mode: {
      type: String,
      default: 'right',
    },
    delay: {
      type: Number,
      default: 8000,
    },
    localImg: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    let vSwiper = null;
    let timer = null;
    // ref
    const animationReset = ref('block');

    // computed
    const clientMode = computed(inject('$clientMode'));

    // methods
    const onSwiper = (swiper) => {
      vSwiper = swiper;
    };

    const swiperLoop = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        vSwiper.slideNext();
      }, props.delay);
    };

    const slideChange = () => {
      clearInterval(timer);
      swiperLoop();
      animationReset.value = 'none';
      setTimeout(() => {
        animationReset.value = 'block';
      }, 50);
    };

    const goLink = (link) => {
      if (!link) return;

      window.location = link;
    };

    // hooks
    onMounted(() => {
      swiperLoop();
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return {
      animationReset,
      slideChange,
      vSwiper,
      onSwiper,
      swiperLoop,
      goLink,
      clientMode,
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  position: relative;
  width: 100%;
  height: 240px;

  @include mediaquery_phone {
    height: 150px !important;
  }

  .swiper-desc {
    position: absolute;
    top: 50%;
    right: 5%;
    z-index: 2;
    width: 45%;
    padding: 0 15px;
    transform: translateY(-50%);

    &.reverse {
      left: 5%;
    }

    .swiper-title {
      margin-bottom: 15px;
      color: #d9b765;
      font-size: 20px;
    }
  }

  ::v-deep(.swiper-pagination-bullets) {
    bottom: 0;
  }

  ::v-deep(.swiper-pagination-bullet) {
    width: 7px;
    height: 7px;
    border: 1px solid #fff;
    border-radius: 50%;
    background: transparent;
    transition: 0.3s;
    opacity: 1;
  }

  ::v-deep(.swiper-pagination-bullet-active) {
    position: relative;
    background: #fff;
    opacity: 0.9;
  }
}

.swipe-img {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: contain;
  transform: translate3d(0, 0, 0);

  &.blur {
    position: absolute;
    z-index: -1;
    object-fit: cover;
    filter: blur(30px);
  }

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
}
</style>
