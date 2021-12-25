module.exports = {
  mode: "jit",
  content: {
    files: [
      "./components/**/*.{vue,js}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./app.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
    ],
  },
  theme: {
    extend: {
      fontSize: {
        h1: "clamp(3rem, 3rem + (7 - 3) * ((100vw - 40rem) / (105 - 40)), 7rem)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
