<template>
  <a-modal
    v-model:visible="show"
    class="service-modal"
    :title="'忘记密码'"
    :footer="null"
    centered
    :closable="false"
    :width="230"
    @cancel="cancel"
  >
    <div class="service--modal">
      <div
        class="service-text"
        v-text="'请联系在线客服为您处理'"
      />
      <a-button
        class="service-button"
        v-text="'联系客服'"
        @click="contactCustomerService()"
      />
    </div>
  </a-modal>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    // use
    const store = useStore();

    // computed
    const show = computed({
      get: () => props.value,
      set: (val) => {
        emit('update:value', val);
      },
    });

    const serviceUrl = computed(() => store.state.user.serviceUrl);

    // methods
    const cancel = () => {
      show.value = false;
    };

    const contactCustomerService = () => {
      window.open(serviceUrl.value);
    };

    return {
      show,
      cancel,
      contactCustomerService,
      serviceUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.service-modal {
  &::v-deep(.ant-modal) {
    color: $dialog-title-color !important;
  }

  .service-text {
    margin-bottom: 40px;
    color: #080d20;
    text-align: center;
  }

  .service-button {
    width: 100%;
    height: 2rem;
    border-radius: 3px;
    color: #fff;
    background: $button-color;
  }
}
</style>
