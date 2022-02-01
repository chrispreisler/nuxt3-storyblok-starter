import { defineNuxtConfig } from "nuxt3";

export const noopTransform = () => {
  return {
    props: [],
    needRuntime: true,
  };
};

export default defineNuxtConfig({
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
});
