<template>
  <div class="fixed bottom-0 left-0 flex items-center justify-center h-10 w-full bg-white">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="footer-item"
      @click="changePath(item.src)"
    >
      <img
        :src="$requireSafe(`footer/icon-${isActive(item.tag) ? `${item.img}-active` : item.img }.svg`)"
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
          name: window.$vue.$t('components_footer_home'), src: '/', img: 'home', tag: 'home',
        },
        {
          name: window.$vue.$t('components_footer_match'), src: '/match', img: 'match', tag: 'match',
        },
        {
          name: window.$vue.$t('components_footer_record'), src: '/betRecord', img: 'record', tag: 'bet-record',
        },
        {
          name: window.$vue.$t('components_footer_finance'), src: '/finance', img: 'finance', tag: 'finance',
        },
        {
          name: window.$vue.$t('components_footer_profile'), src: '/profile', img: 'profile', tag: 'profile',
        },
      ],
    });

    const isActive = (tag) => route.name.includes(tag);

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
