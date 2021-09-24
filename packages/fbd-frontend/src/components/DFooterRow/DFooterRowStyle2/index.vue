<template>
  <div class="footer fixed bottom-0 left-0 flex items-center justify-center h-10 w-full bg-white py-2">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="footer-item"
      @click="changePath(item.src)"
    >
      <img
        :src="$requireSafe(`footer/style${siteStyle}/icon-${isActive(item.tag) ? `${item.img}-active` : item.img }.svg`)"
        alt=""
      >
      <div :class="isActive(item.tag) ? 'active-title' : ''">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    // use
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    // reactive
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
      ],
    });

    // computed
    const siteStyle = computed(() => store.getters.siteStyle);

    // methods
    const isActive = (tag) => route.name.includes(tag);

    const changePath = (src) => {
      router.push(src);
    };
    return {
      isActive,
      changePath,
      ...toRefs(state),
      siteStyle,
    };
  },
};
</script>

<style lang="postcss" scoped>
.footer {
  border-radius: 15px 15px 0 0;
  background: #374e7b;

  .footer-item {
    @apply flex flex-col items-center flex-1 text-center text-xs cursor-pointer text-normal;

    img {
      width: 22px;
      height: 22px;
      margin-bottom: 3px;
    }
  }

  .active-title {
    color: #ffb83d;
  }
}
</style>
