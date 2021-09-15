<template>
  <div class="finance-details-pages">
    <d-header-row :title="$t('views_finance')">
      <template #left>
        <img
          class="avatar w-4 h-4 rounded-full is-btn"
          :src="$requireSafe(`avatar/${avatar && avatar.system ? avatar.system : 0 }.png`)"
          alt=""
          @click="goPage('/profile/userInfo')"
        >
      </template>
    </d-header-row>
    <finance-details />
    <d-footer-row />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import FinanceDetails from '@/components/_pages/FinanceDetails';

export default {
  components: {
    FinanceDetails,
  },
  setup() {
    // use
    const store = useStore();
    const router = useRouter();

    // computed
    const avatar = computed(() => store.state.user.avatar);

    // methods
    const goPage = (url) => {
      router.push(url);
    };
    return {
      avatar,
      goPage,
    };
  },
};
</script>

<style lang="postcss" scoped>
.finance-details-pages {
  height: 100%;
  overflow: hidden;
}
</style>
