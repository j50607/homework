<template>
  <div class="team">
    <d-header-row />

    <div class="team-area">
      <div class="range flex justify-between">
        <d-tabs
          v-model:activeKey="state.currentKey"
          :default-key="state.tabIndex"
          :tab-list="state.tabList"
          @change="changeTab"
          class="time-tab"
        />
        <div
          class="range-item range-item-filter is-btn"
          @click="toggleDatePopup(true)"
        >
          <div class="range-item-icon">
            <img :src="$requireSafe(`profile/team/date.svg`)">
          </div>
        </div>
      </div>
      <d-search
        @search="search"
        @enterEvent="search"
      />
      <component
        :is="state.tabList[state.currentKey].value"
        :agent-obj="state.agentObj"
        :search-keyword="state.searchKeyword"
        :start-date="start"
        :end-date="end"
      />
    </div>

    <date-picker-popup
      v-model:visible="state.showDateModalBool"
      :use-select="true"
      @confirm="datePickerConfirm"
    />
  </div>
</template>

<script lang="ts">
import {
  ref, reactive, computed, onMounted,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import Agent from '@/components/_pages/profile/Team/Agent/index.vue';
import Record from '@/components/_pages/profile/Team/Record/index.vue';
import Detail from '@/components/_pages/profile/Team/Detail/index.vue';
import DatePickerPopup from '@/components/_pages/DatePickerPopup/index.vue';
import systemApi from '@/assets/js/api/systemApi';

interface isInfo {
  userId: number
  startDate: string
  endDate: string
  account: string
}

interface isTabList {
  label: string
  value: string
  index: number
}

interface initObj {
  agentObj: object
  tabIndex: number
  tabList: Array<isTabList>
  currentKey: number
  searchKeyword: string
  showDateModalBool: boolean
}

export default {
  components: {
    Agent,
    Record,
    Detail,
    DatePickerPopup,
  },
  setup() {
    const start = ref(`${dayjs().startOf('days').format('YYYY/MM/DD')} 00:00:00`);
    const end = ref(`${dayjs().startOf('days').format('YYYY/MM/DD')} 23:59:59`);

    const { t } = useI18n();
    const store = useStore();

    const userId = computed(() => store.state.user.id);

    const state = reactive<initObj>({
      agentObj: {},

      tabList: [
        { label: t('views_profile_team_agent'), value: 'agent', index: 0 },
        { label: t('views_profile_team_record'), value: 'record', index: 1 },
        { label: t('views_profile_team_detail'), value: 'detail', index: 2 },
      ],
      tabIndex: 0,
      currentKey: 0,
      searchKeyword: '',
      showDateModalBool: false,
    });

    /**
     * 代理报表
     */
    const getAgentReport = async () => {
      const info: isInfo = {
        userId: userId.value,
        startDate: dayjs(start.value).format('YYYY/MM/DD'),
        endDate: dayjs(end.value).format('YYYY/MM/DD'),
        account: state.searchKeyword,
      };

      const { code, data } = await systemApi.getAgentReport(info);

      if (code === 200) {
        state.agentObj = data;
      } else {
        state.agentObj = {
          account: '',
          activityAmount: 0,
          betMembers: 0,
          betOrders: 0,
          commissionAmount: 0,
          depositBalance: 0,
          depositFirsts: 0,
          depositManual: 0,
          depositMembers: 0,
          envelopecOperatorAmount: 0,
          envelopecReceiverAmount: 0,
          members: 0,
          rebateAmount: 0,
          registerMembers: 0,
          teamProfit: 0,
          totalBalance: 0,
          totalBetAmount: 0,
          totalBetSum: 0,
          totalWinAmount: 0,
          withdrawBalance: 0,
          withdrawManual: 0,
        };
      }
    };

    /**
     * 初始化
     */
    const checkInit = async () => {
      const page: string = state.tabList[state.currentKey].value;

      switch (page) {
        case 'agent':
          await getAgentReport();
          break;
        case 'record':
          break;
        case 'detail':
          break;
        default:
          break;
      }
    };

    /**
     * 搜寻
     * @param { String } keyword - 关键字
     */
    const search = (keyword: string) => {
      state.searchKeyword = keyword;
      checkInit();
    };

    /**
     * Tab切换
     * @param { Number } index - 阵列位置
     */
    const changeTab = (index:number) => {
      state.currentKey = index;
      checkInit();
    };

    /**
     * 日期弹窗
     * @param { Boolean } bool - 弹窗布林
     */
    const toggleDatePopup = (bool: boolean) => {
      state.showDateModalBool = bool;
    };

    /**
     * 回调日期
     * @param { String } startDate - 开始日期
     * @param { String } endDate - 结束日期
     */
    const datePickerConfirm = ({
      startDate,
      endDate,
    }:{
      startDate:string,
      endDate:string
    }) => {
      start.value = startDate;
      end.value = endDate;
    };

    onMounted(async () => {
      await checkInit();
    });

    return {
      state,
      changeTab,
      search,
      start,
      end,
      toggleDatePopup,
      datePickerConfirm,
    };
  },
};
</script>

<style lang="postcss" scoped>
.team {
  position: relative;
  width: 100%;
  height: 100%;

  .team-area {
    height: 100%;
    padding-top: 48px;
    overflow-y: auto;
  }
}

.time-tab {
  flex: 1 0 308px;
  width: 308px;
  margin-right: 20px;

  ::v-deep(.d-tabs-mobile-box) {
    .d-tabs-mobile-title {
      margin-right: 8px !important;
    }
  }
}

.range {
  @apply px-3;

  &-list {
    @apply flex items-center h-8 text-sm;
  }

  &-item {
    @apply w-1/4 py-2 text-center relative;
  }

  &-item-active {
    @apply font-bold;

    &::after {
      @apply absolute bottom-0 left-1/2 w-1/3 bg-primary transform-gpu -translate-x-1/2;

      height: 3px;
      content: '';
    }
  }

  &-item-filter {
    width: 16px;
  }

  &-item-filter img {
    margin: 0 auto;
  }

  &-item-icon {
    position: relative;
    width: 16px;
    height: 16px;
  }

  &-item-affix {
    @apply absolute bg-negative rounded-full;

    top: -2px;
    right: -2px;
    width: 6px;
    height: 6px;
  }
}
</style>
