<template>
  <div class="vip-review mx-3">
    <div class="vip-list mt-4">
      <div
        class="vip-item p-2 bg-white mb-3 rounded-8 cursor-pointer"
        v-for="(item, index) in state.vipRuleList"
        :key="index"
        :class="[{'current-vip': index+1 === nowVipLevelRule.level}, {'prev-vip': index+1 < nowVipLevelRule.level}, {'next-vip': index+1 > nowVipLevelRule.level}]"
        @click="handlerShowDialog(item, index)"
      >
        <div class="vip-level flex mb-3 items-center">
          <img
            :src="$requireSafe('profile/vip/crown.svg')"
            alt=""
            class="mr-1 w-4"
          >
          VIP{{ item.level }}

          <img
            :src="$requireSafe('profile/vip/arrow-right.svg')"
            alt=""
            class="arrow ml-auto"
            v-if="index !== 0"
          >
        </div>

        <div class="vip-info text-xs flex flex-wrap">
          <div class="limit-per-round w-1/2 mb-2">
            <p class="mb-1">
              {{ $t('components_pages_components_vip_bet_maxLimit_perRound') }}
            </p>
            <p class="number">
              {{ item.singleGameBetLimit }}
            </p>
          </div>
          <div class="limit-per-day w-1/2 mb-2">
            <p class="mb-1">
              {{ $t('components_pages_components_vip_bet_maxLimit_perDay') }}
            </p>
            <p class="number">
              {{ item.singleDayBetLimit }}
            </p>
          </div>
          <div class="limit-per-day w-1/2 mb-2">
            <p class="mb-1">
              {{ $t('components_pages_components_vip_bet_return_profit') }}
            </p>
            <p class="number">
              {{ item.rebateRate }}%
            </p>
          </div>
          <div class="limit-per-day w-1/2 mb-2">
            <p class="mb-1">
              {{ $t('components_pages_components_vip_bet_evenlop') }}
            </p>
            <p class="number">
              {{ formatRemedyRate(item.remedyRate) }}%
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <d-dialog
    v-model:visible="state.showDetailRuleDialog"
    :footer="null"
    :title="`VIP${state.detailVipItem.level}`"
    :width="'90%'"
    v-if="state.showDetailRuleDialog"
  >
    <template #body>
      <div class="detail-container text-normal font-bold text-sm">
        {{ $t('components_pages_components_vip_review_detailDailog') }}
        <p class="title font-normal mt-2">
          {{ $t('components_pages_components_vip_nextLevel_holdLevel_betAmount') }}
        </p>
        <p class="content red mt-1">
          {{ state.detailVipItem.upgradeProtectLevelStandard }}
        </p>
        <p class="title font-normal mt-2">
          {{ $t('components_pages_components_vip_total_deposit') }}
        </p>
        <p class="content orange mt-1">
          {{ state.detailVipItem.upgradeDepositStandard }}
        </p>
        <p class="title font-normal mt-2">
          {{ $t('components_pages_components_vip_total_betAmount') }}
        </p>
        <p class="content yellow mt-1">
          {{ state.detailVipItem.upgradeBetStandard }}
        </p>
      </div>
    </template>
  </d-dialog>
</template>
<script>
import { onBeforeMount, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import NP from 'number-precision';
import SportApi from '@/assets/js/api/sportApi';
import { isArray } from '@/assets/js/utils/utils';

export default {
  emits: ['checkRecord', 'getRebateTotal'],
  setup() {
    // use
    const store = useStore();
    // reactive
    const state = reactive({
      vipRuleList: [],
      showDetailRuleDialog: false,
      detailVipItem: {},
    });

    // computed
    const nowVipLevelRule = computed(() => store.state.user.nowVipLevelRule);

    // methods
    const getVipLevelRule = async () => {
      const { code, data } = await SportApi.getVipLevelRule();
      if (code === 200) {
        if (isArray(data)) {
          state.vipRuleList = data;
        }
      }
    };
    const formatRemedyRate = (remedyRate) => NP.times(remedyRate || 0, 100);

    const handlerShowDialog = (item, index) => {
      if (index === 0) {
        return;
      }
      state.detailVipItem = item;
      state.showDetailRuleDialog = true;
    };

    // hooks
    onBeforeMount(async () => {
      await getVipLevelRule();
    });
    return {
      state,
      nowVipLevelRule,
      handlerShowDialog,
      formatRemedyRate,
    };
  },
};
</script>
<style lang="postcss" scoped>
.vip-item {
  box-shadow: 0 2px 4px #4d57721a;

  &.prev-vip {
    opacity: 0.6;
  }

  &.current-vip {
    border: 1px solid #f3ac0a;

    .number {
      color: #f3ac0a;
    }
  }

  &:first-child {
    cursor: unset;
  }
}

.arrow {
  width: 12px;
}

.red {
  color: #f27272 !important;
}

.orange {
  color: #ef934b !important;
}

.yellow {
  color: #f6cc43 !important;
}
</style>
