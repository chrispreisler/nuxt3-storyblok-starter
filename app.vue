<template>
  <main class="text-white bg-black">
    <div v-if="data">
      <nuxt-link
        v-for="(link, index) in data.story.content.header[0].navigation"
        :key="index"
        :to="link.link.cached_url === 'home' ? '/' : link.link.cached_url"
      >
        {{ link.title }}
      </nuxt-link>
    </div>
    <NuxtPage />
  </main>
</template>

<script setup>
import { useStoryApi } from "@storyblok/nuxt/composables";
import "./assets/css/tailwind.css";

const storyapi = useStoryApi();
const { data } = await storyapi.get("cdn/stories/global", { version: "draft" });
</script>
