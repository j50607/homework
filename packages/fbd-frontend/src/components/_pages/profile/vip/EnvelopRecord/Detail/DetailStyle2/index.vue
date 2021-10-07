<template>
  <div>
    <d-scroll
      ref="scroll"
      :pull-up="true"
      :pull-down="true"
      :scroll-y="true"
      :on-scroll="true"
      @pullingDown="pullingDown()"
      @pullingUp="loadMoreRecord()"
      v-if="state.remedyList.length"
    >
      <div
        class="detail mt-4"
      >
        <div
          class="detail-list flex bg-secondary p-2 mx-3 text-xs text-white flex-wrap rounded-5"
          v-for="(item,index) in state.remedyList"
          :key="index"
        >
          <div class="date w-1/2 mb-2">
            <p class="title mb-1">
              {{ $t('components_pages_components_vip_envelop_detail_date') }}
            </p>
            <p class="content">
              {{ item.settledDate }}
            </p>
          </div>
          <div class="date w-1/2 mb-2">
            <p class="title mb-1">
              {{ $t('components_pages_components_vip_envelop_detail_negative_profit') }}
            </p>
            <p class="content">
              {{ item.remedyBetSum }}
            </p>
          </div>
          <div class="date w-1/2 mb-2">
            <p class="title mb-1">
              {{ $t('components_pages_components_vip_envelop_detail_returnProfit_rate') }}
            </p>
            <p class="content">
              {{ item.rate }}
            </p>
          </div>
          <div class="date w-1/2 mb-2">
            <p class="title mb-1">
              {{ $t('components_pages_components_vip_envelop_detail_amount') }}
            </p>
            <p class="content">
              {{ item.remedyAmount }}
            </p>
          </div>
        </div>
      </div>
    </d-scroll>
    <div
      class="no-data text-center my-10"
      v-else
    >
      <img
        :src="$requireSafe('icon/style2/no-data.svg')"
        alt=""
        class="m-auto"
      >
      <p class="text-sm text-normal">
        {{ $t('components_pages_components_vip_envelop_noData') }}
      </p>
    </div>
  </div>
</template>
<script>
import {
  onBeforeMount, reactive, nextTick, ref,
} from 'vue';
import SportApi from '@/assets/js/api/sportApi';

export default {
  setup() {
    // ref
    const scroll = ref(null);

    // reactive
    const state = reactive({
      remedyList: [],
      isLastPage: false,
      pageIndex: 1,
    });

    // methods
    const getRemedyLog = async () => {
      const { code, data } = await SportApi.getRemedyLog();
      if (code === 200) {
        if (data.first) {
          state.remedyList = data.content || [];
        } else {
          state.remedyList = [...state.remedyList, ...data.content] || [];
        }

        state.isLastPage = data.last;

        nextTick(() => {
          if (scroll.value) {
            scroll.value.lastPageCheck(state.isLastPage);
            scroll.value.refresh();
          }
        });
      }
    };
    const pullingDown = async () => {
      state.pageIndex = 1;
      scroll.value.finishPullDown();
      scroll.value.refresh();
    };

    const loadMoreRecord = () => {
      state.pageIndex += 1;
    };

    // hooks
    onBeforeMount(async () => {
      await getRemedyLog();
    });
    return {
      scroll,
      loadMoreRecord,
      pullingDown,
      state,
    };
  },
};
</script>
<style lang="postcss" scoped>
.no-data {
  img {
    width: 60px;
  }
}

.detail-list {
  box-shadow: 0 2px 4px #4d57721a;
}

.content {
  font-weight: bold;
}
</style>
