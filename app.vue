<template>
  <main>
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
import "./assets/css/tailwind.css";

const { data } = await useStoryApi("/global");
</script>
