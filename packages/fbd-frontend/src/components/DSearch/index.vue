<template>
  <div class="search">
    <div class="search-input">
      <a-input
        v-model:value="keyword"
        :placeholder="$t('components_pages_profile_team_agent_placeholder1')"
        @keyup.enter="enterEvent"
      />
      <div
        class="search-img"
        @click="search()"
      >
        <img
          :src="$requireSafe('profile/team/search.svg')"
          alt="search-img"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  emits: ['search', 'enterEvent'],
  setup(props, { emit }) {
    const keyword = ref(undefined);

    const search = () => {
      emit('search', keyword);
    };

    const enterEvent = (e: any) => {
      const { key }: {key: string } = e;

      if (key === 'Enter' || key === 'NumEnter') {
        emit('enterEvent', keyword);
      }
    };

    return {
      search,
      enterEvent,
      keyword,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin: 10px 0;
  padding: 0 15px;
}

.search-input {
  position: relative;
  width: 100%;

  .search-img {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 1.25rem;
    height: 1.25rem;
  }

  ::v-deep(.ant-input) {
    border: none !important;
    border-radius: 0 !important;
    background-color: #fff !important;
  }

  ::v-deep(.ant-input-search) {
    border: 1px solid #f2f2f2;
    border-radius: 3px;
  }

  ::v-deep(.ant-input-suffix) {
    .ant-input-search-icon {
      width: 20px;
      height: 20px;

      svg {
        font-size: 20px;
      }
    }
  }
}
</style>
