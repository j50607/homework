<template>
  <div class="market pt-h-h relative h-full">
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
      :default-key="0"
      :tab-list="state.tabList"
      @change="changeTab"
      class="text-white"
      v-if="!state.switchLeague"
    >
      <template #content>
        <template
          v-for="(item, index) in state.tabList"
          :key="index"
        >
          <component
            v-if="state.tabIndex === index"
            :is="item.compName"
          />
        </template>
      </template>
    </d-tabs>

    <!-- 選擇聯盟 -->
    <div
      class="all-league-list flex flex-col h-full flex-nowrap"
      v-else
    >
      <div
        class="league-list m-2 p-3 rounded flex justify-start items-center cursor-pointer"
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
        <div class="league-info flex">
          <img
            src="https://placeimg.com/36/36"
            alt=""
            class="mr-2"
          >
          <div class="league-text-content flex-1">
            <div class="league-title mb-2 text-primary">
              {{ item.leagueName }}
            </div>
            <div class="league-info text-xs text-normal">
              <span>{{ $t('views_market_switchLeague_list_openCount',{num:item.openCount}) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="buttons mt-auto flex">
        <d-button
          class="select-all flex-1 mr-2"
          type="primary"
        >
          {{ $t('views_market_switchLeague_select_all') }}
        </d-button>
        <d-button class="not-slelect-all flex-1">
          {{ $t('views_market_switchLeague_select_not') }}
        </d-button>
      </div>
    </div>
    <!-- 選擇聯盟按鈕 -->
    <div
      class="switch-league fixed right-0 bottom-20 cursor-pointer py-2 px-1 text-white text-sm font-light"
      @click="state.switchLeague = true"
      v-if="!state.switchLeague"
    >
      {{ $t('views_market_switchLeague') }}
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import DHeaderRow from '@/components/DHeaderRow';
import DTabs from '@/components/DTabs';
import DButton from '@/components/DButton';
import all from '@/components/_pages/match/all';
import SportApi from '@/assets/js/api/sportApi.js';
import { isArray } from '@/assets/js/utils/utils';

export default {
  components: {
    DTabs,
    all,
    DHeaderRow,
    DButton,
  },
  setup() {
    // use
    const { t } = useI18n();
    const router = useRouter();

    // ref
    const LeagueListParams = ref({
      timeType: 'matchTime',
      startTime: '2021/09/08 00:00:00',
      endTime: '2021/09/14 23:59:59',
    });

    // reactive
    const state = reactive({
      tabList:
      [
        { label: t('views_match_tablist_all'), type: 'all', compName: 'all' },
        { label: t('views_match_tablist_today'), type: 'today', compName: 'today' },
        { label: t('views_match_tablist_tomorrow'), type: 'tomorrow', compName: 'tomorrow' },
        { label: t('views_match_tablist_record'), type: 'record', compName: 'record' },
      ],
      currentKey: 0,
      tabIndex: 0,
      switchLeague: false,
      leagueList: [],
      seachLeagueList: [],
    });

    // methods
    const getLeagueSummary = async (params) => {
      const res = await SportApi.getLeagueSummary(params);
      if (res.code === 200) {
        if (isArray(res.data.leaguesInfo)) {
          state.leagueList = res.data.leaguesInfo;
        }
      }
    };

    const selectLeague = (item) => {
      if (item.selected) {
        item.selected = false;
      } else {
        item.selected = true;
        state.seachLeagueList.push(item.leagueId);
      }
    };
    const changeTab = (index) => {
      state.tabIndex = index;
    };

    const goBack = () => {
      if (state.switchLeague) {
        state.switchLeague = false;
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

</style>
