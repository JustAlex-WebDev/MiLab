import path from "path";

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
        "@locales": path.resolve(__dirname, "locales"), // Alias for locales directory
      },
    },
  },
  modules: ["@nuxtjs/i18n"],
  i18n: {
    vueI18n: "./i18n/i18n.config.ts", // Path to custom i18n configuration
    locales: ["en", "fr"], // List of available locales
    defaultLocale: "en", // Default language
  },
});
