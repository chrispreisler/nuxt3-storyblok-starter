<template>
  <div>
    <div v-if="data">
      <component
        :is="'layout-' + data.story.content.component"
        :blok="data.story.content"
      />
    </div>
    <!--<Head v-if="data.story.content.seo.length">
      <Title v-if="data.story.content.seo[0].title">
        {{ data.story.content.seo[0].title }}
      </Title>
      <Meta name="description" :content="data.story.content.seo[0].copy" />
    </Head>-->
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.path === "/" ? "/home" : route.path;
const { data } = await useStory(slug);

/*useMeta(() => ({
  // title: data.story.content.seo[0].title,
  /* meta: [
        {
          hid: "description",
          name: "description",
          content: data.value.story?.content?.seo.copy,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: data.value.story?.content?.seo.value?.title,
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: data.value.story?.content?.seo.value?.copy,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: data.value.story?.content?.seo.value?.image?.filename,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: data.value.story?.content?.seo.value?.title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: data.value.story?.content?.seo.value?.copy,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: data.value.story?.content?.seo.value?.image?.filename,
        },
      ], 
}));*/
</script>
