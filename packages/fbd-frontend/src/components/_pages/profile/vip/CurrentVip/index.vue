<template>
  <div class="current-level-container mx-3 pb-6">
    <!-- 當前 vip 等級 -->
    <div class="current-level mb-3 block-bg p-2 mt-4 rounded-5">
      <div class="vip-top-info flex justify-between mb-3">
        <div class="vip-text mr-7 flex-1">
          <div class="vip-level flex mb-1 items-center">
            <img
              :src="$requireSafe('profile/vip/crown.svg')"
              alt=""
              class="mr-1 w-4"
            >
            <p class="text-normal font-bold text-base">
              {{ `VIP${nowVipLevelRule.level}` }}
            </p>
          </div>
          <div
            class="bet-amount flex mb-1 text-xs items-center"
            v-if="nowVipLevelRule.level !== 1"
          >
            {{ $t('components_pages_components_vip_holdLevel_betAmount') }}
            <img
              :src="$requireSafe('profile/vip/question.svg')"
              alt=""
              class="w-3 ml-1 cursor-pointer"
              @click="handlerShowDialog('holdBet')"
            >
          </div>
          <div
            class="vip1-description text-xs"
            v-else
          >
            {{ $t('components_pages_components_vip_vip1Description') }}
          </div>
          <div
            class="progress-bar w-full rounded-8 relative"
            v-if="nowVipLevelRule.level !== 1"
          >
            <div
              class="progress rounded-8"
              :style="`width: ${deadLineBetSumPercentage}%`"
            />
            <div class="progress-text text-white text-xs absolute top-0">
              {{ levelStatus.deadlineBetSum || 0 }} / {{ nowVipLevelRule.upgradeProtectLevelStandard }}
            </div>
          </div>
        </div>
        <div class="vip-img">
          <img
            :src="$requireSafe(`profile/vip/${nowVipLevelRule.level}.png`)"
            alt=""
          >
        </div>
      </div>
      <div class="vip-bottom-info flex flex-wrap">
        <div class="bet w-1/2 mb-2 text-xs">
          <p class="mb-1">
            {{ $t('components_pages_components_vip_bet_maxLimit_perRound') }}
          </p>
          <p class="text-secondary font-bold">
            {{ nowVipLevelRule.singleGameBetLimit }}
          </p>
        </div>
        <div class="bet w-1/2 mb-2 text-xs">
          <p class="mb-1">
            {{ $t('components_pages_components_vip_bet_maxLimit_perDay') }}
          </p>
          <p class="text-secondary font-bold">
            {{ nowVipLevelRule.singleDayBetLimit }}
          </p>
        </div>
        <div class="bet w-1/2 text-xs">
          <p class="mb-1">
            {{ $t('components_pages_components_vip_bet_return_profit') }}
          </p>
          <p class="text-secondary font-bold">
            {{ nowVipLevelRule.rebateRate || 0 }}%
          </p>
        </div>
        <div class="bet w-1/2 text-xs">
          <p class="mb-1">
            {{ $t('components_pages_components_vip_bet_evenlop') }}
          </p>
          <p class="text-secondary font-bold">
            {{ nowVipLevelRule.remedyRate || 0 }}%
          </p>
        </div>
      </div>
    </div>

    <!-- 距離NEXT vip -->
    <div
      class="next-level mb-3 block-bg p-2 mt-4 rounded-5"
      v-if="nowVipLevelRule.level !== 15"
    >
      <div class="vip-text flex mb-2 items-center">
        <img
          :src="$requireSafe('profile/vip/crown.svg')"
          alt=""
          class="mr-1 w-4"
        >
        <p class="text-normal font-bold text-base">
          {{ $t('components_pages_components_vip_distance') }} {{ `VIP${nowVipLevelRule.level + 1}` }}
        </p>
        <p
          class="check text-primary text-xs flex items-center ml-auto cursor-pointer"
          @click="handlerShowDialog('privilege')"
        >
          {{ $t('components_pages_components_vip_check') }}
          <img
            :src="$requireSafe('icon/icon-market-right.svg')"
            alt=""
            class="ml-1"
          >
        </p>
      </div>
      <div class="progress-bar w-full rounded-8 relative mb-2 flex">
        <div
          class="progress-flex red"
          :style="`width: ${nextLevelBetSumPercentage}%`"
        />
        <div
          class="progress-flex orange"
          :style="`width: ${nextLevelDepositSumPercentage}%`"
          :class="{'first-bar':isFirstBar}"
        />
        <div
          class="progress-flex yellow"
          :style="`width: ${nextLevelTotalBetSumPercentage}%`"
          :class="{'first-bar':isFirstBar2}"
        />
      </div>

      <!-- 晉級保級下單量 -->
      <div class="next-level-hold mb-2">
        <div class="item-info flex items-center mb-1">
          <div class="circle red mr-1 w-2 h-2" />
          <div class="item-title text-xs">
            {{ $t('components_pages_components_vip_nextLevel_holdLevel_betAmount') }}
          </div>
          <img
            :src="$requireSafe('profile/vip/question.svg')"
            alt=""
            class="w-3 ml-1 cursor-pointer"
            @click="handlerShowDialog('holdUpgradeBet')"
          >
          <div class="dead-line flex items-center text-xs ml-auto">
            <img
              :src="$requireSafe('profile/vip/clock.svg')"
              alt=""
              class="w-3"
            >
            <p>
              {{ deadLineTime }}
              {{ $t('components_pages_components_vip_nextLevel_holdLevel_deadLine') }}
            </p>
          </div>
        </div>
        <div
          class="progress-bar w-full rounded-8 mb-2 relative"
          v-if="state.showNextLevelDetail"
        >
          <div
            class="progress red text-xs text-white rounded-8"
            :style="`width: ${nextLevelBetSumPercentage}%`"
          />

          <div class="progress-text text-white text-xs absolute top-0">
            {{ levelStatus.deadlineBetSum || 0 }} / {{ nextVipLevelRule.upgradeProtectLevelStandard }}
          </div>
        </div>
      </div>
      <!-- 總充值量 -->
      <div class="total-deposit mb-2">
        <div class="item-info flex items-center mb-1">
          <div class="circle orange mr-1 w-2 h-2" />
          <div class="item-title text-xs">
            {{ $t('components_pages_components_vip_total_deposit') }}
          </div>
          <img
            :src="$requireSafe('profile/vip/question.svg')"
            alt=""
            class="w-3 ml-1 cursor-pointer"
            @click="handlerShowDialog('totalDeposit')"
          >
        </div>
        <div
          class="progress-bar w-full rounded-8 mb-2 relative"
          v-if="state.showNextLevelDetail"
        >
          <div
            class="progress orange text-xs text-white rounded-8"
            :style="`width: ${nextLevelDepositSumPercentage}%`"
          />

          <div class="progress-text text-white text-xs absolute top-0">
            {{ levelStatus.depositTotal || 0 }} / {{ nextVipLevelRule.upgradeDepositStandard }}
          </div>
        </div>
      </div>

      <!-- 總下單量 -->
      <div class="total-bet mb-2">
        <div class="item-info flex items-center mb-1">
          <div class="circle yellow mr-1 w-2 h-2" />
          <div class="item-title text-xs">
            {{ $t('components_pages_components_vip_total_betAmount') }}
          </div>
          <img
            :src="$requireSafe('profile/vip/question.svg')"
            alt=""
            class="w-3 ml-1 cursor-pointer"
            @click="handlerShowDialog('betSum')"
          >
        </div>
        <div
          class="progress-bar w-full rounded-8 mb-2 relative"
          v-if="state.showNextLevelDetail"
        >
          <div
            class="progress yellow text-xs text-white rounded-8"
            :style="`width: ${nextLevelTotalBetSumPercentage}%`"
          />
          <div class="progress-text text-white text-xs absolute top-0">
            {{ levelStatus.betSum || 0 }} / {{ nextVipLevelRule.upgradeBetStandard }}
          </div>
        </div>
      </div>

      <div
        class="open-detail text-xs text-center flex justify-center items-center m-auto cursor-pointer"
        @click="openDetail(0)"
      >
        <p class="cursor-pointer">
          {{ $t('views_betRecord_item_action1') }}
        </p>

        <img
          :src="$requireSafe('icon/detail-open.svg')"
          alt=""
          class="w-2 ml-1"
          v-if="!state.showNextLevelDetail"
        >
        <img
          :src="$requireSafe('icon/detail-close.svg')"
          alt=""
          class="w-2 ml-1"
          v-else
        >
      </div>
    </div>
    <!-- 下單返利 -->
    <div class="return-profit mb-3 block-bg p-2 mt-4 rounded-5">
      <div class="vip-text flex mb-2 items-center">
        <p class="text-normal font-bold text-base">
          {{ $t('components_pages_components_vip_bet_return_profit') }}
        </p>
        <p
          class="check text-primary text-xs flex items-center ml-auto cursor-pointer"
          @click="goRecord('rebateRate')"
        >
          {{ $t('components_pages_components_vip_checkRecord') }}
          <img
            :src="$requireSafe('icon/icon-market-right.svg')"
            alt=""
            class="ml-1"
          >
        </p>
      </div>
      <div class="take-profit flex mb-2">
        <div class="profit-text">
          <p class="text-xs">
            {{ $t('components_pages_components_vip_perpare_takeProfit') }}
          </p>
          <p class="amount text-lg">
            {{ state.returnProfit }}{{ $t('views_betting_main_popup_dollars') }}
          </p>
        </div>
        <div class="profit-button ml-auto">
          <d-button
            type="primary"
            :disabled="state.returnProfit === 0"
            @click="handlerReceive()"
          >
            {{ $t('components_pages_components_vip_takeProfit') }}
          </d-button>
        </div>
      </div>

      <div class="desc-tex text-normal text-xs mb-2">
        <p v-if="state.showReturnProfitDetail">
          1. {{ $t('components_pages_components_vip_returnProfit_description1') }}
        </p>
        <p v-if="state.showReturnProfitDetail">
          2. {{ $t('components_pages_components_vip_returnProfit_description2') }}
        </p>
      </div>

      <div
        class="open-detail text-xs text-center flex justify-center items-center m-auto cursor-pointer"
        @click="openDetail(1)"
      >
        <p class="cursor-pointer">
          {{ $t('components_pages_components_vip_openDetail') }}
        </p>

        <img
          :src="$requireSafe('icon/detail-open.svg')"
          alt=""
          class="w-2 ml-1"
          v-if="!state.showReturnProfitDetail"
        >
        <img
          :src="$requireSafe('icon/detail-close.svg')"
          alt=""
          class="w-2 ml-1"
          v-else
        >
      </div>
    </div>
    <!-- 負利紅包 -->
    <div class="envelop block-bg p-2 mt-4 rounded-5">
      <div class="vip-text flex mb-2 items-center">
        <p class="text-normal font-bold text-base">
          {{ $t('components_pages_components_vip_bet_evenlop') }}
        </p>
        <p
          class="check text-primary text-xs flex items-center ml-auto cursor-pointer"
          @click="goRecord('remedyRate')"
        >
          {{ $t('components_pages_components_vip_checkRecord') }}
          <img
            :src="$requireSafe('icon/icon-market-right.svg')"
            alt=""
            class="ml-1"
          >
        </p>
      </div>
      <div class="already-take text-xs mb-2">
        <p>{{ $t('components_pages_components_vip_envelop_alradyTake') }}</p>
        <p class="envelop-amount text-lg">
          {{ remedyAmount || 0 }}{{ $t('views_betting_main_popup_dollars') }}
        </p>
      </div>

      <div class="desc-tex text-normal text-xs mb-2">
        <p v-if="state.showEnvelopDetail">
          1. {{ $t('components_pages_components_vip_envelop_description1') }}
        </p>
        <p v-if="state.showEnvelopDetail">
          2. {{ $t('components_pages_components_vip_envelop_description2') }}
        </p>
        <p v-if="state.showEnvelopDetail">
          3. {{ $t('components_pages_components_vip_envelop_description3') }}
        </p>
      </div>

      <div
        class="open-detail text-xs text-center flex justify-center items-center m-auto cursor-pointer"
        @click="openDetail(2)"
      >
        <p class="cursor-pointer">
          {{ $t('components_pages_components_vip_openDetail') }}
        </p>

        <img
          :src="$requireSafe('icon/detail-open.svg')"
          alt=""
          class="w-2 ml-1"
          v-if="!state.showEnvelopDetail"
        >
        <img
          :src="$requireSafe('icon/detail-close.svg')"
          alt=""
          class="w-2 ml-1"
          v-else
        >
      </div>
    </div>

    <!-- 彈窗 -->
    <d-dialog
      v-model:visible="state.showDetailDialog"
      :footer="null"
      :title="state.dialogTitle"
      :width="'90%'"
      v-if="state.showDetailDialog"
    >
      <template #body>
        <div class="detail-container text-normal font-bold text-sm">
          <div
            v-if="state.currentShowType === 'holdBet'"
            class="hold-bet font-normal"
          >
            <p
              class="mb-1 leading-loose"
              v-html="$t('components_pages_components_vip_detailDailog_description', {betSum: nowVipLevelRule.upgradeProtectLevelStandard,level:nowVipLevelRule.level, preLevel:nowVipLevelRule.level -1}) "
            />
            <p
              v-html="$t('components_pages_components_vip_detailDailog_description2', {
                deadLine:deadLineTime,
                alreadyBetSum:levelStatus.deadlineBetSum})"
            />
          </div>
          <div
            v-else-if="state.currentShowType === 'holdUpgradeBet'"
            class="hold-upgrade-bet font-normal"
          >
            <p
              class="mb-1 leading-loose"
              v-html="$t('components_pages_components_vip_detailDailog_description3', {betSum: nextVipLevelRule.upgradeProtectLevelStandard, level:nowVipLevelRule.level+1}) "
            />
            <p
              v-html="$t('components_pages_components_vip_detailDailog_description4', {
                deadLine:deadLineTime,
                alreadyBetSum:levelStatus.deadlineBetSum || 0})"
            />
          </div>
          <div
            v-else-if="state.currentShowType === 'totalDeposit'"
            class="totalDeposit font-normal"
          >
            <p
              class="mb-1 leading-loose"
              v-html="$t('components_pages_components_vip_detailDailog_description5', {depositSum: NP.minus(nextVipLevelRule.upgradeDepositStandard, levelStatus.depositTotal) >= 0 ? NP.minus(nextVipLevelRule.upgradeDepositStandard, levelStatus.depositTotal): 0, level:nowVipLevelRule.level + 1}) "
            />
          </div>
          <div
            v-else-if="state.currentShowType === 'betSum'"
            class="betSum font-normal"
          >
            <p
              class="mb-1 leading-loose"
              v-html="$t('components_pages_components_vip_detailDailog_description6', {betSum: NP.minus(nextVipLevelRule.upgradeBetStandard, levelStatus.betSum) >= 0 ? NP.minus(nextVipLevelRule.upgradeBetStandard, levelStatus.betSum): 0, level:nowVipLevelRule.level + 1}) "
            />
          </div>
          <div
            v-else-if="state.currentShowType === 'privilege'"
            class="privilege font-normal"
          >
            <p class="mb-2">
              {{ $t('components_pages_components_vip_privilege_level') }}
              <span class="text-secondary">VIP{{ nowVipLevelRule.level }}</span>
              <span class="px-2">=></span>
              <span class="text-secondary">VIP{{ nowVipLevelRule.level + 1 }}</span>
            </p>
            <div class="mb-2">
              <p v-if="nowVipLevelRule.singleGameBetLimit === nextVipLevelRule.singleGameBetLimit">
                {{ $t('components_pages_components_vip_perRoundLimitHold') }}
                <span class="text-secondary">{{ nowVipLevelRule.singleGameBetLimit }}</span>
              </p>
              <p else>
                {{ $t('components_pages_components_vip_bet_maxLimit_perRound') }}
                <span class="text-secondary">{{ nowVipLevelRule.singleGameBetLimit }}</span>
                <span class="px-2">=></span>
                <span class="text-secondary">{{ nextVipLevelRule.singleGameBetLimit }}</span>
              </p>
            </div>
            <div class="mb-2">
              <p v-if="nowVipLevelRule.singleDayBetLimit === nextVipLevelRule.singleDayBetLimit">
                {{ $t('components_pages_components_vip_perDayLimitHold') }}
                <span class="text-secondary">{{ nextVipLevelRule.rebsingleDayBetLimitateRate }}</span>
              </p>
              <p else>
                {{ $t('components_pages_components_vip_bet_maxLimit_perDay') }}
                <span class="text-secondary">{{ nowVipLevelRule.singleDayBetLimit }}</span>
                <span class="px-2">=></span>
                <span class="text-secondary">{{ nextVipLevelRule.singleDayBetLimit }}</span>
              </p>
            </div>
            <div class="mb-2">
              <p v-if="nowVipLevelRule.rebateRate === nextVipLevelRule.rebateRate">
                {{ $t('components_pages_components_vip_rebateRateHold') }}
                <span class="text-secondary">{{ nextVipLevelRule.rebateRate }}%</span>
              </p>
              <p else>
                {{ $t('components_pages_components_vip_bet_return_profit') }}
                <span class="text-secondary">{{ nowVipLevelRule.rebateRate }}%</span>
                <span class="px-2">=></span>
                <span class="text-secondary">{{ nextVipLevelRule.rebateRate }}%</span>
              </p>
            </div>
            <div class="mb-2">
              <p v-if="nowVipLevelRule.remedyRate === nextVipLevelRule.remedyRate">
                {{ $t('components_pages_components_vip_envelopHold') }}
                <span class="text-secondary">{{ formatRemedyRate(nextVipLevelRule.remedyRate) }}%</span>
              </p>
              <p else>
                {{ $t('components_pages_components_vip_bet_evenlop') }}
                <span class="text-secondary">{{ formatRemedyRate(nowVipLevelRule.remedyRate) }}%</span>
                <span class="px-2">=></span>
                <span class="text-secondary">{{ formatRemedyRate(nextVipLevelRule.remedyRate) }}%</span>
              </p>
            </div>
          </div>
        </div>
      </template>
    </d-dialog>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { computed, reactive, onBeforeMount } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import NP from 'number-precision';
