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
        <div class="service">
          <img
            v-if="serviceUrl"
            class="is-btn"
            @click="goService"
            :src="$requireSafe(`header/style${siteStyle}/icon-service.svg`)"
          >
        </div>
      </template>
    </d-header-row>
    <login-register />
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
    });

    // computed
    const siteStyle = computed(() => store.getters.siteStyle);
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
      siteStyle,
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
    width: 100%;

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
