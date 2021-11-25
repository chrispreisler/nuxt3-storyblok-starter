<template>
  <div v-if="data">
    <component
      :is="'layout-' + data.story.content.component"
      :blok="data.story.content"
    />
  </div>
</template>

<script setup>
import { useStoryApi } from "@storyblok/nuxt/composables";

const route = useRoute();
const storyapi = useStoryApi();
const slug =
  route.path === "/" ? "cdn/stories/home" : "cdn/stories" + route.path;
const { data } = await storyapi.get(slug, {
  version: "draft",
});
</script>
