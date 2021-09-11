<template>
  <div class="market pt-h-h pb-f-h relative h-full">
    <d-header-row
      :right-components="'Service'"
      :title="state.switchLeague ?$t('views_market_switchLeague') : $t('views_market_title')"
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
      @change="changeTab"
      class="text-white"
      v-if="!state.switchLeague"
    >
      <template #content>
        <league-list
          :search-league-list="state.seachLeagueList"
          :league-list-params="LeagueListParams"
          :time-filter="state.timeFilter"
        />
      </template>
    </d-tabs>

    <!-- 選擇聯盟 -->
    <div
      class="all-league-list overflow-auto flex flex-col h-full flex-nowrap pt-2 pb-20"
      v-else
    >
      <div
        class="league-list mx-3  my-1 p-3 rounded flex justify-start items-center cursor-pointer"
        v-for="(item,index) in state.leagueList"
        :key="index"
        @click="selectLeague(item,index)"
      >
        <img
          v-if="item.selected"
          :src="$requireSafe('icon/icon-selected.svg')"
          alt=""
          class="selected-icon mr-4"
        >
        <div
          v-else
          class="checkbox mr-4 bg-white cursor-pointer"
        />
        <div class="league-info flex items-center">
          <img
            :src="$requireSafe('icon/icon-vn.svg')"
            alt=""
            class="mr-2 w-8 h-8"
          >
          <div class="league-text-content flex-1 text-sm">
            <div class="league-title mb-2 text-primary">
              {{ item.leagueName }}
            </div>
            <div class="league-bet-time text-xs text-normal">
              <span>{{ $t('views_market_switchLeague_list_openCount',{num:item.openCount}) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="state.switchLeague"
      class="buttons flex fixed px-3 py-4 w-full"
    >
      <d-button
        class="select-all flex-1 mr-2"
        type="primary"
        @click="selectAll"
      >
        {{ $t('views_market_switchLeague_select_all') }}
      </d-button>
      <d-button
        class="not-slelect-all flex-1 border border-solid border-primary"
        style="background: rgba(255, 255, 255, 0.5);"
        @click="unSelectAll"
        type="default"
        :border="true"
      >
        {{ $t('views_market_switchLeague_select_not') }}
      </d-button>
    </div>
    <!-- 選擇聯盟按鈕 -->
    <div
      class="switch-league fixed right-0 bottom-20 cursor-pointer py-2 px-1.5 text-white text-sm font-light"
      @click="state.switchLeague = true"
      v-if="!state.switchLeague"
    >
      {{ $t('views_market_switchLeague') }}
    </div>
  </div>
  <d-footer-row />
</template>

<script>
import {
  reactive, onBeforeMount, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

import LeagueList from '@/components/_pages/match/leagueList';
import SportApi from '@/assets/js/api/sportApi.js';
import { isArray } from '@/assets/js/utils/utils';

export default {
  components: {
    LeagueList,
  },
  setup() {
    // use
    const { t } = useI18n();
    const router = useRouter();

    // ref
    const LeagueListParams = ref({
      timeType: 'matchTime',
      startTime: dayjs().startOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss'),
      endTime: dayjs().add(6, 'day').endOf('day').tz('Asia/Shanghai')
        .format('YYYY/MM/DD HH:mm:ss'),
    });

    // reactive
    const state = reactive({
      tabList:
      [
        { label: t('views_match_tablist_all'), type: 'all' },
        { label: t('views_match_tablist_today'), type: 'today' },
        { label: t('views_match_tablist_tomorrow'), type: 'tomorrow' },
        { label: t('views_match_tablist_record'), type: 'history' },
      ],
      currentKey: 0,
      tabIndex: 0,
      switchLeague: false,
      leagueList: [],
      seachLeagueList: [],
      gameSummaryList: [],
      timeFilter: 'all',
    });

    // methods
    const getLeagueSummary = async (params) => {
      const res = await SportApi.getLeagueSummary(params);
      if (res.code === 200) {
        if (isArray(res.data.leaguesInfo)) {
          const leagueList = res.data.leaguesInfo.map((item) => {
            state.seachLeagueList.push(item.leagueId);
            item.selected = true;
            return item;
          });
          state.leagueList = leagueList;
        }
      }
    };

    const selectLeague = (item) => {
      if (item.selected) {
        item.selected = false;
        const unSelectedIndex = state.seachLeagueList.findIndex((e) => e === item.leagueId);
        state.seachLeagueList.splice(unSelectedIndex, 1);
      } else {
        item.selected = true;
        state.seachLeagueList.push(item.leagueId);
      }
    };

    const selectAll = () => {
      state.seachLeagueList = [];
      state.leagueList.forEach((item) => {
        state.seachLeagueList.push(item.leagueId);
        item.selected = true;
      });
    };

    const unSelectAll = () => {
      state.seachLeagueList = [];
      state.leagueList.forEach((item) => {
        item.selected = false;
      });
    };
    const changeTab = async (index) => {
      state.tabIndex = index;
      state.seachLeagueList = [];
      state.leagueList = [];
      // 全部賽事
      if (index === 0) {
        state.timeFilter = 'all';
        LeagueListParams.value = {
          timeType: 'matchTime',
          startTime: dayjs().startOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss'),
          endTime: dayjs().add(6, 'day').endOf('day').tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm:ss'),
        };
      // 今日賽事
      } else if (index === 1) {
        state.timeFilter = 'today';
        LeagueListParams.value = {

          timeType: 'matchTime',
          startTime: dayjs().startOf('day').tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss'),
          endTime: dayjs().endOf('day').tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm:ss'),
        };

      // 明日賽事
      } else if (index === 2) {
        state.timeFilter = 'tomorrow';
        LeagueListParams.value = {
          timeType: 'matchTime',
          startTime: dayjs().add(1, 'day').startOf('day').tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm:ss'),
          endTime: dayjs().add(1, 'day').endOf('day').tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm:ss'),
        };
        // 歷史賽事
      } else if (index === 3) {
        state.timeFilter = 'history';
        LeagueListParams.value = {
          timeType: 'matchTime',
          startTime: dayjs().subtract(6, 'day').startOf('day').tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm:ss'),
          endTime: dayjs().endOf('day').tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm:ss'),
        };
      }

      await getLeagueSummary(LeagueListParams.value);
    };

    const goBack = () => {
      if (state.switchLeague) {
        if (!state.seachLeagueList.length) {
          window.$vue.$message.info(t('views_market_switchLeague_noSelected'));
        } else {
          state.switchLeague = false;
        }
      } else {
        router.back();
      }
    };

    // hooks
    onBeforeMount(async () => {
      await getLeagueSummary(LeagueListParams.value);
    });

    return {
      state,
      changeTab,
      goBack,
      selectLeague,
      selectAll,
      unSelectAll,
      LeagueListParams,
    };
  },
};
</script>

<style lang="postcss" scoped>
.switch-league {
  border-radius: 10px 0;
  letter-spacing: 4px;
  background: transparent linear-gradient(180deg, #f3ac0a 0%, #7a5605 100%);
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-lr;
}

.league-list {
  border: 0.3px solid #fffbf2;
  background-image: url('~@/assets/img/profile/match/league-switch-bg.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  box-shadow: 0 2px 4px #4d57721a;
}

.selected-icon {
  width: 14px;
}

.checkbox {
  width: 14px;
  height: 14px;
  border: 0.5px solid #7a5605;
  border-radius: 50%;
}

.buttons {
  bottom: calc(var(--footer-height));
  align-items: flex-end;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 1));
}

</style>
