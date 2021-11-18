<template>
  <div>
    <base-headline level="1">{{ blok.title }}</base-headline>
    <div class="w-full h-screen overflow-hidden">
      <base-image :blok="blok.image" is-cover is-priority />
    </div>
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