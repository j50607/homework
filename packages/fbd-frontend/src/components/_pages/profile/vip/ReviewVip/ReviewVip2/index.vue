<template>
  <div class="vip-review mx-3 pb-4">
    <div class="vip-list mt-4">
      <div
        class="vip-item mb-3 rounded-5 cursor-pointer"
        v-for="(item, index) in state.vipRuleList"
        :key="index"
        :class="[{'current-vip': index+1 === nowVipLevelRule.level}]"
        @click="handlerShowDialog(item, index)"
      >
        <div class="vip-level flex items-center bg-primary-content py-2 px-3">
          <img
            :src="$requireSafe('profile/vip/crown-gold.svg')"
            alt=""
            class="mr-1 w-4"
          >
          <p class="text-active">
            VIP{{ item.level }}
          </p>

          <img
            :src="$requireSafe('profile/vip/vip-reach.svg')"
            alt=""
            class="arrow ml-auto w-4"
            v-if="index+1 < nowVipLevelRule.level"
          >
        </div>

        <div class="vip-info text-xs flex items-center py-2 px-3 bg-secondary">
          <div class="vip-img mr-4">
            <img
              :src="$requireSafe(`profile/vip/${index+1}-gold.png`)"
              alt=""
              class="w-10"
            >
          </div>
          <div class="vip-info-text flex-1">
            <div class="limit-per-round flex mb-2">
              <p class="mb-1 w-2/3">
                {{ $t('components_pages_components_vip_bet_maxLimit_perRound') }}
              </p>
              <p class="number">
                {{ item.singleGameBetLimit }}
              </p>
            </div>
            <div class="limit-per-day flex mb-2">
              <p class="mb-1  w-2/3">
                {{ $t('components_pages_components_vip_bet_maxLimit_perDay') }}
              </p>
              <p class="number">
                {{ item.singleDayBetLimit }}
              </p>
            </div>
            <div class="limit-per-day flex mb-2">
              <p class="mb-1 w-2/3">
                {{ $t('components_pages_components_vip_bet_return_profit') }}
              </p>
              <p class="number">
                {{ item.rebateRate }}%
              </p>
            </div>
            <div class="limit-per-day flex">
              <p class="mb-1 w-2/3">
                {{ $t('components_pages_components_vip_bet_evenlop') }}
              </p>
              <p class="number">
                {{ formatRemedyRate(item.remedyRate) }}%
              </p>
            </div>
          </div>

          <div
            class="show-more"
          >
            <img
              :src="$requireSafe('icon/rightarrow.svg')"
              alt=""
              v-if="index+1 !== 1"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 彈窗 -->
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
        <div class="title font-normal mt-2 flex items-center">
          <div class="circle red mr-2" />
          <p>{{ $t('components_pages_components_vip_nextLevel_holdLevel_betAmount') }}</p>
        </div>
        <p class="content mt-1">
          {{ state.detailVipItem.upgradeProtectLevelStandard }}
        </p>
        <div class="title font-normal mt-2 flex items-center">
          <div class="circle orange mr-2" />
          <p>{{ $t('components_pages_components_vip_total_deposit') }}</p>
        </div>
        <p class="content mt-1">
          {{ state.detailVipItem.upgradeDepositStandard }}
        </p>
        <div class="title font-normal mt-2 flex items-center">
          <div class="circle blue mr-2" />
          <p>{{ $t('components_pages_components_vip_total_betAmount') }}</p>
        </div>
        <p class="content mt-1">
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

  &.current-vip {
    border: 1px solid #f3ac0a;
  }

  &:first-child {
    cursor: unset;
  }
}

.vip-level {
  border-radius: 5px 5px 0 0;
}

.vip-info {
  border-radius: 0 0 5px 5px;
}

.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.red {
  background-color: #e64d69 !important;
}

.orange {
  background-color: #f7b350 !important;
}

.blue {
  background-color: #0caaae !important;
}

.content {
  padding-left: 16px;
}

.show-more {
  width: 12px;

  img {
    width: 12px;
  }
}
</style>
