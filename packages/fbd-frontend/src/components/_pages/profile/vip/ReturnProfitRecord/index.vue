<template>
  <div class="receive-record absolute">
    <d-scroll
      ref="scroll"
      :pull-up="true"
      :pull-down="true"
      :scroll-y="true"
      :on-scroll="true"
      @pullingDown="pullingDown()"
      @pullingUp="loadMoreRecord()"
      v-if="state.financeRecordData.length"
    >
      <div class="record">
        <div class="head text-xs flex py-1 fixed w-full h-6 left-0 px-3">
          <p class="w-1/2">
            {{ $t('components_pages_components_vip_returnProfit_table_title_time') }}
          </p>
          <p>{{ $t('components_pages_components_vip_returnProfit_table_title_money') }}</p>
        </div>
        <div class="record-container pt-6">
          <div
            class="record-list text-xs flex"
            v-for="(item, index) in state.financeRecordData"
            :key="index"
          >
            <p class="time w-1/2">
              {{ dayjs(item.processAt).format('YYYY-MM-DD hh:mm:ss') }}
            </p>
            <p class="amount">
              {{ item.amount }}
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
        :src="$requireSafe('icon/no-data.svg')"
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
  onBeforeMount, reactive, nextTick, ref, computed,
} from 'vue';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import FinanceApi from '@/assets/js/api/financeApi';

export default {
  setup() {
    // use
    const store = useStore();
    // ref
    const scroll = ref(null);

    // reactive
    const state = reactive({
      pageIndex: 1,
      isLastPage: false,
      financeRecordData: [],
    });
    // computed
    const account = computed(() => store.state.user.account);

    // methods
    const getQueryLog = async () => {
      const info = {
        type: [9, 35],
        start: dayjs().subtract(6, 'day').format('YYYY/MM/DD HH:mm:ss'),
        end: dayjs().format('YYYY/MM/DD HH:mm:ss'),
        pageIndex: state.pageIndex,
        account: account.value,
      };

      const { code, data } = await FinanceApi.getFrontendQueryLog(info);

      if (code === 200) {
        if (data.page.first) {
          state.financeRecordData = data.page.content || [];
        } else {
          state.financeRecordData = [...state.financeRecordData, ...data.page.content] || [];
        }

        state.isLastPage = data.page.last;

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
      await getQueryLog();
      scroll.value.finishPullDown();
      scroll.value.refresh();
    };

    const loadMoreRecord = () => {
      state.pageIndex += 1;
      getQueryLog();
    };
    // hooks
    onBeforeMount(async () => {
      await getQueryLog();
    });
    return {
      state,
      pullingDown,
      loadMoreRecord,
      scroll,
      dayjs,
    };
  },
};
</script>
<style lang="postcss" scoped>
.receive-record {
  top: var(--header-height);
  right: 0;
  bottom: 0;
  left: 0;
}

.no-data {
  img {
    width: 60px;
  }
}

.head {
  background: #ecf2f8;
}

.record-list {
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
}
</style>
