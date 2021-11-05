<template>
  <div class="h-full">
    <d-header-row
      right-components="UserAvatar"
      use-sidebar
    >
      <template #left>
        <div class="flex items-center">
          <img
            v-if="displayLanguageSwitch"
            :src="require('@/assets/img/header/style2/language.svg')"
            class="icon-size is-btn"
            @click="showLangModal = true"
          >
          <img
            v-if="serviceUrl"
            class="icon-size ml-3 is-btn"
            :src="require('@/assets/img/header/style2/service.svg')"
            alt=""
            @click="goService"
          >
        </div>
      </template>
      <template #middle>
        <!-- LOGO -->
        <img
          class="h-full"
          :class="sitePrefix"
          :src="$requireSafe(`site/${sitePrefix}/style2/logo.svg`)"
          alt=""
        >
      </template>
    </d-header-row>
    <div class="flex flex-col h-full pt-12 pb-10">
      <div class="h-full overflow-y-auto">
        <marquee
          :marquee-message="marqueeContent"
          @click="showModal = true"
        />
        <div class="match-wrapper">
          <match-news />
          <div class="title">
            <div>{{ $t('views_home_matchHot') }}</div>
          </div>
          <match
            v-for="(item, index) in matchList"
            :key="index"
            class="mb-3"
            :data="item"
            @click="goBet(item)"
          />
          <profit-list />
          <!-- <promotion /> -->
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
  onBeforeMount, onMounted, reactive, toRefs, computed,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import Match from '@/components/_pages/home/Match';
import MatchNews from '@/components/_pages/home/MatchNews';
// import Promotion from '@/components/_pages/home/Promotion';
import Marquee from '@/components/_pages/home/Marquee';
import SystemApi from '@/assets/js/api/systemApi';
import InboundModal from '@/components/_pages/home/InboundModal';
import MemberApi from '@/assets/js/api/memberApi';
import SportApi from '@/assets/js/api/sportApi';
import ProfitList from '@/components/_pages/home/ProfitList';

export default {
  components: {
    Match,
    MatchNews,
    // Promotion,
    Marquee,
    InboundModal,
    ProfitList,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();

    const state = reactive({
      marqueeList: [],
      marqueeContent: [],
      showModal: false,
      showLangModal: false,
      matchList: [],
    });

    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const avatar = computed(() => store.state.user.avatar);
    const isLogin = computed(() => store.state.user.isLogin);
    const displayLanguageSwitch = computed(() => store.state.info.switchSetting.displayLanguageSwitch);
    const sitePrefix = computed(() => store.state.info.siteInfo.prefix);
    const siteStyle = computed(() => store.getters.siteStyle);

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
        state.matchList = data.filter((e) => dayjs().valueOf() <= e.matchTime);
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

    const getUserPartialInfo = async () => {
      const params = {
        requestInfo: [
          'account',
          'avatar',
          'vipLevel',
          'balance',
          'usersLockBalance',
          'transToSub',
        ],
      };
      const { code, data } = await MemberApi.getUserPartialInfo(params);

      if (code === 200) {
        store.commit('SET_USER_INFO', {
          account: data.account,
          avatar: data.avatar,
          vipLevel: data.vipLevel,
          balance: data.balance,
          usersLockBalance: data.usersLockBalance,
          transToSub: data.transToSub,
        });
      }
    };

    onBeforeMount(async () => {
      getUserPartialInfo();
    });

    onMounted(async () => {
      getHomePageData();
      state.marqueeList = await getMarquee();
      state.marqueeContent = getMarqueeContent(state.marqueeList);
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
      siteStyle,
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

.rowz {
  height: 32px;
  margin-top: -4px;
}
</style>
