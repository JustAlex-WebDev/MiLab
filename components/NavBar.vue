<script setup>
// Props
const props = defineProps({
  layout: {
    type: String,
    required: true,
  },
});

// i18n (localization) setup
const localePath = useLocalePath();

const router = useRouter();
const selectedLanguage = ref("en");

// State to manage drawer visibility
const drawer = ref(false);

// Language Change Handler
const changeLanguage = (lang) => {
  selectedLanguage.value = lang;
};
</script>

<template>
  <v-app-bar app elevation="1">
    <!-- Title / Logo -->
    <v-app-bar-title>
      <NuxtLink
        :to="localePath('/portal-mockup')"
        class="text-teal font-weight-bold text-decoration-none"
        >M I L A B</NuxtLink
      >
    </v-app-bar-title>

    <!-- Menu icon for small screens only -->
    <v-app-bar-nav-icon
      v-if="layout === 'default'"
      @click.stop="drawer = !drawer"
      class="d-sm-none text-teal"
    ></v-app-bar-nav-icon>

    <!-- Navigation Links -->
    <template v-slot:append>
      <!-- Language Dropdown-->
      <v-menu open-on-click location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="d-none d-sm-flex"
            color="teal"
            style="width: 48px; min-width: 48px; height: 48px"
          >
            <v-icon size="24">mdi-web</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="changeLanguage('en')">
            <v-list-item-title
              :class="{ 'font-weight-bold': selectedLanguage === 'en' }"
            >
              English
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeLanguage('fr')">
            <v-list-item-title
              :class="{ 'font-weight-bold': selectedLanguage === 'fr' }"
            >
              French
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Account Dropdown-->
      <v-menu v-if="layout === 'default'" open-on-click location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="d-none d-sm-flex"
            color="teal"
            style="width: 48px; min-width: 48px; height: 48px"
          >
            <v-icon size="24">mdi-account-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title> Sign Out </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <!-- Drawer Component -->
  <Drawer v-model:drawer="drawer" />
</template>
