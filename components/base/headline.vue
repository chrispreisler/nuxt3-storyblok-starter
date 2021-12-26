<template>
  <component :is="'h' + level" :class="currentStyle">
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
    default: "h1",
  },
});

const styles = {
  h1: "text-h1",
};

const currentStyle = computed(() => styles[props.size]);
</script>
