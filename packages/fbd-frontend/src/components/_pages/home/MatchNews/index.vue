<template>
  <div class="flex pb-1 overflow-x-auto  overflow-y-hidden">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="news"
      @click="showAnnouncement(item)"
    >
      <div class="flex mb-2 w-full">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="detail">
          查看详情 >
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
    modal-title="赛事快讯"
    id-key="msgId"
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

    const getMessage = async () => {
      const { code, data } = await SystemApi.getMessage({});
      if (code === 200) {
        return data.content;
      }
      return [];
    };

    const showAnnouncement = (item) => {
      state.show = true;
      state.selectedKey = item.msgId;
      console.log('item :>> ', item);
    };

    onMounted(async () => {
      state.list = await getMessage();
    });
    return {
      ...toRefs(state),
      showAnnouncement,
    };
  },
};
</script>

<style lang="scss" scoped>
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
    width: 200px;

    @extend .text-ellipsis;
  }

  .content {
    width: 280px;
    word-break: break-all;

    @extend .text-ellipsis;
  }
}

.text-ellipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
