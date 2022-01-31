<template>
  <div>
    <div v-if="data">
      <Html v-if="data.story.content.seo.length">
        <Head>
          <Title>{{ data.story.content.seo[0].title }}</Title>
          <Meta name="description" :content="data.story.content.seo[0].copy" />
          <Meta name="og:title" :content="data.story.content.seo[0].title" />
          <Meta name="og:type" content="website" />
          <Meta
            name="og:description"
            :content="data.story.content.seo[0].copy"
          />
          <Meta
            name="og:image"
            :content="data.story.content.seo[0].image.filename"
          />
        </Head>
      </Html>
      <component
        :is="'layout-' + data.story.content.component"
        :blok="data.story.content"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.path === "/" ? "/home" : route.path;
const { data } = await useStoryblokApi(slug);
useStoryblokBridge(data.value.story.id, (story) => (data.value.story = story));
</script>
