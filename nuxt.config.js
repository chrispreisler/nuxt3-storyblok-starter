import { defineNuxtConfig } from "nuxt3";

export const noopTransform = () => {
  return {
    props: [],
    needRuntime: true,
  };
};

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
  hooks: {
    "build:before": ({ nuxt }, config) => {
      const opts = config.loaders.vue.compilerOptions;
      const transforms = opts.directiveTransforms || {};
      opts.directiveTransforms = { ...transforms, editable: noopTransform };
    },
  },
});
