<template>
  <div
    class="lang"
    ref="langRef"
  >
    <d-dialog
      v-model:visible="isModalShow"
      :title="$t('components_dLanguageModal_title')"
      :footer="null"
      :get-container="() => langRef"
      @cancel="hideModal"
    >
      <template #body>
        <ul class="lang-list">
          <li
            v-for="(item, idx) in state.langArr"
            :key="idx"
            class="lang-item is-btn"
            :class="{'lang-item-active': currentLang === item.value}"
            @click="chooseLang(item.value)"
          >
            {{ item.text }}
          </li>
        </ul>
      </template>
      <template #footer>
        <d-button
          block
          type="primary"
          @click="setLocale"
        >
          {{ $t('views_bankcard_nextStep2') }}
        </d-button>
      </template>
    </d-dialog>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Cookie from 'js-cookie';
import DDialog from '@/components/DDialog';

export default {
  components: {
    DDialog,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'cancel'],
  setup(props, context) {
    // use
    const store = useStore();

    // ref
    const currentLang = ref('');
    const langRef = ref(null);

    // reactive
    const state = reactive({
      langArr: [
        { text: '简体中文', value: 'zh_cn', index: 0 },
        { text: '繁體中文', value: 'zh_tw', index: 1 },
        { text: 'Tiếng Việt', value: 'vi_vn', index: 2 },
        { text: 'ไทย', value: 'th_th', index: 3 },
        { text: 'English', value: 'en_us', index: 4 },
        { text: '日本語', value: 'ja_jp', index: 5 },
      ],
    });

    // computed
    const isModalShow = computed({
      get: () => props.isShow,
      set: (val) => context.emit('update:value', val),
    });
    const storeLanguage = computed(() => store.state.info.language);

    // methods
    const init = () => {
      currentLang.value = storeLanguage.value;
    };

    const hideModal = () => {
      context.emit('cancel', false);
    };

    const chooseLang = (lang) => {
      currentLang.value = lang;
    };

    const setLocale = () => {
      Cookie.set('language', currentLang.value);
      store.commit('SET_LOCALE', { lang: currentLang.value, status: true });
      window.location.reload();
    };

    init();

    return {
      state,
      langRef,
      isModalShow,
      currentLang,
      chooseLang,
      setLocale,
      hideModal,
    };
  },
};
</script>

<style lang="scss" scoped>
$item-space: 7.5px;

.lang {
  &-list {
    margin: 0 auto;
  }

  &-item {
    padding: 7.5px 0;
    font-size: 12px;
    text-align: center;
  }

  &-item-active {
    color: #096fc9;
    font-weight: 600;
  }
}

.d-btn {
  height: 32px;
}

::v-deep(.d-dialog-body) {
  margin: 0 auto 30px - $item-space;
}

::v-deep(.ant-modal-header) {
  padding: 15px 1.5rem;
}

::v-deep(.ant-modal) .ant-modal-body {
  padding: 0 26px 20px;
}

::v-deep(.ant-modal-close-x) {
  width: 3.25rem;
  height: 3.25rem;
  line-height: 3.25rem;

  svg {
    fill: #b3b3b3;
  }
}
</style>
