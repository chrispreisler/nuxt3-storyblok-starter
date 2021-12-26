import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  publicRuntimeConfig: {
    storyblokToken: process.env.STORYBLOK_TOKEN,
    storyblokVersion: process.env.STORYBLOK_VERSION,
  },
  buildModules: ["@vueuse/nuxt"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
});
