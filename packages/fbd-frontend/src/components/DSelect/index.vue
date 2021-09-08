<template>
  <div
    ref="select"
    class="d-select"
    @click="showDropdown"
  >
    <div
      v-if="!selectedItem.value"
      class="text-gray-400"
    >
      {{ placeholder }}
    </div>
    <template v-if="hasDropdownSlot">
      <slot
        name="dropdown"
        :option="selectedItem"
      />
    </template>
    <div v-else>
      {{ selectedItem.label }}
    </div>

    <div
      v-if="show"
      class="d-select-dropdown"
    >
      <template v-if="data.length">
        <div
          class="d-select-item"
          v-for="(item, index) in data"
          :key="index"
          @click.stop="selectItem(item)"
        >
          <template v-if="hasDropdownSlot">
            <slot
              name="dropdown"
              :option="item"
            />
          </template>
          <div v-else>
            {{ item.label }}
          </div>
        </div>
      </template>
      <div
        v-else
        class="d-select-item"
      >
        <template v-if="hasEmptySlot">
          <slot name="empty" />
        </template>
        <div
          v-else
          class="text-center text-gray-400"
          @click.stop="show = false"
        >
          {{ $t('common_noData') }}
        </div>
      </div>
    </div>

    <img
      class="arrow"
      :class="{'on': show}"
      :src="require('@/assets/img/icon/triangle-bottom.svg')"
      alt=""
    >
  </div>
  <div
    v-if="show"
    class="overlay"
    @click="show = false"
  />
</template>

<script>
import {
  computed, reactive, ref, toRefs, watch,
} from 'vue';

export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '123',
    },
  },
  emits: ['update:value'],
  setup(props, { emit, slots }) {
    const select = ref(null);

    const state = reactive({
      list: [],
      show: false,
    });

    const hasDropdownSlot = computed(() => slots.dropdown);
    const hasEmptySlot = computed(() => slots.empty);
    const selectedItem = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val),
    });

    watch(() => props.data, () => {
      if (props.data?.length) {
        [selectedItem.value] = props.data;
      }
    });

    const showDropdown = () => {
      state.show = true;
    };

    const selectItem = (item) => {
      state.show = false;
      selectedItem.value = item;
    };

    return {
      showDropdown,
      select,
      selectItem,
      selectedItem,
      hasDropdownSlot,
      hasEmptySlot,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.d-select {
  position: relative;
  display: flex;
  align-items: center;
  padding: 7px 10px;
  border: 1px solid #bcc0cb;
  border-radius: 3px;
  background: #ecf2f8;
  cursor: pointer;

  .arrow {
    width: 12px;
    height: 12px;
    margin-left: auto;
    transition: transform 0.2s;

    &.on {
      transform: rotate(180deg);
    }
  }

  .d-select-dropdown {
    position: absolute;
    top: 35px;
    left: 0;
    z-index: 2;
    width: 100%;
    max-height: 135px;
    border-radius: 3px;
    overflow-y: auto;
    background: #ecf2f8;

    .d-select-item {
      padding: 5.5px 10px;
      transition: background 0.3s;
      cursor: pointer;

      &:hover {
        background: #4d57721a;
      }
    }
  }
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

::-webkit-scrollbar {
  display: none;
}

</style>
