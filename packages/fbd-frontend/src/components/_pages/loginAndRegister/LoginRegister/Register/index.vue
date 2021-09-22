<template>
  <div ref="registerRef">
    <d-dialog
      v-model:visible="isModalShow"
      :title="$t('components_pages_loginAndRegister_loginRegister_register_new_user')"
      :footer="null"
      :width="345"
      :get-container="() => registerRef"
      @cancel="hideModal"
    >
      <template #body>
        <div class="register">
          <div class="register-box">
            <div class="input-area">
              <a-form
                ref="formRef"
                class="input-box"
                :model="state.formState"
                :rules="rules"
              >
                <a-form-item
                  class="main-input"
                  name="mainInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_login_user')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('account')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/user-account.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.mainInputValue"
                      :placeholder="`${$t('components_pages_loginAndRegister_loginRegister_login_enter_user')}`"
                      @focus="focusMainInput"
                      @blur="blurMainInput"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  class="password"
                  name="passwordInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_login_password')"
                >
                  <a-input-group
                    compact
                    class="password"
                    :class="[checkFocus('password')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/password-lock.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.passwordInputValue"
                      :type="seePassword ? 'text' : 'password'"
                      :placeholder="`${$t('components_pages_loginAndRegister_loginRegister_login_enter_password')}`"
                      @focus="focusPasswordInput"
                      @blur="blurPasswordInput"
                    />

                    <div class="eye-icon">
                      <img
                        class="eye is-btn"
                        @click="seeToPassword()"
                        :src="$requireSafe(`icon/style${siteStyle}/${eyeResult}.svg`)"
                        alt="eye"
                      >
                    </div>
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  class="password"
                  name="checkPasswordInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_confirm_password')"
                >
                  <a-input-group
                    compact
                    class="password"
                    :class="[checkFocus('checkPassword')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/password-lock.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.checkPasswordInputValue"
                      :type="seeCheckPassword? 'text' : 'password'"
                      :readonly="agentCodeReadonly"
                      :placeholder="`${$t('components_pages_loginAndRegister_loginRegister_register_password_again')}`"
                      @focus="focusCheckPasswordInput"
                      @blur="blurCheckPasswordInput"
                    />

                    <div class="eye-icon">
                      <img
                        class="eye is-btn"
                        @click="seeToCheckPassword()"
                        :src="$requireSafe(`icon/style${siteStyle}/${checkEyeResult}.svg`)"
                        alt="eye"
                      >
                    </div>
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showAgentCode"
                  name="recommendedPersonInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_agent_code')"
                >
                  <a-input-group
                    compact
                    class="main-input agent-code"
                    :class="[checkFocus('recommend'), {'has-agent-code' : agentCode}]"
                  >
                    <div class="input-icon">
                      <img
                        :class="{'has-agent-code' : agentCode}"
                        :src="$requireSafe(`icon/style${siteStyle}/paper-airplane.svg`)"
                      >
                    </div>

                    <a-input
                      v-if="agentCode"
                      :class="{'has-agent-code' : agentCode}"
                      disabled
                      :default-value="agentCode"
                    />

                    <a-input
                      v-else
                      :placeholder="registerSetting.registerAgentCode ? `${$t('components_pages_loginAndRegister_loginRegister_register_agent_code')} ${$t('components_pages_loginAndRegister_loginRegister_register_mandatory')}` : `${$t('components_pages_loginAndRegister_loginRegister_register_agent_code')}`"
                      @focus="focusRecommendInput"
                      @blur="blurRecommendInput"
                      :maxlength="8"
                      v-all-number
                      v-model:value="state.formState.recommendedPersonInputValue"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showRealName"
                  class="main-input"
                  name="realNameInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_real_name')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('realName')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/user-account.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.realNameInputValue"
                      :type="'text'"
                      :placeholder="`${$t('components_pages_loginAndRegister_loginRegister_register_real_name_placeholder')}`"
                      @focus="focusRealNameInput"
                      @blur="blurRealNameInput"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showNickname"
                  class="main-input"
                  name="nicknameInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_nickname')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('nickname')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/user-account.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.nicknameInputValue"
                      :type="'text'"
                      :placeholder="`${$t('components_pages_loginAndRegister_loginRegister_register_nickname_placeholder')}`"
                      @focus="focusNicknameInput"
                      @blur="blurNicknameInput"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showTel"
                  class="main-input"
                  name="phoneInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_phone')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('phone')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/phone.svg`)">
                    </div>

                    <a-input-number
                      v-model:value="state.formState.phoneInputValue"
                      v-all-number
                      :maxlength="20"
                      :placeholder="$t('components_pages_loginAndRegister_loginRegister_register_phone_placeholder')"
                      @focus="focusPhoneInput"
                      @blur="blurPhoneInput"
                      @keydown="checkKey"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showEmail"
                  class="main-input"
                  name="emailInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_email')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('email')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/mail.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.emailInputValue"
                      :placeholder="$t('components_pages_loginAndRegister_loginRegister_register_email_placeholder')"
                      @focus="focusEmailInput"
                      @blur="blurEmailInput"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showBirthday"
                  class="main-input"
                  name="birthdayInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_birthday')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('birthday')]"
                    @click.capture="showBirthdayPickerBool = true"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/birthday.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.birthdayInputValue"
                      :type="'text'"
                      :readonly="true"
                      :placeholder="$t('components_pages_loginAndRegister_loginRegister_register_birthday_placeholder')"
                      @focus="focusBirthdayInput"
                      @blur="blurBirthdayInput"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showGender"
                  class="main-input"
                  name="genderInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_gender')"
                >
                  <div
                    class="main-input"
                    :class="[checkFocus('gender')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/gender.svg`)">
                    </div>

                    <a-select v-model:value="state.formState.genderInputValue">
                      <a-select-option
                        v-for="(item, index) in checkGender(state.genderList)"
                        :key="index"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </a-select-option>
                    </a-select>
                  </div>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showQQ"
                  class="main-input"
                  name="qqInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_qq')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('qq')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/qq.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.qqInputValue"
                      :type="'text'"
                      :placeholder="`${$t('components_pages_loginAndRegister_loginRegister_register_qq_placeholder')}`"
                      @focus="focusQQInput"
                      @blur="blurQQInput"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showWechat"
                  class="main-input"
                  name="weixinInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_weChat')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('weixin')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/wechat.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.weixinInputValue"
                      :type="'text'"
                      :placeholder="$t('components_pages_loginAndRegister_loginRegister_register_weChat_placeholder')"
                      @focus="focusWeixinInput"
                      @blur="blurWeixinInput"
                    />
                  </a-input-group>
                </a-form-item>

                <!--whatsapp-->
                <a-form-item
                  v-if="registerSetting.showWhatsApp"
                  class="main-input"
                  name="whatsappInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_whatsApp')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('whatsApp')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/whatsapp.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.whatsappInputValue"
                      :type="'text'"
                      :placeholder="$t('components_pages_loginAndRegister_loginRegister_register_whatsApp_placeholder')"
                      @focus="focusWhatsappInput"
                      @blur="blurWhatsappInput"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showLine"
                  class="main-input"
                  name="lineInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_line')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('line')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/line.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.lineInputValue"
                      :type="'text'"
                      :placeholder="$t('components_pages_loginAndRegister_loginRegister_register_line_placeholder')"
                      @focus="focusLineInput"
                      @blur="blurLineInput"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item
                  v-if="registerSetting.showZalo"
                  class="main-input"
                  name="zaloInputValue"
                  :label="$t('components_pages_loginAndRegister_loginRegister_register_zalo')"
                >
                  <a-input-group
                    compact
                    class="main-input"
                    :class="[checkFocus('zalo')]"
                  >
                    <div class="input-icon">
                      <img :src="$requireSafe(`icon/style${siteStyle}/zalo.svg`)">
                    </div>

                    <a-input
                      v-model:value="state.formState.zaloInputValue"
                      :type="'text'"
                      :placeholder="$t('components_pages_loginAndRegister_loginRegister_register_zalo_placeholder')"
                      @focus="focusZaloInput"
                      @blur="blurZaloInput"
                    />
                  </a-input-group>
                </a-form-item>

                <a-form-item>
                  <d-button
                    type="primary"
                    block
                    :disabled="!checkInputValue"
                    @click="register()"
                  >
                    <div
                      class="register-button"
                      v-text="$t('components_pages_loginAndRegister_loginRegister_register')"
                    />
                  </d-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </template>
    </d-dialog>
    <date-picker-popup
      class="date-picker"
      v-model:visible="showBirthdayPickerBool"
      :min-date="1901"
      :not-show-today="true"
      @confirm="confirmBirthday"
    />
  </div>
