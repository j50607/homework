<template>
  <div class="fixed bottom-0 left-0 flex items-center justify-center h-10 w-full bg-white">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="footer-item"
      @click="changePath(item.src)"
    >
      <img
        :src="$requireSafe(`footer/icon-${isActive(item.src) ? `${item.img}-active` : item.img }.svg`)"
        alt=""
      >
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      list: [
        {
          name: '首页', src: '/', img: 'home',
        },
        {
          name: '市场', src: '/match', img: 'market',
        },
        {
          name: '记录', src: '/betRecord', img: 'record',
        },
        {
          name: '账务', src: '/finance', img: 'finance',
        },
        {
          name: '我的', src: '/profile', img: 'profile',
        },
      ],
    });

    const isActive = (src) => route.path.includes(src);
    const changePath = (src) => {
      router.push(src);
    };
    return {
      isActive,
      changePath,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="postcss" scoped>
.footer-item {
  @apply flex flex-col items-center flex-1 text-center text-xs cursor-pointer text-normal;

  img {
    width: 19px;
    height: 19px;
    margin-bottom: 3px;
  }
}
</style>
