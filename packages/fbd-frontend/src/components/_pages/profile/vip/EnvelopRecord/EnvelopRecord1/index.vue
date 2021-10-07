<template>
  <div class="envelop-record">
    <d-tabs
      v-model:activeKey="state.currentKey"
      :default-key="state.tabIndex"
      :tab-list="state.tabList"
      class="tab"
    >
      <template #content>
        <component :is="state.tabList[state.currentKey].comp" />
      </template>
    </d-tabs>
  </div>
</template>
<script>
import {
  reactive,
} from 'vue';
import { useI18n } from 'vue-i18n';

import DetailStyle1 from '@/components/_pages/profile/vip/EnvelopRecord/Detail/DetailStyle1';
import ReceiveRecordStyle1 from '@/components/_pages/profile/vip/EnvelopRecord/ReceiveRecord/ReceiveRecordStyle1';

export default {
  components: {
    DetailStyle1,
    ReceiveRecordStyle1,
  },
  setup() {
    // use
    const { t } = useI18n();

    // reactive
    const state = reactive({
      tabList: [{ label: t('components_pages_components_vip_envelop_detail'), comp: 'detail-style1' }, { label: t('components_pages_components_vip_envelop_reveice_record'), comp: 'receive-record-style1' }],
      tabIndex: 0,
      currentKey: 0,
    });

    return {
      state,
    };
  },
};
</script>
<style lang="postcss" scoped>
.tab {
  ::v-deep(.d-tabs-mobile-box) {
    justify-content: space-around !important;
  }
}

.content {
  color: #1f2022;
}
</style>
