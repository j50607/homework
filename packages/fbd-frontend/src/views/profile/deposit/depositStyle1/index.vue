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
              v-if="option?.holder"
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
        <div class="warning mt-2">
          {{ $t('views_profile_deposit_limitAmount', { min: selectedItem?.minAmount, max: selectedItem?.maxAmount }) }}
        </div>
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
              {{ selectedItem?.cardNumber }}
            </p>
          </div>
          <img
            :src="require('@/assets/img/icon/copy-btn.svg')"
            alt="copy"
            class="copy is-btn"
            @click="copyByText(selectedItem?.cardNumber)"
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
      <a-form
        :model="form"
        ref="formRef"
        :label-col="{ span: 0 }"
        :wrapper-col="{ span: 24 }"
        :rules="rules"
      >
        <div class="form-item mb-3">
          <div class="text-label">
            {{ $t('views_profile_deposit_depositAmount') }}
          </div>
          <a-form-item
            name="amount"
          >
            <a-input
              v-two-decimal-places
              v-model:value="form.amount"
              :placeholder="$t('views_profile_deposit_amountPlaceholder')"
              class="text-xs"
            />
          </a-form-item>
        </div>
        <div
          v-if="showUsdtExtendName"
          class="form-item"
        >
          <div class="text-label">
            {{ usdtExtendName }}
          </div>
          <a-form-item
            name="extendContent"
          >
            <a-input
              v-model:value="form.extendContent"
              :placeholder="usdtExtendName"
              class="text-xs"
            />
          </a-form-item>
        </div>
        <div
          class="upload"
          v-if="showUploadCertificate"
        >
          <div class="text-label">
            {{ $t('views_profile_deposit_upload') }}
          </div>
          <a-form-item
            name="uploadCertificate"
          >
            <a-upload
              class="upload-img"
              name="file"
              list-type="picture-card"
              :before-upload="beforeUpload"
              :show-upload-list="false"
              accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .GIF, .BMP"
              @change="handleChange"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="avatar"
                class="certificate"
              >
              <div v-else>
                <img
                  class="upload-icon"
                  :src="require('@/assets/img/icon/style1/upload.svg')"
                >
                <div class="ant-upload-text">
                  {{ $t('views_profile_deposit_clickUpload') }}
                </div>
              </div>
            </a-upload>
          </a-form-item>
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
            <li class="hint-item">
              3. {{ $t('views_profile_deposit_hint_five', { min: selectedItem?.minAmount, max: selectedItem?.maxAmount }) }}
            </li>
            <li
              class="hint-item"
              v-if="showUploadCertificate"
            >
              4. {{ $t('views_profile_deposit_hint_six') }}
            </li>
          </ul>
        </div>
        <d-button
          class="mt-4 btn"
          type="primary"
          block
          :disabled="!form.amount || (requireUsdtExtendName && !form.extendContent) || (requireUploadCertificate && !form.uploadCertificate)"
          @click="applyDeposit"
        >
          {{ $t('common_confirm') }}
        </d-button>
      </a-form>
    </template>
  </d-dialog>
</template>

