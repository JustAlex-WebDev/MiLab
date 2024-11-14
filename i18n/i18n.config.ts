// Import locale translations
import en from "./locales/en.json";
import fr from "./locales/fr.json";

// Configure I18n settings
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en,
    fr,
  },
}));
