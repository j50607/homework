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

<style lang="postcss" scoped>
.main {
  @apply flex flex-col w-full h-full min-h-full relative bg-layout duration-500;
}
</style>
