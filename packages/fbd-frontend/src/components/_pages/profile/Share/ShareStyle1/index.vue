<template>
  <div class="share">
    <d-loading :loading="loadingBool" />
    <d-header-row
      bg-color="transparent"
      text-color="#1F2022"
      icon-color="black"
      :title="$t('components_pages_profile_share_title')"
      right-components="info"
      @openInfo="openInfo"
    />

    <div
      class="share-area"
      :class="{'overflow-hidden': showShareInfo}"
    >
      <div class="share-box">
        <div class="adjustment-area">
          <div class="adjustment-item">
            <div
              class="adjustment-title font-blod"
              v-text="$t('components_pages_profile_share_friend')"
            />
            <div class="adjustment-persecnt font-blod">
              {{ checkFriendsNP }}%
            </div>
            <div class="adjustment-prompt">
              <div class="prompt-box font-blod">
                <img
                  class="adjustment-amount-border"
                  :src="$requireSafe('profile/share/friends-border.svg')"
                  alt=""
                >
                <div class="adjustment-prompt-amount">
                  {{ $t('components_pages_profile_share_placeAnOrder') }}
                </div>
              </div>
              <img
                class="adjustment-friends-img"
                :src="$requireSafe('profile/share/friends.svg')"
                alt="friends"
              >
              <div
                class="adjustment-prompt-text font-blod"
                v-text="$t('components_pages_profile_share_friend')"
              />
              <div
                class="text-sm font-blod"
                v-text="$t('components_pages_profile_share_withAllTheFriendsBelow')"
              />
            </div>
            <div class="adjustment-number">
              <div
                class="adjustment-number-text"
                v-text="$t('components_pages_profile_share_theMaximumShareableLimitIs')"
              />
              <div class="font-blod">
                {{ checkFriendsNP }}%
              </div>
            </div>
          </div>

          <div class="adjustment-item">
            <div
              class="adjustment-title font-blod"
              v-text="$t('components_pages_profile_share_self')"
            />
            <div
              class="adjustment-enter"
              v-if="(checkEditBtn && state.info.status === 'SET') || (!checkEditBtn && state.info.status === 'UNSET')"
            >
              <div class="self-input">
                <MinusOutlined
                  class="enter-reduce"
                  @click="reducePersenct()"
                />
                <div class="input">
                  <a-input
                    v-one-decimal-places
                    v-model:value="myselfPersecnt"
                  />
                  <div class="symbol">
                    %
                  </div>
                </div>
                <PlusOutlined
                  class="enter-increase"
                  @click="increasePersecnt()"
                />
              </div>
            </div>
            <div
              class="adjustment-persecnt font-blod"
              v-else
            >
              {{ `${checkMyselfNP}` }}%
            </div>
            <div class="adjustment-prompt font-blod">
              <div class="prompt-box">
                <img
                  class="adjustment-amount-border"
                  :src="$requireSafe('profile/share/self-border.svg')"
                  alt=""
                >
                <div class="adjustment-prompt-amount">
                  {{ $t('components_pages_profile_share_getMoney', {checkMyselfNP,}) }}
                </div>
              </div>
              <img
                class="adjustment-myself-img"
                :src="$requireSafe('profile/share/myself.svg')"
                alt="myself"
              >
              <div
                class="adjustment-prompt-text"
                v-text="$t('components_pages_profile_share_self')"
              />
            </div>
            <div class="adjustment-number mt-4">
              <div
                class="adjustment-number-text"
                v-text="$t('components_pages_profile_share_available')"
              />
              <div>100&nbsp;*&nbsp;<span class="blue-text">{{ checkMyselfNP }}%</span></div>
            </div>
          </div>
        </div>

        <div
          class="agent-area"
          v-if="(!editMode && state.info.status === 'SET') || state.info.status==='SET_REACH_LIMIT'"
        >
          <div class="agent-code">
            <div
              class="agent-code-title"
              v-text="$t('components_pages_profile_share_exclusiveRecommendationCode')"
            />
            <div class="agent-code-content">
              <div
                class="agent-code-number"
                v-text="state.info.agentCode"
              />
              <div
                class="agent-code-copy is-btn"
                @click="copyByText(state.info.agentCode)"
              >
                <img
                  :src="$requireSafe('profile/share/copy.svg')"
                  alt="copy"
                >
              </div>
            </div>
          </div>

          <div class="agent-code">
            <div
              class="agent-code-title"
              v-text="$t('components_pages_profile_share_sharingLinks')"
            />
            <div class="agent-code-content">
              <div
                class="agent-code-number"
                v-text="limitUrl(`${sharedUrl}?a=x&c=${state.info.agentCode}${agentDomain ? `&d=${agentDomain}` : ''}`)"
              />
              <div
                class="agent-code-copy is-btn"
                @click="copyByText(`${sharedUrl}?a=x&c=${state.info.agentCode}${agentDomain ? `&d=${agentDomain}` : ''}`)"
              >
                <img
                  :src="$requireSafe('profile/share/copy.svg')"
                  alt="copy"
                >
              </div>
            </div>
          </div>

          <div class="qr-code-area">
            <div
              class="qr-code-title"
              v-text="$t('components_pages_profile_share_scanCodeSharing')"
            />
            <div class="qr-code-img">
              <img
                :src="qrCode"
                alt="qr-code"
              >
            </div>
          </div>
        </div>

        <div>
          <div
            class="btn-area"
            v-if="canEdit"
          >
            <div
              class="btn"
              v-text="checkEditBtn ? $t('components_pages_profile_share_confirm') : $t('components_pages_profile_share_generateInvitationCode')"
              @click="handleAgent()"
            />
            <div
              v-if="checkEditBtn"
              class="btn-prompt"
              v-text="$t('components_pages_profile_share_prompt1')"
            />
          </div>

          <div
            class="btn-area"
            v-else-if="!editMode && showEditBtn"
          >
            <div
              class="btn"
              v-text="$t('components_pages_profile_share_resetTheScale')"
              @click="handleReSetting()"
            />
            <div
              class="btn-prompt"
              v-text="$t('components_pages_profile_share_prompt2')"
            />
          </div>
        </div>

        <div class="remind-area">
          <div class="remind-content">
            <div class="content-text">
              <div>
                {{ $t('components_pages_profile_share_text1') }}
              </div>
              <div class="persecnt">
                {{ state.origin.lotteryPercent }}%
              </div>
            </div>
            <div v-text="$t('components_pages_profile_share_text2')" />
          </div>
        </div>
      </div>
    </div>

    <div class="share-amount-area">
      <div class="amount-box">
        <div class="info">
          <div
            class="amount-text"
            v-text="$t('components_pages_profile_share_shareBonusAvailable')"
          />
          <div
            class="amount-value"
            :class="[{'no-amount': state.amountCommission.totalAmount < 0.01}]"
          >
            {{ state.amountCommission && state.amountCommission.totalAmount.toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="amount-box">
        <div
          class="amount-btn is btn"
          :class="[{'no-amount': state.amountCommission.totalAmount < 0.01}]"
          @click="receiveAmount()"
          v-text="$t('components_pages_profile_share_receive')"
        />
      </div>
    </div>

    <d-popup
      v-model:value="showShareInfo"
      position="bottom"
      style="height: 84%;"
      :round="true"
      :title="$t('components_pages_profile_share_popup_title')"
      class="popup"
    >
      <div class="share-popup">
        <img :src="$requireSafe(`profile/share/bouns-rules-${storeLanguage}.png`)">
      </div>
    </d-popup>
  </div>
</template>

<script>
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';
import {
  ref, onMounted, computed, reactive, watch,
} from 'vue';
import NP from 'number-precision';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import QRCode from 'qrcode';
import { copyByText } from '@/assets/js/utils/utils';
import systemApi from '@/assets/js/api/systemApi';
import memberApi from '@/assets/js/api/memberApi';

export default {
  components: {
    MinusOutlined,
    PlusOutlined,
  },
  setup() {
    const myselfPersecnt = ref(0);
    const agentDomain = ref('');
    const sharelink = ref('www.google.com');
    const hierarchy = ref('');
    const common = ref('');
    const qrCode = ref(undefined);
    const editMode = ref(false);
    const showShareInfo = ref(false);
    const loadingBool = ref(false);

    const state = reactive({
      info: {
        show: true,
        sliderShow: false,
        status: undefined,
        agentCode: undefined,
      },

      amountCommission: {
        lotteryAmount: 0,
        platformAmount: 0,
        totalAmount: 0,
      },

      lottery: {
        myPercent: 0,
        friendPercent: 0,
      },

      origin: {
        lotteryPercent: 0,
        gamePercent: 0,
      },
    });

    const store = useStore();
    const { t } = useI18n();

    // computed
    const checkMyselfNP = computed(() => NP.round(Number(state.lottery.myPercent), 1));
    const checkFriendsNP = computed(() => NP.round(Number(state.lottery.friendPercent), 1));
    const sharedUrl = computed(() => store.state.info.sharedUrl);
    const showEditBtn = computed(() => state.info.status === 'SET');
    const canEdit = computed(() => (!editMode.value && state.info.status === 'UNSET') || (editMode.value && state.info.status === 'SET'));
    const checkEditBtn = computed(() => editMode.value && state.info.status === 'SET');
    const account = computed(() => store.state.user.account);
    const storeLanguage = computed(() => store.state.info.language);

    // watch
    watch(() => myselfPersecnt.value, (value) => {
      if (String(value).includes('.') && value.length < 3) return;

      if (Number(value) > state.origin.lotteryPercent) {
        myselfPersecnt.value = state.origin.lotteryPercent;
        state.lottery.myPercent = state.origin.lotteryPercent;
        state.lottery.friendPercent = (state.origin.lotteryPercent - Number(value));
      } else {
        myselfPersecnt.value = Number(value);
        state.lottery.myPercent = Number(value);
        state.lottery.friendPercent = (state.origin.lotteryPercent - Number(value));
      }
    });

    // methods
    const handleReSetting = () => {
      editMode.value = true;
    };

    const openInfo = () => {
      showShareInfo.value = true;
    };

    /**
     * url显示限制
     */
    const limitUrl = (url) => {
      // const vm = this;
      if (url !== undefined && url.length > 45) {
        const urlLimit = url.substr(0, 45);
        return `${urlLimit}...`;
      }
      return url;
    };

    const reducePersenct = () => {
      if (state.lottery.myPercent > 0.1) {
        Math.floor(state.lottery.myPercent -= 0.1);
        Math.floor(state.lottery.friendPercent += 0.1);
        myselfPersecnt.value = checkMyselfNP.value;
      }
    };

    const increasePersecnt = () => {
      if (state.lottery.myPercent < state.origin.lotteryPercent) {
        state.lottery.myPercent = NP.plus(state.lottery.myPercent, 0.1);
        Math.floor(state.lottery.friendPercent -= 0.1);
        myselfPersecnt.value = checkMyselfNP.value;
      }
    };

    const getSystemConfig = async () => {
      const { code, data } = await systemApi.getSystemConfig();
      if (code === 200 && data) {
        const {
          hierarchyCommissionRatio,
          platformCommissionMode,
        } = data.commissionSetting;

        hierarchy.value = hierarchyCommissionRatio;
        common.value = platformCommissionMode;

        store.commit('SET_SYSTEM_CONFIG', data);
      }
    };

    /**
     * 取得返点金额
     */
    const getAgentCommission = async () => {
      const { code, data } = await memberApi.getAgentCommission(true);
      if (code === 200) {
        const amountData = data || {};

        const { lottery, platform } = amountData;

        if (lottery.length > 0) {
          state.amountCommission.lotteryAmount = lottery.reduce((acc, item) => NP.plus(acc, NP.times(NP.divide(NP.minus(item.agentRate, item.childAgentRate), 2000), item.amount)), 0);
        } else {
          state.amountCommission.lotteryAmount = 0;
        }
        if (platform.length > 0) {
          state.amountCommission.platformAmount = platform.reduce((acc, item) => NP.plus(acc, NP.times(NP.minus(item.agentRate, item.childAgentRate), item.amount)), 0);
        } else {
          state.amountCommission.platformAmount = 0;
        }

        state.amountCommission.totalAmount = NP.plus(state.amountCommission.lotteryAmount, state.amountCommission.platformAmount);
      }
    };

    /**
     * 取得返点设定状态
     */
    const getAgentSetting = async () => {
      const { code, data } = await memberApi.getAgentSetting();
      if (code === 200) {
        const agentData = data;

        state.info.status = agentData.status;
        state.info.agentCode = agentData.agentCode;

        const options = {
          margin: 1,
          errorCorrectionLevel: 'L',
        };

        const imgUrl = await QRCode.toDataURL(`${sharedUrl.value}?a=x&c=${state.info.agentCode}`, options);
        qrCode.value = imgUrl;

        state.origin.lotteryPercent = NP.times(agentData.info.lotteryAgentCommissionRate, 100);

        state.lottery.myPercent = state.origin.lotteryPercent;

        state.lottery.friendPercent = NP.times(agentData.info.lotteryChildAgentCommissionRate || 0, 100);

        if (state.info.status === 'SET' || state.info.status === 'SET_REACH_LIMIT') {
          state.lottery.myPercent = NP.minus(state.origin.lotteryPercent, state.lottery.friendPercent);
        }
      }
    };

    /**
     * 设定返点代理比例
     */
    const setAgentSetting = async () => {
      const { code, message } = await memberApi.setAgentSetting({
        lotteryChildAgentCommissionrate: NP.divide(checkFriendsNP.value, 100),
        platformGameChildAgentCommissionrate: 0,
      });
      if (code === 200) {
        getAgentSetting();
        window.$vue.$message.success(t('error47'));
      } else {
        window.$vue.$message.error(message);
      }
    };

    const handleAgent = async () => {
      await setAgentSetting();
    };

    /**
     * 领取金额
     */
    const receiveAmount = async () => {
      if (state.info.sliderShow) {
        window.$vue.$message.error(t('error48'));
        return;
      }

      if (state.amountCommission.totalAmount > 0) {
        const res = await memberApi.getAgentDraw();
        if (res.code === 200) {
          window.$vue.$message.success(t('error49'));
          await getAgentCommission();
        } else {
          window.$vue.$message.error(t('error50'));
        }
      } else {
        window.$vue.$message.error(t('error51'));
      }
    };

    /**
     * 取得自身代理域名
     */
    const getAccountSiteAgentDomain = async () => {
      const { code, data } = await systemApi.getAccountSiteAgentDomain(account.value);
      if (code === 200 && data) {
        agentDomain.value = data.dnsName;
      }
    };

    onMounted(async () => {
      loadingBool.value = true;
      await getAccountSiteAgentDomain();
      await getSystemConfig();
      await getAgentCommission();
      await getAgentSetting();
      loadingBool.value = false;

      myselfPersecnt.value = checkMyselfNP.value;
    });

    return {
      handleAgent,
      handleReSetting,
      copyByText,
      reducePersenct,
      increasePersecnt,
      myselfPersecnt,
      checkMyselfNP,
      // friendsPersecnt,
      checkFriendsNP,
      sharelink,
      openInfo,
      hierarchy,
      common,
      state,
      receiveAmount,
      qrCode,
      showEditBtn,
      canEdit,
      editMode,
      checkEditBtn,
      limitUrl,
      showShareInfo,
      sharedUrl,
      agentDomain,
      storeLanguage,
      loadingBool,
    };
  },
};
</script>

<style lang="scss" scoped>
.share {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  background-image: url('~@/assets/img/profile/share/bg-white-version.png');
  background-repeat: no-repeat;
  background-size: 100%;
}

::v-deep(.header-row) {
  background: transparent;
}

.share-area {
  height: 100%;
  padding: 0 15px;
  padding-top: 148px;
  padding-bottom: 120px;
  overflow-y: auto;
  color: #333;
}

.adjustment-enter {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  .enter-reduce {
    margin-right: 16px;
  }

  .enter-increase {
    margin-left: 16px;
  }

  .point {
    margin-top: 8px;
  }

  .self-input {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f2f2f2;
    border-radius: 16px;
    box-shadow: inset 1px 1px 2px #4d577240;
    width: 138px;
    height: 32px;
    font-size: 16px;

    .input {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .symbol {
        position: absolute;
        right: 13px;
      }
    }

  }

  ::v-deep(.ant-input) {
    width: 3.5rem;
    border: none !important;
    background-color: transparent !important;
  }
}

.adjustment-area {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 3px #b99a524d;

  .adjustment-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 20px 0;

    .adjustment-title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
      color: #333;
      font-size: 14px;
    }

    .adjustment-persecnt {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 72px;
      height: 32px;
      margin-bottom: 20px;
    }

    .adjustment-prompt {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .adjustment-prompt-amount {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 90%;
        font-size: 14px;
      }

      .adjustment-friends-img {
        width: 40px;
        height: 40px;
        margin-top: 5px;
      }

      .adjustment-myself-img {
        width: 23px;
        height: 22px;
        margin-top: 18px;
        margin-bottom: 8px;
      }

      .adjustment-prompt-text {
        font-size: 14px;
      }
    }

    .adjustment-number {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 129px;
      height: 54px;
      margin-top: 7px;
      border-radius: 5px;
      font-size: 12px;
      background: #f2f2f2;

      &.mt-4 {
        margin-top: 22px;
      }
    }
  }
}

