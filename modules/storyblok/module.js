import { defineNuxtModule, addPlugin } from "@nuxt/kit";
import { resolve } from "pathe";

export default defineNuxtModule({
  name: "storyblok",
  configKey: "storyblok",
  setup(options, nuxt) {
    nuxt.options.publicRuntimeConfig.storyblok = {
      token: options.token,
      version: options.version,
    };

    nuxt.hook("autoImports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "./composables"));
    });

    nuxt.hook("builed:before", ({ nuxt }, config) => {
      const opts = config.loaders.vue.compilerOptions;
      const transforms = opts.directiveTransforms || {};
      opts.directiveTransforms = {
        ...transforms,
        editable: noopTransform,
      };
    });

    addPlugin(resolve(__dirname, "./plugins/storyEditable.client.js"));
  },
});
