<template>
  <div class="vip-page pt-h-h overflow-auto">
    <d-header-row
      :title="state.showRecord && state.checkRecordType === 'remedyRate' ? $t('components_pages_components_vip_bet_evenlop') : state.showRecord && state.checkRecordType === 'rebateRate' ? $t('components_pages_components_vip_bet_return_profit') : $t('views_profile_vip_title')"
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

    <div class="vip-container">
      <div class="header-bg" />
      <div
        class="tabs text-center"
        v-if="!state.showRecord"
      >
        <div
          class="current-vip tabs-button"
          :class="{'active': state.currentPage === 'current-vip'}"
          @click="changePage('current-vip')"
        >
          {{ $t('views_profile_vip_current_level') }}
        </div>
        <div
          class="vip-review tabs-button"
          :class="{'active': state.currentPage === 'review-vip'}"
          @click="changePage('review-vip')"
        >
          {{ $t('views_profile_vip_level_review') }}
        </div>
      </div>

      <div
        class="tabs text-center"
        v-else-if="state.showRecord && state.checkRecordType === 'remedyRate'"
      >
        <div
          class="check-detail tabs-button"
          :class="{'active': state.currentPage === 'check-detail'}"
          @click="changePage('check-detail')"
        >
          {{ $t('components_pages_components_vip_checkRecord_detail') }}
        </div>
        <div
          class="receive-record tabs-button"
          :class="{'active': state.currentPage === 'receive-record'}"
          @click="changePage('receive-record')"
        >
          {{ $t('components_pages_components_vip_checkRecord_receive') }}
        </div>
      </div>

      <div
        class="vip-info-container"
        v-if="!state.showRecord"
      >
        <component
          :is="state.currentPage"
          @checkRecord="handlerCheckRecord"
          @getRebateTotal="getSelfRebate()"
          :profit-enable="profitEnable"
          :return-profit="state.returnProfit"
        />
      </div>
      <return-profit-record
        v-else-if="state.showRecord && state.checkRecordType === 'rebateRate'"
      />
      <envelop-record
        v-else-if="state.showRecord && state.checkRecordType === 'remedyRate'"
        :current-page="state.currentPage"
      />
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, computed } from 'vue';
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
    const store = useStore();
    const router = useRouter();

    // reactive
    const state = reactive({
      vipLevel: undefined,
      showRecord: false,
      checkRecordType: '',
      currentPage: 'current-vip',
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

    const handlerCheckRecord = (type) => {
      state.checkRecordType = type;
      state.showRecord = true;
      state.currentPage = 'check-detail';
    };

    const getSelfRebate = async () => {
      if (profitEnable.rebateEnable) {
        const res = await FinanceApi.getSelfRebate();
        if (res.code === 200) {
          state.returnProfit = res.data.total.toFixed(2) || 0.00;
        }
      }
    };

    const getGroupInfo = async (groupId) => {
      const res = await SystemApi.getGroupInfo(groupId);
      if (res.code === 200) {
        profitEnable.remedyEnable = res.data?.groupSetting?.remedyEnable;
        profitEnable.rebateEnable = res.data?.groupSetting?.rebateEnable;
      }
    };

    const changePage = (page) => {
      state.currentPage = page;
    };

    const goBack = () => {
      if (state.showRecord) {
        state.showRecord = false;
        state.checkRecordType = '';
        state.currentPage = 'current-vip';
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
      changePage,
      profitEnable,
      getSelfRebate,
    };
  },
};
</script>
<style lang="postcss" scoped>

.vip-container {
  margin-top: -28px;

  .header-bg {
    width: 100%;
    height: 60px;
    border-radius: 0 0 50% 50%;
    background: #142340;
  }

  .tabs {
    position: relative;
    left: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    border-radius: 24px;
    background-color: #21304e;
    transform: translate3d(-50%, -50%, 0);

    .tabs-button {
      width: 95px;
      height: 100%;
      min-height: 30px;
      padding: 3px;
      border-radius: 24px;
      color: #fff;

      &.active {
        color: #21304e;
        font-weight: 700;
        background: transparent;
      }
    }

    .current-vip, .check-detail {
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        display: flex;
        width: 50%;
        height: 100%;
        border-radius: 24px;
        background: #fff4d9;
        transition: all 0.3s;
        content: '';
        transform: translateX(100%);
      }

      &.active {
        &::after {
          transform: translateX(0);
        }
      }
    }
  }
}
</style>
