import { defineNuxtPlugin } from "#app";

const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else if (!new RegExp("\\b" + className + "\\b").test(el.className)) {
    el.className += " " + className;
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("editable", {
    beforeMount(el, binding) {
      if (binding.value) {
        const node = binding.value._editable;
        if (typeof node === "undefined" || node === null) return;

        const cleared = node.replace("<!--#storyblok#", "").replace("-->", "");
        const options = JSON.parse(cleared);

        el.setAttribute("data-blok-c", JSON.stringify(options));
        el.setAttribute("data-blok-uid", options.id + "-" + options.uid);

        addClass(el, "storyblok__outline");
      }
    },
  });
});
