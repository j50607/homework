<template>
  <span class="rolling-number">
    <d-rolling-single-number
      v-for="(item, index) in state.integerNumList"
      :single-num="item"
      :key="index"
      :width="width"
      :height="height"
      :color="color"
      :transition="transition"
    />
    <template v-if="state && state.decimalNumList && state.decimalNumList.length > 0">
      <div>.</div>
      <d-rolling-single-number
        v-for="(item, index) in state.decimalNumList"
        :single-num="item"
        :key="index"
        :width="width"
        :height="height"
        :color="color"
        :transition="transition"
      />
    </template>
  </span>
</template>
<script>
import { reactive, watch } from 'vue';
import DRollingSingleNumber from '@/components/DRollingNumber/DRollingSingleNumber';

export default {
  components: {
    DRollingSingleNumber,
  },
  props: {
    /**
     * num傳入會一直改變的數字。
     */
    num: {
      type: Number,
      default: 0,
    },
    /**
     * 預設為24，會影響字體大小。
     */
    width: {
      type: Number,
      default: 24,
    },
    /**
     * 預設為24，會影響數字line-height。
     */
    height: {
      type: Number,
      default: 24,
    },
    /**
     * 預設為#000，會影響數字顏色。
     */
    color: {
      type: String,
      default: '#000',
    },
    /**
     * 預設為0.6，會影響轉動速度。
     */
    transition: {
      type: Number,
      default: 0.6,
    },
  },
  setup(props) {
    // reactive
    const state = reactive({
      integerNumList: [],
      decimalNumList: [],
    });

    // watch
    watch(() => props.num, (val) => {
      const integer = val?.toString()?.split('.')?.[0];
      const decimal = val?.toString()?.split('.')?.[1];

      const integerList = integer?.toString()?.split('');
      const decimalList = decimal?.toString()?.split('');

      state.integerNumList = integerList?.map((e) => Number(e));
      state.decimalNumList = decimalList?.map((e) => Number(e));
    }, { immediate: true });

    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
.rolling-number {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
