<template>
  <div v-if="data">
    <component
      :is="'layout-' + data.story.content.component"
      :blok="data.story.content"
    />
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.path === "/" ? "/home" : route.path;
const { data } = await useStory(slug);
</script>
