<template>
  <div class="transfer pt-h-h">
    <d-header-row
      :title="$t('views_profile_transfer_title')"
      :right-components="'Service'"
    />

    <d-tabs
      v-model:activeKey="state.currentKey"
      :default-key="state.tabIndex"
      :tab-list="state.tabList"
      class="game-tab text-black text-sm"
    />

    <div
      class="report-search mt-2 px-3"
    >
      <a-input
        :placeholder="$t('views_profile_transfer_input_placeholder')"
        v-model:value="keyword"
        :disabled="transToSub === 3 || (transToSub === 2 && state.currentKey === 0)"
      >
        <template #prefix>
          <img
            class="is-btn"
            :src="$requireSafe('profile/search.svg')"
            alt=""
            @click="handleSearch()"
            :class="{'cursor-not-allowed':transToSub === 3 || (transToSub === 2 && state.currentKey === 0) }"
          >
        </template>
        <template
          #suffix
          v-if="keyword"
        >
          <img
            class="is-btn delete"
            :src="$requireSafe('icon/enter-cancel.svg')"
            alt=""
            @click="handleSearchDelete()"
            :class="{'cursor-not-allowed':transToSub === 3 || (transToSub === 2 && state.currentKey === 0) }"
          >
        </template>
      </a-input>
    </div>

    <div class="account-list">
      <div
        class="table-head flex items-center py-1 px-3 text-normal text-sm mt-2"
        v-if="transToSub === 1 ||(transToSub === 2 && state.currentKey === 1)"
      >
        <div class="account">
          {{ $t('views_profile_transfer_table_title_account') }}
        </div>
        <div class="superior-account">
          {{ $t('views_profile_transfer_table_title_Superioraccount') }}
        </div>
        <div class="balance">
          {{ $t('views_profile_transfer_table_title_money') }}
        </div>
      </div>
      <div
        class="show-superior table-head py-1 px-3  mt-2"
        v-else
      >
        <div class="account text-sm text-center">
          {{ $t('views_profile_transfer_table_title_account') }}
        </div>
      </div>
      <d-scroll
        ref="scroll"
        :pull-up="true"
        :pull-down="true"
        :scroll-y="true"
        :on-scroll="true"
        @pullingDown="pullingDown()"
        @pullingUp="loadMoreSubAccount()"
        v-if="transToSub === 1 ||(transToSub === 2 && state.currentKey === 1)"
      >
        <div
          class="table-body"
        >
          <div
            class="table-content flex items-center py-2 px-3 text-sm cursor-pointer"
            v-for="(item, index) in state.memberList"
            :key="index"
            @click="handlerTransferDialog(item.account)"
            :class="{'no-cursor': item.account === account}"
          >
            <div class="account">
              {{ item.account }}
            </div>
            <div class="superior-account">
              {{ item.superiorAccount }}
            </div>
            <div class="balance">
              {{ item.balance }}
            </div>
            <div
              class="arrow"
              v-if="item.account !== account"
            >
              <img
                :src="$requireSafe('profile/right-arrow.svg')"
                alt=""
              >
            </div>
          </div>
        </div>
      </d-scroll>
      <div
        class="table-body"
        v-else
      >
        <div
          class="table-content show-superior  text-sm py-2 px-3 flex items-center cursor-pointer"
          @click="handlerTransferDialog(superiorAccount)"
        >
          <div class="account text-center">
            {{ superiorAccount }}
          </div>
          <div class="arrow">
            <img
              :src="$requireSafe('icon/rightarrow.svg')"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <transfer-dialog
      v-model:isShow="state.showTransferDialog"
      :transfer-account="transferAccount"
      :coin-menu="state.coinMenu"
      @cancel="state.showTransferDialog = false"
      @openWithdrawCode="openWithdrawCode"
    />
    <!-- :transfer-info="state.transferInfo" -->
    <withdraw-code-dialog
      v-model:withdrawCodeIsShow="showWithdrawCodeDialog"
      @cancel="showWithdrawCodeDialog = false"
      @transferSuccess="pullingDown()"
    />
  </div>
