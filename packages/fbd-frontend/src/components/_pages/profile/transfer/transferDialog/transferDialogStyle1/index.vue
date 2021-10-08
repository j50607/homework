<template>
  <div class="transfer-dialog">
    <d-dialog
      v-model:visible="showDialog"
      :title="$t('components_transferDialog_title')"
      @cancel="cancel()"
      :width="'90%'"
      :footer="null"
    >
      <template #body>
        <div class="container">
          <div class="content">
            <div class="transfer-account text-normal mb-1">
              <div>{{ $t('components_transferDialog_transfer_account') }}</div>
              <div class="account p-2 mt-1">
                {{ transferAccount }}
              </div>
            </div>
            <div class="transfer-amount text-normal">
              <span>{{ $t('components_transferDialog_transfer_amount') }}</span>
              <a-input-number
                v-model:value="state.transferAmount"
                class="amount-input w-full"
                :placeholder="$t('components_transferDialog_transfer_amount_placeholder')"
                step="0.01"
                :min="0.01"
                @keydown="checkAmount"
                v-two-decimal-places
              />
            </div>
            <div class="remark text-normal">
              <span>{{ $t('components_transferDialog_transfer_remark') }}</span>
              <textarea
                id="remark"
                name="remark-content"
                cols="20"
                rows="4"
                :placeholder="$t('components_transferDialog_transfer_remark_placeholder')"
                :maxlength="50"
                v-model="state.transferRemark"
                class="text-normal block w-full mt-1 p-2"
              />
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="buttons">
          <d-button
            type="primary"
            @click="transfer()"
            class="block mb-2"
          >
            {{ $t('components_transferDialog_transfer_confirm') }}
          </d-button>
          <d-button
            @click="cancel()"
            class="cancel block"
          >
            {{ $t('components_transferDialog_transfer_cancel') }}
          </d-button>
        </div>
      </template>
    </d-dialog>
  </div>
</template>
<script>
import { reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

export default {

  props: {
    transferAccount: {
      type: String,
      default: '',
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'cancel', 'openWithdrawCode'],
  setup(props, context) {
    // use
    const store = useStore();
    const { t } = useI18n();
    // ref

    // reactive
    const state = reactive({
      transferAmount: undefined,
      transferRemark: '',
      transInAccount: '',
    });

    // watch
    watch(() => props.isShow, (val) => {
      if (val) {
        state.transferRemark = '';
        state.transferAmount = undefined;
      }
    }, { immediate: true });

    // computed
    const withdrawalCodeSetting = computed(() => store.state.user.withdrawalCodeSetting);
    const amount = computed(() => store.state.user.amount);

    const showDialog = computed({
      get: () => props.isShow,
      set: (val) => context.emit('update:value', val),
    });

    // methods

    const checkAmount = (e) => {
      const { key } = e;
      if (key === 'e' || key === '-' || key === '+') {
        e.returnValue = false;
        return false;
      }
      return true;
    };
    const cancel = () => {
      state.transferAmount = undefined;
      state.transferRemark = '';
      context.emit('cancel', false);
    };

    const transfer = () => {
      if (withdrawalCodeSetting.value) {
        if (!state.transferAmount) {
          window.$vue.$message.info(t('components_transferDialog_transfer_amount_empty'));
        } else if (state.transferAmount > amount.value) {
          window.$vue.$message.info(t('components_transferDialog_transfer_amount_biggerThanBalance'));
        } else {
          state.transInAccount = props.transferAccount;
          context.emit('openWithdrawCode', state);
          console.log('state :>> ', state);
        }
      }
    };
    return {
      state,
      cancel,
      transfer,
      showDialog,
      checkAmount,
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  padding: 5px;
}

.content {
  color: #333;
  font-size: 12px;
}

.account {
  border-radius: 3px;
  background: #f2f2f2;
}

.transfer-amount {
  margin-bottom: 15px;

  .amount-input {
    height: 32px;
    margin-top: 5px;
    border: 1px solid #f0f0f0;
    border-radius: 3px !important;
    color: #4d5772;
    font-size: 12px;
  }
}

.remark {
  margin-bottom: 15px;

  #remark {
    border: 1px solid #f0f0f0;
    border-radius: 3px;
    resize: none;

    &:focus {
      outline: none !important;
      box-shadow: 0 0 0 0.125rem rgb(9 111 201 / 20%);
    }

    &::placeholder {
      color: #bdbdbd;
    }
  }
}

.buttons {
  button {
    height: 32px;

    &.cancel {
      border: 1px solid #7a5605;
      border-radius: 3px;
      color: #7a5605;
    }
  }
}
</style>
