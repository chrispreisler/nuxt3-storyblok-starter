<template>
  <main>
    <div v-if="data">
      <BaseLink
        v-for="(item, index) in data.story.content.header[0].navigation"
        :key="index"
        :blok="item.link"
      >
        {{ item.title }}
      </BaseLink>
    </div>
    <NuxtPage />
  </main>
</template>

<script setup>
import "./assets/css/tailwind.css";

const { data } = await useStoryApi("/global");
</script>
