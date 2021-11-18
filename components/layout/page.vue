<template>
  <div>
    <component
      :is="'module-' + page.component"
      v-for="page in blok.body"
      :key="page._uid"
      :blok="page"
    />
  </div>
</template>

<script setup>
defineProps({
  blok: {
    type: Object,
    default: () => {},
  },
});
</script>
