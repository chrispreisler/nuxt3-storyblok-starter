<template>
  <div>
    <BaseHeadline>{{ blok.title }}</BaseHeadline>
    <div class="w-full h-screen overflow-hidden">
      <BaseImage :blok="blok.image" is-cover is-priority />
    </div>
    <swiper :space-between="50" :slides-per-view="1" :loop="true">
      <swiper-slide v-for="index in 3" :key="index" class="py-40">
        <BaseImage :blok="blok.image" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

defineProps({
  blok: {
    type: Object,
    default: () => {},
  },
});
</script>
