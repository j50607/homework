<template>
  <div
    v-if="!isLogin"
    class="w-4 h-4"
  >
    <img
      class="h-full is-btn ml-auto"
      :src="$requireSafe(`header/style${siteStyle}/login.svg`)"
      alt=""
      @click="goPage('/loginAndRegister')"
    >
  </div>
  <div
    v-else
    class="avatar is-btn"
  >
    <img
      :src="$requireSafe(`avatar/${avatar && avatar.system ? avatar.system : 0 }.png`)"
      alt=""
      @click="goPage('/profile/userInfo')"
    >
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  props: {
    showSidebar: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['showSidebar'],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();

    const avatar = computed(() => store.state.user.avatar);
    const isLogin = computed(() => store.state.user.isLogin);
    const siteStyle = computed(() => store.getters.siteStyle);

    const goPage = (url) => {
      if (props.showSidebar && isLogin.value) {
        emit('showSidebar');
        return;
      }

      router.push(url);
    };
    return {
      avatar,
      isLogin,
      goPage,
      siteStyle,
    };
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  width: 20px;
  height: 20px;

  img {
    height: 100%;
    margin-left: auto;
    border: 1px solid #f3ac0a;
    border-radius: 50%;
  }
}
</style>
