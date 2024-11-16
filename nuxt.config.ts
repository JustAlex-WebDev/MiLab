import path from "path";

export default defineNuxtConfig({
  // Add CSS files for global styles
  css: ["vuetify/styles", "@/assets/styles/main.scss"],

  // Transpile Vuetify for SSR
  build: {
    transpile: ["vuetify"],
  },

  // Vite configuration for debugging and resolving aliases
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    resolve: {
      alias: {
        "@locales": path.resolve(__dirname, "locales"),
        "@types": path.resolve(__dirname, "types"),
      },
    },
  },

  // Nuxt Modules
  modules: ["@nuxtjs/i18n"],

  // Nuxt i18n module configuration
  i18n: {
    vueI18n: "./i18n/i18n.config.ts",
    locales: ["en", "fr"],
    defaultLocale: "en",
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
    },
  },

  // Runtime Config
  runtimeConfig: {
    public: {
      apiBase: "/api",
    },
  },
});
