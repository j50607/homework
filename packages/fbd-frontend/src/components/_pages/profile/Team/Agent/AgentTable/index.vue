<template>
  <div
    class="agent-report"
    v-if="show"
  >
    <div class="breadcrumbs">
      <span
        class="agent cursor-pointer"
        @click="goBack()"
      >{{ $t('views_profile_team_agent') }}</span>
      <span class="symbol">-</span>
      <span class="total">{{ checkTitle(pageType) }}</span>
      <span class="symbol">></span>
      <span
        :class="{'click-sub-account' : state.accountList.length > 0}"
        @click="getTopAccountDetail()"
      >{{ searchAccount || account }}</span>
      <span
        v-for="(item, index) in state.accountList"
        :key="index"
        class="sub-accounts"
      >
        <span class="symbol">></span>
        <span
          :class="{'click-sub-account' : state.accountList[index + 1]}"
          @click="getSupiorAccountDetail(item)"
        >{{ item }}</span>
      </span>
    </div>

    <template v-if="pageType === 1 || pageType === 2">
      <div>
        <div class="table-list">
          <ul class="thead">
            <li class="account">
              {{ $t('components_pages_profile_team_agent_agentTable_account') }}
            </li>
            <li class="personal">
              {{ $t('components_pages_profile_team_agent_agentTable_personalAmount') }}
            </li>
            <li class="team">
              {{ $t('components_pages_profile_team_agent_agentTable_teamAmount') }}
            </li>
            <li class="submember">
              {{ $t('components_pages_profile_team_agent_agentTable_lowerNumber') }}
            </li>
          </ul>
        </div>
      </div>

      <d-scroll
        v-if="state.record.length !== 0"
        ref="scroll"
        :on-scroll="true"
        :scroll-y="true"
        :pull-up="state.pullUp"
        :pull-down="true"
        :more-data="state.moreData"
        :change-loading-text="state.changeLoadingText"
        @pullingUp="loadMoreComment()"
        @pullingDown="pullingDown()"
      >
        <ul
          v-for="(item,index) in state.record"
          :key="index"
          class="tbody"
        >
          <li
            class="account"
            @click.stop="copyByText(item.outAccount)"
          >
            {{ item.outAccount }}
          </li>
          <li class="personal">
            {{ pageType === 1 ? item.outSelfRealAmtSum : pageType === 2 ? item.outSelfBetSum : item.outSelfWinAmtSum }}
          </li>
          <li
            v-if="inType === 0"
            class="team"
          >
            {{ pageType === 1? item.outBetRealAmtSum :pageType === 2 ? item.outBetSum : item.outWinAmtSum }}
          </li>
          <li
            v-else-if="inType === 1"
            class="team"
          >
            {{ pageType === 1? item.outLotteryBetSum :pageType === 2 ? item.outBetRealAmtSum : item.outWinAmtSum }}
          </li>
          <li
            v-else
            class="team"
          >
            {{ pageType === 1? item.outPlatformBetSum :pageType === 2 ? item.outBetRealAmtSum : item.outWinAmtSum }}
          </li>
          <li
            class="submember"
            @click="showSubmemberDetail(item)"
          >
            {{ item.outUnderlingCount }}
            <i
              v-if="item.outUnderlingCount > 0"
              class="iconfont icon-right"
            />
          </li>
        </ul>
      </d-scroll>
      <no-search-data v-else />
    </template>
    <template v-else-if="pageType === 3">
      <div>
        <div class="table-list">
          <ul class="thead">
            <li class="account">
              {{ $t('components_pages_profile_team_agent_agentTable_account') }}
            </li>
            <li class="personal">
              {{ $t('components_pages_profile_team_agent_agentTable_superiorAccountNumber') }}
            </li>
            <li class="team">
              {{ $t('components_pages_profile_team_agent_agentTable_registrationTime') }}
            </li>
          </ul>
        </div>
      </div>

      <d-scroll
        v-if="state.record.length !== 0"
        ref="scroll"
        :on-scroll="true"
        :scroll-y="true"
        :pull-up="state.pullUp"
        :pull-down="true"
        :more-data="state.moreData"
        :change-loading-text="state.changeLoadingText"
        @pullingUp="loadMoreComment()"
        @pullingDown="pullingDown()"
      >
        <ul
          v-for="(item,index) in state.record"
          :key="index"
          class="tbody"
        >
          <li
            class="account"
            @click.stop="copyByText(item.account)"
          >
            {{ item.account }}
          </li>
          <li class="personal">
            {{ item.superiorAccount }}
          </li>
          <li class="team">
            {{ item.created }}
          </li>
        </ul>
      </d-scroll>
      <no-search-data v-else />
    </template>

    <template v-else-if="pageType === 4">
      <div>
        <div class="table-list">
          <ul class="thead">
            <li class="account">
              {{ $t('components_pages_profile_team_agent_agentTable_account') }}
            </li>
            <li class="personal">
              {{ $t('components_pages_profile_team_agent_agentTable_theFirstChargeAmount') }}
            </li>
            <li class="team">
              {{ $t('components_pages_profile_team_agent_agentTable_rechargeTime') }}
            </li>
          </ul>
        </div>
      </div>

      <d-scroll
        v-if="state.record.length !== 0"
        ref="scroll"
        :on-scroll="true"
        :scroll-y="true"
        :pull-up="state.pullUp"
        :pull-down="true"
        :more-data="state.moreData"
        :change-loading-text="state.changeLoadingText"
        @pullingUp="loadMoreComment()"
        @pullingDown="pullingDown()"
      >
        <ul
          v-for="(item,index) in state.record"
          :key="index"
          class="tbody"
        >
          <li
            class="account"
            @click.stop="copyByText(item.account)"
          >
            {{ item.account }}
          </li>
          <li class="personal">
            {{ item.amount }}
          </li>
          <li class="team">
            {{ item.time }}
          </li>
        </ul>
      </d-scroll>
      <no-search-data v-else />
    </template>
  </div>
