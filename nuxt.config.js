import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  buildModules: ["@vueuse/core/nuxt"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  modules: [["@storyblok/nuxt", { accessToken: "MXZNTlJYSnVfIwr28XMcxQtt" }]],
});
