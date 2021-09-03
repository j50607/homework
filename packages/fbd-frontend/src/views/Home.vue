<template>
  <div class="h-full">
    <d-header-row
      bg-color="#fff"
    >
      <template #left>
        <!-- 登入 -->
        <img
          v-if="!isLogin"
          class="icon-size is-btn"
          :src="require('@/assets/img/header/icon-login.svg')"
          alt=""
          @click="goPage('/loginAndRegister')"
        >
        <!-- 頭像 -->
        <img
          v-else
          class="avatar w-4 h-4 rounded-full"
          :src="$requireSafe(`avatar/${avatar && avatar.system ? avatar.system : 0 }.png`)"
          alt=""
          @click="goPage('/profile/userInfo')"
        >
      </template>
      <template #middle>
        <!-- LOGO -->
        <img
          src=""
          alt=""
        >
        LOGO
      </template>
      <template #right>
        <div class="flex items-center justify-end">
          <!-- 語言選擇 -->
          <d-locale-image
            class="icon-size is-btn"
            :locale-image-mapping="langMap"
            @click="showLangModal = true"
          />
          <!-- 客服 -->
          <img
            class="icon-size ml-3 is-btn"
            :src="require('@/assets/img/header/icon-service.svg')"
            alt=""
            @click="goService"
          >
        </div>
      </template>
    </d-header-row>
    <div class="flex flex-col h-full pt-12 pb-10">
      <div class="h-full overflow-y-auto">
        <marquee
          :marquee-message="marqueeContent"
          @click="showModal = true"
        />
        <d-swiper
          :img-list="carouselList"
          :delay="5000"
          :pagination="false"
          :local-img="false"
        />
        <div class="match-wrapper">
          <div class="title">
            <img
              :src="require('@/assets/img/home/icon-news.svg')"
              alt=""
            >
            <div>{{ $t('views_home_matchNews') }}</div>
          </div>
          <match-news />
          <div class="title">
            <img
              :src="require('@/assets/img/home/icon-hot.svg')"
              alt=""
            >
            <div>{{ $t('views_home_matchHot') }}</div>
          </div>
          <match
            v-for="(item, index) in 10"
            :key="index"
            class="mb-3"
          />
          <div class="title">
            <img
              :src="require('@/assets/img/home/icon-promotion.svg')"
              alt=""
            >
            <div>{{ $t('views_profile_promotion') }}</div>
          </div>
          <promotion />
        </div>
      </div>
      <d-footer-row />
    </div>
  </div>
  <inbound-modal
    v-model:value="showModal"
    :data="marqueeList"
    :modal-title="$t('views_profile_newestMessage')"
    id-key="annId"
    title-key="title"
    content-key="content"
    time-key="startTime"
    img-key="imgUrl"
  />
  <d-language-modal
    v-model:isShow="showLangModal"
    @cancel="showLangModal = false"
  />
</template>

<script>
import {
  onMounted, reactive, toRefs, computed,
} from 'vue';
import { useStore } from 'vuex';
import * as R from 'ramda';
import { useRouter } from 'vue-router';
import Match from '@/components/_pages/home/Match';
import MatchNews from '@/components/_pages/home/MatchNews';
import Promotion from '@/components/_pages/home/Promotion';
import Marquee from '@/components/_pages/home/Marquee';
import SystemApi from '@/assets/js/api/systemApi';
import InboundModal from '@/components/_pages/home/InboundModal';
import { isValidUrl } from '@/assets/js/utils/utils';

export default {
  components: {
    Match,
    MatchNews,
    Promotion,
    Marquee,
    InboundModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      langMap: {
        zh_cn: 'locale/zh_cn.svg',
        zh_tw: 'locale/zh_tw.svg',
        th_th: 'locale/th_th.svg',
        vi_vn: 'locale/vi_vn.svg',
        ja_jp: 'locale/ja_jp.svg',
        en_us: 'locale/en_us.svg',
      },
      marqueeList: [],
      marqueeContent: [],
      carouselList: [],
      showModal: false,
      showLangModal: false,
    });

    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const s3Base = computed(() => process.env.VUE_APP_IMG_URL_PREFIX);
    const avatar = computed(() => store.state.user.avatar);
    const isLogin = computed(() => store.state.user.isLogin);

    const getCarousel = async () => {
      const { code, data } = await SystemApi.getCarousel();
      if (code === 200) {
        return data;
      }
      return [];
    };

    const mappingCarousel = (arr) => arr.map((item) => ({
      img: `${s3Base.value}/${item.mobile || item.pc}`,
      link: isValidUrl(item.link) ? item.link : '',
    }));

    const initCarousel = R.pipeP(
      getCarousel,
      mappingCarousel,
    );

    const getMarquee = async () => {
      const { code, data } = await SystemApi.getMarquee();
      if (code === 200) {
        return data;
      }
      return [];
    };

    const getMarqueeContent = (arr) => arr.map((item) => item.content);

    const goPage = (url) => {
      router.push(url);
    };

    onMounted(async () => {
      state.marqueeList = await getMarquee();
      state.marqueeContent = getMarqueeContent(state.marqueeList);
      state.carouselList = await initCarousel();
    });

    const goService = () => {
      window.location = serviceUrl.value;
    };

    return {
      goService,
      avatar,
      goPage,
      isLogin,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="postcss" scoped>
.match-wrapper {
  padding: 0 17px 30px;
}

.swiper {
  flex-shrink: 0;
  height: 180px !important;
}

.title {
  @apply flex items-center font-bold;

  margin: 12px 0;

  img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
}

.icon-size {
  @apply w-4 h-4;
}

.avatar {
  border: 1px solid #f3ac0a;
}
</style>
