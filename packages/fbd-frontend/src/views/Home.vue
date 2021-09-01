<template>
  <div class="h-full">
    <d-header-row
      bg-color="#fff"
    >
      <template #left>
        <!-- 登入 -->
        <img
          v-if="!isLogin"
          class="icon-size"
          :src="require('@/assets/img/header/icon-login.svg')"
          alt=""
        >
        <!-- 頭像 -->
        <img
          v-else
          src=""
          alt=""
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
            class="icon-size"
            :locale-image-mapping="langMap"
            @click="showLangModal = true"
          />
          <!-- 客服 -->
          <img
            class="icon-size ml-3"
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
            <div>赛事快讯</div>
          </div>
          <match-news />
          <div class="title">
            <img
              :src="require('@/assets/img/home/icon-hot.svg')"
              alt=""
            >
            <div>热门赛事</div>
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
            <div>优惠活动</div>
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
    :modal-title="$t('最新信息')"
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
  onMounted, reactive, toRefs, computed, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import * as R from 'ramda';
import Match from '@/components/_pages/home/Match';
import MatchNews from '@/components/_pages/home/MatchNews';
import Promotion from '@/components/_pages/home/Promotion';
import Marquee from '@/components/_pages/home/Marquee';
import SystemApi from '@/assets/js/api/systemApi';
import InboundModal from '@/components/_pages/home/InboundModal';
import { isValidUrl } from '@/assets/js/utils/utils';
import ExchangeApi from '@/assets/js/api/exchangeApi';

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

    const Ramda = () => {
      // 將多個函數合並成一個函數，並從左到右執行

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

      // 取得前台交易所信息列表
      const getExchangeInfoList = async () => {
        const { code, data } = await ExchangeApi.getExchangeInfoList();
        if (code === 200) {
          store.commit('SET_EXCHANGE_INFO_LIST', data);
        }
      };

      // hooks
      onBeforeMount(() => {
        getExchangeInfoList();
      });

      onMounted(async () => {
        state.marqueeList = await getMarquee();
        state.marqueeContent = getMarqueeContent(state.marqueeList);
        state.carouselList = await initCarousel();
        console.log('state.carouseList :>> ', state.carouselList);
      });
    };

    const goService = () => {
      window.location = serviceUrl.value;
    };

    return {
      Ramda,
      // getExchangeInfoList,
      goService,
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
</style>
