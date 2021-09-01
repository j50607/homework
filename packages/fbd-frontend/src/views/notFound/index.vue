<template>
  <div class="not-found">
    <div class="not-found-content">
      <figure class="not-found-icon">
        <img :src="$requireSafe('icon/desc.svg')">
      </figure>
      <p class="not-found-txt">
        {{ $t('views_notFound_desc') }}
      </p>

      <d-button
        type="primary"
        :block="true"
        @click="goPage({ name: 'home' })"
      >
        {{ $t('views_notFound_backToHome') }}
      </d-button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    // use
    const router = useRouter();

    // methods
    const goPage = ({ name, params = {}, query = {} }) => {
      router.push({
        name,
        params,
        query,
      });
    };
    return {
      goPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  position: relative;
  height: 100%;
  color: #1e2123;
  background: #f7f8fb;

  &-content {
    width: 55%;
    margin: 30% auto 0;
    text-align: center;
  }

  &-icon {
    width: 100%;

    img {
      width: 80%;
      margin: 0 auto;
      transform: rotate(180deg);
    }
  }

  &-txt {
    margin: 20px auto 30px;
    font-size: 20px;
  }
}
</style>
