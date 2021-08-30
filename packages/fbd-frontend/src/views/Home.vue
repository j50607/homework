<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <div class="father">
      {{ $t('home') }}
      <div class="child">
        child
      </div>
      <div class="child">
        child
      </div>
    </div>
    <div>
      12132123
    </div>
  </div>
</template>

<script>

export default {

};
</script>

<style lang="postcss" scoped>
.father {
  @apply py-5 px-2;

  .child {
    @apply my-5;
  }
}
</style>
