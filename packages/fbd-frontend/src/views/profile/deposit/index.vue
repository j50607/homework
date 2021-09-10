<template>
  <div class="h-full deposit">
    <d-header-row
      :title="$t('views_profile_deposit')"
      right-components="service"
    />
    <div class="h-full pt-h-h text-xs">
      <div class="px-3">
        <div class="title">
          <p>
            <span>
              {{ $t('views_profile_deposit_cryptoChannel') }}
            </span>
            <a
              v-if="parseJson(selectedItem?.description)?.teaching"
              :href="parseJson(selectedItem?.description)?.teaching"
              class="teaching is-btn"
            >
              {{ $t('views_profile_deposit_checkTeaching') }}
            </a>
          </p>
        </div>
        <d-select
          v-model:value="selectedItem"
          :data="channelList"
          :placeholder="$t('views_profile_deposit_chooseChannel')"
        >
          <template #empty>
            <div
              class="flex flex-col items-center"
            >
              <div class="text-gray-400">
                {{ $t('views_profile_deposit_noChannel') }}
              </div>
            </div>
          </template>
          <template #dropdown="{ option }">
            <div>{{ parseJson(option?.description)?.unit }} - {{ option?.holder }}</div>
            <div
              v-if="option.holder"
              class="suffix"
            >
              <div>
                <span
                  v-if="promotionEnable && option?.promotionPercentage > 0"
                  class="text-primary"
                >{{ $t('views_profile_deposit_discount') }} {{ option?.promotionPercentage }}%</span>
                <span
                  v-if="option?.chargePercentage > 0"
                  class="text-primary ml-2"
                >{{ $t('views_profile_deposit_fee') }} {{ option?.chargePercentage }}%</span>
              </div>
            </div>
          </template>
        </d-select>
      </div>
      <div class="deposit-info">
        <div class="title px-3">
          <span>
            {{ $t('views_profile_deposit_depositInfo') }}
          </span>
        </div>
        <img
          v-if="qrCode"
          :src="qrCode"
          alt="qrCode"
          class="qr-code"
        >
        <div class="wallet-address">
          <div class="wallet">
            <div class="title">
              {{ $t('views_profile_deposit_walletAddress') }}
            </div>
            <p class="break-all mt-1">
              {{ selectedItem.cardNumber }}
            </p>
          </div>
          <img
            :src="require('@/assets/img/icon/copy-btn.svg')"
            alt="copy"
            class="copy is-btn"
            @click="copyByText(selectedItem.cardNumber)"
          >
        </div>
      </div>
      <template v-if="parseJson(selectedItem?.description)?.notes?.length">
        <div class="title px-3">
          <span>
            {{ $t('views_profile_deposit_notice') }}
          </span>
        </div>
        <ul class="px-3">
          <li
            v-for="(note, nIndex) in parseJson(selectedItem?.description)?.notes"
            :key="`note${nIndex}`"
          >
            {{ nIndex + 1 }}. {{ note }}
          </li>
        </ul>
      </template>
      <div class="px-4">
        <d-button
          class="mt-8 btn"
          type="primary"
          block
          @click="handleDepositDialog(true)"
        >
          {{ $t('views_profile_deposit_alreadyCompleteTransfer') }}
        </d-button>
      </div>
    </div>
  </div>
  <d-dialog
    v-model:visible="showDepoistDialog"
    :footer="null"
    :title="$t('views_profile_deposit')"
    width="90%"
  >
    <template #body>
      <div class="form-item mb-3">
        <div class="text-label">
          {{ $t('views_profile_deposit_depositAmount') }}
        </div>
        <a-input
          v-two-decimal-places
          v-model:value="form.amount"
          :placeholder="$t('views_profile_deposit_amountPlaceholder')"
          class="text-xs"
        />
      </div>
      <div class="form-item">
        <div class="text-label">
          {{ $t('views_profile_deposit_BackEndCustomizeRemark') }}
        </div>
        <a-input
          v-two-decimal-places
          v-model:value="form.amount"
          :placeholder="$t('views_profile_deposit_customizeRemark')"
          class="text-xs"
        />
      </div>
      <div class="mt-3">
        <div class="text-label">
          {{ $t('views_profile_deposit_hint') }}
        </div>
        <ul class="mt-1 text-xs text-normal">
          <li class="hint-item">
            1. {{ $t('views_profile_deposit_hint_one') }}
          </li>
          <li class="hint-item">
            2.
            <span
              v-if="promotionEnable && selectedItem?.promotionPercentage > 0"
              class="mr-1"
            >
              {{ $t('views_profile_deposit_hint_two',{number: selectedItem?.promotionPercentage}) }}
            </span>
            <span
              v-if="selectedItem?.chargePercentage > 0"
              class="mr-1"
            >
              {{ $t('views_profile_deposit_hint_three',{number: selectedItem?.chargePercentage}) }}
            </span>
            <span class="mr-1">
              {{ $t('views_profile_deposit_hint_four') }}
            </span>
            <span class="text-primary">{{ getActualAmount }}</span>
          </li>
        </ul>
      </div>
      <d-button
        class="mt-4 btn"
        type="primary"
        block
        @click="handleDepositDialog(false)"
      >
        {{ $t('common_confirm') }}
      </d-button>
    </template>
  </d-dialog>
