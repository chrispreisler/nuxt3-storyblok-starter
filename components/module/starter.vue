<template>
  <div v-editable="blok">
    <BaseHeadline>{{ blok.title }}</BaseHeadline>
    <BaseText :blok="blok.copy" />
    <div class="w-full h-screen overflow-hidden">
      <BaseImage
        v-if="blok.image.filename"
        :blok="blok.image"
        is-cover
        is-priority
      />
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
