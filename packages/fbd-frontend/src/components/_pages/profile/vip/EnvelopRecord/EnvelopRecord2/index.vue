<template>
  <div class="envelop-record">
    <component :is="currentPage" />
  </div>
</template>
<script>

import CheckDetail from '@/components/_pages/profile/vip/EnvelopRecord/Detail/DetailStyle2';
import ReceiveRecord from '@/components/_pages/profile/vip/EnvelopRecord/ReceiveRecord/ReceiveRecordStyle2';

export default {
  props: {
    currentPage: {
      type: String,
      default: '',
    },
  },
  components: {
    CheckDetail,
    ReceiveRecord,
  },
  setup() {
    return {

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
