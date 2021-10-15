<template>
  <div class="team">
    <d-header-row
      :title="$t('views_profile_team')"
    />

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
          v-if="state.currentKey !== 0"
          class="range-item range-item-filter is-btn"
          @click="toggleFilterPopup(true)"
        >
          <div class="range-item-icon">
            <img :src="$requireSafe(`profile/team/filter.svg`)">
          </div>
        </div>
        <div
          class="range-item range-item-filter is-btn ml-3"
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
        :record-list="state.recordList"
        :search-keyword="state.searchKeyword"
        :start-date="start"
        :end-date="end"
        :is-search="state.isSearch"
      />
    </div>

    <d-popup
      v-model:value="state.showFilterModalBool"
      position="bottom"
      :round="true"
      :title="$t('components_pages_profile_team_filterPopup_title')"
      class="popup"
    >
      <div class="popup-label">
        {{ $t('components_pages_profile_team_filterPopup_type') }}
      </div>
      <div class="popup-list">
        <a-radio-group v-model:value="state.statusList[state.pageValue]">
          <a-radio
            v-for="(item, idx) in filterList(state.currentKey)"
            :key="`statusList[${idx}]`"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </div>

      <div class="popup-piece">
        <d-button
          type="primary"
          :block="true"
          @click="changeStatus"
        >
          {{ $t('components_pages_profile_team_confirm') }}
        </d-button>
      </div>
    </d-popup>

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
import FinanceApi from '@/assets/js/api/financeApi';

interface isInfo {
  userId: number
  startDate: string
  endDate: string
  account: string
}

interface recordInfo{
  type: Array<any>
  start: string
  end: string
  showSub: boolean
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
  recordList: Array<any>
  recordType: Array<any>
  filterList: object
  currentKey: number
  searchKeyword: string
  showDateModalBool: boolean
  showFilterModalBool: boolean
  statusList:object
  isSearch:boolean
  pageValue: string
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

      filterList: {
        record: [
          { label: t('components_pages_profile_team_all'), value: 'all' },
          { label: t('components_pages_profile_team_deposit'), value: 'deposit' },
          { label: t('components_pages_profile_team_withdraw'), value: 'withdraw' },
        ],
        details: [
          { label: t('components_pages_profile_team_all'), value: 'all' },
          { label: t('components_pages_profile_team_filterPopup_status1'), value: 1 },
          { label: t('components_pages_profile_team_filterPopup_status2'), value: 2 },
          { label: t('components_pages_profile_team_filterPopup_status3'), value: 5 },
        ],
      },
      recordList: [],
      recordType: [],
      pageValue: '',
      statusList: {
        record: 'all',
        detail: 'all',
      },
      tabIndex: 0,
      currentKey: 0,
      searchKeyword: '',
      showDateModalBool: false,
      showFilterModalBool: false,
      isSearch: false,
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
     * 充提記錄
     */
    const getTellerLog = async () => {
      const params: recordInfo = {
        type: state.recordType,
        start: dayjs(start.value).format('YYYY/MM/DD HH:mm:ss'),
        end: dayjs(end.value).format('YYYY/MM/DD HH:mm:ss'),
        showSub: true,
      };
      const { code, data } = await FinanceApi.getTellerLog(params);
      if (code === 200) {
        state.recordList = data.page.content.sort((a:Number, b:Number) => b.logAt - a.logAt);
        if (state.searchKeyword) {
          state.recordList = state.recordList.filter((e) => e.users.account === state.searchKeyword);
        }
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
          if (state.isSearch) {
            await getTellerLog();
            state.isSearch = false;
          }
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
      state.isSearch = true;
      checkInit();
    };

    /**
     * Tab切换
     * @param { Number } index - 阵列位置
     */
    const changeTab = (index:number) => {
      state.currentKey = index;
      state.pageValue = state.tabList[index].value;
      checkInit();
    };

    /**
     * 篩選彈窗
     * @param { Boolean } bool - 弹窗布林
     */
    const toggleFilterPopup = (bool: boolean) => {
      state.showFilterModalBool = bool;
    };

    const filterList = (key: Number) => {
      switch (key) {
        case 1:
          return state.filterList.record;
        case 2:
          return state.filterList.details;
        default:
          return [];
      }
    };

    const changeStatus = async () => {
      if (state.currentKey === 1) {
        switch (state.statusList.record) {
          case 'all':
            state.recordType = [];
            break;
          case 'deposit':
            state.recordType = [0, 2, 4, 37, 38, 45];
            break;
          case 'withdraw':
            state.recordType = [1];
            break;
          default:
            break;
        }
        toggleFilterPopup(false);
        await getTellerLog();
      }
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
      if (state.currentKey === 1) {
        getTellerLog();
      }
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
      toggleFilterPopup,
      datePickerConfirm,
      filterList,
      changeStatus,
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

.popup {
  &-label {
    @apply mb-2 text-xs font-bold;
  }

  &-list {
    @apply flex flex-wrap gap-x-1 gap-y-2 mb-4 text-xs;
  }

  &-item {
    @apply px-2 py-1 border border-solid border-border rounded-20 text-xs;

    &:hover,
    &-active {
      @apply text-white;

      background: var(--btn-primary-bg);
    }
  }

  &-piece {
    @apply mb-4;
  }

  &-piece .d-btn {
    @apply text-xs;
  }

  &-panel {
    height: 0;
  }

  &-panel-active {
    height: auto;
    transition: height 0.5s ease;
  }
}

::v-deep(.ant-radio-wrapper) {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-top: 1px solid #f2f2f2;
  font-size: 12px;

  &:last-of-type {
    border-bottom: 1px solid #f2f2f2;
  }
}

::v-deep(.ant-radio-group) {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
}

::v-deep(.ant-radio-inner) {
  &::after {
    background-color: #fff;
  }
}

::v-deep(.ant-radio-checked) .ant-radio-inner {
  border-color: var(--link-color);
  background-color: var(--link-color);
}
</style>