</template>
<script>
import {
  reactive, computed, ref, nextTick, onMounted,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import MemberApi from '@/assets/js/api/memberApi';
import { isArray } from '@/assets/js/utils/utils';
import TransferDialog from '@/components/_pages/profile/transfer/transferDialog';
import WithdrawCodeDialog from '@/components/_pages/profile/transfer/withdrawCodeDialog';

export default {
  components: {
    TransferDialog,
    WithdrawCodeDialog,
  },
  setup() {
    // use
    const store = useStore();
    const { t } = useI18n();
    const router = useRouter();

    // ref
    const transToSub = ref(undefined);
    const keyword = ref('');
    const isLastPage = ref(false);
    const transferAccount = ref('');
    const scroll = ref(null);
    const showWithdrawCodeDialog = ref(false);

    // reactive
    const state = reactive({
      tabList: [],
      memberList: [],
      currentKey: 0,
      tabIndex: 0,
      showTransferDialog: false,
      transferInfo: undefined,
      userInfoOParams: {
        condition: 'account',
        sort: 'balance',
        pageIndex: 1,
        value: keyword.value ? keyword.value : undefined,
      },
    });

    // computed
    const id = computed(() => store.state.user.id);
    const account = computed(() => store.state.user.account);
    const superiorAccount = computed(() => store.state.user.superiorAccount);
    const withdrawalCodeSetting = computed(() => store.state.user.withdrawalCodeSetting);

    // methods
    const getTranstoSub = async () => {
      const { code, data } = await MemberApi.getUserPartialInfo({
        userId: id.value,
        requestInfo: ['transToSub'],
      });
      if (code === 200) {
        transToSub.value = data.transToSub;
        if (data.transToSub) {
          await nextTick(() => {
            if (data.transToSub === 1) {
              state.tabList = [{ id: 1, label: t('views_profile_transfer_tabList_subTransfer') }];
            } else if (data.transToSub === 2) {
              state.tabList = [{ id: 3, label: t('views_profile_transfer_tabList_superiorTransfer') }, { id: 1, label: t('views_profile_transfer_tabList_subTransfer') }];
            } else if (data.transToSub === 3) {
              state.tabList = [{ id: 3, label: t('views_profile_transfer_tabList_superiorTransfer') }];
            }
          });
        }
      }
    };

    const getSubUserInfo = async (params) => {
      const { code, data } = await MemberApi.getSubUserInfo(params);
      if (code === 200) {
        if (isArray(data.content)) {
          // 餘額從小排到大
          const sortedData = [...data.content].sort((a, b) => a.balance - b.balance);
          if (data.first) {
            state.memberList = sortedData;
          } else {
            state.memberList = [...state.memberList, ...sortedData];
          }

          isLastPage.value = data.last;
          nextTick(() => {
            if (scroll.value) {
              scroll.value.lastPageCheck(isLastPage.value);
              scroll.value.refresh();
            }
          });
        }
      }
    };
    const loadMoreSubAccount = async () => {
      state.userInfoOParams.pageIndex += 1;
      await getSubUserInfo(state.userInfoOParams);
    };

    const pullingDown = async () => {
      state.userInfoOParams.pageIndex = 1;
      await getSubUserInfo(state.userInfoOParams);

      scroll.value.finishPullDown();
      scroll.value.refresh();
    };

    const handleSearch = async () => {
      if (keyword.value) {
        state.userInfoOParams.value = keyword.value;
        await getSubUserInfo(state.userInfoOParams);
      } else {
        state.userInfoOParams.value = undefined;
        await getSubUserInfo(state.userInfoOParams);
      }
    };

    const handleSearchDelete = () => {
      if (keyword.value) {
        keyword.value = '';
      }
    };

    const handlerTransferDialog = (targetAccount) => {
      if (account.value === targetAccount) {
        return;
      }
      if (!withdrawalCodeSetting.value) {
        window.$vue.$message.info(t('views_profile_transfer_noWithdrawCode'));
        setTimeout(() => {
          window.$vue.$message.destroy();
          router.push({
            name: 'profile-wallet',
            query: {
              routeFrom: 'backToTransfer',
            },
          });
        }, 1500);
      } else {
        transferAccount.value = targetAccount;
        state.showTransferDialog = true;
      }
    };

    const openWithdrawCode = (info) => {
      // state.transferInfo = info;
      store.commit('SET_TRANSFER_INFO', info);
      state.showTransferDialog = false;
      showWithdrawCodeDialog.value = true;
    };

    const getBankcard = async () => {
      const params = {
        unit: 'USDT',
        receivePaymentSetting: 'VIRTUAL_WALLET',
      };
      const { code, data } = await MemberApi.getBankcard(params);
      if (code === 200) {
        store.commit('SET_WITHDRAW_CODE', data.info.withdrawalCodeSetting);
      }
    };

    // hooks
    onMounted(async () => {
      await getTranstoSub();
      await getSubUserInfo(state.userInfoOParams);
      await getBankcard();
    });
    return {
      state,
      transToSub,
      keyword,
      scroll,
      account,
      superiorAccount,
      loadMoreSubAccount,
      pullingDown,
      handlerTransferDialog,
      openWithdrawCode,
      showWithdrawCodeDialog,
      transferAccount,
      withdrawalCodeSetting,
      handleSearch,
      handleSearchDelete,
    };
  },
};
</script>

<style lang="postcss" scoped>
.report-search {
  ::v-deep(.ant-input-affix-wrapper) {
    flex-direction: row-reverse;
    align-items: center;
    padding: 6px 6px 6px 10px;
    border-radius: 5px;

    &:hover {
      border-color: #f2f2f2;
    }
  }

  ::v-deep(.ant-input-affix-wrapper-focused) {
    box-shadow: none;
  }

  ::v-deep(.ant-input) {
    border: 0 !important;
    border-radius: 0 !important;
    color: #333 !important;
    font-size: 12px !important;
    background-color: transparent !important;
  }

  ::v-deep(.ant-input-prefix) {
    width: 20px;
    height: 20px;
    margin: 0;

    .not-allowed {
      cursor: not-allowed;
    }
  }

  .delete {
    position: absolute;
    right: 35px;
    width: 16px;
  }
}

.table-head {
  background: #ecf2f8;

  &.show-superior {
    .account {
      flex: 0 0 90%;
      text-align: center;
    }
  }
}

.table-content {
  &.show-superior {
    .account {
      flex: 0 0 90%;
      text-align: center;
    }
  }

  &.no-cursor {
    cursor: auto;
  }
}

.account {
  flex: 0 0 35%;
}

.superior-account {
  flex: 0 0 35%;
}

.balance {
  flex: 0 0 20%;
}

.arrow {
  flex: 1 0 0;

  img {
    width: 12px;
    margin-left: auto;
  }
}

.game-tab {
  ::v-deep(.d-tabs-mobile-box) {
    justify-content: space-around !important;
  }
}
</style>
