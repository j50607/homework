<template>
  <div class="current-level-container mx-3 pb-6">
    <!-- 當前 vip 等級 -->
    <div class="current-level mb-3 mt-4 rounded-5">
      <div class="vip-level flex items-center py-2 px-3 bg-primary-content">
        <img
          :src="$requireSafe('profile/vip/crown-gold.svg')"
          alt=""
          class="mr-1 w-4"
        >
        <p class="text-active font-bold text-base">
          {{ `VIP${nowVipLevelRule.level}` }}
        </p>
      </div>
      <div class="vip-top-info flex justify-between py-2 px-3 bg-secondary">
        <div class="vip-img mr-3">
          <img
            :src="$requireSafe(`profile/vip/${nowVipLevelRule.level}-gold.png`)"
            alt=""
          >
        </div>
        <div class="vip-text flex-1">
          <div
            class="bet-amount flex mb-2 text-xs items-center"
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
              class="progress rounded-8 mb-1"
              :style="`width: ${deadLineBetSumPercentage}%`"
            />
            <div class="progress-text text-white text-xs">
              {{ levelStatus.deadlineBetSum || 0 }} / {{ nowVipLevelRule.upgradeProtectLevelStandard }}
            </div>
          </div>
        </div>
      </div>
      <div class="vip-bottom-info flex flex-wrap py-2 px-3 bg-secondary">
        <div class="bet w-1/2 mb-2 text-xs">
          <p class="mb-1">
            {{ $t('components_pages_components_vip_bet_maxLimit_perRound') }}
          </p>
          <p class="text-active font-bold">
            {{ nowVipLevelRule.singleGameBetLimit }}
          </p>
        </div>
        <div class="bet w-1/2 mb-2 text-xs">
          <p class="mb-1">
            {{ $t('components_pages_components_vip_bet_maxLimit_perDay') }}
          </p>
          <p class="text-active font-bold">
            {{ nowVipLevelRule.singleDayBetLimit }}
          </p>
        </div>
        <div class="bet w-1/2 text-xs">
          <p class="mb-1">
            {{ $t('components_pages_components_vip_bet_return_profit') }}
          </p>
          <p
            class="text-active font-bold"
            :class="{'profit-disable': !profitEnable.rebateEnable}"
          >
            {{ profitEnable.rebateEnable ? `${nowVipLevelRule.rebateRate || 0 }%` : $t('components_pages_components_vip_remedyEnable_false') }}
          </p>
        </div>
        <div class="bet w-1/2 text-xs">
          <p class="mb-1">
            {{ $t('components_pages_components_vip_bet_evenlop') }}
          </p>
          <p
            class="text-active font-bold"
            :class="{'profit-disable': !profitEnable.remedyEnable}"
          >
            {{ profitEnable.remedyEnable ? `${formatRemedyRate(nowVipLevelRule.remedyRate)}%` : $t('components_pages_components_vip_remedyEnable_false') }}
          </p>
        </div>
      </div>
    </div>

    <!-- 距離NEXT vip -->
    <div
      class="next-level mb-3 mt-4 rounded-5"
      v-if="nowVipLevelRule.level !== 15"
    >
      <div class="vip-text flex items-center px-3 py-2 bg-primary-content">
        <img
          :src="$requireSafe('profile/vip/crown-gold.svg')"
          alt=""
          class="mr-1 w-4"
        >
        <p class="text-active font-bold text-base">
          {{ $t('components_pages_components_vip_distance') }} {{ `VIP${nowVipLevelRule.level + 1}` }}
        </p>
        <p
          class="check text-primary text-xs flex items-center ml-auto cursor-pointer"
          @click="handlerShowDialog('privilege')"
        >
          {{ $t('components_pages_components_vip_check') }}
          <img
            :src="$requireSafe('icon/rightarrow.svg')"
            alt=""
            class="ml-1"
          >
        </p>
      </div>

      <div class="next-level-info bg-secondary flex px-3 py-2">
        <div class="progress-bar-container mr-4 relative w-1/3">
          <svg
            :style="{width: '120px', height: '120px'}"
            class="absolute"
          >
            <circle
              :r="50"
              :cx="60"
              :cy="60"
              fill="transparent"
              class="bg"
            />
            <circle
              :r="50"
              :cx="60"
              :cy="60"
              fill="transparent"
              class="inner red"
              :stroke-dasharray="state.dashArray[0]"
              :transform="'rotate(-90) translate(-120)'"
              :stroke-dashoffset="state.progressCircleHold"
            />
          </svg>

          <svg
            :style="{width: '80px', height: '80px'}"
            class="absolute"
          >
            <circle
              :r="35"
              :cx="40"
              :cy="40"
              fill="transparent"
              class="bg"
            />
            <circle
              :r="35"
              :cx="40"
              :cy="40"
              fill="transparent"
              class="inner orange"
              :stroke-dasharray="state.dashArray[1]"
              :transform="'rotate(-90) translate(-80)'"
              :stroke-dashoffset="state.progressCircleDeposit"
            />
          </svg>

          <svg
            :style="{width: '40px', height: '40px'}"
            class="absolute"
          >
            <circle
              :r="15"
              :cx="20"
              :cy="20"
              fill="transparent"
              class="bg"
            />
            <circle
              :r="15"
              :cx="20"
              :cy="20"
              fill="transparent"
              class="inner blue"
              :stroke-dasharray="state.dashArray[2]"
              :transform="'rotate(-90) translate(-40)'"
              :stroke-dashoffset="state.progressCircleBet"
            />
          </svg>
        </div>
        <div class="progress-texts text-xs w-2/5">
          <!-- 晉級保級下單量 -->
          <div class="flex mb-1 items-center">
            <div class="circle red mr-1" />
            <div class="text mr-1">
              <p>{{ $t('components_pages_components_vip_nextLevel_holdLevel_betAmount') }}</p>
            </div>
            <img
              :src="$requireSafe('profile/vip/question.svg')"
              alt=""
              class="w-3 cursor-pointer"
              @click="handlerShowDialog('holdBet')"
            >
          </div>
          <p class="pl-3 mb-1">
            {{ levelStatus.deadlineBetSum || 0 }} / {{ nextVipLevelRule.upgradeProtectLevelStandard }}
          </p>
          <!-- 總充值量 -->
          <div class="flex items-center mb-1">
            <div class="circle orange mr-1" />
            <div class="text mr-1">
              <p>{{ $t('components_pages_components_vip_total_deposit') }}</p>
            </div>
            <img
              :src="$requireSafe('profile/vip/question.svg')"
              alt=""
              class="w-3 cursor-pointer"
              @click="handlerShowDialog('holdBet')"
            >
          </div>
          <p class="pl-3 mb-1">
            {{ levelStatus.depositTotal || 0 }} / {{ nextVipLevelRule.upgradeDepositStandard }}
          </p>
          <!-- 總下單量 -->
          <div class="flex items-center mb-1">
            <div class="circle blue mr-1" />
            <div class="text mr-1">
              <p>{{ $t('components_pages_components_vip_total_betAmount') }}</p>
            </div>
            <img
              :src="$requireSafe('profile/vip/question.svg')"
              alt=""
              class="w-3 cursor-pointer"
              @click="handlerShowDialog('holdBet')"
            >
          </div>
          <p class="pl-3 mb-1">
            {{ levelStatus.betSum || 0 }} / {{ nextVipLevelRule.upgradeBetStandard }}
          </p>
        </div>

        <div class="dead-line-time flex items-start ml-auto flex-nowrap">
          <img
            :src="$requireSafe('profile/vip/clock-white.svg')"
            alt=""
            class="w-3"
          >
          <p class="text-xs">
            {{ deadLineTime }}
            {{ $t('components_pages_components_vip_nextLevel_holdLevel_deadLine') }}
          </p>
        </div>
      </div>
    </div>
    <!-- 下單返利 -->
    <div class="return-profit mb-3 mt-4 rounded-5">
      <div class="vip-text flex items-center px-3 py-2 bg-primary-content">
        <p class="text-active font-bold text-base">
          {{ $t('components_pages_components_vip_bet_return_profit') }}
        </p>
        <p
          class="check text-primary text-xs flex items-center ml-auto cursor-pointer"
          @click="goRecord('rebateRate')"
        >
          {{ $t('components_pages_components_vip_checkRecord') }}
          <img
            :src="$requireSafe('icon/rightarrow.svg')"
            alt=""
            class="ml-1"
          >
        </p>
      </div>
      <div class="take-profit mb-2 bg-secondary px-3 py-2">
        <div class="profit-text flex items-center mb-3">
          <p class="text-xs">
            {{ $t('components_pages_components_vip_perpare_takeProfit') }}
          </p>
          <p
            class="amount text-l  ml-auto text-white"
            :class="{'status-take': returnProfit > 0}"
          >
            {{ returnProfit }}{{ $t('views_profile_vip_level_dollars') }}
          </p>
        </div>
        <div class="profit-bottom-text flex">
          <div class="desc-tex w-2/3 text-normal text-xs mb-2">
            <p>
              1. {{ $t('components_pages_components_vip_returnProfit_description1') }}
            </p>
            <p>
              2. {{ $t('components_pages_components_vip_returnProfit_description2') }}
            </p>
          </div>
          <d-button
            type="primary"
            @click="handlerReceive()"
            class="ml-auto"
            :disabled="returnProfit < 10"
            v-if="returnProfit > 0"
          >
            {{ $t('components_pages_components_vip_takeProfit') }}
          </d-button>
          <d-button
            class="ml-auto take-allready"
            v-else
          >
            {{ $t('components_pages_components_vip_envelop_reveiced') }}
          </d-button>
        </div>
      </div>
    </div>
    <!-- 負利紅包 -->
    <div class="envelop mt-4 rounded-5">
      <div class="vip-text flex items-center px-3 py-2 bg-primary-content">
        <p class="text-active font-bold text-base">
          {{ $t('components_pages_components_vip_bet_evenlop') }}
        </p>
        <p
          class="check text-primary text-xs flex items-center ml-auto cursor-pointer"
          @click="goRecord('remedyRate')"
        >
          {{ $t('components_pages_components_vip_checkRecord') }}
          <img
            :src="$requireSafe('icon/rightarrow.svg')"
            alt=""
            class="ml-1"
          >
        </p>
      </div>
      <div class="already-take text-xs mb-2 px-3 py-2 bg-secondary">
        <div class="remedy-amount flex items-center mb-3">
          <p>{{ $t('components_pages_components_vip_envelop_alradyTake') }}</p>
          <p class="envelop-amount text-lg ml-auto">
            {{ remedyAmount? remedyAmount.toFixed(2) : '0.00' }}{{ $t('views_profile_vip_level_dollars') }}
          </p>
        </div>

        <div class="desc-tex text-normal text-xs mb-2">
          <p>
            1. {{ $t('components_pages_components_vip_envelop_description2') }}
          </p>
          <p>
            2. {{ $t('components_pages_components_vip_envelop_description3') }}
          </p>
          <p>
            3. {{ $t('components_pages_components_vip_envelop_description1') }}
          </p>
        </div>
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
            class="total-deposit font-normal"
          >
            <p
              class="mb-1 leading-loose"
              v-html="$t('components_pages_components_vip_detailDailog_description5', {depositSum: NP.minus(nextVipLevelRule.upgradeDepositStandard, levelStatus.depositTotal) >= 0 ? NP.minus(nextVipLevelRule.upgradeDepositStandard, levelStatus.depositTotal): 0, level:nowVipLevelRule.level + 1}) "
            />
          </div>
          <div
            v-else-if="state.currentShowType === 'betSum'"
            class="bet-sum font-normal"
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
              <span class="text-active">VIP{{ nowVipLevelRule.level }}</span>
              <span class="px-2">=></span>
              <span class="text-active">VIP{{ nowVipLevelRule.level + 1 }}</span>
            </p>
            <div class="mb-2">
              <p v-if="nowVipLevelRule.singleGameBetLimit === nextVipLevelRule.singleGameBetLimit">
                {{ $t('components_pages_components_vip_perRoundLimitHold') }}
                <span class="text-active">{{ nowVipLevelRule.singleGameBetLimit }}</span>
              </p>
              <p v-else>
                {{ $t('components_pages_components_vip_bet_maxLimit_perRound') }}
                <span class="text-active">{{ nowVipLevelRule.singleGameBetLimit }}</span>
                <span class="px-2">=></span>
                <span class="text-active">{{ nextVipLevelRule.singleGameBetLimit }}</span>
              </p>
            </div>
            <div class="mb-2">
              <p v-if="nowVipLevelRule.singleDayBetLimit === nextVipLevelRule.singleDayBetLimit">
                {{ $t('components_pages_components_vip_perDayLimitHold') }}
                <span class="text-active">{{ nextVipLevelRule.rebsingleDayBetLimitateRate }}</span>
              </p>
              <p v-else>
                {{ $t('components_pages_components_vip_bet_maxLimit_perDay') }}
                <span class="text-active">{{ nowVipLevelRule.singleDayBetLimit }}</span>
                <span class="px-2">=></span>
                <span class="text-active">{{ nextVipLevelRule.singleDayBetLimit }}</span>
              </p>
            </div>
            <div class="mb-2">
              <p v-if="nowVipLevelRule.rebateRate === nextVipLevelRule.rebateRate">
                {{ $t('components_pages_components_vip_rebateRateHold') }}
                <span class="text-active">{{ nextVipLevelRule.rebateRate }}%</span>
              </p>
              <p v-else>
                {{ $t('components_pages_components_vip_bet_return_profit') }}
                <span class="text-active">{{ nowVipLevelRule.rebateRate }}%</span>
                <span class="px-2">=></span>
                <span class="text-active">{{ nextVipLevelRule.rebateRate }}%</span>
              </p>
            </div>
            <div class="mb-2">
              <p v-if="nowVipLevelRule.remedyRate === nextVipLevelRule.remedyRate">
                {{ $t('components_pages_components_vip_envelopHold') }}
                <span class="text-active">{{ formatRemedyRate(nextVipLevelRule.remedyRate) }}%</span>
              </p>
              <p v-else>
                {{ $t('components_pages_components_vip_bet_evenlop') }}
                <span class="text-active">{{ formatRemedyRate(nowVipLevelRule.remedyRate) }}%</span>
                <span class="px-2">=></span>
                <span class="text-active">{{ formatRemedyRate(nextVipLevelRule.remedyRate) }}%</span>
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
import {
  computed, reactive, onBeforeMount,
} from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import NP from 'number-precision';
import FinanceApi from '@/assets/js/api/financeApi';

