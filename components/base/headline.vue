<template>
  <component :is="'h' + level" :class="className">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  level: {
    type: String,
    default: "1",
  },
  size: {
    type: String,
    default: "normal",
  },
});

const className = computed(() => {
  switch (props.size) {
    default:
      return "text-h1";
  }
});
</script>
