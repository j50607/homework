<template>
  <div class="h-full">
    <d-header-row
      :title="state.isDeposit ? $t('views_profile_deposit') : $t('views_profile_withdraw')"
    >
      <template #left>
        <img
          class="go-back"
          :src="require('@/assets/img/header/icon-left-white.svg')"
          alt=""
          @click="goProfile"
        >
      </template>
    </d-header-row>
    <div class="h-full pt-h-h pl-3 pr-3 flex flex-col items-center">
      <div class="detail-wrapper">
        <div class="absolute -top-16 w-full flex flex-col items-center">
          <img
            class="h-10 w-10 mt-8"
            :src="$requireSafe(`icon/icon-success-green.svg`)"
            alt=""
          >
          <div class="mt-2 font-bold text-sm">
            {{ state.isDeposit ? $t('views_profile_depositHandling') : $t('views_profile_withdrawHandling') }}
          </div>
        </div>
        <div
          v-if="state.isDeposit"
          class="pl-4 pr-4"
        >
          <template
            v-for="(item, index) in depositList"
            :key="index"
          >
            <div
              v-if="state?.deposit?.[item?.value]"
              class="row flex pt-1 pb-1 deposit-row"
            >
              <div class="flex-1 break-all">
                {{ item.name }}
              </div>
              <div
                class="flex-1 break-all text-right"
                :style="{color: `${item.color ? 'var(--primary-color)' : ''}`}"
              >
                {{ state?.deposit?.[item?.value] }}
              </div>
            </div>
          </template>
        </div>
        <div
          v-else
          class="pl-4 pr-4"
        >
          <div
            class="row flex pt-1 pb-1 withdraw-row"
            v-for="(item, index) in withdrawList"
            :key="index"
          >
            <div class="flex-1 break-all">
              {{ item.name }}
            </div>
            <div
              class="flex-1 break-all text-right"
              :class="{'whitespace-nowrap':!isCryptocurrency}"
            >
              {{ state.withdraw[item.value] }}
            </div>
          </div>
        </div>
      </div>
      <d-button
        type="primary"
        class="is-btn"
        block
        @click="goHome"
      >
        {{ $t('views_notFound_backToHome') }}
      </d-button>
      <d-button
        v-if="serviceUrl"
        block
        class="mt-2 service is-btn"
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

    const depositList = [
      { name: t('views_profile_orderNumber'), value: 'orderNumber' },
      { name: t('views_profile_currency'), value: 'currency' },
      { name: t('views_profile_depositAmount'), value: 'amount' },
      { name: t('views_profile_handlingFee'), value: 'charge' },
      { name: t('views_profile_promotionAmount'), value: 'bonus' },
      { name: t('views_profile_actualAmount'), value: 'actualAmount', color: true },
      { name: t('views_profile_chainType'), value: 'accountName' },
      { name: t('views_profile_walletAddress'), value: 'accountId' },
    ];

    const withdrawList = [
      { name: t('views_profile_orderNumber'), value: 'orderNumber' },
      { name: t('views_profile_time'), value: 'processAt' },
      { name: t('views_profile_withdrawAmount'), value: 'amount' },
      { name: t('views_profile_chainType'), value: 'accountName' },
      { name: t('views_profile_walletAddress'), value: 'accountId' },
    ];

    const state = reactive({
      withdraw: {
        orderNumber: '',
        amount: '',
        accountId: '',
        accountName: '',
        processAt: '',
      },
      deposit: {
        orderNumber: '',
        amount: '',
        accountId: '',
        accountName: '',
        processAt: '',
        currency: '',
      },
      isDeposit: route.query.type === 'deposit',
    });

    const serviceUrl = computed(() => store.state.info.serviceUrl);

    const initData = () => {
      if (state.isDeposit) {
        Object.entries(JSON.parse(route.query.deposit)).forEach(([key, value]) => {
          state.deposit[key] = value;
        });
      } else {
        Object.entries(JSON.parse(route.query.withdraw)).forEach(([key, value]) => {
          state.withdraw[key] = value;
        });
      }
    };

    const goService = () => {
      window.open(serviceUrl.value);
    };

    const goProfile = () => {
      router.push('/profile');
    };

    const goHome = () => {
      router.push('/');
    };

    initData();
    return {
      goService,
      goHome,
      goProfile,
      depositList,
      withdrawList,
      state,
      serviceUrl,
      isCryptocurrency,
    };
  },
};
</script>

<style lang="scss" scoped>
.detail-wrapper {
  position: relative;
  width: 100%;
  margin: 75px 20px 20px;
  padding: 75px 0 15px;
  border-radius: 5px;
  font-size: 14px;
  background: #fff;
  box-shadow: 0 2px 4px #4d57721a;
}

.withdraw-row {
  &:nth-child(3) {
    padding-bottom: 15px;
    border-bottom: 1px solid #f2f2f2;
  }

  &:nth-child(4) {
    padding-top: 15px;
  }
}

.deposit-row {
  &:nth-last-child(3) {
    padding-bottom: 15px;
    border-bottom: 1px solid #f2f2f2;
  }

  &:nth-last-child(2) {
    padding-top: 15px;
  }
}

.go-back {
  width: 18px;
  height: 18px;
}

.service {
  color: #7a5605;
}
</style>
