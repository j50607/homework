<template>
  <div class="my-report pt-h-h mx-3">
    <d-header-row
      :title="$t('views_profile_report_title')"
    />

    <d-tabs
      v-model:activeKey="state.currentKey"
      :default-key="state.tabIndex"
      :tab-list="state.tabList"
      class="tab-list"
      @change="handleChange"
    >
      <template #content>
        <component
          :is="state.tabList[state.currentKey].comp"
          :rendering-time="state.renderingTime"
        />
      </template>
    </d-tabs>
  </div>
</template>
<script>

import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import ReportSummary from '@/components/_pages/profile/report/ReportSummary';
import ReportTime from '@/components/_pages/profile/report/ReportTime';

export default {
  components: {
    ReportSummary,
    ReportTime,
  },
  setup() {
    // use
    const { t } = useI18n();

    // reactive
    const state = reactive({
      currentKey: 0,
      tabIndex: 0,
      tabList: [
        { label: t('views_profile_report_tabs_tabList_summary'), comp: 'report-summary' },
        { label: t('views_profile_report_tabs_tabList_day'), comp: 'report-time' },
        { label: t('views_profile_report_tabs_tabList_week'), comp: 'report-time' },
        { label: t('views_profile_report_tabs_tabList_month'), comp: 'report-time' },
      ],
      renderingTime: '',
    });

    // methods
    const handleChange = (index) => {
      switch (index) {
        case 1:
          state.renderingTime = 'day';
          break;
        case 2:
          state.renderingTime = 'week';
          break;
        case 3:
          state.renderingTime = 'month';
          break;
        default:
      }
    };
    return {
      state,
      handleChange,
    };
  },
};
</script>
<style lang="postcss" scoped>
.tab-list {
  ::v-deep(.d-tabs-mobile-box) {
    justify-content: space-around !important;
  }
}

</style>
