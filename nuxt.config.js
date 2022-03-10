import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ["~/components"],
  },
  buildModules: [
    "@vueuse/nuxt",
    [
      "./modules/storyblok/module",
      {
        token: process.env.STORYBLOK_TOKEN,
        version: process.env.STORYBLOK_VERSION,
      },
    ],
  ],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
    },
  },
  meta: {
    link: [{ rel: "preconnect", href: "//img2.storyblok.com" }],
  },
});