</template>

<script>
import {
  ref, computed, onMounted, reactive,
} from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { copyByText } from '@/assets/js/utils/utils';
import memberApi from '@/assets/js/api/memberApi';
import systemApi from '@/assets/js/api/systemApi';
import financeApi from '@/assets/js/api/financeApi';
import NoSearchData from '@/components/_pages/profile/Team/Agent/NoSearchData';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    pageType: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    searchAccount: {
      type: String,
      default: '',
    },
    // 類型：0 === 全部, 1 === 彩票, 2 === 遊戲平台
    inType: {
      type: Number,
      default: 0,
    },
  },
  components: {
    NoSearchData,
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const scroll = ref(undefined);

    const state = reactive({
      title: '',
      sort: '',
      callApiAccount: '',
      record: [],
      accountList: [],
      betInfo: {},
      pageIndex: 1,
      pageSize: 10,
      moreData: true,
      pullUp: true,
      changeLoadingText: false,
      lastPage: false,
    });

    const show = computed({
      get: () => props.visible,
      set: (val) => emit('update:visible', val),
    });
    const { t } = useI18n();
    const store = useStore();
    const userId = computed(() => store.state.user.id);
    const account = computed(() => store.state.user.account);

    const goBack = () => {
      show.value = false;
    };

    /**
     * 判断是否为最后一页，关闭上拉加载
     */
    const lastPageCondition = () => {
      state.pullUp = true;
      state.$nextTick(() => {
        if (state.lastPage) {
          scroll.value.closePullUp();
          state.changeLoadingText = false;
        } else {
          scroll.value.finishPullUp();
          state.changeLoadingText = true;
        }
        scroll.value.refresh();
      });
    };

    const getUserInfoSubPage = async (searchAccount) => {
      const register = {
        condition: searchAccount ? 'account' : undefined,
        value: searchAccount || undefined,
        start: props.startDate,
        end: props.endDate,
        pageIndex: state.pageIndex,
      };
      const res = await memberApi.getUserInfoSubPage(register);
      if (res.code === 200) {
        const newData = res.data.content.map((e) => ({
          account: e.account,
          created: dayjs(e.created_at * 1000).format('MM-DD HH:mm:ss'),
          superiorAccount: e.superiorAccount,
        }));
        if (newData.length === 0) {
          state.pullUp = false;
        }
        if (res.data.first) {
          state.record = newData;
        } else {
          state.record = [...state.record, ...newData];
          state.changeLoadingText = true;
        }
        state.lastPage = res.data.last;
        if (state.record.length) {
          lastPageCondition();
        } else {
          state.pullUp = false;
        }
      }
    };

    const getBetPage = async (searchAccount) => {
      state.betInfo = {
        userId: props.searchAccount ? undefined : userId.value,
        account: props.searchAccount || searchAccount,
        start: props.startDate,
        end: props.endDate,
        pageIndex: state.pageIndex,
      };
      const res = await systemApi.getBetMCount(state.betInfo);
      if (res.code === 200) {
        const newData = res.data.content.map((e) => ({
          account: e.account,
          betOrderNum: e.betOrderNum,
          realAmtSum: e.realAmtSum,
        }));
        if (newData.length === 0) {
          state.pullUp = false;
        }
        if (res.data.first) {
          state.record = newData;
        } else {
          state.record = [...state.record, ...newData];
          state.changeLoadingText = true;
        }
        state.lastPage = res.data.last;
        if (state.record.length) {
          lastPageCondition();
        } else {
          state.pullUp = false;
        }
      }
    };

    const getUserTotalAmount = async () => {
      const param = {
        account: state.callApiAccount,
        start: props.startDate,
        end: props.endDate,
        sort: state.sort,
        type: props.inType ? props.inType : 0,
        pageIndex: state.pageIndex,
      };
      const res = await systemApi.getTotalAmount(param);
      if (res.code === 200) {
        if (res.data.first) {
          state.record = res.data.content;
        } else {
          state.record = [...state.record, ...res.data.content];
        }
        state.lastPage = res.data.last;
        if (state.record.length) {
          lastPageCondition();
        } else {
          state.pullUp = false;
          // vm.$nextTick(() => {
          //   vm.$refs.scroll.closePullUp();
          // });
        }
      } else {
        state.record = [];
      }
    };

    const getQueryLog = async (searchAccount) => {
      const condition = ['firstDeposit'];
      const value = ['true'];
      if (searchAccount) {
        condition.push('account');
        value.push(searchAccount);
      }
      const QueryLog = {
        condition,
        account: searchAccount,
        value,
        start: props.startDate,
        end: props.endDate,
        filterDemo: true,
        filterTest: true,
        pageIndex: state.pageIndex,
        showSub: true,
        type: [0, 2, 4, 37, 38, 41, 45],
      };
      const res = await financeApi.getQueryLog(QueryLog);
      if (res.code === 200) {
        const newData = res.data.page.content.map((e) => ({
          account: e.users.account,
          time: dayjs(e.processAt).format('MM-DD HH:mm:ss'),
          amount: e.amount,
        }));
        if (newData.length === 0) {
          state.pullUp = false;
        }
        if (res.data.page.first) {
          state.record = newData;
        } else {
          state.record = [...state.record, ...newData];
          state.changeLoadingText = true;
        }
        state.lastPage = res.data.page.last;
        if (state.record.length) {
          lastPageCondition();
        } else {
          state.pullUp = false;
        }
      }
    };

    const getTopAccountDetail = async () => {
      if (state.accountList.length) { // 有點選下級帳號才去拿資料
        state.accountList = [];
        state.showFullLoading = true;
        state.callApiAccount = props.searchAccount || account.value;
        await getUserTotalAmount();
        setTimeout(() => {
          state.showFullLoading = false;
        }, 500);
      }
    };

    const getSupiorAccountDetail = async (searchAccount) => {
      const index = state.accountList.findIndex((item) => item === searchAccount);
      const accountListLen = state.accountList.length;
      if (index !== accountListLen - 1) { // 不是accountList中最下層的帳號，才去拿資料
        state.accountList.splice(index + 1);
        state.showFullLoading = true;
        state.callApiAccount = account;
        await state.getUserTotalAmount();
        setTimeout(() => {
          state.showFullLoading = false;
        }, 500);
      }
    };

    const showSubmemberDetail = async (item) => {
      state.pageIndex = 1;
      if (item.outUnderlingCount > 0) {
        state.callApiAccount = item.outAccount;
        state.accountList.push(item.outAccount);
        state.showFullLoading = true;
        await getUserTotalAmount();
        setTimeout(() => {
          state.showFullLoading = false;
        }, 500);
      }
    };

    const getAgentReportPages = async () => {
      state.showFullLoading = true;
      if (props.pageType > 0 && props.pageType < 4) {
        await getUserTotalAmount();
        setTimeout(() => {
          state.showFullLoading = false;
        }, 500);
      } else if (props.pageType === 5) {
        await getUserInfoSubPage(props.searchAccount);
        setTimeout(() => {
          state.showFullLoading = false;
        }, 500);
      } else if (props.pageType === 6) {
        await getBetPage(props.searchAccount);
        setTimeout(() => {
          state.showFullLoading = false;
        }, 500);
      } else if (props.pageType === 7) {
        await getQueryLog(props.searchAccount);
        setTimeout(() => {
          state.showFullLoading = false;
        }, 500);
      }
    };

    const loadMoreComment = async () => {
      if (state.lastPage) {
        scroll.value.closePullUp();
        return;
      }
      state.moreData = true;
      state.pageIndex += 1;
      await state.getAgentReportPages();
      state.moreData = false;
    };

    const pullingDown = async () => {
      state.pageIndex = 1;
      state.callApiAccount = props.searchAccount || state.accountList[state.accountList.length - 1] || state.account;
      await state.getAgentReportPages();
      scroll.value.finishPullDown();
      scroll.value.refresh();
    };

    const refresh = () => {
      getAgentReportPages();
    };

    const checkTitle = (pageType) => {
      let result = '';

      if (pageType === 1) {
        state.title = t('components_pages_profile_team_agent_profit');
        state.sort = 'betSum';
      } else if (pageType === 2) {
        state.title = t('components_pages_profile_team_agent_teamProfit');
        state.sort = 'betRealAmtSum';
      } else if (pageType === 3) {
        state.title = t('components_pages_profile_team_agent_agentTable_addMembersToday');
        state.sort = 'created';
      } else if (pageType === 4) {
        state.title = t('components_pages_profile_team_agent_depositFirst');
        state.sort = 'time';
      }

      result = state.title;

      return result;
    };

    onMounted(async () => {
      state.callApiAccount = account.value;
      await getAgentReportPages();
    });

    return {
      state,
      show,
      goBack,
      getTopAccountDetail,
      getSupiorAccountDetail,
      lastPageCondition,
      showSubmemberDetail,
      copyByText,
      loadMoreComment,
      pullingDown,
      refresh,
      account,
      checkTitle,
    };
  },
};
</script>

