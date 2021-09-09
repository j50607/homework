<template>
  <div class="set">
    <!-- Header -->
    <d-header-row
      :left-components="'GoBack'"
      :right-components="'Service'"
      :middle-components="'Title'"
      :title="$t('views_profile_userinfo_title')"
      :bg-color="'linear-gradient(180deg, #F3AC0A 0%, #B58007 100%)'"
    />
    <!-- 目前暱稱 -->
    <!-- 新暱稱 -->
    <!-- 修改次數警告 -->
  </div>
</template>

<script>
import {
  ref, reactive, computed,
} from 'vue';
// import { useI18n } from 'vue-i18n';
// import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// import MemberApi from '@/assets/js/api/memberApi';

export default {
  setup() {
    // use
    // const { t } = useI18n();
    // const router = useRouter();
    const store = useStore();

    // ref
    const showBalance = ref(false);

    // reactive
    const state = reactive({
    });

    // computed
    const account = computed(() => store.state.user.account);
    const user = computed(() => store.state.user);

    // methods
    return {
      showBalance,
      state,
      account,
      user,
    };
  },
};
</script>

<style lang="postcss" scoped>
.set {
  @apply bg-layout bg-no-repeat bg-contain h-full pt-h-h px-3 pb-4;
}
</style>