.adjustment-number-text {
  font-size: 12px;
  color: #999999;
}

.agent-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 5px;

  .agent-code {
    width: 100%;
    margin-top: 10px;
    font-size: 12px;

    .agent-code-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin: 5px 0;
      padding: 8px 10px;
      border-radius: 3px;
      background: #fbfbfb;
    }
  }
}

.qr-code-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 5px;

  .qr-code-title {
    width: 100%;
    font-size: 12px;
  }

  .qr-code-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 5px 0;
    padding: 8px 10px;
    border-radius: 3px;
    background: #fbfbfb;
  }
}

.btn-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 145px;
    height: 32px;
    border-radius: 18px;
    font-size: 12px;
    background: linear-gradient(180deg, #ffcd5b 0%, #f3ac0a 100%);
    box-shadow: 0 3px 6px #00000029;
  }

  .btn-prompt {
    margin-top: 10px;
    color: #fc4718;
    font-size: 12px;
  }
}

.remind-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;

  .remind-content {
    width: 100%;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 12px;
    background: #fbfbfb;

    .content-text {
      display: flex;
      align-items: center;

      .persecnt {
        margin-left: 5px;
        color: #fc4718;
      }
    }
  }
}

.share-amount-area {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 68px;
  background: #fbfbfb;

  .amount-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;

    .amount-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 68px;
      height: 26px;
      border-radius: 20px;
      font-size: 12px;
      background: linear-gradient(180deg, #ffcd5b 0%, #f3ac0a 100%);

      &.no-amount {
        color: #fff;
        background: linear-gradient(180deg, #e5e5e5 0%, #bdbdbd 100%);
      }
    }

    .info {
      font-size: 12px;

      .amount-value {
        color: #0e88f5;
        font-size: 18px;

        &.no-amount {
          color: #E5E5E5;
        }
      }
    }
  }
}

.font-blod {
  font-weight: bold;
}

.prompt-box {
  position: relative;
}

.share-popup {
  max-height: 39rem;
}

.blue-text {
  color: #0e88f5;
}

.text-sm {
  font-size: 12px;
}

.overflow-hidden {
  overflow: hidden;
}
</style>