import FinanceApi from '@/assets/js/api/financeApi';

export default {
  emits: ['checkRecord'],
  setup(props, { emit }) {
    // use
    const store = useStore();
    const { t } = useI18n();

    // reactive
    const state = reactive({
      percentage: 5,
      showNextLevelDetail: false,
      showReturnProfitDetail: false,
      showEnvelopDetail: false,
      showDetailDialog: false,
      currentShowType: '',
      dialogTitle: '',
      returnProfit: 0,
    });

    // computed
    const nowVipLevelRule = computed(() => store.state.user.nowVipLevelRule);
    const levelStatus = computed(() => store.state.user.levelStatus);
    const nextVipLevelRule = computed(() => store.state.user.nextVipLevelRule);
    const remedyAmount = computed(() => store.state.user.remedyAmount);

    const deadLineBetSumPercentage = computed(() => {
      const realPercentage = NP.divide(levelStatus.value.deadlineBetSum || 0, NP.divide(nowVipLevelRule.value.upgradeProtectLevelStandard || 0, 100));
      if (realPercentage && realPercentage < 5) {
        return 5;
      }
      return realPercentage;
    });

    const nextLevelBetSumPercentage = computed(() => {
      const realNextLevelBetSumPercentage = NP.divide(levelStatus.value.deadlineBetSum || 0, NP.divide(nextVipLevelRule.value.upgradeProtectLevelStandard || 0, 100));
      if (realNextLevelBetSumPercentage && realNextLevelBetSumPercentage < 3) {
        return 3;
      }
      return realNextLevelBetSumPercentage;
    });
    const nextLevelDepositSumPercentage = computed(() => {
      const realNextLevelBetSumPercentage = NP.divide(levelStatus.value.depositTotal || 0, NP.divide(nextVipLevelRule.value.upgradeDepositStandard || 0, 100));
      if (realNextLevelBetSumPercentage && realNextLevelBetSumPercentage < 3) {
        return 3;
      }
      return realNextLevelBetSumPercentage;
    });
    const nextLevelTotalBetSumPercentage = computed(() => {
      const realNextLevelBetSumPercentage = NP.divide(levelStatus.value.betSum || 0, NP.divide(nextVipLevelRule.value.upgradeBetStandard || 0, 100));
      if (realNextLevelBetSumPercentage && realNextLevelBetSumPercentage < 3) {
        return 3;
      }
      return realNextLevelBetSumPercentage;
    });

    const deadLineTime = computed(() => dayjs(levelStatus.value.deadlineAt).format('DD'));

    const isFirstBar = computed(() => nextLevelBetSumPercentage.value === 0);
    const isFirstBar2 = computed(() => nextLevelBetSumPercentage.value === 0 && nextLevelDepositSumPercentage.value === 0);

    // methods
    const openDetail = (index) => {
      switch (index) {
        case 0:
          state.showNextLevelDetail = !state.showNextLevelDetail;
          break;
        case 1:
          state.showReturnProfitDetail = !state.showReturnProfitDetail;
          break;
        case 2:
          state.showEnvelopDetail = !state.showEnvelopDetail;
          break;
        default:
      }
    };

    const handlerShowDialog = (type) => {
      state.showDetailDialog = true;
      state.currentShowType = type;
      switch (type) {
        case 'holdBet':
          state.dialogTitle = t('components_pages_components_vip_holdLevel_betAmount');
          break;
        case 'holdUpgradeBet':
          state.dialogTitle = t('components_pages_components_vip_nextLevel_holdLevel_betAmount');
          break;
        case 'totalDeposit':
          state.dialogTitle = t('components_pages_components_vip_total_deposit');
          break;
        case 'betSum':
          state.dialogTitle = t('components_pages_components_vip_total_betAmount');
          break;
        case 'privilege':
          state.dialogTitle = t('components_pages_components_vip_privilege');
          break;
        default:
      }
    };

    const getSelfRebate = async () => {
      const res = await FinanceApi.getSelfRebate();
      if (res.code === 200) {
        state.returnProfit = res.data.total;
      }
    };

    const handlerReceive = async () => {
      const res = await FinanceApi.receiveSelfRebateProfit();
      if (res.code === 200) {
        window.$vue.$message.success(t('components_pages_components_vip_envelop_reveice_success'));
        getSelfRebate();
      }
    };

    const goRecord = (type) => {
      emit('checkRecord', type);
    };

    const formatRemedyRate = (remedyRate) => NP.times(remedyRate || 0, 100);

    // hooks
    onBeforeMount(async () => {
      await getSelfRebate();
    });

    return {
      nowVipLevelRule,
      levelStatus,
      nextVipLevelRule,
      state,
      deadLineBetSumPercentage,
      nextLevelDepositSumPercentage,
      nextLevelBetSumPercentage,
      nextLevelTotalBetSumPercentage,
      isFirstBar,
      isFirstBar2,
      deadLineTime,
      remedyAmount,
      goRecord,
      openDetail,
      handlerShowDialog,
      handlerReceive,
      formatRemedyRate,
      NP,
    };
  },

};
</script>
<style lang="postcss" scoped>
.block-bg {
  background: linear-gradient(180deg, #ecf2f8 0%, #fff 100%);
  box-shadow: 0 2px 4px #4d57721a;
}

.vip-img {
  img {
    width: 100px;
  }
}

.progress-bar {
  height: 18px;
  background: #bdbdbd;

  .progress {
    max-width: 100%;
    height: 100%;
    background: #ff6969;
  }

  .progress-text {
    padding-left: 8px;
  }

  .progress-flex {
    max-width: 33.3333%;
    height: 100%;

    &.red {
      border-radius: 8px 0 0 8px;
    }

    &.yellow {
      border-radius: 0 8px 8px 0;
    }
  }

  .first-bar {
    border-radius: 8px 0 0 8px;
  }
}

.check {
  img {
    width: 12px;
  }
}

.circle {
  border-radius: 50%;
}

.red {
  background: #f27272 !important;
}

.orange {
  background: #ef934b !important;
}

.yellow {
  background: #f6cc43 !important;
}

.amount {
  color: #1f2022;
}

.dead-line {
  img {
    width: 16px;
    margin-right: 3px;
  }
}

.desc-tex {
  p {
    margin-bottom: 3px;
  }
}

.envelop-amount {
  color: #38c522;
}
</style>
