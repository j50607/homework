<template>
  <div class="search-list">
    <!-- 搜尋關鍵字列 -->
    <a-input
      v-if="searchEnabled"
      :placeholder="placeholder"
      v-model:value="keyword"
    >
      <template #prefix>
        <search-outlined />
      </template>
    </a-input>
    <!-- 選項列表 -->
    <div
      class="list"
      :style="`max-height: ${listMaxHeight}px;`"
    >
      <div
        class="option is-btn"
        v-for="(item, index) in state.dataList"
        :key="index"
        @click="choose(item, index)"
      >
        <div
          class="icon"
          :style="`height: ${iconHeight}px; width: ${iconWidth}px;`"
        >
          <img
            v-if="localImg"
            :src="$requireSafe(`${item.img}`)"
            :style="`border-radius: ${iconRounded};`"
          >
          <img
            v-else
            :src="item.img"
            :style="`border-radius: ${iconRounded};`"
          >
        </div>
        <div
          class="info"
          :class="selectIndex === index ? 'active' : ''"
        >
          <div
            v-if="showTitle"
            class="title"
            :style="`font-size: ${titleFontSize}px;color: ${titleColor};`"
          >
            {{ item.title }}
          </div>
          <div
            class="desc-container"
            v-if="showDesc || showScript"
          >
            <div
              v-if="showDesc"
              class="desc"
              :style="`font-size: ${descFontSize}px;color: ${descColor};`"
            >
              {{ item.desc }}
            </div>
            <div
              v-if="showScript"
              class="script"
              :style="`font-size: ${scriptFontSize}px;color: ${scriptColor};`"
            >
              {{ item.script }}
            </div>
          </div>
        </div>
        <div
          v-if="selectIndex === index"
          class="selected"
          :style="`height: ${tickHeight}px;`"
        >
          <img
            :src="$requireSafe(`icon/selected.svg`)"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useI18n } from 'vue-i18n';
import { ref, watch, reactive } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    SearchOutlined,
  },
  props: {
    /**
     * 資料陣列
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * 預設勾選的 title(預設不勾選)
     */
    defaultItemTitle: {
      type: String,
      default: '',
    },
    /**
     * List的上下高度
     */
    listMaxHeight: {
      type: Number,
      default: 550,
    },
    /**
     * 搜尋列的placeholder
     */
    placeholder: {
      type: String,
      default: () => window.$vue.$t('components_dSearchList_search'),
    },
    /**
     * 是否顯示搜尋列
     */
    searchEnabled: {
      type: Boolean,
      default: true,
    },
    /**
     * Icon的字體大小
     */
    iconHeight: {
      type: Number,
      default: 20,
    },
    /**
     * Icon的字體大小
     */
    iconWidth: {
      type: Number,
      default: 20,
    },
    /**
     * Icon的border-radius
     */
    iconRounded: {
      type: String,
      default: '0',
    },
    /**
     * 是否顯示Title
     */
    showTitle: {
      type: Boolean,
      default: true,
    },
    /**
     * Title的字體大
     */
    titleFontSize: {
      type: Number,
      default: 14,
    },
    /**
     * Title的字體顏色
     */
    titleColor: {
      type: String,
      default: '#080D20',
    },
    /**
     * 是否顯示Desc
     */
    showDesc: {
      type: Boolean,
      default: true,
    },
    /**
     * Desc的字體大小
     */
    descFontSize: {
      type: Number,
      default: 12,
    },
    /**
     * Desc的字體顏色
     */
    descColor: {
      type: String,
      default: '#AFAFAF',
    },
    /**
     * 是否顯示Script
     */
    showScript: {
      type: Boolean,
      default: false,
    },
    /**
     * Script的字體大小
     */
    scriptFontSize: {
      type: Number,
      default: 12,
    },
    /**
     * Script的字體顏色
     */
    scriptColor: {
      type: String,
      default: '#AFAFAF',
    },
    /**
     * 被選中欄位勾勾的icon高度
     */
    tickHeight: {
      type: Number,
      default: 15,
    },
    /**
     * 是否使用$requireSafe
     */
    localImg: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const findDefaultItem = (list, val) => list.find((item) => item.title === val) || {};
    const findDefaultIdx = (list, val) => list.findIndex((item) => item.title === val) || 0;

    // ref
    const keyword = ref('');
    const selectIndex = props.defaultItemTitle ? ref(findDefaultIdx(props.list, props.defaultItemTitle)) : ref(undefined);

    // reactive
    const state = reactive({
      dataList: [],
      selectItem: {},
    });

    // watch
    watch(keyword, (val) => {
      if (val) {
        state.dataList = props.list.filter((e) => (e.title && e.title.toString().indexOf(val) !== -1)
          || (e.desc && e.desc.toString().indexOf(val) !== -1)
          || (e.script && e.script.toString().indexOf(val) !== -1));
      } else {
        state.dataList = props.list;
      }
      selectIndex.value = props.defaultItemTitle ? findDefaultIdx(state.dataList, props.defaultItemTitle) : undefined;
      state.selectItem = props.defaultItemTitle ? findDefaultItem(state.dataList, props.defaultItemTitle) : {};
    }, { immediate: true });

    watch(() => props.list, (val) => {
      state.dataList = val;
      selectIndex.value = props.defaultItemTitle ? findDefaultIdx(val, props.defaultItemTitle) : undefined;
      state.selectItem = props.defaultItemTitle ? findDefaultItem(val, props.defaultItemTitle) : {};
      keyword.value = '';
    }, { immediate: true });

    watch(
      [() => state.selectItem, () => selectIndex.value], ([item, idx]) => emit('change', item, idx),
    );

    // methods
    const choose = (item, index) => {
      state.selectItem = item;
      selectIndex.value = index;
    };

    return {
      state,
      keyword,
      selectIndex,
      choose,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-list {
  background: #fff;

  .ant-input-affix-wrapper {
    height: 28px;
    margin-bottom: 15px;
    border: 0.0625rem solid #f0f0f0 !important;
    border-radius: 1.1875rem !important;
    color: #000 !important;
    font-size: 1rem !important;
    background-color: #f5f5f5 !important;

    ::v-deep(.ant-input-prefix) {
      color: #777 !important;
    }
  }

  ::v-deep(.ant-input) {
    padding: 0 10px;
    border: none !important;
    border-radius: 0 !important;
    background-color: #f5f5f5 !important;

    &:focus {
      border: none !important;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    overflow: auto;

    .option {
      display: flex;
      align-items: center;
      padding: 6px 0;

      .icon {
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;
        margin-right: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        display: flex;
        flex: 1 0 0;
        flex-direction: column;
        justify-content: center;

        &.active {
          font-weight: 700;
        }

        .desc-container {
          display: flex;
          align-items: center;

          .desc {
            margin-right: 10px;
          }
        }
      }

      .selected {
        display: flex;
        align-items: center;

        img {
          height: 100%;
        }
      }
    }
  }
}
</style>
