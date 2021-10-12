<template>
  <div class="agent">
    <div
      class="agent-area"
      v-if="!tableBool"
    >
      <div class="agent-box team-info">
        <div class="agent-title">
          <img
            :src="$requireSafe('profile/team/agent/team-info.svg')"
            alt="team-info"
          >
          <div class="title-text">
            {{ $t('components_pages_profile_team_agent_teamInfo') }}
          </div>
        </div>

        <div class="agent-info">
          <div class="agent-item">
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_teamMembers') }}
            </div>
            <div class="item-number font-bold">
              {{ agentObj.members }}
            </div>
          </div>

          <div
            class="agent-item cursor-pointer"
            @click="goTable(3)"
          >
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_todayAdd') }}
            </div>
            <div
              class="item-number font-bold"
            >
              {{ agentObj.registerMembers }}
              <RightOutlined class="ml-2.5 font-bold" />
            </div>
          </div>
        </div>
      </div>

      <div class="agent-box team-record">
        <div class="agent-title">
          <img
            :src="$requireSafe('profile/team/agent/team-record.svg')"
            alt="team-record"
          >
          <div class="title-text">
            {{ $t('components_pages_profile_team_agent_teamRecord') }}
          </div>
        </div>

        <div class="agent-info">
          <div class="agent-item">
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_depositBalance') }}
            </div>
            <div class="item-number font-bold">
              {{ agentObj.depositBalance }}
            </div>
          </div>

          <div class="agent-item">
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_withdrawBalance') }}
            </div>
            <div class="item-number font-bold">
              {{ agentObj.withdrawBalance }}
            </div>
          </div>

          <div
            class="agent-item cursor-pointer"
            @click="goTable(4)"
          >
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_depositFirst') }}
            </div>
            <div
              class="item-number font-bold"
            >
              {{ agentObj.depositFirsts }}
              <RightOutlined class="ml-2.5 font-bold" />
            </div>
          </div>

          <div class="agent-item">
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_teamTotalBalance') }}
            </div>
            <div class="item-number font-bold">
              {{ agentObj.totalBalance }}
            </div>
          </div>
        </div>
      </div>

      <div class="agent-box team-bet">
        <div class="agent-title">
          <img
            :src="$requireSafe('profile/team/agent/team-bet.svg')"
            alt="team-bet"
          >
          <div class="title-text">
            {{ $t('components_pages_profile_team_agent_teamBet') }}
          </div>
        </div>

        <div class="agent-info">
          <div
            class="agent-item cursor-pointer"
            @click="goTable(2)"
          >
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_totalAmount') }}
            </div>
            <div
              class="item-number font-bold"
            >
              {{ agentObj.totalBetAmount }}
              <RightOutlined class="ml-2.5 font-bold" />
            </div>
          </div>

          <div
            class="agent-item cursor-pointer"
            @click="goTable(1)"
          >
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_profit') }}
            </div>
            <div
              class="item-number font-bold"
            >
              {{ positiveAndNegative(agentObj.totalWinAmount - agentObj.totalBetAmount) }}
              <RightOutlined class="ml-2.5 font-bold" />
            </div>
          </div>

          <div class="agent-item">
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_members') }}
            </div>
            <div class="item-number font-bold">
              {{ agentObj.betMembers }}
            </div>
          </div>

          <div class="agent-item">
            <div class="item-text">
              {{ $t('components_pages_profile_team_agent_teamProfit') }}
            </div>
            <div
              class="item-number font-bold"
              :class="[checkColor(agentObj.teamProfit)]"
            >
              {{ positiveAndNegative(agentObj.teamProfit) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <agent-table
      v-model:visible="tableBool"
      :page-type="pageType"
      :start-date="startDate"
      :end-date="endDate"
      :search-account="searchKeyword"
    />
  </div>
</template>

<script lang="ts">
import {
  ref,
} from 'vue';
import { RightOutlined } from '@ant-design/icons-vue';
import AgentTable from '@/components/_pages/profile/Team/Agent/AgentTable/index.vue';

export default {
  props: {
    agentObj: {
      type: Object,
      default: () => {},
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    searchKeyword: {
      type: String,
      default: '',
    },
  },
  components: {
    RightOutlined,
    AgentTable,
  },
  setup() {
    const pageType = ref(0);
    const tableBool = ref(false);

    const goTable = (num: number) => {
      pageType.value = num;
      tableBool.value = true;
    };

    const positiveAndNegative = (number: number) => {
      let result;

      if (number === 0) {
        result = number;
      } else if (number >= 0.01) {
        result = `+${number}`;
      } else {
        result = `-${number}`;
      }

      return result;
    };

    const checkColor = (number: number) => {
      let result = '';

      if (number === 0) {
        result = '';
      } else if (number >= 0.01) {
        result = 'green';
      } else {
        result = 'red';
      }

      return result;
    };

    return {
      goTable,
      pageType,
      tableBool,
      positiveAndNegative,
      checkColor,
    };
  },
};
</script>

<style lang="scss" scoped>
.agent-area {
  padding: 0 15px;
}

.agent-box {
  margin-top: 12px;
  margin-bottom: 20px;

  .agent-title {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;

    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }

  .agent-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 15px;
    padding-top: 12px;
    border-radius: 3px;
    font-size: 14px;
    background: #fff;
    box-shadow: 0 2px  4px #4d57721a;

    .agent-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 15px;

      .item-number {
        display: flex;
        align-items: center;
      }
    }
  }
}

.green {
  color: #38c522;
}

.red {
  color: #f00;
}
</style>
