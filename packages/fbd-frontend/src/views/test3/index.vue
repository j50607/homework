<template>
  <!-- <d-header-row
    :title="$t('views_betRecord_item_title')"
  /> -->

  <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="300"
      @load="onLoad"
    >
      <div
        v-for="item in list"
        :key="item"
      >
        {{ item }}
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import {
  // ref, reactive, computed, nextTick, onBeforeMount,
  reactive, toRefs,
} from 'vue';
import VanList from '@/components/vantLib/list';
import VanPullRefresh from '@/components/vantLib/pull-refresh';

export default {
  components: {
    VanList,
    VanPullRefresh,
  },
  setup() {
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    });

    const onLoad = () => {
      setTimeout(() => {
        if (state.refreshing) {
          state.list = [];
          state.refreshing = false;
        }

        for (let i = 0; i < 40; i++) {
          state.list.push(state.list.length + 1);
        }
        state.loading = false;

        if (state.list.length >= 200) {
          state.finished = true;
        }
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    };

    return {
      ...toRefs(state),
      onLoad,
      onRefresh,
    };
  },
};
</script>

<style lang="postcss" scoped>
.van-pull-refresh {
  height: 100%;
  overflow: hidden scroll;
}

.van-pull-refresh__track {
  height: 100%;
}
</style>
