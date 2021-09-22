<template>
  <div class="promotion p-h-h px-3 w-full">
    <d-header-row
      :title="$t('views_profile_promotion')"
      right-components="service"
    >
      <template #left>
        <div
          class="go-back"
        >
          <img
            :src="$requireSafe('header/icon-left-white.svg')"
            class="is-btn"
            @click="goBack"
          >
        </div>
      </template>
    </d-header-row>

    <d-tabs
      v-model:activeKey="state.currentKey"
      :default-key="state.tabIndex"
      :tab-list="state.tabList"
      :class="locale"
      @change="changeTab"
      class="game-tab text-white"
      v-if="!state.showActivityDetail"
    />
    <div
      class="activity-list-container mt-4"
      v-if="!state.showActivityDetail"
    >
      <template v-if="state.activityList.length > 0">
        <div
          class="activity-list rounded-5 px-1 py-2 mb-3 relative cursor-pointer"
          v-for="(item, index) in state.activityList"
          :key="index"
          @click="showDetail(item)"
        >
          <img
            :src="`${s3Base}/${item.mobileActivityImg}`"
            alt=""
          >
          <div class="check-detail flex text-xs items-center justify-start absolute bottom-0 right-0 text-right py-1">
            <div class="text mr-1 text-normal">
              {{ $t('common_checkDetail') }}
            </div>

            <img
              :src="$requireSafe('icon/icon-market-right.svg')"
              alt=""
              class="check-img"
            >
          </div>

          <div class="label absolute -left-1 text-xs text-white flex justify-center">
            <span>
              {{ typeName(item) }}
            </span>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          class="no-data text-center my-10"
        >
          <img
            :src="$requireSafe('icon/no-data.svg')"
            alt=""
            class="m-auto"
          >
          <p class="text-sm text-normal">
            {{ $t('views_profile_promotion_noData') }}
          </p>
        </div>
      </template>
    </div>

    <!-- 活動詳情 -->
    <div
      class="activity-detail -mx-3"
      @click="handlerActivityUrl()"
      v-else
    >
      <img
        :src="`${s3Base}/${state.activityImgUrl}`"
        alt=""
      >
      <img
        :src="`${s3Base}/${state.contentImgUrl}`"
        alt=""
      >
    </div>
  </div>
</template>
<script>
import { reactive, onBeforeMount, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import SystemApi from '@/assets/js/api/systemApi.js';

export default {
  setup() {
    // use
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    // reactive
    const state = reactive({
      currentKey: 0,
      tabIndex: 0,
      tabList: [{ label: t('views_profile_promotion_allActivity') }, { label: t('views_profile_promotion_passedActivity') }],
      activityList: [],
      typeId: undefined,
      showActivityDetail: false,
      contentImgUrl: route.params?.contentImg,
      activityImgUrl: route.params?.titleImg,
      activityUrl: route.params?.actUrl,
      showActivityId: route.params?.activityId,

    });

    // computed
    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);

    // methods
    const getActivityTypeList = async () => {
      const res = await SystemApi.getActivityTypeList();
      if (res.code === 200) {
        const tabList = res.data.map((item) => {
          item.label = item.typeName;
          return item;
        });
        state.tabList = [...state.tabList, ...tabList];
      }
    };

    const getActivityList = async () => {
      const res = await SystemApi.getActivityList({
        type: state.typeId,
        simplify: false,
      });
      if (res.code === 200) {
        // 過往活動
        if (state.tabIndex === 1) {
          const filterActitivyList = res.data.filter((item) => dayjs(item.dateTimeEnd).valueOf() < dayjs().valueOf());
          state.activityList = filterActitivyList;
        } else {
          const filterActitivyList = res.data.filter((item) => dayjs(item.dateTimeEnd).valueOf() > dayjs().valueOf());
          state.activityList = filterActitivyList;
        }
      }
    };

    const changeTab = (index) => {
      if (index > 1) {
        state.typeId = state.tabList[index].type;
      } else {
        state.typeId = undefined;
      }

      state.tabIndex = index;
      getActivityList();
    };

    const showDetail = (item) => {
      if (state.tabIndex !== 1) {
        state.showActivityDetail = true;
        state.contentImgUrl = item.mobileActivityContentImg;
        state.activityImgUrl = item.mobileActivityImg;
        state.activityUrl = item.activityUrl;
      }
    };

    const typeName = (item) => {
      let activiteTypeName = '';
      const index = state.tabList.findIndex((e) => e.type === item.type);
      activiteTypeName = state.tabList[index].typeName;
      return activiteTypeName;
    };

    const handlerActivityUrl = () => {
      if (state.activityUrl?.trim() !== 'https://') {
        const windowReference = window.isStandalone ? window.open('', '_blank') : window;
        windowReference.location = state.activityUrl;
      }
    };

    const goBack = () => {
      if (state.showActivityDetail) {
        state.showActivityDetail = false;
      } else {
        router.back();
      }
    };

    // hooks
    onBeforeMount(async () => {
      await getActivityTypeList();
      await getActivityList();
      if (state.showActivityId) {
        const index = state.activityList.findIndex((item) => item.id === +state.showActivityId);
        state.contentImgUrl = state.activityList[index].mobileActivityContentImg;
        state.activityImgUrl = state.activityList[index].mobileActivityImg;
        state.activityUrl = state.activityList[index].activityUrl;
        state.showActivityDetail = true;
      } else if (state.activityImgUrl && state.contentImgUrl) {
        state.showActivityDetail = true;
      }
    });

    return {
      state,
      s3Base,
      changeTab,
      showDetail,
      goBack,
      typeName,
      handlerActivityUrl,
    };
  },
};
</script>
<style lang="postcss" scoped>
  .activity-list {
    background: transparent linear-gradient(180deg, #ecf2f8 0%, #fff 100%);
    box-shadow: 0 2px 4px #4d57721a;
  }

  .check-detail {
    width: 95px;
    height: 38px;
    padding-left: 18px;
    background-image: url('~@/assets/img/profile/promotion/label-bg.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .label {
    top: 8px;
    width: 70px;
    height: 22px;
    padding: 2px 3px 0 0;
    background-image: url('~@/assets/img/profile/promotion/label-bg-blue.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .text {
    padding-top: 2px;
  }

  .check-img {
    width: 12px;
    padding-top: 2px;
  }

  .no-data {
    img {
      width: 80px;
    }
  }
</style>
