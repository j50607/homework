<template>
  <div
    class="main"
  >
    <slot />
  </div>
</template>

<script>
import {
  reactive, provide, onMounted,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import clientModeEnum from '@/assets/enum/clientModeEnum';

export default {
  setup() {
    // const internalInstance = getCurrentInstance();
    // const { emitter } = internalInstance.appContext.config.globalProperties;
    const router = useRouter();
    const store = useStore();
    // reactive
    const state = reactive({
      clientMode: {},
      clientModeEnum,
    });

    provide('$clientMode', () => state.clientMode);

    router.beforeEach((to, from) => {
      if (from) {
        store.commit('SET_PREV_PAGE', from.name);
      } else {
        store.commit('SET_PREV_PAGE', 'index');
      }
    });

    // hooks
    onMounted(() => {
      if (window.innerWidth <= 992) {
        state.clientMode = clientModeEnum.MOBILE;
      } else {
        state.clientMode = clientModeEnum.PC;
      }

      window.onresize = () => {
        if (window.innerWidth <= 992) {
          state.clientMode = clientModeEnum.MOBILE;
        } else {
          state.clientMode = clientModeEnum.PC;
        }
      };
    });

    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100%;
  color: #000;
  background: #fff;
  transition: 0.5s;
}
</style>