<script>
import {
  ref, reactive, toRefs, onBeforeMount, computed, watch,
} from 'vue';
import * as R from 'ramda';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import NP from 'number-precision';
import FinanceApi from '@/assets/js/api/financeApi';
import { copyByText } from '@/assets/js/utils/utils';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  setup() {
    // use
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();

    // ref
    const formRef = ref(null);
    const showDepoistDialog = ref(false);
    const qrCode = ref('');
    const promotionEnable = ref(false);

    // reactive
    const state = reactive({
      form: {
        amount: '',
        extendContent: '',
        uploadCertificate: '',
      },
      channelList: [],
      selectedItem: {},
      imageUrl: undefined,
      file: undefined,
    });

    // computed
    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);
    const showUsdtExtendName = computed(() => store.state.info.depositAccountExtends.showUsdtExtendName);
    const requireUsdtExtendName = computed(() => store.state.info.depositAccountExtends.requireUsdtExtendName);
    const showUploadCertificate = computed(() => store.state.info.depositAccountExtends.showUploadCertificate);
    const requireUploadCertificate = computed(() => store.state.info.depositAccountExtends.requireUploadCertificate);
    const usdtExtendName = computed(() => store.state.info.depositAccountExtends.usdtExtendName);
    const getActualAmount = computed(() => {
      if (promotionEnable.value && state.form.amount) {
        const percent = NP.plus(NP.divide(state.selectedItem?.promotionPercentage, 100), 1);
        const result = NP.times(Number(state.form.amount), percent).toFixed(3).slice(0, -1);
        return result || 0;
      }
      return state.form.amount || 0;
    });

    // validate
    const amountValidate = async (rule, value) => {
      value = value?.toString() || '';

      if (!value) {
        return Promise.reject(new Error(t('common_errorNoEmpty', { min: state?.selectedItem?.minAmount, max: state?.selectedItem?.maxAmount })));
      }

      if (Number(value) < state?.selectedItem?.minAmount || Number(value) > state?.selectedItem?.maxAmount) {
        return Promise.reject(new Error(t('views_profile_deposit_limitAmountWarning', { min: state?.selectedItem?.minAmount, max: state?.selectedItem?.maxAmount })));
      }
      return Promise.resolve();
    };

    const extendContentValidate = async (rule, value) => {
      value = value?.toString() || '';

      if (requireUsdtExtendName.value && !value) {
        return Promise.reject(new Error(t('common_errorNoEmpty', { min: state?.selectedItem?.minAmount, max: state?.selectedItem?.maxAmount })));
      }
      return Promise.resolve();
    };

    const uploadCertificateValidate = async () => {
      if (requireUploadCertificate.value && !state.file) {
        return Promise.reject(new Error(t('common_errorNoEmpty')));
      }
      return Promise.resolve();
    };

    const rules = {
      amount: [
        { validator: amountValidate, trigger: ['change', 'blur'] },
      ],
      extendContent: [
        { validator: extendContentValidate, trigger: ['change', 'blur'] },
      ],
      uploadCertificate: [
        { validator: uploadCertificateValidate, trigger: ['change', 'blur'] },
      ],
    };

    // methods
    const handleRefValue = R.curry((target, value) => {
      target.value = value;
    });

    const handleDepositDialog = handleRefValue(showDepoistDialog);

    const getDepositChannel = async () => {
      const {
        code, data, info, message,
      } = await FinanceApi.getDepositChannel();
      if (code === 200) {
        state.channelList = [...data?.CRYPTO_CURRENCY, ...data?.USDT];
        state.selectedItem = state?.channelList[0];
        promotionEnable.value = info?.promotionEnable;
      } else {
        window.$vue.$message.error(message);
      }
    };

    const parseJson = (data) => {
      if (data) {
        return JSON.parse(data);
      }
      return {};
    };

    const applyDeposit = async () => {
      const params = {
        depositAccountId: state.selectedItem?.id,
        amount: state.form.amount,
        applyPromotion: promotionEnable.value,
        extendContent: state.form.extendContent || undefined,
        certificate: state.form.uploadCertificate || undefined,
      };
      const { code, data, message } = await FinanceApi.applyDeposit(params);

      if (code === 200) {
        const query = {
          currency: parseJson(state.selectedItem?.description)?.unit,
          amount: data.amount,
          charge: data.charge,
          bonus: data.bonus,
          actualAmount: NP.minus(NP.plus(data.amount, data.bonus), data.charge),
          accountName: state.selectedItem?.holder,
          accountId: data.accountId,
          orderNumber: data.orderNumber,
        };
        router.push({ path: '/profile/orderDetail', query: { type: 'deposit', deposit: JSON.stringify(query) } });
        handleDepositDialog(false);
      } else {
        window.$vue.$message.error(message);
      }
    };

    const handleChange = (info) => {
      if (info.file) {
        getBase64(info.file, (imageUrl) => {
          state.imageUrl = imageUrl;
        });

        state.file = info.file;
        state.form.uploadCertificate = info.file;
      }
    };

    const beforeUpload = (file) => {
      const imageMap = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/JPG', 'image/JPEG', 'image/GIF', 'image/BMP'];
      if (!imageMap.includes(file.type)) {
        return new Promise(() => {
          window.$vue.$message.error(t('error57'));
        });
      }
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        return new Promise(() => {
          window.$vue.$message.error(t('error58'));
        });
      }
      return false;
    };

    // watch
    watch(() => state.selectedItem, (val) => {
      if (val?.qrCode) {
        qrCode.value = `${s3Base.value}/${val?.qrCode}`;
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
      formRef,
      rules,
      qrCode,
      showDepoistDialog,
      handleDepositDialog,
      ...toRefs(state),
      promotionEnable,
      parseJson,
      copyByText,
      getActualAmount,
      showUsdtExtendName,
      requireUsdtExtendName,
      showUploadCertificate,
      requireUploadCertificate,
      usdtExtendName,
      applyDeposit,
      handleChange,
      beforeUpload,
    };
  },
};
</script>

<style lang="postcss" scoped>
.title {
  @apply flex justify-between mt-4 mb-2 text-sm;
}

.ant-input, .ant-upload {
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

.warning {
  color: #f00;
  font-size: 14px;
}

.upload {
  .upload-text {
    display: flex;
    width: 10rem;
  }

  .upload-img {
    /deep/ .ant-upload-select-picture-card {
      width: 100%;
      height: 120px;
      border: 1px solid #f2f2f2;
      background-color: #fff;

      .ant-upload-text {
        color: #bdbdbd;
        font-size: 12px;
      }

      .certificate {
        height:120px;
        margin:auto;
      }
    }

    .upload-icon {
      width: 36px !important;
      margin: auto;
    }
  }
}
</style>