</template>

<script>
import {
  ref, reactive, onMounted, computed, watch,
} from 'vue';
import * as moment from 'moment';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import DDialog from '@/components/DDialog';
import DatePickerPopup from '@/components/_pages/DatePickerPopup';
import systemApi from '@/assets/js/api/systemApi';

export default {
  emits: ['login', 'register', 'thirdPartyLogin', 'update:value', 'cancel'],
  props: {
    agentCode: {
      type: String,
      default: undefined,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DDialog,
    DatePickerPopup,
  },
  setup(props, { emit }) {
    // i18n
    const { t } = useI18n();

    const route = useRoute();

    // ref
    const formRef = ref();
    const mainInputRef = ref();
    const selectedTab = ref(0);
    const seePassword = ref(false);
    const seeCheckPassword = ref(false);
    const eyeResult = ref('eye-invisible');
    const checkEyeResult = ref('eye-invisible');
    const accountBool = ref(false);
    const passwordBool = ref(false);
    const confirmPasswordBool = ref(false);
    const registerType = ref('');
    const recommendedPersonBool = ref(false);
    const activeKey = ref(0);
    const realNameBool = ref(false);
    const nicknameBool = ref(false);
    const phoneBool = ref(false);
    const qqBool = ref(false);
    const weixinBool = ref(false);
    const whatsappBool = ref(false);
    const emailBool = ref(false);
    const lineBool = ref(false);
    const zaloBool = ref(false);
    const birthdayBool = ref(false);
    const genderBool = ref(false);

    const focusMainBool = ref(false);
    const focusPasswordBool = ref(false);
    const focusCheckPasswordBool = ref(false);
    const focusRecommendBool = ref(false);
    const focusRealNameBool = ref(false);
    const focusNicknameBool = ref(false);
    const focusPhoneBool = ref(false);
    const focusQQBool = ref(false);
    const focusWeixinBool = ref(false);
    const focusWhatsappBool = ref(false);
    const focusEmailBool = ref(false);
    const focusLineBool = ref(false);
    const focusZaloBool = ref(false);
    const focusBirthdayBool = ref(false);
    const focusGenderBool = ref(false);

    const registerRef = ref(null);
    const showBirthdayPickerBool = ref(false);
    const agentCodeReadonly = ref(false);

    // reactive
    const state = reactive({
      tabArr: [],

      zoneMap: [
        {
          zone: 'China', num: '+86', icon: 'icon-zh-CN', locale: 'zh-CN', length: 11,
        },
        {
          zone: 'Taiwan', num: '+886', icon: 'icon-zh-TW', locale: 'zh-TW', length: 9,
        },
        {
          zone: 'Japan', num: '+81', icon: 'icon-jp', locale: 'jp', length: 11,
        },
        {
          zone: 'Thailand', num: '+66', icon: 'icon-th', locale: 'th', length: 10,
        },
        {
          zone: 'Vietnam', num: '+84', icon: 'icon-vn', locale: 'vn', length: 10,
        },
        {
          zone: 'USA', num: '+1', icon: 'icon-en-US', locale: 'en-US', length: 10,
        },
      ],

      genderList: [
        { label: window.$vue.$t('components_pages_loginAndRegister_loginRegister_register_gender_male'), value: 1 },
        { label: window.$vue.$t('components_pages_loginAndRegister_loginRegister_register_gender_female'), value: 0 },
        { label: window.$vue.$t('components_pages_loginAndRegister_loginRegister_register_gender_noSetting'), value: 2 },
      ],

      formState: {
        mainInputValue: undefined,
        passwordInputValue: undefined,
        checkPasswordInputValue: undefined,
        recommendedPersonInputValue: undefined,
        realNameInputValue: undefined,
        nicknameInputValue: undefined,
        phoneInputValue: undefined,
        emailInputValue: undefined,
        qqInputValue: undefined,
        weixinInputValue: undefined,
        whatsappInputValue: undefined,
        lineInputValue: undefined,
        zaloInputValue: undefined,
        birthdayInputValue: undefined,
        genderInputValue: 2,
      },
    });

    // use
    const store = useStore();

    // validate
    const accountValidate = async (rule, value) => {
      value = value?.toString();

      const regSymbol = /[`~!@#$^&%*()=|{}':;',[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？/+/]/;

      const regFullWords = /[\u4E00-\u9FA5]+/;

      switch (registerType.value) {
        case 'ACCOUNT':
          if (!value || value === '' || !value.trim()) {
            accountBool.value = false;
            return Promise.reject(new Error(t('error1')));
          }

          if (regSymbol.test(value)) {
            accountBool.value = false;
            return Promise.reject(new Error(t('error46')));
          }

          if (regFullWords.test(value)) {
            accountBool.value = false;
            return Promise.reject(new Error(t('error45')));
          }

          if (value.length < 6 || value.length > 12) {
            accountBool.value = false;
            return Promise.reject(new Error(t('error44')));
          }

          accountBool.value = true;
          return Promise.resolve();
        default:
          return '';
      }
    };

    const passwordValidate = async (rule, value) => {
      if (!value || value.length < 6 || value.length > 12) {
        passwordBool.value = false;
        return Promise.reject(new Error(t('error2')));
      }
      if (state.formState.checkPasswordInputValue && value === state.formState.checkPasswordInputValue) {
        formRef.value.validateFields(['checkPasswordInputValue']);
      }
      passwordBool.value = true;
      return Promise.resolve();
    };

    const confirmPasswordValidate = async (rule, value) => {
      if (!value || value !== state.formState.passwordInputValue) {
        confirmPasswordBool.value = false;
        return Promise.reject(new Error(t('error3')));
      }
      confirmPasswordBool.value = true;
      return Promise.resolve();
    };

    const registerAgentCode = computed(() => store.state.info.registerSetting.registerAgentCode);
    const recommendedPersonValidate = async (rule, value) => {
      if (!value && registerAgentCode.value) {
        recommendedPersonBool.value = false;
        return Promise.reject(new Error(t('error7')));
      }
      recommendedPersonBool.value = true;
      return Promise.resolve();
    };

    const registerRealName = computed(() => store.state.info.registerSetting.registerRealName);
    const realNameValidate = async (rule, value) => {
      // const regCantFull = /[\uFF00-\uFFFF]/g;

      if (registerRealName.value) {
        if (!value || !value.trim()) {
          realNameBool.value = false;
          return Promise.reject(new Error(t('error8')));
        }
        // if (regCantFull.test(value)) {
        //   realNameBool.value = false;
        //   return Promise.reject(new Error(t('error10')));
        // }
        if (value.length > 50) {
          realNameBool.value = false;
          return Promise.reject(new Error(t('error11')));
        }
      } else if (!registerRealName.value) { // 不是必填但有输值时阻挡
        if (value) {
          if (value.length > 0 && !value.trim()) {
            realNameBool.value = false;
            return Promise.reject(new Error(t('error8')));
          }

          if (value.length > 50) {
            realNameBool.value = false;
            return Promise.reject(new Error(t('error11')));
          }
        }
      }

      realNameBool.value = true;
      return Promise.resolve();
    };

    const registerNickname = computed(() => store.state.info.registerSetting.registerNickname);
    const nicknameValidate = async (rule, value) => {
      const reg = /^[\u4E00-\u9FA5a-zA-Z0-9]+$/g;

      if (registerNickname.value) {
        if (!value || !value.trim()) {
          nicknameBool.value = false;
          return Promise.reject(new Error(t('error12')));
        } if (!(reg.test(value))) {
          nicknameBool.value = false;
          return Promise.reject(new Error(t('error13')));
        } if (value.length > 8) {
          nicknameBool.value = false;
          return Promise.reject(new Error(t('error14')));
        }
      }

      nicknameBool.value = true;
      return Promise.resolve();
    };

    const registerTel = computed(() => store.state.info.registerSetting.registerTel);
    const phoneValidate = async (rule, value) => {
      if (registerTel.value) {
        if (!value || !value.trim()) {
          phoneBool.value = false;
          return Promise.reject(new Error(t('error15')));
        } if (value.length > 20) {
          phoneBool.value = false;
          return Promise.reject(new Error(t('error5')));
        }
      }

      phoneBool.value = true;
      return Promise.resolve();
    };

    const registerEmail = computed(() => store.state.info.registerSetting.registerEmail);
    const emailValidate = async (rule, value) => {
      const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (registerEmail.value) {
        if (!value || !value.trim()) {
          emailBool.value = false;
          return Promise.reject(new Error(t('error24')));
        }

        if (!emailReg.test(value)) {
          emailBool.value = false;
          return Promise.reject(new Error(t('error25')));
        }

        if (value.length > 50) {
          emailBool.value = false;
          return Promise.reject(new Error(t('error26')));
        }
      }

      emailBool.value = true;
      return Promise.resolve();
    };

    const registerQQ = computed(() => store.state.info.registerSetting.registerQQ);
    const qqValidate = async (rule, value) => {
      const regCantContainChinese = /[`~!@#$^&*()=|{}':;',[\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]/;

      const regCantContainFull = /[\uFF00-\uFFFF]/g;

      if (registerQQ.value) {
        if (!value || !value.trim()) {
          qqBool.value = false;
          return Promise.reject(new Error(t('error16')));
        } if (regCantContainChinese.test(value)) {
          qqBool.value = false;
          return Promise.reject(new Error(t('error19')));
        } if (regCantContainFull.test(value)) {
          qqBool.value = false;
          return Promise.reject(new Error(t('error17')));
        } if (value.length > 20) {
          qqBool.value = false;
          return Promise.reject(new Error(t('error18')));
        }
      }

      qqBool.value = true;
      return Promise.resolve();
    };

    const registerWechat = computed(() => store.state.info.registerSetting.registerWechat);
    const weixinValidate = async (rule, value) => {
      const regCantContainChinese = /[`~!@#$^&*()=|{}':;',[\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]/;

      const regCantContainFull = /[\uFF00-\uFFFF]/g;

      if (registerWechat.value) {
        if (!value || !value.trim()) {
          weixinBool.value = false;
          return Promise.reject(new Error(t('error20')));
        } if (regCantContainChinese.test(value)) {
          weixinBool.value = false;
          return Promise.reject(new Error(t('error22')));
        } if (regCantContainFull.test(value)) {
          weixinBool.value = false;
          return Promise.reject(new Error(t('error21')));
        } if (value.length > 20) {
          weixinBool.value = false;
          return Promise.reject(new Error(t('error23')));
        }
      }

      weixinBool.value = true;
      return Promise.resolve();
    };

    const registerWhatsApp = computed(() => store.state.info.registerSetting.registerWhatsApp);
    const WhatsAppValidate = async (rule, value) => {
      const regCantContainChinese = /[`~!@#$^&*()=|{}':;',[\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]/;

      const regCantContainFull = /[\uFF00-\uFFFF]/g;

      if (registerWhatsApp.value) {
        if (!value || !value.trim()) {
          whatsappBool.value = false;
          return Promise.reject(new Error(t('error40')));
        } if (regCantContainChinese.test(value)) {
          whatsappBool.value = false;
          return Promise.reject(new Error(t('error41')));
        } if (regCantContainFull.test(value)) {
          whatsappBool.value = false;
          return Promise.reject(new Error(t('error42')));
        } if (value.length > 20) {
          whatsappBool.value = false;
          return Promise.reject(new Error(t('error43')));
        }
      }

      whatsappBool.value = true;
      return Promise.resolve();
    };

    const registerLine = computed(() => store.state.info.registerSetting.registerLine);
    const lineValidate = async (rule, value) => {
      const regCantContainChinese = /[`~!@#$^&*()=|{}':;',[\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]/;

      const regCantContainFull = /[\uFF00-\uFFFF]/g;

      if (registerLine.value) {
        if (!value || !value.trim()) {
          lineBool.value = false;
          return Promise.reject(new Error(t('error27')));
        } if (regCantContainChinese.test(value)) {
          lineBool.value = false;
          return Promise.reject(new Error(t('error28')));
        } if (regCantContainFull.test(value)) {
          lineBool.value = false;
          return Promise.reject(new Error(t('error29')));
        } if (value.length > 25) {
          lineBool.value = false;
          return Promise.reject(new Error(t('error30')));
        }
      }

      lineBool.value = true;
      return Promise.resolve();
    };

    const registerZalo = computed(() => store.state.info.registerSetting.registerZalo);
    const zaloValidate = async (rule, value) => {
      const regCantContainChinese = /[`~!@#$^&*()=|{}':;',[\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]/;

      const regCantContainFull = /[\uFF00-\uFFFF]/g;

      if (registerZalo.value) {
        if (!value || !value.trim()) {
          zaloBool.value = false;
          return Promise.reject(new Error(t('error31')));
        } if (regCantContainChinese.test(value)) {
          zaloBool.value = false;
          return Promise.reject(new Error(t('error32')));
        } if (regCantContainFull.test(value)) {
          zaloBool.value = false;
          return Promise.reject(new Error(t('error33')));
        } if (value.length > 20) {
          zaloBool.value = false;
          return Promise.reject(new Error(t('error34')));
        }
      }

      zaloBool.value = true;
      return Promise.resolve();
    };

    const registerBirthday = computed(() => store.state.info.registerSetting.registerBirthday);
    const birthdayValidate = async (rule, value) => {
      if (registerBirthday.value) {
        if (!value || !value.trim() || (value instanceof Date && Number.isNaN(value)) || value === 'Invalid date') {
          birthdayBool.value = false;
          return Promise.reject(new Error(t('error35')));
        }
      }

      birthdayBool.value = true;
      return Promise.resolve();
    };

    const registerGender = computed(() => store.state.info.registerSetting.registerGender);
    const genderValidate = async (rule, value) => {
      if (registerGender.value) {
        if (value !== 0 && value !== 1 && value !== 2) {
          genderBool.value = false;
          return Promise.reject(new Error(t('error36')));
        }
      }

      genderBool.value = true;
      return Promise.resolve();
    };

    // computed
    const siteStyle = computed(() => store.getters.siteStyle);
    const siteName = computed(() => store.state.info.siteInfo.name);
    const siteId = computed(() => store.state.info.siteId);
    const registerSetting = computed(() => store.state.info.registerSetting);

    // watch
    watch(() => props.agentCode, (val) => {
      if (val) {
        state.formState.recommendedPersonInputValue = val;
      }
    }, { immediate: true });

    // rules
    const rules = reactive({
      mainInputValue: [
        {
          required: true, validator: accountValidate, trigger: 'change',
        },
      ],
      passwordInputValue: [
        {
          required: true, validator: passwordValidate, trigger: 'change',
        },
      ],
      checkPasswordInputValue: [
        {
          required: true, validator: confirmPasswordValidate, trigger: 'change',
        },
      ],
      recommendedPersonInputValue: [
        {
          required: registerAgentCode.value, validator: recommendedPersonValidate, trigger: 'change',
        },
      ],
      realNameInputValue: [{ required: registerRealName.value, validator: realNameValidate, trigger: 'change' }],
      nicknameInputValue: [{ required: registerNickname.value, validator: nicknameValidate, trigger: 'change' }],
      phoneInputValue: [{ required: registerTel.value, validator: phoneValidate, trigger: 'change' }],
      emailInputValue: [{ required: registerEmail.value, validator: emailValidate, trigger: 'change' }],
      qqInputValue: [{ required: registerQQ.value, validator: qqValidate, trigger: 'change' }],
      weixinInputValue: [{ required: registerWechat.value, validator: weixinValidate, trigger: 'change' }],
      whatsappInputValue: [{ required: registerWhatsApp.value, validator: WhatsAppValidate, trigger: 'change' }],
      lineInputValue: [{ required: registerLine.value, validator: lineValidate, trigger: 'change' }],
      zaloInputValue: [{ required: registerZalo.value, validator: zaloValidate, trigger: 'change' }],
      birthdayInputValue: [{ required: registerBirthday.value, validator: birthdayValidate, trigger: 'change' }],
      genderInputValue: [{ required: registerGender.value, validator: genderValidate, trigger: 'change' }],
    });

    // computed
    const isModalShow = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val),
    });

    const agentCode = computed(() => store.state.user.agentCode);

    const isAccountBool = computed(() => {
      if (accountBool.value && state.formState.mainInputValue) {
        return true;
      }

      return false;
    });

    const isPasswordBool = computed(() => {
      if (passwordBool.value && state.formState.passwordInputValue) {
        return true;
      }

      return false;
    });

    const isConfirmPasswordBool = computed(() => {
      if (confirmPasswordBool.value && state.formState.checkPasswordInputValue) {
        return true;
      }

      return false;
    });

    const isAgentCodeBool = computed(() => {
      if (registerAgentCode.value) {
        if (recommendedPersonBool.value && state.formState.recommendedPersonInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isRealNameBool = computed(() => {
      if (registerRealName.value) {
        if (realNameBool.value && state.formState.realNameInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isNicknameBool = computed(() => {
      if (registerNickname.value) {
        if (nicknameBool.value && state.formState.nicknameInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isPhoneBool = computed(() => {
      if (registerTel.value) {
        if (phoneBool.value && state.formState.phoneInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isEmailBool = computed(() => {
      if (registerEmail.value) {
        if (emailBool.value && state.formState.emailInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isBirthdayBool = computed(() => {
      if (registerBirthday.value) {
        if (birthdayBool.value && state.formState.birthdayInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isGenderBool = computed(() => {
      if (registerGender.value) {
        if (genderBool.value && state.formState.genderInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isQQBool = computed(() => {
      if (registerQQ.value) {
        if (qqBool.value && state.formState.qqInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isWechatBool = computed(() => {
      if (registerWechat.value) {
        if (weixinBool.value && state.formState.weixinInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isWhatsappBool = computed(() => {
      if (registerWhatsApp.value) {
        if (whatsappBool.value && state.formState.whatsappInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isLineBool = computed(() => {
      if (registerLine.value) {
        if (lineBool.value && state.formState.lineInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const isZaloBool = computed(() => {
      if (registerZalo.value) {
        if (zaloBool.value && state.formState.zaloInputValue) {
          return true;
        }
        return false;
      }
      return true;
    });

    const checkInputValue = computed(() => {
      if (isAccountBool.value && isPasswordBool.value && isConfirmPasswordBool.value && isAgentCodeBool.value && isRealNameBool.value && isNicknameBool.value && isPhoneBool.value && isEmailBool.value && isBirthdayBool.value && isGenderBool.value && isQQBool.value && isWechatBool.value && isWhatsappBool.value && isLineBool.value && isZaloBool.value) {
        return true;
      }

      return false;
    });
    // methods
    const hideModal = () => {
      emit('cancel', false);
    };

    const seeToPassword = () => {
      seePassword.value = !seePassword.value;

      eyeResult.value = seePassword.value ? 'eye' : 'eye-invisible';
    };

    const seeToCheckPassword = () => {
      seeCheckPassword.value = !seeCheckPassword.value;

      checkEyeResult.value = seeCheckPassword.value ? 'eye' : 'eye-invisible';
    };

    /**
     * 注册
     */
    const register = () => {
      formRef.value.validate().then(() => {
        emit('register', {
          formState: state.formState, registerType, validateBool: false,
        });
      });
    };

    const thirdPartyLogin = () => {
      emit('thirdPartyLogin');
    };

    const showTabsArr = () => {
      const result = [
        { label: '賬號', registerType: 'ACCOUNT' },
      ];

      result.forEach((e) => {
        state.tabArr.push(e);
      });
    };

    const confirmBirthday = ({ startDate }) => {
      state.formState.birthdayInputValue = moment(startDate).format('YYYY/MM/DD');
    };

    /*
     * 分享好友 => 获取邀请者的邀请码
     */
    const checkSiteDomain = async () => {
      const c = route.query.c || agentCode.value;

      const { code, data } = await systemApi.checkSiteDomain(window.location.hostname);

      if (code === 200 && data && String(data).trim() && data !== 'null' && data !== 'undefined') {
        state.formState.recommendedPersonInputValue = data;
        agentCodeReadonly.value = true;
        store.commit('SET_AGENT_CODE', data);
      }

      if (!register.agentCodeReadonly && c && String(c).trim() && c !== 'null' && c !== 'undefined') {
        state.formState.recommendedPersonInputValue = c;
        agentCodeReadonly.value = true;
        store.commit('SET_AGENT_CODE', c);
      }
    };

    const checkGender = (list) => {
      let result = [];

      if (registerSetting.value.registerGender) {
        result = list.splice(2, 1);
      }

      result = state.genderList;

      return result;
    };

    const focusMainInput = (val) => {
      if (val && val.type === 'focus') {
        focusMainBool.value = true;
      }
    };

    const blurMainInput = (val) => {
      if (val) {
        focusMainBool.value = false;
      }
    };

    const focusPasswordInput = (val) => {
      if (val && val.type === 'focus') {
        focusPasswordBool.value = true;
      }
    };

    const blurPasswordInput = (val) => {
      if (val) {
        focusPasswordBool.value = false;
      }
    };

    const focusCheckPasswordInput = (val) => {
      if (val && val.type === 'focus') {
        focusCheckPasswordBool.value = true;
      }
    };

    const blurCheckPasswordInput = (val) => {
      if (val) {
        focusCheckPasswordBool.value = false;
      }
    };

    const focusRecommendInput = (val) => {
      if (val && val.type === 'focus') {
        focusRecommendBool.value = true;
      }
    };

    const blurRecommendInput = (val) => {
      if (val) {
        focusRecommendBool.value = false;
      }
    };

    const focusRealNameInput = (val) => {
      if (val && val.type === 'focus') {
        focusRealNameBool.value = true;
      }
    };

    const blurRealNameInput = (val) => {
      if (val) {
        focusRealNameBool.value = false;
      }
    };

    const focusNicknameInput = (val) => {
      if (val && val.type === 'focus') {
        focusNicknameBool.value = true;
      }
    };

    const blurNicknameInput = (val) => {
      if (val) {
        focusNicknameBool.value = false;
      }
    };

    const focusPhoneInput = (val) => {
      if (val && val.type === 'focus') {
        focusPhoneBool.value = true;
      }
    };

    const blurPhoneInput = (val) => {
      if (val) {
        focusPhoneBool.value = false;
      }
    };

    const focusQQInput = (val) => {
      if (val && val.type === 'focus') {
        focusQQBool.value = true;
      }
    };

    const blurQQInput = (val) => {
      if (val) {
        focusQQBool.value = false;
      }
    };

    const focusWeixinInput = (val) => {
      if (val && val.type === 'focus') {
        focusWeixinBool.value = true;
      }
    };

    const blurWeixinInput = (val) => {
      if (val) {
        focusWeixinBool.value = false;
      }
    };

    const focusWhatsappInput = (val) => {
      if (val && val.type === 'focus') {
        focusWhatsappBool.value = true;
      }
    };

    const blurWhatsappInput = (val) => {
      if (val) {
        focusWhatsappBool.value = false;
      }
    };

    const focusEmailInput = (val) => {
      if (val && val.type === 'focus') {
        focusEmailBool.value = true;
      }
    };

    const blurEmailInput = (val) => {
      if (val) {
        focusEmailBool.value = false;
      }
    };

    const focusLineInput = (val) => {
      if (val && val.type === 'focus') {
        focusLineBool.value = true;
      }
    };

    const blurLineInput = (val) => {
      if (val) {
        focusLineBool.value = false;
      }
    };

    const focusZaloInput = (val) => {
      if (val && val.type === 'focus') {
        focusZaloBool.value = true;
      }
    };

    const blurZaloInput = (val) => {
      if (val) {
        focusZaloBool.value = false;
      }
    };

    const focusBirthdayInput = (val) => {
      if (val && val.type === 'focus') {
        focusBirthdayBool.value = true;
      }
    };

    const blurBirthdayInput = (val) => {
      if (val) {
        focusBirthdayBool.value = false;
      }
    };

    const focusGenderInput = (val) => {
      if (val && val.type === 'focus') {
        focusGenderBool.value = true;
      }
    };

    const blurGenderInput = (val) => {
      if (val) {
        focusGenderBool.value = false;
      }
    };

    const checkKey = (e) => {
      const { key } = e;
      if (key === 'e' || key === '-' || key === '+') {
        e.returnValue = false;
        return false;
      }
      return true;
    };

    const checkFocus = (type) => {
      let result = '';

      switch (type) {
        case 'account':
          if (focusMainBool.value && !accountBool.value) {
            result = 'has-error';
          } else if (focusMainBool.value) {
            result = 'focus-input';
          } else if (!accountBool.value) {
            focusMainBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'password':
          if (focusPasswordBool.value && !passwordBool.value) {
            result = 'has-error';
          } else if (focusPasswordBool.value) {
            result = 'focus-input';
          } else if (!passwordBool.value) {
            focusPasswordBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'checkPassword':
          if (focusCheckPasswordBool.value && !confirmPasswordBool.value) {
            result = 'has-error';
          } else if (focusCheckPasswordBool.value) {
            result = 'focus-input';
          } else if (!confirmPasswordBool.value) {
            focusCheckPasswordBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'recommend':
          if (focusRecommendBool.value && !recommendedPersonBool.value) {
            result = 'has-error';
          } else if (focusRecommendBool.value) {
            result = 'focus-input';
          } else if (!recommendedPersonBool.value) {
            focusRecommendBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'realName':
          if (focusRealNameBool.value && !realNameBool.value) {
            result = 'has-error';
          } else if (focusRealNameBool.value) {
            result = 'focus-input';
          } else if (!realNameBool.value) {
            focusRealNameBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'nickname':
          if (focusNicknameBool.value && !nicknameBool.value) {
            result = 'has-error';
          } else if (focusNicknameBool.value) {
            result = 'focus-input';
          } else if (!nicknameBool.value) {
            focusNicknameBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'phone':
          if (focusPhoneBool.value && !phoneBool.value) {
            result = 'has-error';
          } else if (focusPhoneBool.value) {
            result = 'focus-input';
          } else if (!phoneBool.value) {
            focusPhoneBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'qq':
          if (focusQQBool.value && !qqBool.value) {
            result = 'has-error';
          } else if (focusQQBool.value) {
            result = 'focus-input';
          } else if (!qqBool.value) {
            focusQQBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'whatsApp':
          if (focusWhatsappBool.value && !whatsappBool.value) {
            result = 'has-error';
          } else if (focusWhatsappBool.value) {
            result = 'focus-input';
          } else if (!whatsappBool.value) {
            focusWhatsappBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'weixin':
          if (focusWeixinBool.value && !weixinBool.value) {
            result = 'has-error';
          } else if (focusWeixinBool.value) {
            result = 'focus-input';
          } else if (!weixinBool.value) {
            focusWeixinBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'email':
          if (focusEmailBool.value && !emailBool.value) {
            result = 'has-error';
          } else if (focusEmailBool.value) {
            result = 'focus-input';
          } else if (!emailBool.value) {
            focusEmailBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'line':
          if (focusLineBool.value && !lineBool.value) {
            result = 'has-error';
          } else if (focusLineBool.value) {
            result = 'focus-input';
          } else if (!lineBool.value) {
            focusLineBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'zalo':
          if (focusZaloBool.value && !zaloBool.value) {
            result = 'has-error';
          } else if (focusZaloBool.value) {
            result = 'focus-input';
          } else if (!zaloBool.value) {
            focusZaloBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'birthday':
          if (focusBirthdayBool.value && !birthdayBool.value) {
            result = 'has-error';
          } else if (focusBirthdayBool.value) {
            result = 'focus-input';
          } else if (!birthdayBool.value) {
            focusBirthdayBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        case 'gender':
          if (focusGenderBool.value && !genderBool.value) {
            result = 'has-error';
          } else if (focusGenderBool.value) {
            result = 'focus-input';
          } else if (!genderBool.value) {
            focusGenderBool.value = false;
            result = 'has-error';
          } else {
            result = 'blur-input';
          }
          break;
        default:
          break;
      }

      return result;
    };

    const initFocus = () => {
      focusMainBool.value = false;
      focusPasswordBool.value = false;
      focusCheckPasswordBool.value = false;
      focusRecommendBool.value = false;
      focusRealNameBool.value = false;
      focusNicknameBool.value = false;
      focusPhoneBool.value = false;
      focusQQBool.value = false;
      focusWeixinBool.value = false;
      focusWhatsappBool.value = false;
      focusEmailBool.value = false;
      focusLineBool.value = false;
      focusZaloBool.value = false;
      focusBirthdayBool.value = false;
      focusGenderBool.value = false;

      accountBool.value = true;
      passwordBool.value = true;
      confirmPasswordBool.value = true;
      recommendedPersonBool.value = true;
      realNameBool.value = true;
      nicknameBool.value = true;
      phoneBool.value = true;
      qqBool.value = true;
      weixinBool.value = true;
      whatsappBool.value = true;
      emailBool.value = true;
      lineBool.value = true;
      zaloBool.value = true;
      birthdayBool.value = true;
      genderBool.value = true;
    };

    onMounted(() => {
      checkSiteDomain();
      showTabsArr();

      initFocus();

      registerType.value = state.tabArr[0].registerType;
    });

    return {
      formRef,
      state,
      rules,
      selectedTab,
      seePassword,
      seeCheckPassword,
      eyeResult,
      checkEyeResult,
      seeToPassword,
      seeToCheckPassword,
      register,
      registerType,
      siteName,
      siteId,
      thirdPartyLogin,
      mainInputRef,
      registerSetting,
      showTabsArr,
      recommendedPersonBool,
      activeKey,
      focusMainBool,
      focusPasswordBool,
      focusCheckPasswordBool,
      focusRecommendBool,
      focusMainInput,
      blurMainInput,
      focusPasswordInput,
      blurPasswordInput,
      focusCheckPasswordInput,
      blurCheckPasswordInput,
      focusRecommendInput,
      blurRecommendInput,
      checkFocus,
      isModalShow,
      hideModal,
      realNameBool,
      nicknameBool,
      phoneBool,
      qqBool,
      weixinBool,
      lineBool,
      zaloBool,
      focusRealNameBool,
      focusNicknameBool,
      focusPhoneBool,
      focusQQBool,
      focusWeixinBool,
      focusWhatsappBool,
      focusRealNameInput,
      blurRealNameInput,
      focusNicknameInput,
      blurNicknameInput,
      focusPhoneInput,
      blurPhoneInput,
      focusQQInput,
      blurQQInput,
      focusWeixinInput,
      blurWeixinInput,
      focusWhatsappInput,
      blurWhatsappInput,
      registerRef,
      emailBool,
      focusEmailBool,
      focusEmailInput,
      blurEmailInput,
      focusLineInput,
      blurLineInput,
      focusZaloInput,
      blurZaloInput,
      birthdayBool,
      focusBirthdayBool,
      genderBool,
      focusGenderBool,
      focusBirthdayInput,
      blurBirthdayInput,
      focusGenderInput,
      blurGenderInput,
      checkGender,
      checkInputValue,
      showBirthdayPickerBool,
      confirmBirthday,
      checkSiteDomain,
      agentCodeReadonly,
      checkKey,
      siteStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.ant-modal-content) {
  max-height: 594px;
  overflow-y: hidden;
}

::v-deep(.ant-modal-body) {
  max-height: 494px;
  overflow-y: auto;
}

::v-deep(.ant-form-item) {
  &:last-child {
    margin-bottom: 0;
  }
}

.register {
  width: 100%;
  color: #080d20;

  ::v-deep(.ant-col) {
    width: 100%;
    text-align: left;
  }

  .register-box {
    display: flex;
    flex-direction: column;

    .tabs-area {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      border-bottom: 1px solid#f0f0f0;

      .tabs-item {
        display: flex;
        align-items: center;
        height: 3rem;
        margin: 0 1.2rem;

        &.selected-tabs {
          border-bottom: 1px solid $button-color;
          color: #000;
          font-weight: bold;
        }
      }
    }

    .input-area {
      .input-box {
        .main-input {
          display: flex;
          align-items: center;

          &.ant-input-group {
            height: 40px;
            border-radius: 5px;
          }

          &::v-deep(.ant-input),
          &::v-deep(.ant-input-number) {
            height: 30px;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }

          &::v-deep(.ant-input-number-input) {
            padding: 0;
            font-size: 0.875rem;
          }

          &::v-deep(.ant-select-selector) {
            border: none !important;
            box-shadow: none !important;
          }

          ::v-deep(.ant-form-item-children) {
            display: flex;
            align-items: center;
          }

          .zoon-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 5rem;
            margin-right: 0.5rem;
            border: 0.0625rem solid #f0f0f0 !important;
            border-radius: 0.1875rem !important;
            color: #333 !important;
            font-size: 0.875rem !important;
            background-color: transparent !important;

            .text {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            img {
              width: 18px;
              height: 18px;
            }
          }

          &.agent-code.ant-input-group {
            &.has-agent-code {
              background-color: var(--input-bg) !important;
            }

            .ant-input.has-agent-code {
              background-color: var(--input-bg) !important;
            }

            img.has-agent-code {
              filter: brightness(0.5);
            }
          }
        }

        .password {
          display: flex;
          align-items: center;

          &.ant-input-group {
            height: 40px;
            border-radius: 5px;
          }

          &::v-deep(.ant-input) {
            height: 36px;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }

          ::v-deep(.ant-input-affix-wrapper) {
            position: relative;
          }
        }

        .recommended-person {
          display: flex;
          align-items: center;

          &.ant-input-group {
            height: 40px;
            border-radius: 5px;
          }

          &::v-deep(.ant-input) {
            height: 36px;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
        }

        .forget-password {
          margin-top: 2rem;
          margin-bottom: 0.5rem;
          color: #0090ff;
        }

        .register-button-area {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 40px;
          border-radius: 5px;
          color: #fff;
          background: linear-gradient(#f3ac0a 0%, #b58007 100%);
          opacity: 0.5;

          &.success {
            background: linear-gradient(#f3ac0a 0%, #b58007 100%);
            opacity: 1;
          }

          .register-button {
            text-align: center;
          }
        }

        .protocol-prompt {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: 1rem 0;
          font-size: 12px;

          .user-prtocol {
            color: #0090ff;
          }
        }
      }

      ::v-deep(.ant-input) {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 38px;
        padding: 0 0.5rem;
        border-radius: 5px !important;
        font-size: 14px !important;

        &:focus {
          border: 1px solid $button-color !important;
        }

        &::placeholder {
          color: #afafaf;
        }
      }

      ::v-deep(.ant-form-explain) {
        margin-top: 0.2rem;
        color: #f53838;
      }

      ::v-deep(.has-error) {
        .ant-input {
          border-color: #f53838 !important;
        }
      }
    }
  }
}

.eye-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  margin-right: 10px;

  .eye {
    width: 100%;
    height: 100%;
  }
}

.input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;

  img {
    width: 16px;
    height: 16px;
  }
}

.blur-input {
  border: 1px solid var(--input-bg) !important;
  border-radius: 5px;
  background-color: var(--input-bg);
}

.focus-input {
  border: 1px solid $primary-color;
}

.has-error {
  border: 1px solid #f53838;
}

::v-deep(.ant-form-item-label) {
  padding-bottom: 0;
}

::v-deep(.ant-modal-close-x) {
  line-height: 2.5rem;
}

::v-deep(.overlay) {
  z-index: 2000;
}

::v-deep(.date-picker) {
  z-index: 5000;
}
</style>
