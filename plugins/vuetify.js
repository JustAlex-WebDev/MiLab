import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    blueprint: md3,
    icons: {
      defaultSet: "mdi",
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
