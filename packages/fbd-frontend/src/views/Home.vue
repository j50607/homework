<template>
  <div class="h-full">
    <d-header-row
      bg-color="#fff"
      left-components="UserAvatar"
    >
      <template #left>
        <img
          v-if="!isLogin"
          class="icon-size is-btn"
          :src="require('@/assets/img/header/icon-login.svg')"
          alt=""
          @click="goPage('/loginAndRegister')"
        >
        <img
          v-else
          class="avatar w-4 h-4 rounded-full is-btn"
          :src="$requireSafe(`avatar/${avatar && avatar.system ? avatar.system : 0 }.png`)"
          alt=""
          @click="goPage('/profile/userInfo')"
        >
      </template>
      <template #middle>
        <!-- LOGO -->
        <img
          class="h-full"
          :src="$requireSafe(`site/${sitePrefix}/logo.svg`)"
          alt=""
        >
      </template>
      <template #right>
        <div class="flex items-center justify-end">
          <d-locale-image
            v-if="displayLanguageSwitch"
            class="icon-size is-btn"
            @click="showLangModal = true"
          />
          <img
            v-if="serviceUrl"
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
          <match-news />
          <div class="title">
            <img
              :src="require('@/assets/img/home/icon-hot.svg')"
              alt=""
            >
            <div>{{ $t('views_home_matchHot') }}</div>
          </div>
          <match
            v-for="(item, index) in matchList"
            :key="index"
            class="mb-3"
            :data="item"
            @click="goBet(item)"
          />
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
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import Match from '@/components/_pages/home/Match';
import MatchNews from '@/components/_pages/home/MatchNews';
import Promotion from '@/components/_pages/home/Promotion';
import Marquee from '@/components/_pages/home/Marquee';
import SystemApi from '@/assets/js/api/systemApi';
import InboundModal from '@/components/_pages/home/InboundModal';
import { isValidUrl } from '@/assets/js/utils/utils';
import SportApi from '@/assets/js/api/sportApi';

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
    const { t } = useI18n();

    const state = reactive({
      marqueeList: [],
      marqueeContent: [],
      carouselList: [],
      showModal: false,
      showLangModal: false,
      matchList: [],
    });

    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);
    const avatar = computed(() => store.state.user.avatar);
    const isLogin = computed(() => store.state.user.isLogin);
    const displayLanguageSwitch = computed(() => store.state.info.switchSetting.displayLanguageSwitch);
    const sitePrefix = computed(() => store.state.info.siteInfo.prefix);

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

    const getHomePageData = async () => {
      const { code, data } = await SportApi.getHomePageData();
      if (code === 200) {
        state.matchList = data;
      }
    };

    const goService = () => {
      window.location = serviceUrl.value;
    };

    const goBet = (item) => {
      if (item.matchTime < dayjs().valueOf()) {
        window.$vue.$message.info(t('views_betting_info_deadlineClosed'));
        return;
      }

      router.push({
        path: '/betting',
        query: {
          issueNo: item.issueNo,
        },
      });
    };

    onMounted(async () => {
      getHomePageData();
      state.marqueeList = await getMarquee();
      state.marqueeContent = getMarqueeContent(state.marqueeList);
      state.carouselList = await initCarousel();
    });

    return {
      goService,
      avatar,
      goPage,
      goBet,
      isLogin,
      displayLanguageSwitch,
      serviceUrl,
      sitePrefix,
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
  @apply flex items-center font-bold text-sm;

  margin: 12px 0;

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
}

.icon-size {
  @apply w-4 h-4;
}

.avatar {
  border: 1px solid #f3ac0a;
}
</style>
