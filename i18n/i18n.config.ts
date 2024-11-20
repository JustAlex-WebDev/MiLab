// Import locale translations
import en from "./locales/en.json";
import bg from "./locales/bg.json";

// Configure I18n settings
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en,
    bg,
  },
}));
