<template>
  <div class="mb-5">
    <d-swiper
      class="rounded-5"
      :img-list="list"
      :delay="5000"
      :local-img="false"
    />
  </div>
</template>

<script>
import {
  computed, onMounted, reactive, toRefs,
} from 'vue';
import dayjs from 'dayjs';
import * as R from 'ramda';
import SystemApi from '@/assets/js/api/systemApi';
import { isValidUrl } from '@/assets/js/utils/utils';

export default {
  setup() {
    // reactive
    const state = reactive({
      list: [],
    });

    // computed
    const s3Base = computed(() => process.env.VUE_APP_IMG_URL_PREFIX);

    // methods
    const getActivityList = async () => {
      const { code, data } = await SystemApi.getActivityList({ simplify: false });
      if (code === 200) {
        return data;
      }
      return [];
    };

    // 檢查是否過期
    const isExpired = (time) => dayjs(time).valueOf() > dayjs().valueOf();
    // 取得正在進行的活動
    const getValidList = (arr) => arr.filter((item) => isExpired(item.dateTimeEnd));

    const mappingActivity = (arr) => arr.map((item) => ({
      img: `${s3Base.value}/${item.mobileActivityImg || item.activityImg}`,
      link: isValidUrl(item.activityUrl) ? item.activityUrl : '',
    }));

    onMounted(async () => {
      const initActivity = R.pipeP(
        getActivityList,
        getValidList,
        mappingActivity,
      );
      state.list = await initActivity();
    });

    return {
      s3Base,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  height: 140px !important;

  ::v-deep(.swiper-wrapper) {
    img {
      width: 100%;
      height: 120px;
      border-radius: 5px;
    }
  }

  ::v-deep(.swiper-pagination-bullet) {
    width: 5px;
    height: 5px;
    border: none;
    background: #f1f1f1;
  }

  ::v-deep(.swiper-pagination-bullet-active) {
    background: var(--primary-color);
  }
}
</style>
