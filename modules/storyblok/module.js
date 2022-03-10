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

    addPlugin(resolve(__dirname, "./plugins/storyEditable.js"));
  },
});
