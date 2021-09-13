<template>
  <div class="finance-details-pages">
    <d-header-row :title="$t('views_finance')" />
    <finance-details />
    <d-footer-row />
  </div>
</template>

<script>
import FinanceDetails from '@/components/_pages/FinanceDetails';

export default {
  components: {
    FinanceDetails,
  },
  setup() {
    return {
    };
  },
};
</script>

<style lang="postcss" scoped>
.finance-details-pages {
  overflow: hidden;
}
</style>
