<template>
  <div class="validate-register">
    <div class="area">
      <div class="validate-title">
        <div class="validate-title-img">
          <img :src="$requireSafe(`icon/style${siteStyle}/mail.svg`)">
        </div>
        <div
          v-text="$t('components_pages_loginAndRegister_loginRegister_index_validateTitle', { value: text })"
          class="text"
        />
      </div>

      <div class="validate-text">
        <div v-text="$t('components_pages_loginAndRegister_loginRegister_index_validateText', {value: text })" />
        <div v-text="data.mainInputValue" />
        <div v-text="$t('components_pages_loginAndRegister_loginRegister_index_validateCountdown')" />
      </div>

      <div class="validate-input">
        <div class="countdown">
          <div
            v-text="$t('components_pages_loginAndRegister_loginRegister_index_validatePrompt')"
            class="text"
          />

          <div class="sec">
            <div v-text="$t('components_pages_loginAndRegister_loginRegister_index_validateResend')" />
            {{ '(' }}<d-countdown :sec="300" />{{ 's)' }}
          </div>
        </div>

        <div class="password-box">
          <a-input
            v-model:value="validateNumber"
            type="password"
            class="password-input"
            max-length="6"
            @focus="focus=true"
            @blur="focus=false"
          />
          <div class="password-screen">
            <ul class="password-screen-lise">
              <li
                v-for="(number, index) in 6"
                :key="index"
                class="password-screen-box"
              >
                <i
                  v-if="validateNumber.length > index"
                  class="black-dot"
                />
                <i
                  v-else-if="validateNumber.length === index && focus"
                  class="cursor"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="validate-btn">
        <a-button
          :disabled="validateNumber.length < 6"
          @click="validateNumber.length >=6 ? submit() : ''"
          :class="[
            {'input-success': validateNumber.length >= 6},
          ]"
          v-text="$t('components_pages_loginAndRegister_loginRegister_index_submit')"
          class="btn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

import DCountdown from '@/components/DCountdown';

export default {
  components: {
    DCountdown,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    registerType: {
      type: String,
      default: '',
    },
    zoneNum: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  emits: ['register'],
  setup(props, { emit }) {
    // use
    const store = useStore();
    // ref
    const focus = ref(false);
    const validateNumber = ref('');

    // computed
    const siteStyle = computed(() => store.getters.siteStyle);

    // watch
    watch(() => validateNumber.value, (value) => {
      if (value && value.length > 6) {
        validateNumber.value = value.substr(0, 6);
      }
    });

    // methods
    const submit = () => {
      emit('register', {
        formState: props.data, registerType: props.registerType, zoneNum: props.zoneNum, validateNumber: validateNumber.value, validateBool: false,
      });
    };

    return {
      focus,
      validateNumber,
      submit,
      siteStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.validate-register {
  width: 100%;
  padding-top: 3.5rem;

  .area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .validate-title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;

      .validate-title-img {
        width: 35px;

        img {
          width: 28px;
        }
      }

      .text {
        color: #080d20;
        font-size: 24px;
      }
    }

    .validate-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 40px;
      color: #afafaf;
      font-size: 14px;
    }

    .validate-input {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .countdown {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;

        .text {
          color: #080d20;
        }

        .sec {
          display: flex;
          align-items: center;
          color: #afafaf;
        }
      }
    }
  }
}

.password-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;

  .password-input {
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 0.1rem;
    opacity: 0;
  }

  .password-screen {
    position: absolute;
    width: 100%;
    height: 100%;

    .password-screen-lise {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      list-style: none;
      cursor: pointer;

      .password-screen-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 56px;
        border: 1px solid #f0f0f0;
        border-radius: 3px;

        .black-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
        }

        .cursor {
          width: 1px;
          height: 0.8rem;
          line-height: 0.8rem;
          background-color: #000;
          animation-name: blink;
          animation-duration: 0.8s;
          animation-iteration-count: infinite;
        }
      }
    }
  }
}

.validate-btn {
  width: 100%;
  height: 40px;
  margin-top: 75px;

  .btn {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    color: #fff;
    background: $button-disabled-color;

    &.input-success {
      background: $button-color !important;
    }
  }
}

@keyframes blink {
  from {
    opacity: 0.8;
  }

  to {
    opacity: 0;
  }
}
</style>