<style lang="scss" scoped>
.agent-report {
  display: flex;
  flex-direction: column;
  height: 100%;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .breadcrumbs {
    margin-bottom: 9px;
    padding: 0 15px;
    font-size: 12px;

    .agent {
      color: #0e88f5;
    }

    .symbol {
      margin: 0 5px;
    }

    .click-sub-account {
      color: #0e88f5;
    }
  }

  .table-list {
    font-size: 12px;

    .thead {
      padding: 0 26px 0 15px;
      line-height: 30px;
      background-color: #ecf2f8;

      .account {
        flex-basis: 28%;
      }

      .personal {
        flex-basis: 28%;
      }

      .team {
        flex-basis: 28%;
      }

      .submember {
        flex: 1 1 16%;
      }
    }
  }

  .tbody {
    position: relative;
    padding: 0 26px 0 15px;

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #f0f0f0;
      content: '';
    }

    li {
      line-height: 46px;
      text-align: left;
    }

    .account {
      flex-basis: 28%;
    }

    .personal {
      flex-basis: 28%;
    }

    .team {
      flex-basis: 28%;
    }

    .submember {
      flex: 1 1 16%;

      .iconfont {
        position: absolute;
        right: 10px;
        font-size: 20px;
      }
    }
  }
}
</style>
