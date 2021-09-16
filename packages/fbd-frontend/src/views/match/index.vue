<template>
  <locale
    v-slot="{locale}"
    class="market pt-h-h pb-f-h relative h-full"
  >
    <d-header-row
      :right-components="state.switchLeague ? undefined : 'Service'"
      :title="state.switchLeague ?$t('views_market_switchLeague') : $t('views_market_title')"
    >
      <template #left>
        <img
          v-if="!state.switchLeague"
          class="avatar w-4 h-4 rounded-full is-btn"
          :src="$requireSafe(`avatar/${avatar && avatar.system ? avatar.system : 0 }.png`)"
          alt=""
          @click="goPage('/profile/userInfo')"
        >
        <div
          class="go-back"
          v-else
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
      :class="locale"
      @change="changeTab"
      class="game-tab text-white"
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
      class="all-league-list overflow-auto h-full flex-nowrap pt-10 pb-20"
      v-else
    >
      <!-- 全選跟反選 -->
      <div class="select-option flex justify-center fixed w-full left-0 h-8">
        <div
          class="select-aciton mr-3 w-2/5 flex py-1 justify-center text-xs cursor-pointer items-center mt-auto"
          @click="selectAll"
        >
          <img
            :src="$requireSafe('icon/icon-selectAll.svg')"
            alt=""
            class="w-3 mr-1"
          >
          {{ $t('views_market_switchLeague_select_all') }}
        </div>
        <div
          class="select-aciton w-2/5 flex py-1 justify-center text-xs cursor-pointer items-center mt-auto"
          @click="invertSelect()"
        >
          <img
            :src="$requireSafe('icon/icon-invertSelect.svg')"
            alt=""
            class="w-3 mr-1"
          >
          {{ $t('views_market_switchLeague_select_not') }}
        </div>
      </div>
      <div
        class="league-list mx-3  my-2 p-3 rounded flex justify-start items-center cursor-pointer"
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
            :src="item.logoPath? `${s3Base}/${item.logoPath}`: $requireSafe('icon/default-league.svg')"
            alt=""
            class="mr-2 w-8 h-8 object-contain"
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
      class="buttons fixed px-3 py-4 w-full bottom-f-h"
    >
      <d-button
        class="select-all w-full block"
        type="primary"
        @click="confirmSelect()"
      >
        {{ $t('components_common_dialog_confirm') }}
      </d-button>
    </div>
    <!-- 選擇聯盟按鈕 -->
    <div
      class="switch-league fixed right-0 bottom-20 cursor-pointer py-1.5"
      @click="state.switchLeague = true"
      v-if="!state.switchLeague"
    >
      <img
        :src="$requireSafe('icon/switch-league.svg')"
        alt=""
      >
    </div>
  </locale>
  <d-footer-row />
</template>

<script>
import {
  reactive, onBeforeMount, ref, computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import Locale from '@/components/Locale';

import LeagueList from '@/components/_pages/match/leagueList';
import SportApi from '@/assets/js/api/sportApi.js';
import { isArray } from '@/assets/js/utils/utils';

export default {
  components: {
    LeagueList,
    Locale,
  },
  setup() {
    // use
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();

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

    // computed
    const avatar = computed(() => store.state.user.avatar);
    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);

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

    const goPage = (url) => {
      router.push(url);
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

    const invertSelect = () => {
      state.seachLeagueList = [];
      const unSelectArr = state.leagueList.filter((item) => !item.selected);
      state.leagueList.forEach((items) => {
        items.selected = !items.selected;
      });

      unSelectArr.forEach((element) => {
        state.seachLeagueList.push(element.leagueId);
      });
    };

    const confirmSelect = () => {
      if (!state.seachLeagueList.length) {
        window.$vue.$message.info(t('views_market_switchLeague_noSelected'));
      } else {
        state.switchLeague = false;
      }
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
      LeagueListParams,
      avatar,
      goPage,
      invertSelect,
      confirmSelect,
      s3Base,
    };
  },
};
</script>

<style lang="postcss" scoped>
.switch-league {
  width: 58px;
  border-radius: 20px 0 0 20px;
  background: transparent linear-gradient(180deg, #f3ac0a 0%, #7a5605 100%);
  box-shadow: 0 3px 6px #00000029;

  img {
    display: block;
    width: 28px;
    margin: 0 auto;
  }
}

.league-list {
  /* min-height: 60px; */
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
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 1));
}

.select-option {
  top: calc(var(--header-height) - 1px);
  background: linear-gradient(#fff, transparent);
}

.select-aciton {
  height: 28px;
  border: 1px solid #f3ac0a;
  border-radius: 3px;
  color: #f3ac0a;
  background: #fff;
}

.game-tab {
  ::v-deep(.d-tabs-mobile-box) {
    justify-content: space-between !important;

    .d-tabs-mobile-title {
      margin-right: 8px !important;
    }
  }

  &.zh_cn {
    ::v-deep(.d-tabs-mobile-box) {
      justify-content: center !important;

      .d-tabs-mobile-title {
        margin-right: 16px !important;
      }
    }
  }

  &.zh_tw {
    ::v-deep(.d-tabs-mobile-box) {
      justify-content: center !important;

      .d-tabs-mobile-title {
        margin-right: 16px !important;
      }
    }
  }
}

.all-league-list {
  display: -webkit-box;
  display: -ms-flexbox;
}
</style>
