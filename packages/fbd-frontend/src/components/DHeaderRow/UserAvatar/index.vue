<template>
  <div class="avatar">
    <img
      :src="$requireSafe(`avatar/${avatar && avatar.system ? avatar.system : 0 }.png`)"
      alt=""
      @click="goUserInfo"
    >
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const avatar = computed(() => store.state.user.avatar);

    const goUserInfo = () => {
      router.push('/profile/userInfo');
    };
    return {
      avatar,
      goUserInfo,
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
    border: 1px solid #f3ac0a;
    border-radius: 50%;
  }
}
</style>
