<template>
  <div class="h-full">
    <d-header-row
      :title="state.isDeposit ? $t('views_profile_deposit') : $t('views_profile_withdraw')"
      right-components="service"
    />
    <div class="h-full pt-h-h pl-3 pr-3 flex flex-col items-center">
      <div class="detail-wrapper">
        <div class="absolute -top-16 w-full flex flex-col items-center">
          <img
            class="h-10 w-10 mt-8"
            :src="$requireSafe(`icon/icon-success-${state.isDeposit ? 'blue' : 'green'}.svg`)"
            alt=""
          >
          <div class="mt-2 font-bold text-sm">
            {{ state.isDeposit ? $t('views_profile_depositHandling') : $t('views_profile_withdrawHandling') }}
          </div>
        </div>
        <div class="pl-4 pr-4">
          <div
            class="row pt-1 pb-1"
            v-for="(item, index) in withdrawList"
            :key="index"
          >
            <div class="flex-1 break-all">
              {{ item.name }}
            </div>
            <div class="flex-1 break-all">
              {{ state.withdraw[item.value] }}
            </div>
          </div>
        </div>
      </div>
      <d-button
        type="primary"
        block
        @click="goHome"
      >
        {{ $t('views_notFound_backToHome') }}
      </d-button>
      <d-button
        block
        class="mt-2"
        :border="true"
        color="transparent"
        @click="goService"
      >
        {{ $t('common_contactService') }}
      </d-button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const withdrawList = [
      { name: t('views_profile_orderNumber'), value: 'orderNumber' },
      { name: t('views_profile_time'), value: 'createAt' },
      { name: t('views_profile_withdrawAmount'), value: 'amount' },
      { name: t('views_profile_mainNetwork'), value: 'mainNetwork' },
      { name: t('views_profile_walletAddress'), value: 'address' },
    ];

    const state = reactive({
      withdraw: {
        orderNumber: '',
        createAt: '',
        amount: '',
        mainNetwork: '',
        address: '',
      },
      deposit: {

      },
      isDeposit: route.query.type === 'deposit',
    });

    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const goService = () => {
      window.location = serviceUrl;
    };

    const goHome = () => {
      router.push('/');
    };
    return {
      goService,
      goHome,
      withdrawList,
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
.detail-wrapper {
  position: relative;
  width: 100%;
  margin: 75px 20px 20px;
  padding: 75px 0 10px;
  border-radius: 3px;
  font-size: 14px;
  background: #fff;
  box-shadow: 0 2px 4px #4d57721a;
}

.row {
  &:nth-child(3) {
    padding-bottom: 15px;
    border-bottom: 1px solid #f2f2f2;
  }

  &:nth-child(4) {
    padding-top: 15px;
  }
}
</style>
