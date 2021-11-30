<template>
  <div
    class="login-register-page"
    ref="loginandregister"
  >
    <d-header-row
      :right-components="'Service'"
      :left-components="'GoBack'"
      :bg-color="'transparent'"
    >
      <template #right>
        <div class="right-container">
          <div>
            <d-locale-image
              v-if="displayLanguageSwitch"
              @click="state.showLangModal = true"
            />
          </div>
          <div class="service">
            <img
              v-if="serviceUrl"
              class="service-img"
              @click="goService"
              :src="$requireSafe(`header/style${siteStyle}/icon-service.svg`)"
            >
          </div>
        </div>
      </template>
    </d-header-row>
    <login-register />
    <d-language-modal
      v-model:isShow="state.showLangModal"
      @cancel="state.showLangModal = false"
    />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import LoginRegister from '@/components/_pages/loginAndRegister/LoginRegister';

export default {
  components: {
    LoginRegister,
  },
  setup() {
    // use
    const store = useStore();

    // ref
    const loginandregister = ref(null);

    // reactive
    const state = reactive({
      isLanguageModalShow: false,
      langMap: {
        zh_cn: 'locale/zh_cn.svg',
        zh_tw: 'locale/zh_tw.svg',
        th_th: 'locale/th_th.svg',
        vi_vn: 'locale/vi_vn.svg',
        ja_jp: 'locale/ja_jp.svg',
        en_us: 'locale/en_us.svg',
      },
      showLangModal: false,
    });

    // computed
    const siteStyle = computed(() => store.getters.siteStyle);
    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const storeLanguage = computed(() => store.state.info.language);
    const displayLanguageSwitch = computed(() => store.state.info.switchSetting.displayLanguageSwitch);

    // methods
    const toggleLanguageModal = (val) => {
      state.isLanguageModalShow = val;
    };

    const goService = () => {
      window.location = serviceUrl.value;
    };

    return {
      state,
      loginandregister,
      serviceUrl,
      goService,
      storeLanguage,
      toggleLanguageModal,
      siteStyle,
      displayLanguageSwitch,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-register-page {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-image: url('~@/assets/img/loginAndRegister/bg.png');
  background-repeat: no-repeat;
  background-size: cover;

  .service {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 15px;

    .service-img {
      width: 20px;
    }
  }
}

.ant-modal-body {
  padding: 0 26px 20px;
}

.right-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

::v-deep(.header) {
  .middle {
    display: none;
  }
}
</style>
