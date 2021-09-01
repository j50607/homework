<template>
  <div
    class="login-register-page"
    ref="loginandregister"
  >
    <d-header-row
      :right-components="'Service'"
      :left-components="'GoBack'"
      :bg-color="'transparent'"
    />

    <login-register />

    <!-- <d-language-modal
      v-model:isShow="state.isLanguageModalShow"
      @cancel="toggleLanguageModal"
    /> -->
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import LoginRegister from '@/components/_pages/loginAndRegister/LoginRegister';
// import DLanguageModal from '@/components/DLanguageModal';

export default {
  components: {
    LoginRegister,
    // DLanguageModal,
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
    });

    // computed
    const serviceUrl = computed(() => store.state.info.serviceUrl);
    const storeLanguage = computed(() => store.state.info.language);

    // methods
    const toggleLanguageModal = (val) => {
      state.isLanguageModalShow = val;
    };

    return {
      state,
      loginandregister,
      serviceUrl,
      storeLanguage,
      toggleLanguageModal,
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
    justify-content: space-between;
    width: 100%;
    padding: 15px;

    .service-img {
      width: 24px;

      img {
        width: 100%;
      }
    }
  }
}

.ant-modal-body {
  padding: 0 26px 20px;
}
</style>
