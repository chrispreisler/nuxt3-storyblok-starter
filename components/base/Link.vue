<template>
  <component :is="currentTag" v-bind="currentAttribute" :class="currentStyle">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    default: "",
  },
  theme: {
    type: String,
    default: "",
  },
});

const styles = {};

const currentStyle = computed(() => props.theme && styles[props.theme]);

const tags = {
  story: "nuxt-link",
  url: "a",
  email: "a",
  asset: "a",
};

const currentTag = computed(() =>
  props.type ? props.type : tags[props.blok.linktype]
);

const attributes = !props.type && {
  url: {
    href: props.blok.url,
  },
  email: {
    href: "mailto:" + props.blok.email,
  },
  asset: {
    href: props.blok.url,
  },
  story: {
    to: props.blok.cached_url?.includes("home")
      ? "/"
      : "/" + props.blok.cached_url,
  },
};

const currentAttribute = computed(() =>
  !props.type && !props.blok?.anchor
    ? attributes[props.blok.linktype]
    : { to: "" }
);
</script>
