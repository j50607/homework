<template>
  <div>
    <slot
      :locale="$i18n.locale"
      :siteLocale="siteLocale"
    />
  </div>
</template>
<script>
export default {
  setup() {
    const { siteLocale } = window._jsvar;

    return {
      siteLocale,
    };
  },
};
</script>
