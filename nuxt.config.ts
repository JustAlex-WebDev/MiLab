// Import required modules
import path from "path";

// Nuxt.js configuration
export default defineNuxtConfig({
  css: ["vuetify/styles", "@/assets/styles/main.scss"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    resolve: {
      alias: {
        "@locales": path.resolve(__dirname, "locales"),
      },
    },
  },
  modules: ["@nuxtjs/i18n"],
  i18n: {
    vueI18n: "./i18n/i18n.config.ts",
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
});
