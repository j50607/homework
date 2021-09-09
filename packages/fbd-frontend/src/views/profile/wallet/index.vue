<template>
  <div
    ref="wallet"
    class="h-full"
  >
    <d-header-row
      :title="$t('views_profile_walletManagement')"
      right-components="Service"
    />
    <div class="h-full pt-h-h pl-3 pr-3 text-sm">
      <div class="h-full pt-3 overflow-y-auto">
        <template v-if="walletList.length">
          <div
            v-for="(item, index) in walletList"
            :key="index"
            class="wallet-item"
          >
            <div class="mb-2">
              {{ item.accountName }}
            </div>
            <div class="text-xs">
              {{ item.accountId }}
            </div>
            <div class="absolute top-2 right-2 flex">
              <img
                :src="require('@/assets/img/icon/icon-edit.svg')"
                alt=""
                @click="addWallet(item)"
              >
              <img
                class="ml-2"
                :src="require('@/assets/img/icon/icon-delete.svg')"
                alt=""
                @click="deleteWallet(item)"
              >
            </div>
          </div>
          <d-button
            type="primary"
            block
            class="mt-10"
            @click="addWallet"
          >
            {{ $t('views_profile_wallet_addWallet') }}
          </d-button>
        </template>
        <div
          v-else
          class="no-data flex flex-col items-center"
        >
          <img
            class="h-11 w-11 mb-3"
            :src="require('@/assets/img/icon/icon-no-wallet.svg')"
            alt=""
          >
          <p class="mb-8">
            {{ $t('views_profile_noWallet') }}
          </p>
          <d-button
            type="primary"
            @click="addWallet"
          >
            {{ $t('views_profile_wallet_addWallet') }}
          </d-button>
        </div>
      </div>
    </div>
  </div>
  <withdraw-code
    v-if="showWithdraw"
    mode="SET"
    @confirm="confirmWithdrawCode"
    @close="close"
  />
  <!-- 新增编辑钱包 -->
  <edit-wallet
    v-if="showEditWallet"
    :address="walletAddress"
    :type="chainType"
    @confirm="confirmWallet"
    @close="closeWallet"
  />
  <d-dialog
    v-model:visible="showDelete"
    :title="$t('common_delete')"
    :footer="null"
    :get-container="() => wallet.parentNode"
  >
    <template #body>
      <div class="pb-5 text-center text-xs text-normal">
        {{ $t('views_profile_wallet_deleteNotice') }}
      </div>
    </template>
    <template #footer>
      <div class="flex justify-center">
        <d-button
          type="primary"
          @click="deleteBankcard"
        >
          {{ $t('common_confirm') }}
        </d-button>
      </div>
    </template>
  </d-dialog>
</template>

<script>
import {
  computed, reactive, toRefs, ref,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import MemberApi from '@/assets/js/api/memberApi';
import WithdrawCode from '@/components/_pages/profile/WithdrawCode';
import EditWallet from '@/components/_pages/profile/EditWallet';

export default {
  components: {
    WithdrawCode,
    EditWallet,
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();

    const wallet = ref(null);

    const state = reactive({
      walletList: [],
      showWithdraw: false,
      showEditWallet: false,
      showDelete: false,
      walletAddress: '',
      chainType: '',
      info: {},
      selectedItem: {},
      mode: 'add',
    });

    const account = computed(() => store.state.user.account);

    const getBankcard = async () => {
      const { code, data } = await MemberApi.getBankcard({
        unit: 'USDT',
        receivePaymentSetting: 'VIRTUAL_WALLET',
      });
      if (code === 200) {
        state.walletList = data.bankcards;
        state.info = data.info;
        return data;
      }
      return [];
    };

    // 新增钱包
    const addBankcard = async () => {
      const { code } = await MemberApi.addBankcard({
        account: account.value,
        receivePaymentSetting: 'VIRTUAL_WALLET',
        walletAddress: state.walletAddress,
        chainType: state.chainType,
      });
      if (code === 200) {
        state.showEditWallet = false;
      }
    };

    // 更新钱包
    const updateBankcard = async () => {
      const { code } = await MemberApi.updateBankcard({
        account: account.value,
        receivePaymentSetting: 'VIRTUAL_WALLET',
        walletAddress: state.walletAddress,
        chainType: state.chainType,
        ids: [state.bankId],
      });
      if (code === 200) {
        state.showEditWallet = false;
        window.$vue.$message.info(t('common_edit_success'));
      }
    };

    const deleteBankcard = async () => {
      const { code } = await MemberApi.deleteBankcard({
        ids: [state.selectedItem.id],
      });
      if (code === 200) {
        window.$vue.$message.info(t('common_delete_success'));
        state.showDelete = false;
        getBankcard();
      }
    };

    // 设定提现密码
    const changeWithDrawalCode = async (withdrawCode) => {
      const { code } = await MemberApi.changeWithDrawalCode({
        oldPassword: withdrawCode,
        newPassword: withdrawCode,
        confirmPassword: withdrawCode,
      });
      if (code === 200) {
        store.commit('SET_USER_INFO', { withdrawalCode: withdrawCode });
        return true;
      }
      return false;
    };

    const addWallet = (item) => {
      state.walletAddress = item?.accountId;
      state.chainType = item?.accountName;
      state.bankId = item?.bankId;
      state.showEditWallet = true;
      state.mode = item ? 'edit' : 'add';
    };

    const deleteWallet = (item) => {
      state.selectedItem = item;
      state.showDelete = true;
    };

    const confirmWithdrawCode = async (withdrawCode) => {
      await changeWithDrawalCode(withdrawCode);
      await addBankcard();
      getBankcard();
      state.showWithdraw = false;
    };

    const close = () => {

    };

    const closeWallet = () => {
      state.showEditWallet = false;
    };

    const confirmWallet = async (address, type) => {
      state.walletAddress = address;
      state.chainType = type;

      if (!state.info.withdrawalCodeSetting) {
        state.showWithdraw = true;
        state.showEditWallet = false;
        return;
      }

      state.mode === 'add' ? await addBankcard() : await updateBankcard();
      getBankcard();
    };

    getBankcard();
    return {
      addWallet,
      deleteWallet,
      confirmWithdrawCode,
      close,
      closeWallet,
      confirmWallet,
      deleteBankcard,
      wallet,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.wallet-item {
  position: relative;
  height: 75px;
  margin-bottom: 10px;
  padding: 10px 15px 15px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 2px 4px #4d57721a;
}

.no-data {
  margin-top: 30%;

  p {
    color: #bdbdbd;
  }
}

.d-btn {
  width: 170px;
  font-size: 12px;
}
</style>
