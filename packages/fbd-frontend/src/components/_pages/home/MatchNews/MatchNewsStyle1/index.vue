<template>
  <div
    v-if="list && list.length > 0"
    class="title"
  >
    <img
      :src="require('@/assets/img/home/icon-news.svg')"
      alt=""
    >
    <div>{{ $t('views_home_matchNews') }}</div>
  </div>
  <div
    v-if="list && list.length > 0"
    class="flex pb-1 overflow-x-auto  overflow-y-hidden match-news"
  >
    <div
      v-for="(item, index) in list"
      :key="index"
      class="news overflow-hidden"
      @click="showAnnouncement(item)"
    >
      <div class="flex mb-2 w-full items-center">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="detail">
          <img
            :src="$requireSafe('home/icon-arrow-right.svg')"
            alt=""
            class="w-2"
          >
        </div>
      </div>
      <div
        class="content text-ellipsis"
        v-html="item.content"
      />
    </div>
  </div>
  <inbound-modal
    v-model:value="show"
    :data="list"
    :selected-key="selectedKey"
    :modal-title="$t('views_home_matchNews')"
    accordion
    id-key="annId"
    title-key="title"
    content-key="content"
    time-key="createdTime"
    img-key="imgUrl"
  />
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import SystemApi from '@/assets/js/api/systemApi';
import InboundModal from '@/components/_pages/home/InboundModal';

export default {
  components: {
    InboundModal,
  },
  setup() {
    const state = reactive({
      list: [],
      show: false,
      selectedKey: 1,
    });

    const getAnnouncement = async () => {
      const { code, data } = await SystemApi.getAnnouncement({});
      if (code === 200) {
        return data.content;
      }
      return [];
    };

    const showAnnouncement = (item) => {
      state.show = true;
      state.selectedKey = item.annId;
    };

    onMounted(async () => {
      state.list = await getAnnouncement();
    });
    return {
      ...toRefs(state),
      showAnnouncement,
    };
  },
};
</script>

<style lang="postcss" scoped>
.news {
  flex: 0 0 295px;
  height: 115px;
  padding: 12px 15px;
  border-radius: 5px;
  font-size: 12px;
  background: linear-gradient(#ecf2f8, #fff);
  box-shadow: 0 3px 4px #0000001c;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 10px;
  }

  .detail {
    margin-left: auto;
    color: #7a5605;
  }

  .title {
    display: -webkit-box;
    width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .content {
    width: 100%;
    height: 36px;
    word-break: break-all;
  }
}

.text-ellipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.match-news {
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #00000010;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d6d6d6;
  }
}

.title {
  @apply flex items-center font-bold text-sm;

  margin: 12px 0;

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
}
</style>