</template>

<script>
import {
  ref, reactive, toRefs, onBeforeMount, computed, watch,
} from 'vue';
import * as R from 'ramda';
import FinanceApi from '@/assets/js/api/financeApi';
import { copyByText } from '@/assets/js/utils/utils';

export default {
  setup() {
    // ref
    const showDepoistDialog = ref(false);
    const qrCode = ref('');
    const promotionEnable = ref(false);

    // reactive
    const state = reactive({
      form: {
        amount: '',
      },
      channelList: [],
      selectedItem: {},
    });

    // methods
    const handleRefValue = R.curry((target, value) => {
      target.value = value;
    });

    const handleDepositDialog = handleRefValue(showDepoistDialog);

    const getDepositChannel = async () => {
      const { code, data, info } = await FinanceApi.getDepositChannel();
      if (code === 200) {
        state.channelList = data?.CRYPTO_CURRENCY;
        state.selectedItem = data?.CRYPTO_CURRENCY[0];
        promotionEnable.value = info.promotionEnable;
      }
    };

    const parseJson = (data) => {
      if (data) {
        return JSON.parse(data);
      }
      return {};
    };

    // computed
    const getActualAmount = computed(() => 0);

    // watch
    watch(() => state.selectedItem, (val) => {
      const base = process.env.VUE_APP_IMG_URL_PREFIX;
      if (val.qrCode) {
        qrCode.value = `${base}/${val.qrCode}`;
      } else {
        qrCode.value = '';
      }
    }, { immediate: true });

    watch(showDepoistDialog, () => {
      state.form.amount = '';
    });

    // hooks
    onBeforeMount(() => {
      getDepositChannel();
    });

    return {
      qrCode,
      showDepoistDialog,
      handleDepositDialog,
      ...toRefs(state),
      promotionEnable,
      parseJson,
      copyByText,
      getActualAmount,
    };
  },
};
</script>

<style lang="postcss" scoped>
.title {
  @apply flex justify-between mt-4 mb-2 text-sm;
}

.ant-input {
  height: 32px;
  border-color: #f2f2f2 !important;
  background-color: #fff !important;
}

.text-label {
  @apply text-normal text-xs mb-1;
}

.teaching {
  @apply ml-1;

  color: #0e88f5;
}

.hint-item {
  + .hint-item {
    @apply mt-1;
  }
}

.btn {
  @apply text-xs;
}

.suffix {
  @apply flex ml-auto;

  ::v-deep() {
    ~ .arrow {
      @apply ml-2;
    }
  }
}

.qr-code {
  @apply mx-auto mt-4;

  width: 120px;
  height: 120px;
}

.wallet-address {
  @apply flex bg-secondary-content items-center px-3 py-2 mt-4;

  .wallet {
    flex: 0 0 70%;

    .title {
      @apply m-0;
    }
  }

  .copy {
    width: 18px;
    height: 18px;
  }
}

.copy {
  @apply ml-auto mt-2;

  width: 18px;
  height: 18px;
}

.deposit {
  ::v-deep(.d-select-item) {
    @apply flex;
  }
}

</style>
