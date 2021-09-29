<template>
  <div class="envelop-record">
    <d-tabs
      v-model:activeKey="state.currentKey"
      :default-key="state.tabIndex"
      :tab-list="state.tabList"
      class="tab"
    >
      <template #content>
        <component :is="state.tabList[state.currentKey].comp" />
      </template>
    </d-tabs>
  </div>
</template>
<script>
import {
  reactive, ref, nextTick, computed, onBeforeMount,
} from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import FinanceApi from '@/assets/js/api/financeApi';
import SportApi from '@/assets/js/api/sportApi';
import Detail from '@/components/_pages/profile/vip/EnvelopRecord/Detail';
import ReceiveRecord from '@/components/_pages/profile/vip/EnvelopRecord/ReceiveRecord';

export default {
  components: {
    Detail,
    ReceiveRecord,
  },
  setup() {
    // use
    const { t } = useI18n();
    const store = useStore();

    // ref
    const scroll = ref(null);

    // reactive
    const state = reactive({
      tabList: [{ label: t('components_pages_components_vip_envelop_detail'), comp: 'detail' }, { label: t('components_pages_components_vip_envelop_reveice_record'), comp: 'receive-record' }],
      tabIndex: 0,
      currentKey: 0,
      recordList: [],
      remedyList: [],
      isLastPage: false,
      pageIndex: 1,
    });

    // computed
    const account = computed(() => store.state.user.account);

    // methods
    const getQueryLog = async () => {
      const info = {
        type: [55],
        start: dayjs().startOf('day').subtract(7, 'day').format('YYYY/MM/DD HH:mm:ss'),
        end: dayjs().endOf('day').format('YYYY/MM/DD HH:mm:ss'),
        pageIndex: state.pageIndex,
        account: account.value,

      };

      const { code, data } = await FinanceApi.getFrontendQueryLog(info);

      if (code === 200) {
        if (data.page.first) {
          state.recordList = data.page.content || [];
        } else {
          state.recordList = [...state.recordList, ...data.page.content] || [];
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
    const getRemedyLog = async () => {
      const res = await SportApi.getRemedyLog();
      if (res.code === 200) {
        if (res.data.first) {
          state.remedyList = res.data.content || [];
        } else {
          state.remedyList = [...state.remedyList, ...res.data.page.content] || [];
        }

        state.isLastPage = res.data.last;

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
      await getRemedyLog();
      await getQueryLog();
    });

    return {
      state,
      scroll,
      pullingDown,
      loadMoreRecord,

    };
  },
};
</script>
<style lang="postcss" scoped>
.tab {
  ::v-deep(.d-tabs-mobile-box) {
    justify-content: space-around !important;
  }
}

.content {
  color: #1f2022;
}
</style>
