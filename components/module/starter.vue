<template>
  <div v-editable="blok">
    <!--<BaseHeadline>{{ blok.title }}</BaseHeadline>
    <BaseText :blok="blok.copy" />-->
    <!--<div class="w-full h-screen overflow-hidden">-->
    <BaseImageCover v-if="blok.image.filename" :blok="blok.image" />
    <!--</div>-->
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
