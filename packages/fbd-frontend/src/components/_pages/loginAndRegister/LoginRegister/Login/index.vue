<template>
  <d-dialog
    v-model:visible="isModalShow"
    :title="$t('components_pages_loginAndRegister_loginRegister_welcome_back')"
    :footer="null"
    :width="345"
    @cancel="hideModal"
  >
    <template #body>
      <div class="login">
        <div class="login-box">
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
                    <img :src="$requireSafe('icon/user-account.svg')">
                  </div>

                  <a-input
                    v-model:value="state.formState.mainInputValue"
                    :type="checkRegisterType()"
                    :placeholder="$t('components_pages_loginAndRegister_loginRegister_login_enter_user')"
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
                    <img :src="$requireSafe('icon/password-lock.svg')">
                  </div>

                  <a-input
                    v-model:value="state.formState.passwordInputValue"
                    :type="seePasswrod ? 'text' : 'password'"
                    :placeholder="$t('components_pages_loginAndRegister_loginRegister_login_enter_password')"
                    @focus="focusPasswordInput"
                    @blur="blurPasswordInput"
                  />

                  <div class="eye-icon">
                    <img
                      class="eye is-btn"
                      @click="seeToPassword()"
                      :src="require(`@/assets/img/icon/${eyeResult}.svg`)"
                      alt="eye"
                    >
                  </div>
                </a-input-group>
              </a-form-item>

              <a-form-item
                v-if="loginVerifyNumberSwitch"
                class="validate-code"
                name="validateInputValue"
                :label="$t('components_pages_loginAndRegister_loginRegister_login_image')"
              >
                <a-input-group
                  compact
                  class="validate-code"
                  :class="[checkFocus('validate')]"
                >
                  <div class="input-icon">
                    <img :src="$requireSafe('icon/validate.svg')">
                  </div>

                  <a-input
                    class="validate-input"
                    ref="validateInputRef"
                    v-model:value="state.formState.validateInputValue"
                    type="number"
                    :placeholder="$t('components_pages_loginAndRegister_loginRegister_login_enter_image')"
                    @focus="focusValidateInput"
                    @blur="blurValidateInput"
                  />
                </a-input-group>

                <div
                  class="validate-img is-btn"
                  @click="clickverifyImg()"
                >
                  <img
                    :src="`data:image/jpeg;base64,${verificationImg}`"
                    :alt="$t('components_pages_loginAndRegister_loginRegister_login_image')"
                  >
                </div>
              </a-form-item>

              <div class="other-func">
                <div
                  v-if="serviceUrl"
                  class="forget-password is-btn"
                  v-text="$t('components_pages_loginAndRegister_loginRegister_forget')"
                  @click="forgetPasswordModal()"
                />
              </div>

              <a-form-item>
                <a-button
                  class="login-button-area"
                  :class="[{'success' : checkInputValue()}]"
                  :disabled="!checkInputValue()"
                  @click="login()"
                >
                  <div
                    class="login-button"
                    v-text="$t('components_pages_loginAndRegister_loginRegister_login')"
                  />
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </template>
  </d-dialog>
</template>

<script>
import {
  ref, reactive, onMounted, computed, onUnmounted,
} from 'vue';

