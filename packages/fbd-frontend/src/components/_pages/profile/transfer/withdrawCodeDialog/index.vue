<template>
  <div class="withdraw-code">
    <d-dialog
      v-model:visible="showWithdrawCodeDialog"
      :footer="null"
      :title="$t('components_withdrawCodeDialog_title')"
      :width="'90%'"
      @cancel="cancel()"
    >
      <template #body>
        <div class="text text-normal">
          <p class="text-center text-2xl">
            {{ $t('components_withdrawCodeDialog_inputCode') }}
          </p>
          <div class="subtitle text-center text-sm font-normal">
            {{ $t('components_withdrawCodeDialog_inputCode2') }}
          </div>
        </div>
        <div class="relative flex justify-between mt-10">
          <input
            v-positive-places="6"
            v-model="withdrawPwd"
            class="absolute top-0 left-0 w-full h-full opacity-0"
            type="text"
            @focus="isFocus = true"
            @blur="isFocus = false"
          >
          <div
            v-for="(item, index) in 6"
            :key="index"
            class="password-item text-normal flex items-center justify-center h-14 bg-white font-bold text-2xl rounded-3"
            :class="{'on': withdrawPwd.length === item || (isFocus && !withdrawPwd && !index)}"
          >
            {{ withdrawPwd[index] }}
          </div>
        </div>

        <div class="forget-withdraw-code mt-10 flex items-center justify-center mb-4">
          <span class="mr-2 text-normal">{{ $t('components_withdrawCodeDialog_forgetPassword') }}</span>
          <span
            v-if="serviceUrl"
            class="blue is-btn"
            @click="contactService()"
          >{{ $t('components_withdrawCodeDialog_contactService') }}</span>
        </div>
      </template>
      <template #footer>
        <div>
          <d-button
            type="primary"
            :block="true"
            :disabled="!withdrawPwd || withdrawPwd.length !== 6"
            @click="submitCode"
          >
            {{ $t('components_transferDialog_transfer_confirm') }}
          </d-button>
        </div>
      </template>
    </d-dialog>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import FinanceApi from '@/assets/js/api/financeApi';

export default {
  props: {
    withdrawCodeIsShow: {
      type: Boolean,
      default: false,
    },
    transferInfo: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['update:value', 'cancel', 'transferSuccess'],
  setup(props, context) {
    // use
    const store = useStore();
    const { t } = useI18n();

    // ref
    const withdrawPwd = ref('');
    const isFocus = ref(false);

    // computed
    const showWithdrawCodeDialog = computed({
      get: () => props.withdrawCodeIsShow,
      set: (val) => context.emit('update:value', val),
    });
    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const account = computed(() => store.state.user.account);

    // methods

    const contactService = () => {
      window.open(serviceUrl.value);
    };

    const init = () => {
      isFocus.value = false;
      withdrawPwd.value = '';
    };
    const getWithdrawCode = async (withdrawSendCode) => {
      const { code, message } = await FinanceApi.getWithdrawalCode(withdrawSendCode);
      if (code === 200) {
        return true;
      }
      window.$vue.$message.error(message);
      return false;
    };

    const transfer = async () => {
      const params = {
        transferOutAccount: account.value,
        transferInAccount: props.transferInfo.transInAccount,
        amount: props.transferInfo.transferAmount,
        authCode: withdrawPwd.value,
        remark: props.transferInfo.transferRemark,
      };
      const { code, message } = await FinanceApi.transfer(params);
      if (code === 200) {
        window.$vue.$message.success(t('components_withdrawCodeDialog_transfer_success'));
        context.emit('transferSuccess');
      } else {
        window.$vue.$message.error(message);
      }
      init();
      context.emit('cancel', false);
    };

    const submitWithdrawCode = async (withdrawCode) => {
      if (await getWithdrawCode(withdrawCode)) {
        transfer();
        showWithdrawCodeDialog.value = false;
      }
    };

    const submitCode = async () => {
      await submitWithdrawCode(withdrawPwd.value);
    };

    const cancel = () => {
      context.emit('cancel', false);
    };

    return {
      showWithdrawCodeDialog,
      withdrawPwd,
      isFocus,
      contactService,
      submitCode,
      cancel,
      serviceUrl,
    };
  },
};
</script>
<style lang="postcss" scoped>
.subtitle {
  color: #bcc0cb;
}

.password-item {
  width: 44px;
  box-shadow: 0 2px 4px #4d57721a;

  &.on {
    border: 1px solid var(--primary-color);
  }
}

.blue {
  color: #0e88f5;
}
</style>
