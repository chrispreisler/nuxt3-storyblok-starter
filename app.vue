<template>
  <main>
    <div v-if="data" class="absolute top-0 left-0 right-0">
      <BaseLink
        v-for="(item, index) in data.story.content.header[0].navigation"
        :key="index"
        :blok="item.link"
      >
        {{ item.title }}
      </BaseLink>
    </div>
    <NuxtPage :key="$route.fullPath" />
  </main>
</template>

<script setup>
import "./assets/css/tailwind.css";
const { data } = await useStoryblokApi("/global");
</script>
