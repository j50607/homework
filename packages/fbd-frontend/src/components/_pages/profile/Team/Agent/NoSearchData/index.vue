<template>
  <div class="no-data">
    <img
      :src="require('@/assets/img/profile/team/no-data.svg')"
      alt=""
    >
    <div>{{ $t('components_pages_profile_team_emptyMessage') }}</div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  font-size: 0.875rem;

  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }
}
</style>