export default {
  props: {
    profitEnable: {
      type: Object,
      default: () => {},
    },
    returnProfit: {
      type: [Number, String],
      default: 0.00,
    },
  },
  emits: ['checkRecord', 'getRebateTotal'],
  setup(props, { emit }) {
    // use
    const store = useStore();
    const { t } = useI18n();

    // reactive
    const state = reactive({
      percentage: 5,
      showDetailDialog: false,
      currentShowType: '',
      dialogTitle: '',

      // 圓周長 = 直徑*3.14
      // 若值 = 0， 則代表進度100%
      progressCircleHold: 50 * 3.14 * 2,
      progressCircleDeposit: 35 * 3.14 * 2,
      progressCircleBet: 15 * 3.14 * 2,

      // 進度原始長度 = 圓周長，代表進度是0%
      dashArray: [50 * 3.14 * 2, 35 * 3.14 * 2, 15 * 3.14 * 2],
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
    // 晉級保級下單量
    const nextLevelBetSumPercentage = computed(() => {
      const realNextLevelBetSumPercentage = NP.times(NP.divide(levelStatus.value.deadlineBetSum || 0, nextVipLevelRule.value.upgradeProtectLevelStandard || 0), 100);
      if (realNextLevelBetSumPercentage && realNextLevelBetSumPercentage < 3) {
        return 3;
      } if (realNextLevelBetSumPercentage > 100) {
        return 100;
      }
      return realNextLevelBetSumPercentage;
    });
    // 總充值量
    const nextLevelDepositSumPercentage = computed(() => {
      const realNextLevelBetSumPercentage = NP.times(NP.divide(levelStatus.value.depositTotal || 0, nextVipLevelRule.value.upgradeDepositStandard || 0), 100);
      if (realNextLevelBetSumPercentage && realNextLevelBetSumPercentage < 3) {
        return 3;
      } if (realNextLevelBetSumPercentage > 100) {
        return 100;
      }
      return realNextLevelBetSumPercentage;
    });
    // 總下單量
    const nextLevelTotalBetSumPercentage = computed(() => {
      const realNextLevelBetSumPercentage = NP.times(NP.divide(levelStatus.value.betSum || 0, nextVipLevelRule.value.upgradeBetStandard || 0), 100);
      if (realNextLevelBetSumPercentage && realNextLevelBetSumPercentage < 3) {
        return 3;
      } if (realNextLevelBetSumPercentage > 100) {
        return 100;
      }
      return realNextLevelBetSumPercentage;
    });

    const deadLineTime = computed(() => dayjs(dayjs(levelStatus.value.deadlineAt).diff(dayjs(), 'ms')).format('DD'));

    // methods
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

    const initCircleProgress = () => {
      setTimeout(() => {
        state.progressCircleHold = nextLevelBetSumPercentage.value ? NP.divide(NP.times(state.progressCircleHold, NP.minus(100, nextLevelBetSumPercentage.value)), 100) : state.dashArray[0];

        state.progressCircleDeposit = nextLevelDepositSumPercentage.value ? NP.divide(NP.times(state.progressCircleDeposit, NP.minus(100, nextLevelDepositSumPercentage.value)), 100) : state.dashArray[1];

        state.progressCircleBet = nextLevelTotalBetSumPercentage.value ? NP.divide(NP.times(state.progressCircleBet, NP.minus(100, nextLevelTotalBetSumPercentage.value)), 100) : state.dashArray[2];
      }, 300);
    };

    const handlerReceive = async () => {
      const res = await FinanceApi.receiveSelfRebateProfit();
      if (res.code === 200) {
        window.$vue.$message.success(t('components_pages_components_vip_envelop_reveice_success'));
        emit('getRebateTotal');
      }
    };

    const goRecord = (type) => {
      emit('checkRecord', type);
    };

    const formatRemedyRate = (remedyRate) => NP.times(remedyRate || 0, 100);

    // hooks
    onBeforeMount(async () => {
      initCircleProgress();
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
      deadLineTime,
      remedyAmount,
      goRecord,
      handlerShowDialog,
      handlerReceive,
      formatRemedyRate,
      NP,
    };
  },

};
</script>
<style lang="postcss" scoped>

.vip-img {
  img {
    width: 90px;
  }
}

.progress-text {
  flex: 1 0 40%;
}

.progress-bar {
  height: 5px;
  background: #bdbdbd;

  .progress {
    max-width: 100%;
    height: 100%;
    background: #e64d69;
  }

  .progress-flex {
    max-width: 33.3333%;
    height: 100%;

    &.red {
      border-radius: 8px 0 0 8px;
    }

    &.blue {
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

.dead-line-time {
  img {
    margin-right: 3px;
  }
}

.circle {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.red {
  background: #e64d69 !important;

  /* 圓型進度條背景屬性 */
  stroke: #e64d69;
}

.orange {
  background: #f7b350 !important;

  /* 圓型進度條背景屬性 */
  stroke: #f7b350;
}

.blue {
  background: #0caaae !important;

  /* 圓型進度條背景屬性 */
  stroke: #0caaae;
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

.take-allready {
  color: #374e7b;
  background: #10192e;
  cursor: auto;
}

.profit-disable {
  color: #bdbdbd;
  font-weight: normal;
}

/* 圓形進度條 */
.bg {
  stroke: #000;
  stroke-width: 1px;
}

.inner {
  transition: all 0.3s ease-in-out;
  stroke-width: 5px;
}

.progress-bar-container {
  svg {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}

.status-take, .envelop-amount {
  color: #4aee91;
}

/* 彈窗裡的重要文字顏色，class Name寫在語言檔裡 */
.hold-bet, .hold-upgrade-bet, .total-deposit, .bet-sum {
  ::v-deep(.text-color) {
    color: #f3ac0a;
  }
}

</style>
