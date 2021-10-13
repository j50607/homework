<template>
  <div
    class="share"
    :class="[checkSiteStyle()]"
  >
    <d-loading :loading="loadingBool" />
    <d-header-row
      bg-color="transparent"
      :text-color="checkHeaderTextColor()"
      :icon-color="checkStyleColor()"
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
              <div class="relative font-blod">
                <img
                  class="adjustment-amount-border"
                  :src="$requireSafe(`profile/share/${checkSiteStyle()}/friends-border.svg`)"
                  alt=""
                >
                <div class="adjustment-prompt-amount">
                  {{ $t('components_pages_profile_share_placeAnOrder') }}
                </div>
              </div>
              <img
                class="adjustment-friends-img"
                :src="$requireSafe(`profile/share/${checkSiteStyle()}/friends.svg`)"
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
              <div class="relative">
                <img
                  class="adjustment-amount-border"
                  :src="$requireSafe(`profile/share/${checkSiteStyle()}/self-border.svg`)"
                  alt=""
                >
                <div class="adjustment-prompt-amount">
                  {{ $t('components_pages_profile_share_getMoney', {checkMyselfNP}) }}
                </div>
              </div>
              <img
                class="adjustment-myself-img"
                :src="$requireSafe(`profile/share/${checkSiteStyle()}/myself.svg`)"
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
              <div>100&nbsp;*&nbsp;<span class="text-color">{{ checkMyselfNP }}%</span></div>
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
                  :src="$requireSafe(`profile/share/${checkSiteStyle()}/copy.svg`)"
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
                  :src="$requireSafe(`profile/share/${checkSiteStyle()}/copy.svg`)"
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
              class="btn is-btn"
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
              class="btn is-btn"
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
            {{ state.amountCommission && floorToDigitTwo(state.amountCommission.totalAmount) }}
          </div>
        </div>
      </div>
      <div class="amount-box">
        <div
          class="amount-btn is-btn"
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
        <img :src="$requireSafe(`profile/share/${checkSiteStyle()}/bouns-rules-${storeLanguage}.png`)">
      </div>
    </d-popup>
  </div>
</template>

<script>
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { copyByText } from '@/assets/js/utils/utils';
import useShare from '@/views/profile/share/mixins/useShare';

export default {
  components: {
    MinusOutlined,
    PlusOutlined,
  },
  setup() {
    const {
      handleAgent,
      handleReSetting,
      reducePersenct,
      increasePersecnt,
      myselfPersecnt,
      checkMyselfNP,
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
      checkSiteStyle,
      checkHeaderTextColor,
      checkStyleColor,
      floorToDigitTwo,
    } = useShare();

    return {
      copyByText,
      handleAgent,
      handleReSetting,
      reducePersenct,
      increasePersecnt,
      myselfPersecnt,
      checkMyselfNP,
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
      checkSiteStyle,
      checkHeaderTextColor,
      checkStyleColor,
      floorToDigitTwo,
    };
  },
};
</script>

<style lang="scss" scoped>
.share {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--check-share-bg);

  &.style1 {
    background-image: url('~@/assets/img/profile/share/style1/bg.png');
    background-repeat: no-repeat;
    background-size: 100%;

    .adjustment-area {
      box-shadow: 0 1px 3px #b99a524d;
    }

    .adjustment-enter {
      ::v-deep(.ant-input) {
        width: 3.5rem;
        border: none !important;
        background-color: transparent !important;
      }
    }
  }

  &.style2 {
    background-image: url('~@/assets/img/profile/share/style2/bg.png');
    background-repeat: no-repeat;
    background-size: 100%;

    .adjustment-enter {
      .self-input {
        color: #1f2022;
      }

      ::v-deep(.ant-input) {
        width: 3.5rem;
        border: none !important;
        color: #1f2022 !important;
        background-color: #fff !important;
      }
    }
  }
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
  color: var(--check-share-text-color1);
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
    width: 138px;
    height: 32px;
    border: 1px solid var(--check-share-text-color5);
    border-radius: 16px;
    font-size: 16px;
    background: var(--check-share-input-bg);
    box-shadow: inset 1px 1px 2px #4d577240;

    .input {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .symbol {
        position: absolute;
        right: 10px;
      }
    }
  }
}

.adjustment-area {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-radius: 5px;
  background: var(--check-share-primary);

  .text-color {
    color: var(--check-share-text-color3);
  }

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
      color: var(--check-share-text-color1);
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
        right: 0;
        bottom: 0;
        left: 0;
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
      background: var(--check-share-text-color5);

      &.mt-4 {
        margin-top: 22px;
      }
    }
  }
}

.adjustment-number-text {
  color: #999;
  font-size: 12px;
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

    .agent-code-title {
      color: var(--check-share-text-color6);
    }

    .agent-code-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin: 5px 0;
      padding: 8px 10px;
      border-radius: 3px;
      color: var(--check-share-text-color1);
      background: var(--check-share-text-color7);
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
    color: var(--check-share-text-color6);
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
    background: var(--check-share-text-color7);
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
    color: var(--check-share-text-color8);
    font-size: 12px;
    background: linear-gradient(180deg, #ffcd5b 0%, #f3ac0a 100%);
    box-shadow: 0 3px 6px #00000029;
  }

  .btn-prompt {
    margin-top: 10px;
    color: #fc4718;
    font-weight: 400;
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
    background: var(--check-share-text-color7);

    .content-text {
      display: flex;
      align-items: center;

      .persecnt {
        margin-left: 5px;
        color: var(--check-share-text-color4);
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
  background: var(--check-share-text-color7);

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
        color: var(--check-share-text-color8);
        background: linear-gradient(180deg, #e5e5e5 0%, #bdbdbd 100%);
      }
    }

    .info {
      font-size: 12px;

      .amount-value {
        color: var(--check-share-text-color3);
        font-size: 18px;

        &.no-amount {
          color: #e5e5e5;
        }
      }
    }
  }
}

::v-deep(.popup) {
  background-color: var(--check-share-bg);

  .d-popup-content {
    background-color: var(--check-share-bg);
  }
}

.share-popup {
  max-height: 39rem;
}
</style>
