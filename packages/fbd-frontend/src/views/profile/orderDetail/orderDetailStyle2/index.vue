<template>
  <div class="h-full">
    <d-header-row
      :title="state.isDeposit ? $t('views_profile_deposit') : $t('views_profile_withdraw')"
    >
      <template #left>
        <img
          class="go-back is-btn"
          :src="require('@/assets/img/header/icon-left-white.svg')"
          alt=""
          @click="goHome"
        >
      </template>
    </d-header-row>
    <div class="h-full pt-h-h mx-3 flex flex-col items-center">
      <div class="detail-wrapper">
        <!-- 入款狀態 -->
        <div class="status">
          <img
            class="success"
            :src="$requireSafe(`icon/style2/selected.svg`)"
            alt=""
          >
          <div class="font-bold text-sm ml-2">
            {{ state.isDeposit ? $t('views_profile_depositHandling') : $t('views_profile_withdrawHandling') }}
          </div>
        </div>
        <!-- 貨幣 -->
        <div v-if="state.isDeposit">
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
              >
                {{ state?.deposit?.[item?.value] }}
              </div>
            </div>
            <img
              v-if="index === depositList?.length - 3"
              class="w-full"
              :src="$requireSafe(`icon/style2/divide.svg`)"
              alt=""
            >
          </template>
        </div>
        <div v-else>
          <template
            v-for="(item, index) in withdrawList"
            :key="index"
          >
            <div
              class="row flex pt-1 pb-1 withdraw-row"
            >
              <div class="flex-1 break-all">
                {{ item.name }}
              </div>
              <div
                class="flex-1 break-all text-right"
              >
                {{ state.withdraw[item.value] }}
              </div>
            </div>
            <img
              v-if="index === 2"
              class="w-full"
              :src="$requireSafe(`icon/style2/divide.svg`)"
              alt=""
            >
          </template>
        </div>
      </div>
      <d-button
        class="is-btn"
        type="primary"
        block
        @click="goHome"
      >
        {{ $t('views_notFound_backToHome') }}
      </d-button>
      <d-button
        v-if="serviceUrl"
        block
        class="mt-3 service is-btn"
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

    const goHome = () => {
      router.push('/');
    };

    initData();
    return {
      goService,
      goHome,
      depositList,
      withdrawList,
      state,
      serviceUrl,
    };
  },
};
</script>

<style lang="postcss" scoped>
.detail-wrapper {
  position: relative;
  width: 100%;
  font-size: 14px;
  box-shadow: 0 2px 4px #4d57721a;

  @apply my-4;

  .status {
    background: #21304e;

    @apply flex justify-center items-center w-full py-4;

    .success {
      width: 32px;
      height: 32px;
    }
  }

  .row {
    background: #21304e;

    @apply px-3 py-1;

    &:last-child {
      @apply pb-4;
    }
  }
}

.go-back {
  width: 18px;
  height: 18px;
}

.service {
  border: 1px solid #ffb83d;
  color: #ffb83d;
}
</style>
