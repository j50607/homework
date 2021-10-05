<template>
  <div class="vip-page pt-h-h overflow-auto">
    <d-header-row
      :title="state.showRecord && state.checkRecordType === 'remedyRate' ? $t('components_pages_components_vip_bet_evenlop') : state.showRecord && state.checkRecordType === 'rebateRate' ? $t('components_pages_components_vip_bet_return_profit') : $t('views_profile_vip_title')"
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
      class="tab"
      v-if="!state.showRecord"
    >
      <template #content>
        <component
          :is="state.tabList[state.currentKey].comp"
          @checkRecord="handlerCheckRecord"
          @getRebateTotal="getSelfRebate()"
          :profit-enable="profitEnable"
          :return-profit="state.returnProfit"
        />
      </template>
    </d-tabs>
    <return-profit-record
      v-else-if="state.showRecord && state.checkRecordType === 'rebateRate'"
    />
    <envelop-record
      v-else-if="state.showRecord && state.checkRecordType === 'remedyRate'"
    />
  </div>
</template>

<script>
import { reactive, onBeforeMount, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CurrentVip from '@/components/_pages/profile/vip/CurrentVip';
import ReviewVip from '@/components/_pages/profile/vip/ReviewVip';
import ReturnProfitRecord from '@/components/_pages/profile/vip/ReturnProfitRecord';
import EnvelopRecord from '@/components/_pages/profile/vip/EnvelopRecord';
import SportApi from '@/assets/js/api/sportApi';
import SystemApi from '@/assets/js/api/systemApi';
import FinanceApi from '@/assets/js/api/financeApi';

export default {
  components: {
    CurrentVip,
    ReviewVip,
    ReturnProfitRecord,
    EnvelopRecord,
  },
  setup() {
    // use
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();

    // reactive
    const state = reactive({
      currentKey: 0,
      tabIndex: 0,
      tabList: [{ label: t('views_profile_vip_current_level'), comp: 'current-vip' }, { label: t('views_profile_vip_level_review'), comp: 'review-vip' }],
      vipLevel: undefined,
      showRecord: false,
      checkRecordType: '',
      returnProfit: 0,
    });

    const profitEnable = reactive({
      remedyEnable: undefined,
      rebateEnable: undefined,
    });

    // computed
    const accountGroupId = computed(() => store.state.user.accountGroup);

    // methods
    const getVipLevelInfo = async () => {
      const { code, data } = await SportApi.getVipLevelInfo();
      if (code === 200) {
        store.commit('SET_VIP_USER_INFO', {
          levelStatus: data.levelStatus,
          nextVipLevelRule: data.nextVipLevelRule,
          nowVipLevelRule: data.nowVipLevelRule,
          remedyAmount: data.remedyAmount,
        });
      }
    };

    const getGroupInfo = async (groupId) => {
      const res = await SystemApi.getGroupInfo(groupId);
      if (res.code === 200) {
        profitEnable.remedyEnable = res.data?.groupSetting?.remedyEnable;
        profitEnable.rebateEnable = res.data?.groupSetting?.rebateEnable;
      }
    };

    const getSelfRebate = async () => {
      if (profitEnable.rebateEnable) {
        const res = await FinanceApi.getSelfRebate();
        if (res.code === 200) {
          state.returnProfit = res.data.total.toFixed(2) || 0.00;
        }
      }
    };

    const handlerCheckRecord = (type) => {
      state.checkRecordType = type;
      state.showRecord = true;
    };

    const goBack = () => {
      if (state.showRecord) {
        state.showRecord = false;
      } else {
        router.back();
      }
    };

    // hooks
    onBeforeMount(async () => {
      await getVipLevelInfo();
      await getGroupInfo(accountGroupId.value);
      await getSelfRebate();
    });

    return {
      state,
      handlerCheckRecord,
      goBack,
      profitEnable,
      getSelfRebate,
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
</style>