import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import memberApi from '@/assets/js/api/memberApi';
import DDialog from '@/components/DDialog';

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    validateCodeFlag: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DDialog,
  },
  emits: ['openServiceModal', 'protocol', 'login', 'thirdPartyLogin', 'update:value', 'cancel', 'validateCodeFlag'],
  setup(props, { emit }) {
    // i18n
    const { t } = useI18n();

    // ref
    const formRef = ref();
    const mainInputRef = ref();
    const seePasswrod = ref(false);
    const eyeResult = ref('eye-invisible');
    const accountBool = ref(false);
    const passwordBool = ref(false);
    const authKeyBool = ref(false);
    const registerType = ref('');
    const verificationImg = ref('');
    const randomKey = ref('');
    const verificationInterval = ref(undefined);

    const focusMainBool = ref(false);
    const focusPasswordBool = ref(false);
    const focusValidateBool = ref(false);

    const rememberAccountBool = ref(false);
    const rememberCheckbox = ref('checkbox-off');

    // reactive
    const state = reactive({
      tabArr: [],
      formState: {
        mainInputValue: undefined,
        passwordInputValue: undefined,
        validateInputValue: undefined,
      },
    });

    // use
    const store = useStore();

    // validate
    const accountValidate = async (rule, value) => {
      value = value?.toString() || '';

      switch (registerType.value) {
        case 'ACCOUNT':
          if (value === '' || !value) {
            accountBool.value = false;
            return Promise.reject(new Error(t('error1')));
          }

          accountBool.value = true;
          return Promise.resolve();
        default:
          return '';
      }
    };

    const passwordValidate = async (rule, value = '') => {
      if (value === '' || value.length < 6 || value.length > 12) {
        passwordBool.value = false;
        return Promise.reject(new Error(t('error2')));
      }
      passwordBool.value = true;
      return Promise.resolve();
    };

    const loginVerifyNumberSwitch = computed(() => store.state.info.switchSetting.loginVerifyNumberSwitch);
    const authKeyCodeValidate = async (rule, value) => {
      if (loginVerifyNumberSwitch.value) {
        if (!value || value.length < 5) {
          authKeyBool.value = false;
          return Promise.reject(new Error(t('error6')));
        }
      }
      authKeyBool.value = true;
      return Promise.resolve();
    };

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
      validateInputValue: [
        {
          required: loginVerifyNumberSwitch.value, validator: authKeyCodeValidate, trigger: 'change',
        },
      ],
    });

    // computed
    const siteName = computed(() => store.state.info.siteInfo.name);
    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const isModalShow = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val),
    });

    // methods
    const hideModal = () => {
      emit('cancel', false);
    };

    const checkRegisterType = () => {
      switch (registerType.value) {
        case 'ACCOUNT':
          return 'text';
        default:
          return 'text';
      }
    };

    const seeToPassword = () => {
      seePasswrod.value = !seePasswrod.value;

      eyeResult.value = seePasswrod.value ? 'eye' : 'eye-invisible';
    };

    const forgetPasswordModal = () => {
      window.open(serviceUrl.value);
    };

    const thirdPartyLogin = () => {
      emit('thirdPartyLogin');
    };

    const protocolModal = () => {
      emit('protocol');
    };

    const showTabsArr = () => {
      const result = [
        { label: '賬號', registerType: 'ACCOUNT' },
      ];

      result.forEach((e) => {
        state.tabArr.push(e);
      });
    };

    const getRandomKey = () => (Date.parse(new Date()) + Math.floor((Math.random() * 100) + 1)).toString();

    /**
     * 图形验证
     */
    const verification = async () => {
      randomKey.value = getRandomKey();
      const { code, data } = await memberApi.getVerification({
        authCodeKey: randomKey.value,
      });

      if (code === 200) {
        verificationImg.value = data.imageStr;
      }
    };

    const clickverifyImg = () => {
      verification();
      clearInterval(verificationInterval.value);
      verificationInterval.value = setInterval(() => {
        verification();
      }, 120000);
    };

    const login = () => {
      formRef.value.validate().then(async () => {
        emit('login', state.formState, randomKey.value, rememberAccountBool.value);

        if (props.validateCodeFlag) {
          clickverifyImg();
          emit('validateCodeFlag');
        }
      }, () => {
        clickverifyImg();
      });
    };

    const checkRemeberAccountImage = () => {
      rememberCheckbox.value = rememberAccountBool.value ? 'checkbox-on' : 'checkbox-off';
    };

    const getRememberAccountBool = () => {
      rememberAccountBool.value = !rememberAccountBool.value;

      window.localStorage.setItem('isRememberBool', rememberAccountBool.value);

      checkRemeberAccountImage();
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

    const focusValidateInput = (val) => {
      if (val && val.type === 'focus') {
        focusValidateBool.value = true;
      }
    };

    const blurValidateInput = (val) => {
      if (val) {
        focusValidateBool.value = false;
      }
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
        case 'validate':
          if (focusValidateBool.value && !authKeyBool.value) {
            result = 'has-error';
          } else if (focusValidateBool.value) {
            result = 'focus-input';
          } else if (!authKeyBool.value) {
            focusValidateBool.value = false;
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
      focusValidateBool.value = false;
      accountBool.value = true;
      passwordBool.value = true;
      authKeyBool.value = true;
    };

    /**
     * 点击回车键
     */
    const clickEnter = (event) => {
      // if (!checkFormResult()) return;

      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        login();
      }
    };

    const checkInputValue = () => {
      let result = false;

      const {
        mainInputValue,
        passwordInputValue,
        validateInputValue,
      } = state.formState;

      if (loginVerifyNumberSwitch.value) {
        if (mainInputValue && passwordInputValue && validateInputValue && accountBool.value && passwordBool.value && authKeyBool.value) {
          result = true;
        }
      } else if (mainInputValue && passwordInputValue && accountBool.value && passwordBool.value) {
        result = true;
      } else {
        result = false;
      }

      return result;
    };

    onMounted(async () => {
      const rememberBool = window.localStorage.getItem('isRememberBool');
      const lastAccount = window.localStorage.getItem('lastAccount');

      showTabsArr();

      initFocus();

      await verification();

      registerType.value = state.tabArr[0].registerType;

      rememberAccountBool.value = rememberBool;
      checkRemeberAccountImage();

      state.formState.mainInputValue = lastAccount;

      document.addEventListener('keydown', clickEnter);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', clickEnter);
      clearInterval(verificationInterval.value);
    });

    return {
      formRef,
      state,
      rules,
      seePasswrod,
      eyeResult,
      seeToPassword,
      forgetPasswordModal,
      login,
      protocolModal,
      siteName,
      thirdPartyLogin,
      registerType,
      checkRegisterType,
      mainInputRef,
      verification,
      verificationImg,
      randomKey,
      verificationInterval,
      clickverifyImg,
      authKeyBool,
      showTabsArr,
      focusMainInput,
      blurMainInput,
      focusMainBool,
      focusPasswordBool,
      focusPasswordInput,
      blurPasswordInput,
      checkFocus,
      getRememberAccountBool,
      rememberAccountBool,
      rememberCheckbox,
      checkRemeberAccountImage,
      clickEnter,
      loginVerifyNumberSwitch,
      hideModal,
      isModalShow,
      focusValidateInput,
      blurValidateInput,
      serviceUrl,
      checkInputValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  color: #080d20;

  ::v-deep(.ant-col) {
    width: 100%;
    text-align: left;
  }

  .login-box {
    .input-area {
      .input-box {
        .main-input {
          display: flex;
          align-items: center;

          &.ant-input-group {
            height: 40px;
            border-radius: 5px;
            background: #fff;
          }

          &::v-deep(.ant-input) {
            height: 30px;
            padding: 0 !important;
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
            background-color: #fff;
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
        }

        .password {
          display: flex;
          align-items: center;

          &.ant-input-group {
            height: 40px;
            border-radius: 5px;
            background: #fff;
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

        .validate-code {
          display: flex;
          align-items: center;

          &.ant-input-group {
            height: 40px;
            border-radius: 5px;
            background: #fff;
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

          ::v-deep(.ant-form-item-children) {
            display: flex;
          }

          ::v-deep(.ant-form-item-control-input-content) {
            display: flex;
          }

          .validate-input {
            width: 72%;
          }

          .validate-img {
            margin-left: 5px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 3px;
            }
          }
        }

        .password-prompt {
          color: #f53838;
        }

        .login-button-area {
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

          .login-button {
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
        border: 1px solid #f0f0f0 !important;
        border-radius: 5px !important;
        color: #333 !important;
        font-size: 14px !important;
        background: #fff !important;

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

.other-func {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin: 10px 0;
  font-size: 12px;

  .remember-account {
    display: flex;
    align-items: center;
    color: #fff;

    .remember-account-img {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2px;

      img {
        width: 16px;
        height: 16px;
      }
    }

    .remember-account-text {
      margin-left: 8px;
    }
  }

  .forget-password {
    color: #4ab1ff;
    text-decoration: underline;
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
  border: 1px solid #f2f2f2;
}

.focus-input {
  border: 1px solid $primary-color;
}

.has-error {
  border: 1px solid #f53838;
}

::v-deep(.ant-form-item) {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

::v-deep(.ant-modal-close-x) {
  line-height: 2.5rem;
}

::v-deep(.ant-form-item-label) {
  padding-bottom: 0;

  label {
    color: #4d5772 !important;
  }

  label::before {
    display: none !important;
  }
}
</style>
