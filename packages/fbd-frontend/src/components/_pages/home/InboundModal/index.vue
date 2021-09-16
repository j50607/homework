<template>
  <div class="inbound-modal">
    <d-dialog
      v-model:visible="showDialog"
      :title="modalTitle"
      :width="'345px'"
      :footer="null"
    >
      <template #body>
        <div>
          <a-collapse
            v-model:activeKey="activeKey"
            class="announcement"
          >
            <a-collapse-panel
              v-for="(item, index) in data"
              :key="String(item[idKey]) || String(index)"
              class="announcement-item"
              :show-arrow="false"
            >
              <template
                #header
              >
                <div class="announcement-title">
                  <div
                    class="announcement-mark"
                    :class="{'is-read': readAnnouncement.includes(String(item[idKey]))}"
                  />
                  <span class="title">
                    {{ item[titleKey] || '' }}
                  </span>
                  <span class="time">
                    {{ item[timeKey] ? formatTime(item[timeKey]) : '' }}
                  </span>
                </div>
              </template>
              <div class="announcement-content">
                <span v-html="item[contentKey] || ''" />
                <img
                  v-if="item[imgKey]"
                  class="announcement-img"
                  :src="`${s3Base}/${item[imgKey]}`"
                  alt="announcement"
                >
              </div>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </template>
    </d-dialog>
    <!-- </div> -->
  </div>
</template>
<script>
import moment from 'moment';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import DDialog from '@/components/DDialog';

export default {
  components: {
    DDialog,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    modalTitle: {
      type: String,
      default: '',
    },
    idKey: {
      type: String,
      default: '',
    },
    titleKey: {
      type: String,
      default: '',
    },
    contentKey: {
      type: String,
      default: '',
    },
    timeKey: {
      type: String,
      default: '',
    },
    imgKey: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    selectedKey: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:value'],
  setup(props, context) {
    const store = useStore();
    // ref
    const activeKey = ref([1]);
    // computed
    const showDialog = computed({
      get: () => props.value,
      set: (val) => context.emit('update:value', val),
    });
    const readAnnouncement = computed(() => store.state.user.readAnnouncement);
    // watch
    watch(() => props.selectedKey, (val) => {
      activeKey.value = val?.toString();
    });

    watch(() => activeKey.value, (val) => {
      if (val[1] && !readAnnouncement.value.includes(val[1])) {
        store.commit('SET_READ_ANNOUNCEMENT', val[1]);
      }
    });

    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);

    // methods
    const formatTime = (time) => moment(time).format('YYYY/MM/DD');

    return {
      showDialog,
      formatTime,
      activeKey,
      s3Base,
      readAnnouncement,
    };
  },

};
</script>
<style lang="scss" scoped>

::v-deep(.d-dialog) {
  .ant-modal-title {
    font-size: 14px;
  }
}

.announcement {
  border: none;

  .announcement-item {
    border-bottom: none !important;
  }

  .announcement-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      display: block;
      color: #333;
      white-space: normal;
      word-wrap: normal;
      word-break: break-word;
    }
  }

  .announcement-title {
    display: flex;
    align-items: center;
    justify-self: flex-start;

    .announcement-mark {
      flex: 0 0 6px;
      width: 6px;
      height: 6px;
      margin-top: 2px;
      margin-right: 5px;
      border-radius: 50%;
      background: #f00;

      &.is-read {
        background: #999;
      }
    }

    .title {
      margin-right: 30px;
      color: #333;
      font-weight: 600;
      word-break: break-word;
    }

    .time {
      margin-left: auto;
      color: #999;
    }
  }

  .announcement-img {
    align-self: center;
    width: 100%;
    height: auto;
  }

  &.ant-collapse {
    background: transparent;

    .ant-collapse-header {
      padding-right: 5px;
      padding-left: 30px;
    }

    ::v-deep(.ant-collapse-content) {
      border: none;

      &.ant-collapse-content-active {
        border-top: none;
      }
    }
  }
}

</style>
