<template>
  <div
    class="step-ccontainer m-auto"
    :style="`width: ${contanierWidth}px;`"
  >
    <a-steps
      :current="current"
      :responsive="false"
      label-placement="vertical"
      size="small"
      class="d-steps"
    >
      <a-step
        v-for="(item, index) in stepList"
        :key="index"
        :title="item.title"
        :sub-title="item.subTitle"
        :description="item.description"
      >
        <template #icon>
          <img
            v-if="current > index"
            :src="$requireSafe('icon/step-finish.svg')"
            alt=""
          >
          <span v-else>{{ index +1 }}</span>
        </template>
        <template
          #title
          v-if="useTitleSlot"
        >
          <span />
        </template>
        <template
          #subTitle
          v-if="useSubTitleSlot"
        >
          <span />
        </template>
        <template
          #description
          v-if="useDescriptionSlot"
        >
          <span />
        </template>
      </a-step>
    </a-steps>
  </div>
</template>
<script>
export default {
  props: {
    // 步驟列表
    stepList: {
      type: Array,
      default: () => [],
    },
    useDescriptionSlot: {
      type: Boolean,
      default: false,
    },
    useTitleSlot: {
      type: Boolean,
      default: false,
    },
    useSubTitleSlot: {
      type: Boolean,
      default: false,
    },
    isClickable: {
      type: Boolean,
      default: false,
    },
    // 步驟條顯示到第幾步驟
    current: {
      type: Number,
      default: 0,
    },
    // 容器寬度
    contanierWidth: {
      type: [Number, String],
      default: undefined,
    },

  },
};
</script>
<style lang="postcss" scoped>
.d-steps {
  ::v-deep(.ant-steps-item) {
    .ant-steps-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px !important;
      height: 25px;
      border: 2px solid #38c522;
      border-radius: 50%;
      background-color: #fff !important;

      .ant-steps-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #38c522;
        font-weight: bold;
        font-size: 12px;
      }
    }

    .ant-steps-icon {
      color: #38c522;
      font-weight: bold;
    }

    .ant-steps-item-tail {
      margin-left: calc(2.875rem + 25px);
      padding: 3.5px 0;

      &::after {
        width: 90%;
        height: 3px;
        border-radius: unset !important;
        background: #e5e5e5;
      }
    }

    .ant-steps-item-title {
      color: #4d5772 !important;
    }
  }

  ::v-deep(.ant-steps-item-finish) {
    .ant-steps-item-tail {
      &::after {
        background: #38c522;
      }
    }

    .ant-steps-item-icon {
      background: #38c522 !important;
    }

    .ant-steps-finish-icon {
      color: #fff !important;
    }
  }

  ::v-deep(.ant-steps-item-wait) {
    .ant-steps-item-icon {
      border: none;
      background-color: #e5e5e5 !important;
    }

    .ant-steps-icon {
      color: #bcc0cb !important;
    }
  }

  ::v-deep(.ant-steps-item-active) {
    .ant-steps-item-title {
      font-weight: bold;
    }
  }
}
</style>
