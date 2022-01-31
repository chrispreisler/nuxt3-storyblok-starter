<template>
  <div v-html="text" />
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    default: () => {},
  },
});

const { text } = useStoryblokTextResolver(props.blok);
</script>
